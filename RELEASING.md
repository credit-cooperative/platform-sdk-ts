# Releasing

`@credit-cooperative/platform-sdk` is published to npm by a GitHub Actions
workflow ([.github/workflows/publish.yml](.github/workflows/publish.yml)) that
runs on any pushed tag matching `v*`. The workflow builds, typechecks, and
publishes from `packages/sdk/`, picking the npm dist-tag from the version
string (e.g. `3.0.0-alpha.1` → `alpha`, `3.0.0` → `latest`).

## Cutting a release

```sh
# inside packages/sdk/
npm version prerelease --preid=alpha     # 3.0.0-alpha.0 → 3.0.0-alpha.1
                                         # bumps package.json, commits, and tags v3.0.0-alpha.1

# back at repo root
git push --follow-tags                   # pushes commit + tag; the tag push triggers CI
```

## Version transitions

- `npm version prerelease --preid=alpha` — next alpha.
- `npm version prerelease --preid=beta` — first beta after alpha.
- `npm version prerelease --preid=rc` — first release candidate.
- `npm version 3.0.0` — cut the stable release.

The workflow derives the dist-tag from the version string, so a stable release
lands on `latest` automatically — no flag needed.

## Verifying a release

- Watch the run in the **Actions** tab on GitHub.
- `npm view @credit-cooperative/platform-sdk dist-tags` — confirm the new
  version is on the expected tag and that `latest` is where you expect.
- The package page on npmjs.com should show a **Provenance** badge linking
  back to the workflow run and commit.

## Gotchas

- `git push --follow-tags` only pushes annotated tags. `npm version` creates
  annotated tags by default, so this works without extra flags.
- `npm version` refuses to run with a dirty working tree — commit or stash
  any changes first.
- To publish a fix to an older line, branch from the older tag, bump, and
  push the new tag from that branch.
