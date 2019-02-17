<?php REQUIRE_ONCE('koneksi.php');
 for($i = 1; $i <= 20; $i++) {
    ${'QUERY'.$i} = MYSQLI_QUERY($conn,"SELECT * FROM club WHERE id = $i");
    ${'club'.$i} = new stdClass;
    ${'row'.$i} = MYSQLI_FETCH_ASSOC(${'QUERY'.$i});
    ${'club'.$i}-> id = ${'row'.$i}['id'];
    ${'club'.$i}-> nama = ${'row'.$i}['nama'];
    $array[] = ${'club'.$i};
 }
 header('Content-Type:application/json;charset=utf-8');
 ECHO JSON_ENCODE($array);
 MYSQLI_CLOSE($conn);
 ?>
