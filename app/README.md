# Scaffold

- [ ] Svelte
- [ ] Tailwind
- [ ] Layouts
- [ ]

# QBank

A repository for collecting various types of questions. These can be used for interviews or candidate screening activities.

## Users

- Authors: Their objective is to see the different types of questions available. Add a new one or modify an existing one.
- Reviewers: Review exiting questions and rate them on various criteria. Self review not allowed, but they can create questions

## Tags

All questions have a title and some text. Text is in markdown and title is also in the text. Title and first paragraph of the scenario can be used for the list of questions.

The question is entered as a markdown. The user can preview the question as it will appear and also add attributes for the question.

All attributes can be considered as tags. Some tags may have multiple values. These can be used for filtering and search.

- Skill - Development, Testing, Design, Architecture, Presentation
- Category - MCQ, Scenario, Problem Solving, TDD
- Role - IC (junior/senior), lead, architect, ops
- Complexity - Simple, Medium, Complex
- Duration - Minutes, Hours
- Tool - Stackblitz, ?
- Technologies - Any, UI, python, C etc. or multiple.

The system may have too many questions to show at one shot, so pagination willbe required. Based on the question type there may be some changes in the way the editor behaves.

For example the scenario text box is sufficient for most questions.

- MCQ's will require list of options and which ones are correct.
- Scenario type questions will require some sample responses that can be considered as valid responses.
- TDD solutions would be tested automatically.

## Review

Reviewers will mark the quality of a question based on some parameters. There willbe some subjective notes that can be addressed by the author to fix or improve the question. These can be taken off after it is resolved by the author. The rating may need to be revisited by the reviewer in such cases.

- Note
- Date
- Rating
- Resolution

## Types

- MCQ
- Scenario
- TDD

## Attributes
