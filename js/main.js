//
// Terminal-style related configuration
//

const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const userInput = document.getElementById('user-input');
const prompt = document.getElementById('prompt');
const cursor = document.getElementById('cursor');

let commandHistory = [];
let historyIndex = -1;

function updatePrompt() {
    prompt.textContent = "[toolbox@kylerianhd ~]$";
}

function processCommand(command) {
    output.innerHTML += `${prompt.textContent} ${command}\n`;
    
    switch(command.toLowerCase()) {
        case 'help':
            output.innerHTML += "Available commands: help, echo, whoami, ls, clear\n";
            break;
        case 'whoami':
            output.innerHTML += "toolbox\n";
            break;
        case 'ls':
            output.innerHTML += "Base64-Converter  Hashing  SHA-Converter  Other-Projects/Tools\n";
            break;
        case 'clear':
            output.innerHTML = "";
            break;
        default:
            if (command.toLowerCase().startsWith('echo ')) {
                output.innerHTML += `${command.slice(5)}\n`;
            } else if (command.trim() !== '') {
                output.innerHTML += `Command not found: ${command}\n`;
            }
    }
    output.innerHTML += '\n';
    terminal.scrollTop = terminal.scrollHeight;
}

function updateCursorPosition() {
    const cursorPos = userInput.selectionStart;
    const leftOffset = measureText(userInput.value.substring(0, cursorPos));

    cursor.style.left = `${leftOffset}px`;
}

function measureText(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context.font = getComputedStyle(userInput).font;
    return context.measureText(text).width;
}

userInput.addEventListener('input', updateCursorPosition);
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = this.value;
        if (command.trim() !== '') {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }
        processCommand(command);
        this.value = '';
        updateCursorPosition();
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
            updateCursorPosition();
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
        updateCursorPosition();
    }
});

window.onload = function() {
    userInput.focus();
    updatePrompt();
    updateCursorPosition();
};
