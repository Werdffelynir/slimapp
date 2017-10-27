<?php

require 'vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$app = new \Slim\App();


$app->get('/', function (Request $req,  Response $res, $args = []) {
    include 'template.html';
});


$app->get('/send', function (Request $req,  Response $res, $args = []) {

    try {

        $data = [
            "name" => "testName",
            "company" => "testCompany",
            "topic" => "testTopic",
            "text" => "testText"
        ];

        $subject = 'Here is the subject';
        $message[] = 'This is the HTML message body <b>in bold!</b>';

        foreach ($data as $key => $value)
            $message[] = "<b>$key:</b> $value";

        $messageHTML = '<p>' . join('</p><p>', $message) . '</p>';

        $mail = new PHPMailer(true);
        $mail->setFrom('site@mysite.com', 'Mailer');
        $mail->addAddress('werdffelynir@gmail.com', 'Joe User');
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $messageHTML;
        // $mail->send();

    } catch (Exception $error ) {

    }
});


$app->get('/error', function (Request $req,  Response $res, $args = []) {
    return $res->withStatus(400)->write('Bad Request');
});


$app->run();
