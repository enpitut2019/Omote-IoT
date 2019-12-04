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
    <div id="networkid"></div>
    <div id="accounts"></div>
    <br>
    <p>個人情報登録フォーム
    <p>登録情報を入力してください

　　<div class="userdata">
        <form method="POST" action="regist_conform.php">
        <label class="mt-4">名前：</label><br>
      <input type="text" name="lastname" class="lastname" required>
       <input type="text" name="firstname" class="firstname" required><br>
      <label class="mt-4">電話番号：</label><br>
      <input type="text" name="tel" class="tel" required><br>
      <label class="mt-4">住所：</label><br>
      <input type="text" name="address" class="address" required><br>
      <label class="mt-4">メールアドレス：</label><br>
      <input type="text" name="mail" class="mail" required><br>
      <label class="mt-4">ethのアカウント：</label><br>
      <input type="text" name="eth" class="eth" required><br>
      <input type="submit" name="submit" value="確認"><br>
    </div>

    <a href="index.html">使用量確認ページはこちら</a>
    <footer class="footer">omete_IoT</footer>
</body>
</html>
