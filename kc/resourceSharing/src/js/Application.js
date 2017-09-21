/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.ApplicationService = ApplicationService();

    function ApplicationService() {
        var ApplicationService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });
            $('.next-step').click(function () {
                
                
                commonService.checkData($('.form'));
            });
            $(".main-bg .form .next-step").on("click",function () {
                var data = huForm.getFormData($('.form'));
                console.log(data)
            });


        }
        return ApplicationService;
    }
})(window, jQuery);
