var _ = require('lodash')
var path = require('path')
var inquirer = require('inquirer')
var inflect = require('inflect')
var sprintf = require('util').format
var changeCase = require('change-case')

var OPTLY_DIR = path.resolve(__dirname, '../../src/')

/**
 *
 * @param {Grunt} grunt
 *
 * @param {Object} answers
 * @param {String} answers.name
 * @param {Array} answers.stores
 * @param {String} answers.type (default='normal', options=['entity', 'normal'])
 * @param {String?} answers.entity (used for entity type)
 * @param {String?} answers.parentEntity (used for entity type)
 * @param {String?} answers.parentKey (used for entity type)
 *
 * @return {Object} mapping of filepath => contents
 */
function parseAnswers(grunt, answers) {
  // prep template data and figure out output directory
  var moduleSnake = changeCase.snakeCase(answers.name)
  // need the following:
  var templateData = {
    moduleNameUnderscore: moduleSnake,
    moduleNameCap: moduleSnake.toUpperCase(),
    moduleNameTitle: changeCase.titleCase(answers.name),
    moduleNameCamel: changeCase.camelCase(answers.name),
    moduleNamePascal: changeCase.pascalCase(answers.name),

    entity: answers.entity,
    parentEntity: answers.parentEntity,
    parentKey: answers.parentKey,

    stores: answers.stores.map(function(storeName) {
      var snaked = changeCase.snakeCase(storeName)

      return {
        filename: snaked + '_store',
        camel: changeCase.camelCase(storeName),
      }
    }),
  }

  var typeToInputDir = {
    entity: path.resolve(__dirname, './templates/entity_module_template'),
    standard: path.resolve(__dirname, './templates/module_template'),
  }

  var storeTemplate = path.resolve(__dirname, './templates/store_template.js')
  var inputDir = typeToInputDir[answers.type]
  var outputDir = path.join(OPTLY_DIR, 'modules', answers.subDir, moduleSnake)

  // mapping of filepath to contents
  var output = {}
  // write all the inputDir files to their output directory
  grunt.file.expand({ cwd: inputDir }, '*.js')
    .map(function(filename) {
      var contents = grunt.file.read(path.join(inputDir, filename));
      var rendered = grunt.template.process(contents, {
        data: templateData
      })
      output[path.join(outputDir, filename)] = rendered
    })

  var storeTemplateContents = grunt.file.read(storeTemplate)
  templateData.stores.forEach(function(storeEntry) {
    var outputFilename = path.join(outputDir, 'stores', storeEntry.filename + '.js')
    var rendered = grunt.template.process(storeTemplateContents, {
      data: {
        moduleNameCap: templateData.moduleNameCap,
        storeNameCamel: changeCase.camelCase(storeEntry.filename),
      },
    })

    output[outputFilename] = rendered
  })

  return {
    output: output,
    outputDir: outputDir,
  }
}

/**
 * Converts the output of parsed
 * Writes templates
 * @param {Grunt} grunt
 * @param {Object} config
 * @param {Function} done
 */
function build(grunt, answers, done) {
  var instructions = parseAnswers(grunt, answers, done)
  var output = instructions.output
  var outputDir = instructions.outputDir

  if (grunt.file.isDir(outputDir)) {
    grunt.log.error(sprintf("Directory already exists: %s", outputDir))
    done(false)
    return;
  }

  grunt.log.subhead("About to write the following files:")

  _.each(output, function(contents, filepath) {
    grunt.log.writeln(path.relative(path.resolve(OPTLY_DIR,  '../'), filepath))
  })

  inquirer.prompt([
    {
      name: 'doit',
      message: 'Confirm module creation?',
      type: 'confirm'
    },
  ], function(confirm) {
    if (confirm.doit) {
      _.each(output, function(contents, path) {
        grunt.file.write(path, contents);
      })
      done()
    } else {
      grunt.log.error("Aborted module creation!")
      done(false)
    }
  })
}

module.exports = function(grunt, done) {
  /**
   * Recursively inquire about creating stores
   */
  var inquireStore = function(cb, stores) {
    stores = stores || []

    inquirer.prompt([
      {
        name: 'storeName',
        message: 'Store name?',
        validate: function(answer) {
          if (answer.indexOf('_store') > -1) {
            return '"_store" will be automatically appended'
          }
          return true
        }
      }
    ], function(answers) {
      if (answers.storeName.trim() === '') {
        cb(stores);
      } else {
        stores.push(answers.storeName)
        inquireStore(cb, stores)
      }
    })
  }

  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: "Type?",
      choices: ['standard', 'entity'],
    },
    {
      name: 'name',
      message: 'Module name?',
      when: function(answers) {
        return answers.type === 'standard'
      },
      validate: function(answer) {
        return answer.length > 0
      },
    },
    {
      name: 'entity',
      message: 'Entity name? Convention is plural form (ex: "audiences")',
      when: function(answers) {
        return answers.type === 'entity'
      },
      validate: function(answer) {
        return answer.length > 0
      },
    },
    {
      name: 'name',
      message: 'Module name? default:',
      default: function(answers) {
        return inflect.singularize(answers.entity)
      },
      when: function(answers) {
        return answers.type === 'entity'
      },
      validate: function(answer) {
        return answer.length > 0
      },
    },
    {
      name: 'parentEntity',
      message: 'Parent entity? Leave blank if no parent.',
      when: function(answers) {
        return answers.type === 'entity'
      }
    },
    {
      name: 'parentKey',
      message: 'Parent entity key? Entity property referencing parent primary key, ex: "project_id"',
      when: function(answers) {
        return answers.type === 'entity' && answers.parentEntity
      },
      validate: function(answer) {
        return answer.length > 0
      },
    },
    {
      type: 'list',
      name: 'createStores',
      message: 'Interactively create Flux stores?',
      choices: ['Yes', 'No'],
      when: function(answers) {
        var validTypes = ['standard']
        return validTypes.indexOf(answers.type) > -1
      }
    },
  ], function(answers) {
    answers.stores = []
    answers.subDir = './'
    // name is a relative path
    if (answers.name.indexOf('/') > -1) {
      var ind = answers.name.lastIndexOf('/')
      var path = answers.name.substr(0, ind)
      var name = answers.name.slice(ind + 1)
      answers.subDir = path
      answers.name = name
    }
    if (answers.type === 'entity') {
      answers.subDir = 'entity'
    }
    // prompt for stores
    if (answers.createStores === 'Yes') {
      grunt.log.writeln("Enter snake cased store names, and dont include a trailing '_store'")
      grunt.log.writeln("Example: api_request_cache")
      grunt.log.writeln("Enter empty string when you are done.")

      inquireStore(function(stores) {
        answers.stores = stores
        build(grunt, answers, done)
      })
    } else {
      build(grunt, answers, done)
    }
  })
}
