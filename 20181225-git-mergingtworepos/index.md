---
title: Merging two repositories in Git
date: 2018/12/25
tags:
    - git
---

Merry Christmas!

If you have two repositories that you'd like to merge into one, you can merge a
branch of one repository into the other and then merge them into one merge
commit. This is useful if you have repositories of the format *Project*, *New
Project*, *New Project 2*, and so on.

The steps are as follows:

1. `cd` into the newer repository
2. Add the older repository as a remote

   ``` sh
   git remote add old https://example.com/older/repo
   ```
3. Fetch this remote

   ``` sh
   git fetch --tags old
   ```
4. Merge in the branch you'd like to preserve from the older repository into the
   newer repository

   ``` sh
   git merge old/oldbranch -s ours --allow-unrelated-histories
   ```

The tip of the repository will now contain a merge commit of the new
repository and the tip of the branch of the old repository, with the working
tree looking exactly like the newer repository. The old repository will exist
in the history as a brand new origin commit, that is eventually merged into
the new repository's history.
