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

    ?>

	    <form method="POST" action="regist.php">
	        <div class="form-group">
	            <label>氏名:</label>
	            <input type="text" name="name" class="form-control" value='<?= htmlspecialchars($_POST['firstname'] . $_POST['lastname']) ?>' readonly>
	        </div>
	        <div class="form-group">
	            <label>電話番号</label>
	            <input type="text" name="tel" class="form-control" value='<?= htmlspecialchars($_POST['tel']) ?>' readonly>
	        </div>
	        <div class="form-group">
	            <label>住所</label>
	            <input type="text" name="address" class="form-control" value='<?= htmlspecialchars($_POST['address']) ?>' readonly>
	        </div>
	        <div class="form-group">
	            <label>メールアドレス</label>
	            <input type="text" name="mail" class="form-control" value='<?= htmlspecialchars($_POST['mail']) ?>' readonly>
	        </div>
	        <div class="form-group">
	            <label>ethのアカウント</label>
	            <input type="text" name="eth" class="form-control" value='<?= htmlspecialchars($_POST['eth']) ?>' readonly>
	        </div>
	        <div class="form-group">
	            <label>パスワード</label>
	            <input type="password" name="password" class="form-control" value='<?= htmlspecialchars($_POST['password']) ?>' readonly>
	        </div>
	        <p>以上の内容で登録します</p><br>
			<div class="text-center">
				<div class="container">
					<div class="row">
						<div class="col">
							<button type="button" onclick="history.back()" name="submit" class="btn btn-secondary">戻る</button>
						</div>
						<div class="col">
							<button type="submit" name="submit" class="btn btn-primary">登録</button>
						</div>
					</div>
				</div>
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
