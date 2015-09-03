// 1. Style service
recordCtrlApp.service('StyleService', function() {
    this.StartupCss = function () {
        $("li").click(function(){
            $("li").css('background-color', 'white');
            $("li").css('color','black');
            $(this).css('background-color', 'rgb(247, 7, 25)');
            $(this).css('color', 'white');
        });
        $("#add_data_btn").click(function(){
            $("footer").css('position', 'relative');
        });
        $("#list_data_btn").click(function(){
            $("footer").css('position', 'fixed');
        });
        $(".edit_btn").click(function(){
            $("footer").css('position', 'relative');
        });
    }
    this.footerStyle = function () {
        $("footer").css('position', 'fixed');
        $("#add_data_btn").css('background-color', 'white');
        $("#add_data_btn").css('color', 'black');
        }
});