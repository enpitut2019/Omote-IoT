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
$sql = "SELECT contractaddress FROM water_users where eth=:eth";
$stmh = $pdo->prepare($sql);
$stmh->execute(array(":eth" => $_POST['eth']));
$rows=$stmh->fetch();

$result = $rows['contractaddress'];
echo $result;
exit;
?>
