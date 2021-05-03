# Thoughts

A crossword has the following components

- Clues
  - Position
  - Direction
  - Answer
- Cells

## Cells

- A cell can be a placeholder for an alphabet or it can be blank.
- On clicking it focus should shift to the word being solved.
  - All cells of the word should be highlighted
  - First cell should be special
  - First highlight across, second tap should activate down
  - Typing should enter value and move next
  - Tab should go to next word in the crossword

I think that there are two ways to enter values. One where there is a limited set of allowed characters and another where the limitation does not exist. When limiting characters add 4 random letters to the letters from the answer. Typing without limitation should be considered future scope.

A cell needs following attributes

- directions : across, down, both
- across/down
  - id
  - first
  - current

## Context

A common context is needed to cover some of the intermixed changes.

- current clue is shared between the focussed cells and the clue component
  - validity of the current word should normally be at the word level
  - validity can be at char level when checking
  - the allowed values gets updated frequently which means
