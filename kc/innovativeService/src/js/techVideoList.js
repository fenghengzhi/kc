/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.techVideoListService = techVideoListService();

    function techVideoListService() {
        var techVideoListService = {};

        $(function () {
            (function gentPage4(current) {
                var config4 = {
                    data: {
                        id: 4
                    },
                    selector: '#page-1',
                    total: 17,
                    showNum: 5,
                    current: current,
                    prevNextEnable: false,
                    prevNextMultiEnable: true,
                    startEndEnable: true,
                    callback: function (event, pageNo, data) {
                        gentPage4(pageNo);
                        console.log(data.id);
                    }
                };
                new huPagination(config4);
            })(5);
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }


        return techVideoListService;
    }
})(window, jQuery);
