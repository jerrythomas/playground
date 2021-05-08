Scenario: A key button is clicked

 Feature: Set the key value for active cell
   Given that cell has not been solved and is empty
    When a key button is clicked
    Then active cell should be set 
     And the key button should be disabled
    
Scenario: A cell is clicked

Feature: No action needs to be taken when a solved cell is clicked

  Given that cell has been solved
   When the cell is clicked
   Then no change is made

Feature: Activate the cells for the first unsolved clue when an unsolved cell is clicked

  Given that cell has not been solved and is empty
   When the cell is clicked
    And the cell is not active
    And both across & down clues have not been solved
   Then highlight the cells for the 'across' clue
    And activate the first non empty cell

Scenaro: An answer has been entered for a clue

Feature: Mark clue and cells as solved when the answer has been entered
  Given that all but one cells have been entered for the current clue
   When the last cell is entered 
    And the answer matches the expected answer for the clue
   Then all cells should be marked as solved

Feature: Mark clue and cells as incorrect when the answer has been entered
  Given that all but one cells have been entered for the current clue
   When the last cell is entered 
    And the answer matches the expected answer
   Then all cells should be marked as solved
    And store the timestamp when it was solved
    And store the id of the user who solved it

Scenario: Keyboard is used for navigation or typing

Feature: Arrow keys to navigate cells within the clue
  Given that an arrow key is pressed 
   Then activate the first empty cell in the direction of the arrow key
  
Feature: Arrow keys to navigate cells outside current clue
  Given that an arrow key is pressed the current clue is not solved
   Then activate the first empty cell in the direction of the arrow key
    And clear all the cells of the current clue

Feature: Keys pressed is not in the allowed active characters shoudl cause a beep
  Given a key is pressed
    And the key is not in the allowed active characters
   Then beep

Feature: Keys pressed in the allowed active characters should fill current cell and move forward
  Given a key is pressed
    And the alphabet is in the allowed active characters
   Then fill the active cell with alphabet
    And mark the alphabet as used
    And move to the next cell

Feature: Mark cells as solved on last cell entry
  Given a key is pressed
    And the alphabet is in the allowed active characters
    And the last cell has been filled
    And the entry matches the expected answer
   Then mark the cells as solved
    And move to next unsolved clue

Feature: Mark cells as error on last cell entry
  Given a key is pressed
    And the alphabet is in the allowed active characters
    And the last cell has been filled
    And the entry matches the expected answer
   Then mark the cells as error
    And move to next unsolved clue
