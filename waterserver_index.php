<!DOCTYPE html>
<html>
<head>
    <title>水道管理アプリ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <link href="./server.css" rel="stylesheet">
    <script src="js/bootstrap.bundle.js"></script>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/waterserver_index.css" rel="stylesheet">
    <script src="./serverindex.js"></script>
    <script src="js/main1.js"></script>
</head>
<body>
<header class="head">
    <h1><b>水道自動決済アプリケーション管理ページ</h1>
</header>
<div class="main">
    <div class="mx-auto" style="width: 600px;">
        <div id="networkid"></div>
        <div id="accounts"></div>
        <br>
        <h2>個人情報登録フォーム</h2>
        <h2>登録情報を入力してください</h2>

        <div class="border rounded">
            <div class="userdata form-group">
                <form method="POST" action="regist_conform.php">
                    <label class="mt-4">名前：</label><br>
                    <input type="text" name="lastname" class="lastname form-control" required>
                    <input type="text" name="firstname" class="firstname form-control" required><br>
                    <label class="mt-4">電話番号：</label><br>
                    <input type="text" name="tel" class="tel form-control" required><br>
                    <label class="mt-4">住所：</label><br>
                    <input type="text" name="address" class="address form-control" required><br>
                    <label class="mt-4">メールアドレス：</label><br>
                    <input type="text" name="mail" class="mail form-control" required><br>
                    <label class="mt-4">ethのアカウント：</label><br>
                    <input type="text" name="eth" class="eth form-control" required><br>
                    <div class="conf-button">
                        <button type="submit" name="submit" class="btn btn-primary">確認</button>
                        <br>
                    </div>
                </form>
            </div>
        </div>

        <a href="index.html">使用量確認ページはこちら</a>
        <footer class="footer">omete_IoT</footer>
</body>
</html>
