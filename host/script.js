document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
    const filenameInput = document.getElementById('filename').value;
    const feedbackDiv = document.getElementById('feedback');

    // Check file size (15MB)
    if (file.size > 15 * 1024 * 1024) {
        feedbackDiv.innerHTML = 'File size must be 15MB or less.';
        return;
    }

    // Validate filename: alphanumeric only
    if (!filenameInput.match(/^[a-z0-9]+$/i)) {
        feedbackDiv.innerHTML = 'Filename must be alphanumeric.';
        return;
    }

    // Validate file type
    const validTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        feedbackDiv.innerHTML = 'Invalid file type. Only GIF, PNG, JPG, and WEBP are allowed.';
        return;
    }

    // Simulate an upload and generate a mock URL
    const reader = new FileReader();
    reader.onloadend = function() {
        const base64Image = reader.result;
        feedbackDiv.innerHTML = `Upload successful! Here's your image: <img src="${base64Image}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`;
    };
    reader.readAsDataURL(file);
});
