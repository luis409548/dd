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

    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filenameInput);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const url = `http://yourdomain.com/cdn/${filenameInput}`;
            feedbackDiv.innerHTML = `Upload successful! <a href="${url}" target="_blank">Click here</a> to view your image. <button onclick="navigator.clipboard.writeText('${url}')">Copy URL</button>`;
        } else {
            feedbackDiv.innerHTML = 'Upload failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        feedbackDiv.innerHTML = 'Upload failed. Please try again.';
    });
});
