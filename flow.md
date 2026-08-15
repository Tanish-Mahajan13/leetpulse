# How LeetPulse Works

## The idea

You solve a problem once. LeetPulse doesn't just save it — it schedules when you should try it again, based on how hard it was and whether you could still solve it last time.

## User flow

```
1. Register / Login
        |
        v
2. Add a solved problem
   (title, url, code, difficulty, notes)
        |
        v
3. LeetPulse calculates when it's due next
   -> based on difficulty (see intervals.md)
        |
        v
4. Problem shows up on the "Due" page once its date arrives
        |
        v
5. User attempts it again, marks: Solved it / Couldn't solve it
        |
        +--> Solved  -> interval grows, pushed further out
        |
        +--> Failed  -> resets to the first interval (7 days)
        |
        v
6. Repeats — the interval keeps adapting to actual recall
```

## Why this matters

This is the same underlying idea as spaced-repetition flashcard tools like Anki: things you remember well get reviewed less often, things you don't get reviewed more often. Applied to DSA problems instead of vocabulary or facts.

## Architecture, in one line

React frontend → REST API (Express) → MongoDB, with JWT auth via `httpOnly` cookies. No third-party sync yet — everything is entered manually for this MVP (see the Roadmap section of the README for what's planned next).
