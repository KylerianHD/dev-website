// shaConverter.js

function initializeSHAConverter(container) {
    container.innerHTML += "Starting SHA Converter...\n";
    container.innerHTML += "Type your input below. SHA1 and SHA256 hashes will be calculated automatically.\n";
    container.innerHTML += "Press Ctrl+C to quit the SHA Converter.\n\n";
    
    const converterInput = document.createElement('input');
    converterInput.type = 'text';
    converterInput.id = 'sha-input';
    converterInput.placeholder = 'Enter text to convert';
    converterInput.style.width = '100%';
    converterInput.style.backgroundColor = 'transparent';
    converterInput.style.color = '#0f0';
    converterInput.style.border = 'none';
    converterInput.style.outline = 'none';
    converterInput.style.fontFamily = 'inherit';
    converterInput.style.fontSize = 'inherit';
    
    const sha1Output = document.createElement('p');
    sha1Output.id = 'sha1-output';
    sha1Output.innerHTML = "SHA1: ";
    
    const sha256Output = document.createElement('p');
    sha256Output.id = 'sha256-output';
    sha256Output.innerHTML = "SHA256: ";
    
    container.appendChild(converterInput);
    container.appendChild(sha1Output);
    container.appendChild(sha256Output);

    // Event listener for real-time encoding
    const output = document.getElementById('output');
    output.addEventListener('input', (e) => {
        if (e.target && e.target.id === converterInput.id) {
            const inputValue = e.target.value;
            updateSHAOutputs(inputValue);
        }
    });
    
    converterInput.focus();

    console.log('SHA-Converter initialized');
}

async function sha1(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const msgBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(msgBuffer));
    console.log('sha1 converted');
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const msgBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(msgBuffer));
    console.log('sha256 converted');
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function updateSHAOutputs(inputValue) {
    const sha1Output = document.getElementById('sha1-output');
    const sha256Output = document.getElementById('sha256-output');
    
    console.log('input detected');
    
    sha1Output.textContent = "SHA1: " + await sha1(inputValue);
    sha256Output.textContent = "SHA256: " + await sha256(inputValue);
}

function isInSHADir(currentDirectory) {
    return currentDirectory === '~/SHA-Converter';
}

export { initializeSHAConverter, updateSHAOutputs, isInSHADir };
