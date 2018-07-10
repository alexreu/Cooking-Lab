$(function(){
	$('#editAtelier').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var title = button.data('titre');
		var description = button.data('description');
		var placesDispo = button.data('placesd');
		var duree = button.data('duree');
		var date = button.data('date');
		var time = button.data('time');
		var prix = button.data('prix');
		var id = button.data('id');
		var img = button.data('img');

		var modal = $(this);

		modal.find('#titre').val(title);
		modal.find('#description').val(description);
		modal.find('#nb_place_disp').val(placesDispo);
		modal.find('#duree').val(duree);
		modal.find('#date').val(date);
		modal.find('#time').val(time);
		modal.find('#prix').val(prix);
		modal.find('#idAtelier').val(id);
		modal.find('#currentImg').val(img);
	})
});