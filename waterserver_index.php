<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <link href="./server.css" rel="stylesheet">
    <script src="./serverindex.js"></script>
</head>
<body>
<header class="head">
    <h1><b>水道自動決済アプリケーション管理ページ</h1>
</header>
<div class="main">
    <div id="networkid"></div>
    <div id="accounts"></div>
    <br>
    <p>個人情報登録フォーム
    <p>登録情報を入力してください


    <form method="post">
        name<br>
        <input type="text" name="name"><br>
        TEL<br>
        <input type="text" name="tel"><br>
        address<br>
        <input type="text" name="address"><br>
        mail<br>
        <input type="text" name="mail"><br>
        eth<br>
        <input type="text" name="eth"><br>
        <input type="submit" name="submit" value="送信">
    </form>
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


    $name=$_POST['name'];
    $tel=$_POST['tel'];
    $address=$_POST['address'];
    $mail=$_POST['mail'];
    $eth=$_POST['eth'];

    $sql = "INSERT INTO water_users (name, phone, address, mail, eth) VALUES (:name, :tel, :address, :mail, :eth)";
    $stmh = $pdo->prepare($sql);
    $params = array(':name' => $name, ':tel' => $tel, ':address' => $address, ':mail' => $mail, 'eth' => $eth);
    $stmh->execute($params);
    }

    if(isset($_POST["submit"])) { insert(); }
    ?>

    <?php
    try{
        // データベースへ接続
        $dbinfo = parse_url(getenv('DATABASE_URL'));
        $dsn = 'pgsql:host=' . $dbinfo['host'] . ';dbname=' . substr($dbinfo['path'], 1);
        $pdo = new PDO($dsn, $dbinfo['user'], $dbinfo['pass']);
    }catch (PDOException $e){
        print('Error:'.$e->getMessage());
    die();
    }
    try{
    $sql = "SELECT * FROM water_users";
    $stmh = $pdo->prepare($sql);
    $stmh->execute();
    }catch(PDOException $Exception){
    die('接続エラー：' .$Exception->getMessage());
    }
    ?>
    <table>
        <tbody>
        <tr>
            <th>name</th>
            <th>TEL</th>
            <th>address</th>
            <th>mail</th>
            <th>eth</th>
        </tr>
        <?php
    while($row = $stmh->fetch(PDO::FETCH_ASSOC)){
        ?>
        <tr>
            <th><?=htmlspecialchars($row['name'])?></th>
            <th><?=htmlspecialchars($row['phone'])?></th>
            <th><?=htmlspecialchars($row['address'])?></th>
            <th><?=htmlspecialchars($row['mail'])?></th>
            <th><?=htmlspecialchars($row['eth'])?></th>
        </tr>
        <?php
      }
      $pdo = null;
    ?>
        </tbody>
    </table>

    <a href="index.html">使用量確認ページはこちら</a>
    <footer class="footer">omete_IoT</footer>
</body>
</html>
