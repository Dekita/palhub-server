# Shell Script Conventions

## File Naming
- File Extension: `.sh`

## Shebang Line
```bash
#!/bin/bash
```

## Comments
Use `#` for comments.
```bash
# This is a comment
```

## Indentation
Use four spaces for indentation.
```bash
if [ condition ]; then
    # code block
fi
```

## Naming Conventions
- Variables: UPPERCASE_WITH_UNDERSCORES
  ```bash
  GLOBAL_VARIABLE="value"
  local_variable="value"
  ```
- Constants: UPPERCASE_WITH_UNDERSCORES
  ```bash
  readonly PI=3.14
  ```
- Functions: lowercase_with_underscores
  ```bash
  my_function() {
      # function body
  }
  ```

## Quotes
Use double quotes for strings.
```bash
my_variable="Hello, World!"
```

## Error Handling
```bash
set -e

# your script here

# set +e to turn off the exit on error
set +e
```

## Functions
```bash
function my_function() {
    # code block
}

# calling the function
my_function
```

## Conditional Statements and Loops
```bash
if [ "$var" -eq 10 ]; then
    # code block
fi

for i in {1..5}; do
    # code block
done
```

## Exit Codes
Return appropriate exit codes (0 for success, non-zero for failure).
```bash
if [ condition ]; then
    exit 0  # success
else
    exit 1  # failure
fi
```

These conventions aim to improve the readability and maintainability of your shell scripts. Be consistent in your coding style for better collaboration and understanding.
