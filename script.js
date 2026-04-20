// script.js

// Function to handle camera capture
async function startCamera() {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    document.body.appendChild(video);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

// Function to send frames to Flask API
async function sendFrameToAPI(imageData) {
    const response = await fetch('http://<FLASK_API_URL>/detect', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ image: imageData })
    });
    return response.json();
}

// Function to capture frames from video
async function captureFrames(video) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    setInterval(async () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        const result = await sendFrameToAPI(imageData);
        displayDetectedSigns(result);
    }, 1000); // Capture frame every second
}

// Function to display detected signs
function displayDetectedSigns(result) {
    const signContainer = document.getElementById('sign-container');
    signContainer.innerHTML = ''; // Clear previous signs

    result.signs.forEach(sign => {
        const signElement = document.createElement('div');
        signElement.innerText = sign.name; // Assuming the API returns an array of signs with names
        signContainer.appendChild(signElement);
    });
}

async function main() {
    const video = await startCamera();
    await captureFrames(video);
}

main();