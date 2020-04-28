<?php

include 'database.php';

if (isset($_POST['name'])) {
	$name = isset($_POST['name']) ? mysqli_real_escape_string($connection, $_POST['name']): false;
	$description =  isset($_POST['description']) ? mysqli_real_escape_string($connection, $_POST['description']): false;
	
	$query = "INSERT INTO tareas(name, description) VALUES('$name', '$description')";
	$result = mysqli_query($connection, $query);

	if (!$result) {
		die("ERROR EN LA CONSULTA");
	}

	echo "Tarea agregada satisfactoriamente";

}

