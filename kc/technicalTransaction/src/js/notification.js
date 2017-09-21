/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.notificationService = notificationService();

    function notificationService() {
        var notificationService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

            //点击左侧
            $('.main-tab2').click(function () {
                $('.main-tab1').removeClass('selected');
                $('.main-tab2').addClass('selected');
                $('.main-right1').addClass('hide');
                $('.main-right2').removeClass('hide');
            });
            $('.main-tab1').click(function () {
                $('.main-tab1').addClass('selected');
                $('.main-tab2').removeClass('selected');
                $('.main-right1').removeClass('hide');
                $('.main-right2').addClass('hide');
            })

        }


        return notificationService;
    }
})(window, jQuery);
