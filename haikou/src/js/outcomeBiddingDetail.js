/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.outcomeBiddingDetailService = outcomeBiddingDetailService();

    function outcomeBiddingDetailService() {
        var outcomeBiddingDetailService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

            //点击tab
            $('.tab-title').on('click','span',function () {
                $('.'+$(this).attr("id")).show().siblings('.tab-box').hide();


            })

        }


        return outcomeBiddingDetailService;
    }
})(window, jQuery);
