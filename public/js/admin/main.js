$(function(){
    console.log(window.location.pathname);
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


});