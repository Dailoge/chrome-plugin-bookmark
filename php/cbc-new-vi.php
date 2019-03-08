<?php
    $iv = "eAL6lHy4%2FFjkKpcDadn5KQ%3D%3D";
    $iv = urldecode($iv);
    $iv = base64_decode($iv);
    $block_wrong = "wQsuy/K2m7n4Hi1sabFINzM6IjExMSI7fQ==";
    $block_wrong = base64_decode($block_wrong);
    $block_right = "a:1:{s:2:\"id\";s:";
    for ($i = 0; $i < 16; $i++) {
        $iv[$i] = chr(ord($block_wrong[$i]) ^ ord($iv[$i]) ^ ord($block_right[$i]));
    }
    $iv = base64_encode($iv);
    $iv = urlencode($iv);
    echo "$iv\n";
?>