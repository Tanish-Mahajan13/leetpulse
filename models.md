# Data Models

## User

Represents a registered account.

| Field        | Type     | Notes                                                                 |
|--------------|----------|------------------------------------------------------------------------|
| `name`       | String   | Required.                                                              |
| `email`      | String   | Required, unique — used as the login identifier.                      |
| `password`   | String   | Required. Hashed with bcrypt before saving, never returned by queries by default (`select: false`) — must be explicitly requested with `.select('+password')`, used only during login to compare against the submitted password. |
| `createdAt`  | Date     | Defaults to time of creation.                                         |

## Problems

Represents a single DSA/LeetCode problem a user has logged, along with its spaced-repetition state.

| Field                      | Type      | Notes                                                                                     |
|-----------------------------|-----------|---------------------------------------------------------------------------------------------|
| `user_id`                   | ObjectId  | Required. References `User`. Every query and mutation on a problem is scoped to this — a user can only ever read/edit/delete their own problems. |
| `title`                     | String    | Required.                                                                                    |
| `url`                       | String    | Required. Combined with `user_id` in a unique compound index — the same user cannot add the same URL twice, but different users can each track the same problem independently. |
| `code`                      | String    | Required. The user's own solution/code for the problem.                                     |
| `difficulty`                | String    | Required. One of `Easy`, `Medium`, `Hard`. Drives the revision interval (see `intervals.md`). |
| `comment`                   | String    | Optional notes the user adds. Defaults to an empty string.                                  |
| `revision_count`            | Number    | Defaults to `0`. Tracks how many times the user has *successfully* re-solved this problem. Resets to `0` on a failed revision attempt. Used to look up the next interval. |
| `last_revised_at`           | Date      | Defaults to creation time. Updated every time the problem is revised (success or failure).  |
| `next_revision_date`        | Date      | The date this problem becomes "due." Computed from `difficulty` + `revision_count` at creation, and recomputed after every revision. |
| `is_flagged`                | Boolean   | Defaults to `false`. User-controlled flag for problems they consider especially important/difficult — independent of the revision schedule. |
| `createdAt` / `updatedAt`   | Date      | Auto-managed by Mongoose (`timestamps: true`). `createdAt` is what "recent to oldest" sorting is based on — not `last_revised_at`, since that changes on every revision and would misrepresent when a problem was actually added. |

**Indexes:**
- `{ user_id: 1, url: 1 }` — unique compound index, prevents duplicate problem entries per user.
