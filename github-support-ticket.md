# GitHub Support ticket — Projects v2 indexing

**Where to submit:** https://support.github.com/contact (log in as `LionnoiL`) → category **Projects**

---

**Subject:** Projects v2 — newly added items are not indexed into `projectV2.items` (account-wide)

**Affected account:** `LionnoiL` (user account, database id `21245131`, node id `MDQ6VXNlcjIxMjQ1MTMx`)

**Affected feature:** Projects (Projects v2), user-owned projects

**Summary:**
On my account, any item added to a Projects v2 board is created successfully but never appears in the project's `items` collection — neither on the web board nor via the GraphQL API. The item is persisted (it resolves by its global node id, `isArchived: false`, and it is linked to the correct project), yet `projectV2.items.totalCount` does not increase and the card is not shown. On the web board a draft appears optimistically for a moment and then vanishes.

**Impact:** My team cannot use the board at all — new cards/drafts never stick. This is a course team project, so it must stay under this account.

**Reproduction (100% via GraphQL API, no browser/filter/archive involved):**

1. Add a draft item to a project, e.g. project `PVT_kwHOAUQsy84BkaOb` (number 5, "Wedding Photography"):

```graphql
mutation {
  addProjectV2DraftIssue(input: {projectId: "PVT_kwHOAUQsy84BkaOb", title: "repro test"}) {
    projectItem { id }
  }
}
```

2. The mutation returns a valid item id, e.g. `PVTI_...`. Query that node directly — it exists and is linked to the project:

```graphql
query { node(id: "PVTI_...") { ... on ProjectV2Item { isArchived project { number title } } } }
# → isArchived:false, project { number:5, title:"Wedding Photography" }
```

3. Query the project's items — the item is missing and the count is unchanged:

```graphql
query { user(login:"LionnoiL"){ projectV2(number:5){ items(first:20){ totalCount nodes { id } } } } }
# → totalCount: 0, nodes: []
```

**What I already verified / ruled out:**

- Not a view filter (filter bar empty), not archived (`isArchived:false`), not an auto-archive workflow (none enabled).
- Not browser/extension related — reproduced purely through the GraphQL API.
- Not project-specific: reproduced on my original project (#3), on a freshly created project (#4), and again on a brand-new project (#5) created after deleting all my projects.
- Also reproduced on an older working project ("Posterminal", #1): adding a new item left the count at 28→28. Its pre-existing items (created in 2024) still show correctly — so only newly indexed items are affected.
- Other users' Projects v2 boards work normally, and https://githubstatus.com reports all systems operational.
- Waited 30+ seconds after each write; the item never appears (so it is not short-term replication lag).

**Conclusion / request:** This looks like a corrupted/stuck items index scoped to my account's Projects v2. Please re-index / repair Projects v2 for account `LionnoiL` so that newly added items appear in `projectV2.items` and on the board.
