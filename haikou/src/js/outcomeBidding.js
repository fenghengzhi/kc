/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.outcomeBiddingService = outcomeBiddingService();

    function outcomeBiddingService() {
        var outcomeBiddingService = {};

        $(function () {
            allclick();
            gentPage(1)
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

            //筛选选择更多
            $('.hid').on('click',function(){
                if($('.more').css('display')=='none'){
                    $('.more').css('display','block');
                    $('.hid>i').css('transform','rotateZ(90deg)');
                }else{
                    $('.more').css('display','none');
                    $('.hid>i').css('transform','rotateZ(0deg)');
                }
            })

        }

        //分页器
        function gentPage(current) {
            var config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: 17,
                showNum: 5,
                current: current,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    gentPage(pageNo);
                    console.log(data.id);
                }
            };
            new huPagination(config);
        }


        return outcomeBiddingService;
    }
})(window, jQuery);
