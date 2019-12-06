<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <link href="./server.css" rel="stylesheet">
    <link href="css/registpage.css" rel="stylesheet">
    <script src="js/bootstrap.bundle.js"></script>
    <link href="css/bootstrap.css" rel="stylesheet">
    <script src="./serverindex.js"></script>
    <script src="js/main1.js"></script>
</head>
<body>
<header class="head">
    <h1><b>水道自動決済アプリケーション管理ページ</h1>
</header>
<div class="main">
    <div class="mx-auto" style="width: 600px;">
        <br>
        <h2>登録情報確認フォーム</h2>

        <?php
        //フォームから受け取った値を変数に代入
        $name=$_POST['firstname'] . $_POST['lastname'];
        $tel=$_POST['tel'];
        $address=$_POST['address'];
        $mail=$_POST['mail'];
        $eth=$_POST['eth'];
        ?>


        <div class="form-group">
            <label>お名前:</label>
            <input type="text" readonly class="form-control" value='<?= htmlspecialchars($name) ?>'>
        </div>
        <div class="form-group">
            <label>電話番号</label>
            <input type="text" readonly class="form-control" value='<?= htmlspecialchars($tel) ?>'>
        </div>
        <div class="form-group">
            <label>住所</label>
            <input type="text" readonly class="form-control" value='<?= htmlspecialchars($address) ?>'>
        </div>
        <div class="form-group">
            <label>メールアドレス</label>
            <input type="text" readonly class="form-control" value='<?= htmlspecialchars($mail) ?>'>
        </div>
        <div class="form-group">
            <label>ethのアカウント</label>
            <input type="text" readonly class="form-control" value='<?= htmlspecialchars($eth) ?>'>
        </div>

        以上の内容でよろしいでしょうか<br>
        <div class="rebutton">
            　　<button type="submit" name="submit" class="btn btn-primary">登録</button><br>
        </div>

        <?php
        /*
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

        if(isset($_POST["submit"])) { insert(); }*/
        ?>

    </div>
</div>
<a href="waterserver_index.php">戻る</a>
<footer class="footer">omete_IoT</footer>
</body>
</html>

