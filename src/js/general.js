$(document).ready(function () {

    function TCanvas() {
        // event.preventDefault();
        // alert( "clicked" );
        $('#canvas').toggleClass("open");
    }

    $("#OpenCanvas").on("click", TCanvas);
    $("#CloseCanvas").on("click", TCanvas);

});