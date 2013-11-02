<?php
require_once 'class_imgshow.php';

$img = new imgshow();

echo $img->name('currency')->p('source','yql')->load();
?>