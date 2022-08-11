<?php
// получает action из admin.js
$action = $_POST['action'];

require 'function.php';

// в зависимости от тпиа action вызывает нужную функцию
switch ($action) {
    case "init":
        init();
        break;
    case "selectOneGoods":
        selectOneGoods();
        break;
    case "updateDB":
        updateDB();
        break;
    case "newGoods":
        newGoods();
        break;
    case "loadGoods":
        loadGoods();
        break;
    case "loadSingleGoods":
        loadSingleGoods();
        break;
}
