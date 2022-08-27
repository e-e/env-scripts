# replace this

## Commands

### `npx env-scripts diff <source-env-relative-path> <destination-env-relative-path>`
Compares environment variables defined in both env files, and reports any variables missing in either.

_Example:_
`npx env-scripts .env.example .env`:
```text
Missing:
TEST_VAR_2

Extra:
TEST_VAR_3
```

Where "Missing" represents variables defined in `.env.example` but that are not found in `.env`, and "Extra" represents the inverse.


### `npx env-scripts sort <env-file-relative-path>`
Reads the env file and writes to a new file named `<env-file>-sorted`

_Example:_
`npx env-scripts sort .env` -> writes to a file named `.env-sorted`
