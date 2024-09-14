// base64.js

let base64Input = '';
let base64Output = '';

function initializeBase64Converter(container) {
    const output = document.getElementById('output');

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
    output.addEventListener('input', (e) => {
        if (e.target && e.target.id === inputField.id) {
            const inputValue = e.target.value;
            handleInput(inputValue, container);
        }
    });
    
    inputField.focus();

    console.log('Base64 converter initialized');
}

function handleInput(inputValue) {
    base64Input = inputValue;
    base64Output = btoa(base64Input);
    const outputDisplay = document.getElementById('base64-output');
    outputDisplay.innerHTML = `<pre>Encoded: ${base64Output}</pre>`;
    console.log("Output display updated");
}

function isInBase64Converter(currentDirectory) {
    return currentDirectory === '~/Base64-Converter';
}

// Export the functions to be used in main.js
export { initializeBase64Converter, isInBase64Converter };
