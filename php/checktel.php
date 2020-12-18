<?php
    $name = $_GET['usernames'];
    $con = mysqli_connect('localhost', "root", "123456","gz2008");
    // $con = mysqli_connect('localhost', "root", "123456","studens");
    $sql1 = "SELECT * FROM `use` WHERE username = '$name';";
    // $sql1 = "SELECT * FROM `login` WHERE username = '$name';";
    $res1 = mysqli_query($con,$sql1);
    $row = mysqli_fetch_assoc($res1);
    if($row){
        echo json_encode(array("error" => 1, "data" => "该用户名已存在"),JSON_UNESCAPED_UNICODE);
        }else{
            echo json_encode(array("error" => 0, "data" => "该用户可以使用！"),JSON_UNESCAPED_UNICODE);
    };
?>