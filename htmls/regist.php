<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <link href="../styles/server.css" rel="stylesheet">
    <link href="../styles/registpage.css" rel="stylesheet">
    <script src="../scripts/bootstrap.bundle.js"></script>
    <link href="../styles/bootstrap.css" rel="stylesheet">
    <script src="../scripts/serverindex.js"></script>
    <link href="../styles/common.css" rel="stylesheet">
    <script src="../scripts/common.js"></script>
</head>
<body>
<?php
function insert(){
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
    //$name=$_POST['firstname'] . $_POST['lastname'];
    $tel=$_POST['tel'];
    $address=$_POST['address'];
    $mail=$_POST['mail'];
    $acounteth=$_POST['eth'];
    $password=$_POST['password'];
    $name='a';


    //データベースにinsert
    $sql = "INSERT INTO water_users ( name, tel, address, mail, eth, password) VALUES (:name,:tel,:address,:mail,:eth,:password)";
    $stmh = $pdo->prepare($sql);
    $params = array(':name' => $name, ':tel' => $tel, ':address' => $address, ':mail' => $mail, ':eth' => $acounteth, ':password' => $password);
    $stmh->execute($params);
    echo "登録されました";
}

if($_REQUEST[submit] == TRUE){
    insert();
}

?>
</body>
</html>