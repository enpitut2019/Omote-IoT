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
//     $sql = "SELECT contractAddress FROM water_users where eth=:eth";
    $sql = "SELECT name FROM water_users where eth=:eth";
    $stmh = $pdo->prepare($sql);
    $stmh->execute(array(":eth" => $_POST['eth']));
    $rows=$stmh->fetch();
    echo $rows['name'] + "A";
?>

<script type="text/javascript">
var name1='<?php echo $rows['name']; ?>';
console.log(name1 + "B");
</script>
<!-- <script type="text/javascript" src="../scripts/common.js"></script> -->

