/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.technicalliteratureService = technicalliteratureService();

    function technicalliteratureService() {
        var technicalliteratureService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }


        return technicalliteratureService;
    }
})(window, jQuery);
