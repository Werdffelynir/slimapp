<?php

require 'vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \PHPMailer\PHPMailer\PHPMailer as PHPMailer;

$app = new \Slim\App();


$app->get('/', function (Request $req,  Response $res, $args = []) {
    include 'template.html';
});


$app->get('/message', function (Request $req,  Response $res, $args = []) {

    try {

        $mail = new PHPMailer(true);
        $mail->setFrom('werdffelynir@gmail.com', 'Mailer');
        $mail->addAddress('werdffelynir@gmail.com', 'Joe User');
        $mail->isHTML(true);
        $mail->Subject = 'Here is the subject';
        $mail->Body = 'This is the HTML message body <b>in bold!</b>';

    } catch (Exception $error ) {

    }
});


$app->get('/error', function (Request $req,  Response $res, $args = []) {
    return $res->withStatus(400)->write('Bad Request');
});


$app->run();
