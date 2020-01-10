<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
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
            <label>お名前:</label>
            <input type="text" name="name"  class="form-control" value='<?= htmlspecialchars($_POST['firstname'] . $_POST['lastname']) ?>'>
        </div>
        <div class="form-group">
            <label>電話番号</label>
            <input type="text" name="tel" class="form-control" value='<?= htmlspecialchars($_POST['tel']) ?>'>
        </div>
        <div class="form-group">
            <label>住所</label>
            <input type="text" name="address"  class="form-control" value='<?= htmlspecialchars($_POST['address']) ?>'>
        </div>
        <div class="form-group">
            <label>メールアドレス</label>
            <input type="text" name="mail" class="form-control" value='<?= htmlspecialchars($_POST['mail']) ?>'>
        </div>
        <div class="form-group">
            <label>ethのアカウント</label>
            <input type="text" name="eth" class="form-control" value='<?= htmlspecialchars($_POST['eth']) ?>'>
        </div>
        <div class="form-group">
            <label>パスワード</label>
            <input type="text" name="password" class="form-control" value='<?= htmlspecialchars($_POST['password']) ?>'>
        </div>
        以上の内容でよろしいでしょうか<br>
        <div class="conf-button">
            <button name="submit" type="submit" class="btn btn-primary">登録</button>
            <br>
        </div>
    </form>
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
