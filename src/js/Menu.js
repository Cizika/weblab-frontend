import $ from 'jquery';

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });


    $(document).ready(function () {

        $('#sidebarClose').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    
    });

    $(document).ready(function() {
        console.log(document.cookie)
        let cookie = document.cookie

        if(cookie.includes('token')) {
           
            $('#inputPesquisar').toggleClass('d-none')
            $('#botaoPesquisa').toggleClass('d-none')
            $('#menuSessao').toggleClass('d-none')
            $('#btnCurso').toggleClass('d-none')
            $('#menuVisitante').toggleClass('d-none')
            $('#bemvindoUser').toggleClass('d-none')
        }
    })
});