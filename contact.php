<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Method not allowed.");
}

$name = htmlspecialchars(strip_tags(trim($_POST["name"] ?? "")));
$email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(strip_tags(trim($_POST["message"] ?? "")));

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'mztechnologies.co';
    $mail->SMTPAuth = true;
    $mail->Username = '_mainaccount@mztechnologies.co';
    $mail->Password = 'your_cpanel_password';        // ← Yahan apna cPanel password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('_mainaccount@mztechnologies.co', 'MZ Technologies Website');
    $mail->addAddress('_mainaccount@mztechnologies.co');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = "New Message from MZ Technologies Website";
    $mail->Body =
        "New contact form submission:\n\n" .
        "Name    : $name\n" .
        "Email   : $email\n\n" .
        "Message :\n$message\n\n" .
        "---\nSent via MZ Technologies Website";

    $mail->send();
    echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);

} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    echo json_encode(["status" => "error", "message" => "Could not send email. Please try again."]);
}
?>