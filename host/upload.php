<?php

$targetDir = "cdn/";
$allowedTypes = ['gif', 'png', 'jpg', 'jpeg', 'webp'];
$maxFileSize = 15 * 1024 * 1024; // 15MB
$fileName = basename(preg_replace("/[^a-zA-Z0-9]/", "", $_POST['filename'])); // Sanitize filename
$fileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));

// Validate file type
if (!in_array($fileType, $allowedTypes)) {
    echo "Error: Only GIF, PNG, JPG, and WEBP files are allowed.";
    exit;
}

// Validate file size
if ($_FILES["image"]["size"] > $maxFileSize) {
    echo "Error: File is too large. Maximum size is 15MB.";
    exit;
}

// Construct the target file path
$targetFilePath = $targetDir . $fileName . "." . $fileType;

// Move the file to the target directory
if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
    $url = "http://yourdomain.com/" . $targetFilePath;
    echo "Upload successful! URL: <a href=\"$url\">$url</a>";
} else {
    echo "Error: There was an error uploading your file.";
}
?>
