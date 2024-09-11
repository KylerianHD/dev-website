//
// Imports
//

import { initializeBase64Converter, isInBase64Converter } from './base64.js';

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
let currentDirectory = '~';

const commands = ['help', 'clear', 'echo', 'whoami', 'ls', 'cd', 'base64.sh'];

const fileSystem = {
    '~': {
        'Base64-Converter': {
            'base64.sh': 'executable'
        },
        'Hashing': {},
        'SHA-Converter': {},
        'Other-ToolsOrProjects': {}
    }
};

function updatePrompt() {
    prompt.textContent = `[toolbox@kylerianhd ${currentDirectory}]$`;
}

function processCommand(command) {
    output.innerHTML += `${prompt.textContent} ${command}\n`;

    const [cmd, ...args] = command.split(' ');
    
    switch(cmd.toLowerCase()) {
        case 'help':
            output.innerHTML += "Available commands: " + commands.join(', ') + "\n";
            break;
        case 'whoami':
            output.innerHTML += "toolbox\n";
            break;
        case 'ls':
            listDirectory();
            break;
        case 'cd':
            changeDirectory(args[0]);
            break;
        case 'clear':
            output.innerHTML = "";
            break;
        case 'echo':
            output.innerHTML += `${command.slice(5)}\n`; // maybe `${args.join(' ')}\n` instead
            break;
        case 'base64.sh':
            if (isInBase64Converter(currentDirectory)) {
                console.log("Initializing Base64 converter");
                initializeBase64Converter(output, terminal);
            } else {
                output.innerHTML += "Error: base64.sh can only be executed in the Base64-Converter directory.\n";
            }
            break;
        default:
            if (command.trim() !== '') {
                output.innerHTML += `Command not found: ${command}\n`;
            }
    }
    output.innerHTML += '\n';
    terminal.scrollTop = terminal.scrollHeight;
    updatePrompt();
}

function listDirectory() {
    let currentDir = getCurrentDir();
    output.innerHTML += Object.keys(currentDir).join('  ') + '\n';
}

function changeDirectory(dir) {
    if (!dir || dir === '~') {
        currentDirectory = '~';
        return;
    }

    if (dir === '..') {
        if (currentDirectory !== '~') {
            currentDirectory = currentDirectory.split('/').slice(0, -1).join('/') || '~';
        }
        return;
    }

    let currentDir = getCurrentDir();
    if (currentDir[dir]) {
        currentDirectory += (currentDirectory === '~' ? '/' : '/') + dir;
    } else {
        output.innerHTML += `cd: ${dir}: No such file or directory\n`;
    }
}

function getCurrentDir() {
    return currentDirectory.split('/').reduce((acc, curr) => acc[curr], fileSystem);
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

function tabComplete() {
    const input = userInput.value;
    const [cmd, ...args] = input.split(' ');

    if (args.length === 0) {
        // Command completion
        const matchingCommands = commands.filter(c => c.startsWith(cmd));
        if (matchingCommands.length === 1) {
            userInput.value = matchingCommands[0] + ' ';
        } else if (matchingCommands.length > 1) {
            output.innerHTML += matchingCommands.join('  ') + '\n';
        }
    } else {
        // Path completion
        const currentDir = getCurrentDir();
        const partialPath = args[args.length - 1];
        const matchingPaths = Object.keys(currentDir).filter(p => p.startsWith(partialPath));

        if (matchingPaths.length === 1) {
            args[args.length - 1] = matchingPaths[0];
            userInput.value = [cmd, ...args].join(' ');
        } else if (matchingPaths.length > 1) {
            output.innerHTML += matchingPaths.join('  ') + '\n';
        }
    }

    updateCursorPosition();
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
    } else if (event.key === 'Tab') {
        event.preventDefault();
        tabComplete();
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

console.log("main.js loaded");
