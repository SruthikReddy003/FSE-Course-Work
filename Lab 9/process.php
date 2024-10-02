<?php
$errors = [];
$data = [];

if (empty($_POST['name'])) {
    $errors['name'] = 'Name is required.';
}

if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Email is required and must be valid.';
}

if (empty($_POST['superheroAlias'])) {
    $errors['superheroAlias'] = 'Superhero alias is required.';
}

if (!empty($errors)) {
    http_response_code(400);
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    http_response_code(200);
    $data['success'] = true;
    $data['message'] = 'Success!';
}

echo json_encode($data, JSON_PRETTY_PRINT);