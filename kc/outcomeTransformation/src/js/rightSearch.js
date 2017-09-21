/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.rightSearchService = rightSearchService();

    function rightSearchService() {
        var rightSearchService = {};

        $(function () {
            allclick();
            $('.carousel').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay:true
            });
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }


        return rightSearchService;
    }
})(window, jQuery);
