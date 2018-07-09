$(function(){
	$('#reservButton').on('click', function () {
		var id = $('#id_atelier').val();
		$.post("http://localhost:3012/ateliersPublicsRoute/addReserv",
			{
				id: id
			}, function (result) {
				console.log(result);
			})
	})
});