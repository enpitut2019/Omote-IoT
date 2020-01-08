<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1">
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
	<header>
		<nav class="navbar navbar-expand-md">
			<div class="px-md-5">
				<a class="navbar-brand" href="/"><img
					src="../images/omotekensuido.png" alt="面研水道"></a>
			</div>
			<button type="button" class="navbar-toggler" data-toggle="collapse"
				data-target="#bs-navi" aria-controls="bs-navi" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="bs-navi">
				<ul class="navbar-nav ml-lg-auto"></ul>
				<ul class="navbar-nav mr-lg-5">
					<div class="px-md-2 px-lg-4 h5">
						<li class="nav-item borderBottom"><a
							class="nav-link" href="../">ホーム</a></li>
					</div>
					<div class="px-md-2 px-lg-4 h5">
						<li class="nav-item borderBottom"><a
							class="nav-link" href="#">使い方</a></li>
					</div>
					<div class="px-md-2 px-lg-4 h5">
						<li class="nav-item borderBottom"><a
							class="nav-link" href="./information_confirm.php">登録情報</a></li>
					</div>
					<div class="px-md-2 px-lg-4 h5">
						<li class="nav-item borderBottom"><a
							class="nav-link" href="./charge.html">入金</a></li>
					</div>
				</ul>
			</div>
		</nav>
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
        $acounteth=$_POST['eth'];
        $password=$_POST['password'];

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

            $name=$_POST['firstname'] . $_POST['lastname'];
            $tel=$_POST['tel'];
            $address=$_POST['address'];
            $mail=$_POST['mail'];
            $acounteth=$_POST['eth'];
            $password=$_POST['password'];

            //データベースにinsert
            $sql = "INSERT INTO water_users ( name, tel, address, mail, eth, password) VALUES (:name,:tel,:address,:mail,:eth,:password)";
            $stmh = $pdo->prepare($sql);
            $params = array(':name' => $name, ':tel' => $tel, ':address' => $address, ':mail' => $mail, ':eth' => $acounteth, ':password' => $password);
            $stmh->execute($params);
            echo "登録されました";
        }

        ?>


        <div class="form-group">
            <label>お名前:</label>
            <input type="text"  class="form-control" value='<?= htmlspecialchars($name) ?>'>
        </div>
        <div class="form-group">
            <label>電話番号</label>
            <input type="text" class="form-control" value='<?= htmlspecialchars($tel) ?>'>
        </div>
        <div class="form-group">
            <label>住所</label>
            <input type="text"  class="form-control" value='<?= htmlspecialchars($address) ?>'>
        </div>
        <div class="form-group">
            <label>メールアドレス</label>
            <input type="text"  class="form-control" value='<?= htmlspecialchars($mail) ?>'>
        </div>
        <div class="form-group">
            <label>ethのアカウント</label>
            <input type="text"  class="form-control" value='<?= htmlspecialchars($acounteth) ?>'>
        </div>
        <div class="form-group">
            <label>パスワード</label>
            <input type="text"  class="form-control" value='<?= htmlspecialchars($password) ?>'>
        </div>

        以上の内容でよろしいでしょうか<br>
    </div>
</div>
	<footer>
		<div class="bottom section-padding">
			<div class="container">
				<div class="row">
					<div class="col-6 col-md-3 mx-auto">
						<a class="navbar-brand"
							href="http://www.risk.tsukuba.ac.jp/omote-lab/"><img
							src="../images/omotelab-tsukuba-2.png" class="img-fluid"
							alt="omotelab"></a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</body>
</html>
