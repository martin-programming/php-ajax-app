$(function() {

 let edit = false;

 $('#task-result').hide();
 obtenerTareas();

  
  //BUSCAR TAREAS
  $('#search').keyup(function(e) {

  	  if ($('#search').val()) {
	  	  	let search = $('#search').val();
	  	  	$.ajax({
	  	  	url:'task-search.php',
	  	  	type:'POST',
	  	  	data:{ search },
	  	  	success: function(response){
	  	  		let tareas = JSON.parse(response);
	            let template = "";

	  	  		tareas.forEach(tarea => {
	                template +=`<li>
	                   ${tarea.name}
	                </li>`
	  	  		});

	  	  		$('#container').html(template);
	  	  		$('#task-result').show();
	  	  	}
	  	  })
  	  }

  });

  //FORMULARIO
  $('#task-form').submit(function(e) {
  	const enviarDatos = {
  		name: $('#name').val(),
  		description:$('#description').val(),
  		id: $('#tareaId').val()
  	};

  	let url = edit === false ? 'task-add.php' : 'task-edit.php';
  	console.log(url);
  	
  	$.post(url, enviarDatos, function(response) {
  		console.log(response);
  		obtenerTareas();
  		$('#task-form').trigger('reset');
  	});

  	e.preventDefault();
  });

  //LISTAR TAREAS
  function obtenerTareas() {
	  	$.ajax({
	  	url:('task-list.php'),
	    type:'GET',
	    success: function(response) {
	    	let tareas = JSON.parse(response);
	    	let template = "";

	    	tareas.forEach(tarea => {
	             template +=`
	                 <tr tareaId="${tarea.id}">
	                   <td>${tarea.id}</td>
	                   <td>
                          <a href="#" class="editar-tarea">${tarea.name}</a>
	                   </td>
	                   <td>${tarea.description}</td>
	                   <td>
                         <button class="eliminar-tarea btn btn-danger btn-sm">
                            borrar
                         </button>
	                   </td>
	                 </tr>
	             `
	    	});
	    	//INSERTAR LA PLANTILLA
	    	$('#tasks').html(template);
	    }
	  })
  }


   $(document).on('click', '.eliminar-tarea', function(){
   	  if (confirm('Estás seguro de querer eliminar esta tarea')) {
   		 //OBTENER FILA DEL BOTON CLICKEADO
	     let elemento = $(this)[0].parentElement.parentElement;
	     //OBTENER SU ID ATRAVES DE UN ARTIBUTO
	     let id = $(elemento).attr('tareaId');
	     $.post('task-delete.php', {id}, function(response) {
	        obtenerTareas();
	     });
   	  }
   })


   $(document).on('click', '.editar-tarea', function(){
   	 let elemento = $(this)[0].parentElement.parentElement;
   	 let id = $(elemento).attr('tareaId');
   	 $.post('task-single.php', {id}, function(response) {
         const tarea = JSON.parse(response);
         $('#name').val(tarea.name);
         $('#description').val(tarea.description);
         $('#tareaId').val(tarea.id);
         edit = true;
   	 })
   });

});