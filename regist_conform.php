<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <link href="./server.css" rel="stylesheet">
    <script src="js/bootstrap.bundle.js"></script>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/resistpage.css" rel="stylesheet">
    <script src="./serverindex.js"></script>
    <script src="js/main1.js"></script>
</head>
<body>
<header class="head">
    <h1><b>水道自動決済アプリケーション管理ページ</h1>
</header>
<div class="main">
    <br>
    <p>登録情報確認フォーム


    <div class="col-20 ml-3">
        <table class="table table-striped">
        <tbody>
        <tr>
            <th>お名前</th>
            <th>電話番号</th>
            <th>住所</th>
            <th>メールアドレス</th>
            <th>ethのアカウント</th>
        </tr>
        <?php
        //フォームから受け取った値を変数に代入
        $name=$_POST['firstname'] . $_POST['lastname'];
        $tel=$_POST['tel'];
        $address=$_POST['address'];
        $mail=$_POST['mail'];
        $eth=$_POST['eth'];
            ?>
            <tr>
                <th><?=htmlspecialchars($name)?></th>
                <th><?=htmlspecialchars($tel)?></th>
                <th><?=htmlspecialchars($address)?></th>
                <th><?=htmlspecialchars($mail)?></th>
                <th><?=htmlspecialchars($eth)?></th>
            </tr>
        </tbody>
        </table>
    </div>

    以上の内容でよろしいでしょうか<br>
　　<input type="submit" name="submit" value="登録"><br>

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


        //データベースにinsert
        $sql = "INSERT INTO water_users (name, tel, address, mail, eth) VALUES (:name, :tel, :address, :mail, :eth)";
        $stmh = $pdo->prepare($sql);
        $params = array(':name' => $name, ':tel' => $tel, ':address' => $address, ':mail' => $mail, 'eth' => $eth);
        $stmh->execute($params);
    }

    if(isset($_POST["submit"])) { insert(); }
    ?>

    <a href="waterserver_index.php">戻る</a>
    <footer class="footer">omete_IoT</footer>
</body>
</html>

