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
    $sql = "SELECT name,contractAddress FROM water_users where eth=:eth";
    $stmh = $pdo->prepare($sql);
    $stmh->execute(array(":eth" => $_POST['eth']));
    $rows=$stmh->fetch();
    if($rows['password'] != $_POST['password']){
        echo  '<div class="text-danger">', 'パスワードが違います', '</div><br>';
        $rows=array();
    }
    $sample ='abc';
?>

<script type="text/javascript">var name='<?php echo $sample; ?>';</script>
<!-- <script type="text/javascript" src="../scripts/common.js"></script> -->

