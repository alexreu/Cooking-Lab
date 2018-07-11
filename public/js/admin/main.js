$(function(){

    var path = window.location.pathname;
    if(path == "/admin/index"){
        $('#accueil').addClass("active");
    }else if (path == "/admin/user"){
        $('#utilisateur').addClass('active');
    }else if (path == "/admin/atelier"){
        $('#atelier').addClass('active');
    }else if (path == "/admin/create"){
        $('#ajoutAdmin').addClass('active');
    }

    $('.delAffect').on('click', function () {
        var id = $(this).data('id');
        console.log(id);
        $.post("/admin/delAffect",
            {
                id: id
            }, function (result) {
                console.log(result);
	        }
            )
    })

});