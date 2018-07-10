$(function(){
    $('#editUser').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var nom = button.data('nom');
        var prenom = button.data('prenom');
        var telephone = button.data('telephone');
        var role = button.data('role');
        console.log(id);

        var modal = $(this);

        modal.find('#nom').val(nom);
        modal.find('#prenom').val(prenom);
        modal.find('#telephone').val(telephone);
        modal.find('#role').val(role);
        modal.find('#id').val(id);
    })
});