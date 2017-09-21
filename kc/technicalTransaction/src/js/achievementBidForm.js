/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.achievementBidFormService = achievementBidFormService();

    function achievementBidFormService() {
        var achievementBidFormService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        achievementBidFormService.showpage = function (pagenum, currentpage) {
            // console.log(commonService.checkData($('.main-form' + currentpage)))
            if (commonService.checkData($('.main-form' + currentpage))){
                $('.main-form').addClass('hide');
                var willshowpage = $('.main-form' + pagenum);
                willshowpage.removeClass('hide');
                // $('.tradingProcess-top').attr('step', pagenum);
                if ($(window).scrollTop() > willshowpage.offset().top) {
                    $(window).scrollTop(willshowpage.offset().top)
                }
            }
        }


        return achievementBidFormService;
    }
})(window, jQuery);
