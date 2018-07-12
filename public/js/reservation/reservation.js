$(function(){
	// requete ajax permetant de décrémenter le nombree de places reserver
	$('.delReserv').on('click', function () {
		var id = $(this).data('id');
		console.log(id);
		$.post("/reservationsRoute/delReserv",
			{
				id: id
			}, function (result) {
				console.log(result);
			}
		)
	})
});