<?php
    
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        echo json_encode(
            array(
                "status" => 1,
                "message" => "Form submitted",
                "data" => $_POST
            )
        );
    
        $name = $_POST["name"];
        $email = $_POST["email"];
        $destinationEmail = $_POST["destinationEmail"];
        $message = $_POST["message"];
    
        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR empty($email) OR empty($destinationEmail)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }
    
        // Set the recipient email address.
        $recipient = $destinationEmail;
        // Set the email subject.
        $subject = $_POST["subject"];
    
        // Build the email content.
        $body .= "Message sent from: $name\n\n";
        $body .= "Email: $email\n\n";
        $body .= "Body message: \n$message\n";
        
        $headers = "From: ".$name." <".$email."> \r\n";
        // success
        $success = mail($recipient, $subject, $body, "From:" . $headers);
    
        // Send the email.
        if ($success) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn’t send your message.";
        }
    }

?>