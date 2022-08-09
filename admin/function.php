<?php
// ф-кция подключения к базе
function connect()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db = "eshop";

    $conn = mysqli_connect($servername, $username, $password, $db);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    mysqli_set_charset($conn, "utf8");
    return $conn;
}

// ф-кция вывода списка из базы в админ. панель
function init()
{
    $conn = connect();
    $sql = "SELECT id, name FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $data[$row["id"]] = $row;
        }
        echo json_encode($data);
    } else {
        echo "0";
    }

    mysqli_close($conn);
}

// выводит из БД выбраный по ID товар и передаёт в скрипт вывода в .json формате массив
function selectOneGoods()
{
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM goods WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }

    mysqli_close($conn);
}

// Обновляет данные в БД с получеными из admin.js параметрами
function updateDB()
{
    $conn = connect();
    $id = $_POST['id'];
    $name = $_POST['gname'];
    $price = $_POST['gprice'];
    $descr = $_POST['gdescr'];
    $order = $_POST['gorder'];
    $img = $_POST['gimg'];

    $sql = "UPDATE goods SET name = '$name', price = '$price', description = '$descr', ord = '$order', img = '$img'  WHERE id = '$id'";

    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

    mysqli_close($conn);
    writeJson();
}

// Добавляет товар в БД из формы при выборе пункта New Goods
function newGoods()
{
    $conn = connect();
    $name = $_POST['gname'];
    $price = $_POST['gprice'];
    $descr = $_POST['gdescr'];
    $order = $_POST['gorder'];
    $img = $_POST['gimg'];

    $sql = "INSERT INTO goods (name, price, description, ord, img) VALUES ('$name', '$price', '$descr', '$order', '$img')";

    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
    writeJson();
}

// Записывает данные из БД в файл goods.json
function writeJson()
{
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $data[$row["id"]] = $row;
        }
        file_put_contents('../goods.json', json_encode($data));
    } else {
        echo "0";
    }

    mysqli_close($conn);
}

// Получает товары из БД
function loadGoods()
{
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $data[$row["id"]] = $row;
        }
        echo json_encode($data);
    } else {
        echo "0";
    }

    mysqli_close($conn);
}
