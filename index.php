<?php

require 'vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


/**
 * @type \ArrayObject
 */
$config_file = require 'config.php';

$config = function ($name) use ($config_file) {
    return isset($config_file[$name]) ? $config_file[$name] : false;
};

/**
 * @type \Slim\App
 */
$app = new \Slim\App();

$app->get('/', function (Request $req,  Response $res, $args = []) {
    include 'template.html';
});


$app->post('/send', function (Request $request,  Response $response, $args = []) use ($config) {


    try {
        $message = [];
        $answer = ["status" => 0, "errmsg" => 0, "data" => []];
        $post = $request->getParsedBody();
        $data = [
            "name"      => $post["field0"],
            "company"   => $post["field1"],
            "topic"     => $post["field2"],
            "email"     => $post["field3"],
            "text"      => $post["field4"]
        ];


        echo json_encode($answer);
        exit;


        foreach ($data as $key => $value)
            $message[] = "<b>$key:</b> $value";

        $messageHTML = '<p>' . join('</p><p>', $message) . '</p>';

        $mail = new PHPMailer(true);
        $mail->setFrom($config("mail.from"), $config("mail.from.name"));
        $mail->addAddress($config("mail.to"), $config("mail.to.name"));
        $mail->isHTML(true);
        $mail->Subject = $config("mail.subject");
        $mail->Body = $config("mail.message.before") . $messageHTML . $config("mail.message.after");

        if($mail->send()) {
            die (json_encode($answer));
        } else {
            $answer["status"] = 1;
            $answer["errmsg"] ='Mailer error: ' . $mail->ErrorInfo;
            die (json_encode($answer));
        }

    } catch (Exception $error ) {
        $answer["status"] = 1;
        $answer["errmsg"] = $error->getMessage();
        die (json_encode($answer));
    }
});


$app->get('/error', function (Request $req,  Response $res, $args = []) {
    return $res->withStatus(400)->write('Bad Request');
});


$app->run();
