==========================
Utils Functions
==========================

This folder contains pure functions and business logic that handle:
- API calls
- Data processing
- Event handling (e.g., publishing offers)

These functions:
- Do NOT use React hooks or hold React state
- Typically return Promises for async operations
- Return structured responses (e.g., { success: boolean, data?, error? })

Usage:
- Import the function into components or hooks
- Call the function with appropriate parameters
- Use async/await or .then() to handle the returned Promise
- Check the response object to determine success or failure

Best practices:
- Keep service functions pure and focused
- Handle errors gracefully and return meaningful messages
- Separate concerns: UI logic stays in components/hooks; business logic in services/utils
