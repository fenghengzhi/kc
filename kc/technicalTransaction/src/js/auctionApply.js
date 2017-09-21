/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.auctionApplyService = auctionApplyService();

    function auctionApplyService() {
        var auctionApplyService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })
            
            //点击提交
            $('#submit').click(function () {

                commonService.checkData($('.main-form'));
                if(!$('.layui-layer-content').length){
                    var data=huForm.getFormData($('.main-form'))
                    console.log(data);
                    alert(JSON.stringify(data));
                }
            })
        }
        



        return auctionApplyService;
    }
})(window, jQuery);
