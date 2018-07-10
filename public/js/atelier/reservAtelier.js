$(function(){
	// requete ajax permetant d'incrementer le nombree de place reserver
	$('.reservButton').on('click', function () {
		var id = $(this).data('id');
		console.log(id);
		$.post("http://localhost:3012/ateliersPublicsRoute/addReserv",
			{
				id: id
			}, function (result) {
				console.log(result);
			}
		)
	})
});