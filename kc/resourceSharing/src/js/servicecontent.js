/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.servicecontentService = servicecontentService();

    function servicecontentService() {
        var servicecontentService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            flatpickr("#timer", {locale: "zh"});

            $('.next-step').click(function () {
                commonService.checkData($('.form'));
            });

            $(".main-bg .form .next-step").on("click",function () {
                var data = huForm.getFormData($('.form'));
                console.log(data)
            })

        }


        return servicecontentService;
    }
})(window, jQuery);
