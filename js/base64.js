// base64.js

function initializeBase64Converter(container) {
    // Create title display
    const titleDisplay = document.createElement('pre');
    titleDisplay.textContent = 'Base64 Converter';

    // Create input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'base64-input';
    inputField.placeholder = 'Enter text to encode';
    
    // Create output display
    const outputDisplay = document.createElement('div');
    outputDisplay.id = 'base64-output';
    outputDisplay.innerHTML = `<pre>Encoded: </pre>`;
    
    // Append new elements
    container.appendChild(titleDisplay);
    container.appendChild(inputField);
    container.appendChild(outputDisplay);
    
    // Event listener for real-time encoding
    const output = document.getElementById('output');
    output.addEventListener('input', (e) => {
        if (e.target && e.target.id === inputField.id) {
            const inputValue = e.target.value;
            handleInput(inputValue, outputDisplay);
        }
    });
    
    inputField.focus();

    console.log('Base64 converter initialized');
}

function handleInput(inputValue, outputDisplay) {
    let base64Input = inputValue;
    let base64Output = '';
    let operation = '';

    if (isBase64(inputValue)) {
        try {
            base64Output = atob(base64Input);
            operation = 'Decoded';
            outputDisplay.innerHTML = `<pre>Decoded: ${base64Output}</pre>`;
        } catch (e) {
            output = 'Invalid base64 input';
            operation = 'Error';
        }
    } else {
        base64Output = btoa(base64Input);
        operation = 'Encoded';
        outputDisplay.innerHTML = `<pre>Encoded: ${base64Output}</pre>`;
    }

    console.log("Output display updated");
}

function isBase64(str) {
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

function isInBase64Converter(currentDirectory) {
    return currentDirectory === '~/Base64-Converter';
}

// Export the functions to be used in main.js
export { initializeBase64Converter, isInBase64Converter };
