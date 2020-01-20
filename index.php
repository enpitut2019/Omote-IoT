<!DOCTYPE html>
<html>
<head>
<title>水道管理アプリ</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="initial-scale=1">
<script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
<link href="styles/bootstrap.css" rel="stylesheet">
<script src="scripts/bootstrap.bundle.js"></script>
<link href="styles/common.css" rel="stylesheet">
<script src="scripts/common.js"></script>
<script src="scripts/index.js"></script>
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
							class="nav-link" href="/">ホーム</a></li>
					</div>
					<div class="px-md-2 px-lg-4 h5">
						<li class="nav-item borderBottom"><a
							class="nav-link" href="htmls/howto.html">使い方</a></li>
					</div>
					<div class="px-md-2 px-lg-4 h5">
						<li class="nav-item borderBottom"><a
							class="nav-link" href="htmls/information_confirm.php">登録情報</a></li>
					</div>
					<div class="px-md-2 px-lg-4 h5">
						<li class="nav-item borderBottom"><a
							class="nav-link" href="htmls/charge.html">入金</a></li>
					</div>
				</ul>
			</div>
		</nav>
	</header>
	<div class="p-3">
			<br>
			<div class="h3 text-center text-danger" id='onWorking'></div>
			<br>
			<p class="h3 text-center">使用履歴</p>
			<div class="mx-auto list-width">
				<div class="text-right px-3">
					<a href="htmls/historyList.html">全期間</a>
				</div>
				<table class="table table-bordered" id="histTable">
					<thead class="thead-light">
						<tr>
							<th class="align-middle">月</th>
							<th class="align-middle">使用量</th>
							<th>
								<div class="container">
									<div class="row">
										<div class="col d-flex align-items-center" id='unit'>料金(JPY)</div>
										<div class="col d-flex flex-row-reverse">
											<button type="button" class="float-right btn btn-secondary btn-sm"
												onclick="convertEthToJpy()">切替</button>
										</div>
									</div>
								</div>
							</th>
						</tr>
					</thead>
					<tbody id="tbodyID">
						<tr>
							<td>先月</td>
							<td id="amount1"></td>
							<td id="charge1"></td>
						</tr>
						<tr>
							<td>先々月</td>
							<td id="amount2"></td>
							<td id="charge2"></td>
						</tr>
						<tr>
							<td>3ヶ月前</td>
							<td id="amount3"></td>
							<td id="charge3"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<br> <br>
			<div class="mx-auto list-width">
				<canvas id="ex_chart"></canvas>
			</div>
			<br> <br> <br>
			<div class="border border-dark rounded py-3 bdr-charge mx-auto">
				<div class="text-center">
					<div class="h5">
						現在の残高
						<button type="button" class="btn btn-secondary rounded-pill btn-sm"
							onclick="convertEthToJpyWal()">切替</button>
					</div>
					<p class="h2 py-2" id="balance"></p>
					<p class="h5">
						<a href="htmls/charge.html">入金(チャージ)→</a>
					</p>
				</div>
			</div>
		<a href="htmls/regist_form.php">登録ページはこちら</a>
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
