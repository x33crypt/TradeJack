===================
React Hooks
===================

This folder contains reusable custom hooks that:
- Encapsulate stateful logic
- Handle side effects (e.g., data fetching)
- Provide shared behavior across components

Hooks here:
- Start with "use"
- Use React built-in hooks like useState, useEffect, useContext internally
- Return values or functions for components to consume

Usage:
- Import the hook into your component
- Call the hook inside a functional component
- Use returned state/data/functions to build UI or logic

Best practices:
- Keep hooks focused and reusable
- Do not cause side effects outside useEffect
- Use descriptive names starting with "use"
- Combine hooks logically when needed




