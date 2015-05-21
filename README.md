# Ping Pong Tournament

# Singles Tournament Format

## Group Stage

n - number of people
(n/4) groups [A, B, ... group(n/4)]
r - (n % 4) remainder of people that can't form a full 4 person group


### Group selection method

Each player is given a skill rating 1 through 5

Groups are populated in a round robin fashion.

In the first round each group gets a player whose skill is in the top 25th percentile

In the second round each group gets player whose skill is in the bottom 25th percentile

In the third round each group gets player whose skill is in the [25, 75] percentile range

In the fourth round each group gets a player at random

In the case that there are extra players such that a full group cannot be formed 

if r == 3 then form a 3 player group where the highest rank player gets a bye and the remainder is played out like a 4 person group
if r < 3 then distribute the two extra players to group A and group B and a 5 player group will be played


### 4 player group

matchup   winner
A v B   =   A
C v D   =   C
A v C   =   A
B v D   =   B
C v B   =   C
A & C advance


### 5 player group - 3 advance

matchup   winner
A v B   =   A
C v D   =   C
A v C   =   A

At this point a 4 person group is reformed

matchup   winner
B v C   =   B
D v E   =   D
B v D   =   B
C v E   =   C
C v D   =   C

A, B and C advance


After group play:
Let G1 be the 1st place group finishers
Let G2 be the 2nd place group finishers

Let F be the nearest power of 2^x such that (2^x) < (n / 2)
Let R be the extra number of player advancing greater than F (n / 2) - F

In order to have a well balanced single-elimination tournament bracket after group play we must eliminate players until F remain
Randomly select (2 * R) people from G2 to pair off and play a best of 1 series, the losers are eliminated and the final F players remain

Once F players remain we will continue single elimination bracket play until 4 player remain for the final day




























