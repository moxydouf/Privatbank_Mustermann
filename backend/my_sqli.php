<?php
if(function_exists('mysqli_connect')) {
    echo "MySQLi extension is enabled";
} else {
    echo "MySQLi extention is not enabled";
}
?>