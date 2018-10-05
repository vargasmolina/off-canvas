$(document).ready(function () {

    $("#Open").click(function () {
        // event.preventDefault();
        // alert(this);
        $('.canvas').toggleClass("open");
        $('.cuerpo').toggleClass("abajo");
    });

});