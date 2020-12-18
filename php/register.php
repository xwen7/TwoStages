<?php
    $name = $_GET['usernames'];
    $pass = $_GET['passwords'];
    $con = mysqli_connect('localhost', "root", "123456","gz2008");
    $sql2 = "INSERT INTO `use` (`username`, `password`)VALUES ('$name','$pass');";
    $new = mysqli_query($con,$sql2);
    if($new){
        echo json_encode(array("error" => 0, "data" => "注册成功"),JSON_UNESCAPED_UNICODE);
    }
?>