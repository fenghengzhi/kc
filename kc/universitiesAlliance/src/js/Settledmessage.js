/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.SettledmessageService = SettledmessageService();

    function SettledmessageService() {
        var SettledmessageService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

          

            $('#tijiao').on('click',function () {
                // var data = huForm.getFormData($('#form'));
                // console.log(data);
                var b= commonService.checkData($('#form'));
                if(b){
                    var a={
                        content: $('#myModal')
                    };
                    toastr.box(a)
                }

                var data = huForm.getFormData($('#form'));
                console.log(data)

            });
            flatpickr("#timer", {locale: "zh"});
            
            
        }


        return SettledmessageService;
    }
})(window, jQuery);
