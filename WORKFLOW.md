# AI Workflow Comparison

## Objective

The goal of this exercise was to compare two different AI-assisted development workflows by implementing the same React Settings Form twice. The first implementation intentionally used a vague prompt with minimal context, while the second used a structured prompt that included requirements, constraints, file references, accessibility expectations, and a verification step. This comparison demonstrates how prompt quality influences implementation quality, review effort, and overall development efficiency.

## Round One – Vague Prompt

For the first implementation, I asked the AI to "Build me a React settings form" without providing additional context or requirements. The generated component rendered a basic form, but it lacked important production-ready features such as validation, accessibility improvements, structured form state management, and automated tests. Although the code worked at a basic level, it required significant manual review to identify missing functionality and determine what needed to be improved.

## Round Two – Structured Prompt

For the second implementation, I started a fresh AI session and provided a detailed prompt. The prompt specified the required libraries (React Hook Form and Zod), project file structure, expected behavior, accessibility requirements, and verification steps. Before generating code, the AI created an implementation plan and identified the files it would modify. After implementing the feature, it generated unit tests, attempted to run them, detected issues in the testing setup, and iteratively corrected those issues. This verification loop provided much greater confidence in the final implementation.

## Comparison

The differences between both implementations were significant. The first version produced a simple form with little validation and required more manual corrections. The second version used React Hook Form with Zod validation, displayed validation messages, disabled submission until the form became valid, and included accessibility improvements such as proper labels and semantic HTML. It also included automated tests and performed self-review before completion. Although the second prompt required more time to write, it reduced the overall review and debugging effort.

## AI Mistake I Caught

During the verification process, the AI encountered several issues while configuring the Vitest test environment. The generated test setup required multiple corrections before the tests could execute correctly. Reviewing and validating the generated code instead of assuming it was correct reinforced the importance of treating AI-generated code as a draft rather than a final solution.

## Lessons Learned

This exercise demonstrated that precise prompts produce more reliable results than vague requests. Adding implementation constraints, verification instructions, and explicit success criteria improved both code quality and development efficiency. The review process also showed that AI can accelerate development, but human verification remains essential to ensure correctness, maintainability, and accessibility.
