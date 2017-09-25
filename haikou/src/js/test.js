/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.testService = testService();

    function testService() {
        var testService = {};

        $(function () {
            allclick();
            moreFilter ()
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

            //点击筛选项
            $('.filter').on('click','li',function () {
                $(this).addClass('selected').siblings('li').removeClass('selected');
            })

            //点击更多
            $('.filter').on('click','.more-filter',function () {
                if($(this).closest('.filter-line').height()>20){
                    $(this).closest('.filter-line').animate({'height':'16px'},200)
                }else{
                    var h=$(this).siblings('ul').eq(0).height();
                    $(this).closest('.filter-line').animate({'height':h+'px'},200)
                }
            })

        }

        function moreFilter () {
            $('.filter-line').find('ul').each(function (i,e) {
                if($(this).height()>30){
                    $(this).closest('.filter-con').append('<div class="more-filter">更多</div>')
                }
            })
        }


        return testService;
    }
})(window, jQuery);
