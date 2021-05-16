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

## Keyboard

> To Do: handle key input.

- Include only allowed keys
- Disable keys taht have been used
- Update the keyboard based on state
- Show only entries

## Context/Stores

Folloing data needs to be in stores.

- size
- clues
- cells
  - entry for each cell provided by user.
- solution (similar structure as clues)
  - active: indiciator will change basd on activity
  - allowed:
    - used: indicator for a specific clue will change based on user actions
  - solved: indicator to identify if a clue was solved. solved clues need to be locked.
  - timing: This can allow us to replay the solution
    - start: when the first character of solution was entered? or previous stop?
    - stop: time when clue was solved. this is used to calculate the duration for next.
    - duration: Duration will be from the previous solved clue. and also be used for.
  - user: which user solved this. start times are user specific.

The solution part has to be in a store that is saved to local storage regularly and sent to database frequently.

In a collaborative game, all players need to share solution. Solution would be empty at start

## Events

### Cell

```sc

Feature: Do nothing if
Given Given that the cell has been solved
When clicked
Then do nothing
```

- On click:
  - Activate first unsolved set of cells for clue (across or down).
  - Activate clue if it has not been solved. Priority for Across.
- First non empty cell of the clue should become active cell (this one receives key if pressed or from the button)
- If cell is part of an active clue and there is a value, then clear the value and make corresponding key enabled. This cell needs to be made active.

### Key Buttons

- On click
  - Value should bet set on the current active cell.
  - Active cell should move to next non solved cell.
  - The button should be marked as used and disabled.
