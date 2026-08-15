# Revision Intervals

Each problem's next revision date is computed from two things: its `difficulty`, and how many times it's been *successfully* re-solved (`revision_count`).

The rule: revision 0 (just added) always starts at 7 days for every difficulty. After that, easier problems get longer gaps between reviews (since they're expected to be retained more easily), harder problems get reviewed more often. From the second successful revision onward, the interval stays fixed at its "steady state" value.

A failed revision attempt resets `revision_count` back to `0` — the problem returns to a 7-day interval, same as if it were brand new.

```
HARD :
    Initially         : Revise after 7 days
    After 1 revision  : Revise after 10 days from the last revision
    After 2+ revisions: Revise every 14 days

MEDIUM :
    Initially         : Revise after 7 days
    After 1 revision  : Revise after 12 days from the last revision
    After 2+ revisions: Revise every 20 days

EASY :
    Initially         : Revise after 7 days
    After 1 revision  : Revise after 16 days from the last revision
    After 2+ revisions: Revise every 24 days
```

Implemented in `backend/utils/calculateNextRevision.js`.
