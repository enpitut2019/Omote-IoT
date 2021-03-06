<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <link href="../styles/bootstrap.css" rel="stylesheet">
    <script src="../scripts/bootstrap.bundle.js"></script>
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
							class="nav-link" href="../htmls/information_confirm.html">登録情報</a></li>
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
	<h3 class="text-center">登録情報</h3>
	<br>
	<div class="mx-auto bdr-info">
		<div class="border border-dark rounded p-4">

        <?php
        try {
            // データベースへ接続
            $dbinfo = parse_url(getenv('DATABASE_URL'));
            $dsn = 'pgsql:host=' . $dbinfo['host'] . ';dbname=' . substr($dbinfo['path'], 1);
            $pdo = new PDO($dsn, $dbinfo['user'], $dbinfo['pass']);
        } catch (PDOException $e) {
            print('Error:' . $e->getMessage());
            die();
        }
            $sql = "SELECT name,tel,address,mail,eth,password,contractaddress FROM water_users where eth=:eth";
            $stmh = $pdo->prepare($sql);
            $stmh->execute(array(":eth" => $_POST['eth']));
            $rows=$stmh->fetch();
            if($rows['password'] != $_POST['password']){
                echo  '<div class="text-danger">', 'パスワードが違います', '</div><br>';
                $rows=array();
            }
        ?>
	        <table>
	            <tbody>
                    <div class="form-group">
                        <label>名前:</label><br>
                        <input type="text" readonly class="form-control" value='<?= htmlspecialchars($rows['name']) ?>'>
                    </div>
                    <div class="form-group">
                        <label>電話番号</label><br>
                        <input type="text" readonly class="form-control" value='<?= htmlspecialchars($rows['tel']) ?>'>
                    </div>
                    <div class="form-group">
                        <label>住所</label><br>
                        <input type="text" readonly class="form-control" value='<?= htmlspecialchars($rows['address']) ?>'>
                    </div>
                    <div class="form-group">
                        <label>メールアドレス</label><br>
                        <input type="text" readonly class="form-control" value='<?= htmlspecialchars($rows['mail']) ?>'>
                    </div>
                    <div class="form-group">
                        <label>ethのアカウント</label><br>
                        <input type="text" readonly class="form-control" value='<?= htmlspecialchars($rows['eth']) ?>'>
                    </div>
	                <div class="form-group">
	                    <label>パスワード</label><br>
	                    <input type="password" readonly class="form-control" value='<?= htmlspecialchars($rows['password']) ?>'>
	                </div>
	                <div class="form-group">
	                    <label>コントラクトアドレス</label><br>
						<input type="text" readonly class="form-control" value='<?= htmlspecialchars($rows['contractaddress']) ?>'>
	                </div>
	            </tbody>
	        </table>
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
