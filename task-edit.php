<?php

include 'database.php';

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];

$query = "UPDATE tareas SET name='$name', description='$description' WHERE id = '$id'";
$result = mysqli_query($connection, $query);


	if (!$result) {
		die("ERRON EN LA CONSULTA");
	}


	echo "editado con éxito";



