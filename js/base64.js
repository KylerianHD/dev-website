// base64.js

let base64Input = '';
let base64Output = '';

function initializeBase64Converter() {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');

    output.innerHTML = '';
    
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
    output.appendChild(document.createTextNode('Base64 Converter\n'));
    output.appendChild(inputField);
    output.appendChild(document.createElement('br'));
    output.appendChild(outputDisplay);
    
    console.log('Base64 converter initialized');

    // Event listener for real-time encoding
    output.addEventListener('input', (e) => {
        if (e.target && e.target.id === inputField.id) {
            const inputValue = e.target.value;
            handleInput(inputValue);
        }
    });
    
    // Scroll to the bottom of the terminal
    terminal.scrollTop = terminal.scrollHeight;
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
