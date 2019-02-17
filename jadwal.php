<?php REQUIRE_ONCE('koneksi.php');
 for($i = 1; $i <= 380; $i++) {
    ${'QUERY'.$i} = MYSQLI_QUERY($conn,"SELECT * FROM jadwal WHERE id = $i");
    ${'jadwal'.$i} = new stdClass;
    ${'row'.$i} = MYSQLI_FETCH_ASSOC(${'QUERY'.$i});
    ${'jadwal'.$i}-> id = ${'row'.$i}['id'];
    ${'jadwal'.$i}-> week = ${'row'.$i}['week'];
    ${'jadwal'.$i}-> date = ${'row'.$i}['date'];
    ${'jadwal'.$i}-> home = ${'row'.$i}['home'];
    ${'jadwal'.$i}-> away = ${'row'.$i}['away'];
    $array[] = ${'jadwal'.$i};
 }
 header('Content-Type:application/json;charset=utf-8');
 ECHO JSON_ENCODE($array);
 MYSQLI_CLOSE($conn);
 ?>
