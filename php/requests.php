<?php
    header("Content-type: application/json");
    $_POST = json_decode(file_get_contents('php://input'), true);

    if(!empty($_POST['req']))
        echo file_get_contents('https://api.vk.com/method/' . $_POST['req'] . '?' . $_POST['data']);

?>