<?php

$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

$message = '';
$message .= '<h1>New order:</h1>';
$message .= '<p>Name: ' . $_POST['ename'] . '</p>';
$message .= '<p>Phone: ' . $_POST['ephone'] . '</p>';
$message .= '<p>Email: ' . $_POST['email'] . '</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id => $amount) {
    $message .= $json[$id]['name'] . '---';
    $message .= $amount . '---';
    $message .= $amount * $json[$id]['price'];
    $message .= '<br>';
    $sum = $sum + $amount * $json[$id]['price'];
}
$message .= 'Total: ' . $sum;

//print_r($message);

$to = 'onleerave@gmail.com' . ',';
$to .= $_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>New Order:</title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'New shop order', $spectext . $message . '</body></html>', $headers);

if ($m) {
    echo 1;
} else {
    echo 0;
};
