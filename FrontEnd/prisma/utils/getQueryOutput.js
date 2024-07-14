export const queryData = async () => {
    // Simulating a delay to mimic async behavior (replace with actual logic)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const queryOutput = "hello World"; // Replace with actual database query logic
    return queryOutput;
};