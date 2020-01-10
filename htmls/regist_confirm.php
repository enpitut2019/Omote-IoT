<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
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
							class="nav-link" href="./howto.html">使い方</a></li>
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
	<br><br><br>
	<h3 class="text-center">登録情報確認フォーム</h3>
	<br>
	<div class="mx-auto bdr-info">
		<div class="border border-dark rounded p-4">
        <br>

	    <?

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

        //フォームから受け取った値を変数に代入
        //$name=$_POST['firstname'] . $_POST['lastname'];
        global $tel;	        $tel=$_POST['tel'];
        global $address;	        $address=$_POST['address'];
        global $mail;	        $mail=$_POST['mail'];
        global $acounteth;	        $acounteth=$_POST['eth'];
        global $password;	        $password=$_POST['password'];
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


	    <form method="POST" action="">
	        <div class="form-group">
	            <label>お名前:</label>
	            <input type="text"  class="form-control" value='<?= htmlspecialchars($_POST['firstname'] . $_POST['lastname']) ?>'>
	        </div>
	        <div class="form-group">
	            <label>電話番号</label>
	            <input type="text" class="form-control" value='<?= htmlspecialchars($_POST['tel']) ?>'>
	        </div>
	        <div class="form-group">
	            <label>住所</label>
	            <input type="text"  class="form-control" value='<?= htmlspecialchars($_POST['address']) ?>'>
	        </div>
	        <div class="form-group">
	            <label>メールアドレス</label>
	            <input type="text"  class="form-control" value='<?= htmlspecialchars($_POST['mail']) ?>'>
	        </div>
	        <div class="form-group">
	            <label>ethのアカウント</label>
	            <input type="text"  class="form-control" value='<?= htmlspecialchars($_POST['eth']) ?>'>
	        </div>
	        <div class="form-group">
	            <label>パスワード</label>
	            <input type="password"  class="form-control" value='<?= htmlspecialchars($_POST['password']) ?>'>
	        </div>
	        <p>以上の内容で登録します</p><br>
			<div class="text-center">
				<button type="submit" name="submit" class="btn btn-primary">登録</button>
			</div>
	    </form>
	    </div>
    </div>
    <br>
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