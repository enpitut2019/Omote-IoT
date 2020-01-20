<?php
// function insert(){
    try{
        // データベースへ接続
        $dbinfo = parse_url(getenv('DATABASE_URL'));
        $dsn = 'pgsql:host=' . $dbinfo['host'] . ';dbname=' . substr($dbinfo['path'], 1);
        $pdo = new PDO($dsn, $dbinfo['user'], $dbinfo['pass']);
    }catch (PDOException $e){
        print('Error:'.$e->getMessage());
        die();
    }

    //フォームから受け取った値を変数に代入
    $name=$_POST['name'];
    $tel=$_POST['tel'];
    $address=$_POST['address'];
    $mail=$_POST['mail'];
    $acounteth=$_POST['eth'];
    $password=$_POST['password'];
//     $contractAddress=$_POST['contractAddress'];

    //データベースにinsert
    $sql = "INSERT INTO water_users (name, tel, address, mail, eth, password, contractAddress) VALUES (:name,:tel,:address,:mail,:eth,:password,:contractAddress)";
    $stmh = $pdo->prepare($sql);
//     $params = array(':name' => $name, ':tel' => $tel, ':address' => $address, ':mail' => $mail, ':eth' => $acounteth, ':password' => $password, ':contractAddress' => $contractAddress);
    $params = array(':name' => $name, ':tel' => $tel, ':address' => $address, ':mail' => $mail, ':eth' => $acounteth, ':password' => $password);
    $stmh->execute($params);
// }

// if(isset($_POST['submit'])){
//     insert();
// }
?>
