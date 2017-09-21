/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.serviceService = serviceService();

    function serviceService() {
        var serviceService = {};

        $(function () {
            allclick();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $('#next-step').on('click',function () {
                var data = huForm.getFormData($('#form'));
                // console.log(data);
                var b = commonService.checkData($('.onepage .form'));
                if(b){
                    $(".onepage").hide();
                    $(".twopage").show();
                }

            });
            $(".twopage .form .back").on("click",function () {
                $(".twopage").hide();
                $(".onepage").show();
            });
            $('.twopage .modal-add').click(function () {
                var a={
                    content: $('#myModal'),
                    title:'机构资质表',
                    area: ['660px', '500px'],
                    shade:false,
                    scrollbar:false
                };
                toastr.box(a)
            });
            flatpickr("#timer", {locale: "zh"});

            $(".twopage #close").click(function () {

                console.log($('#myModal').find('input[oneof2]'));

                var cls = commonService.checkData($('#myModal'));
                // console.log(123);
                if(cls){
                    layer.closeAll();
                }

            })

            $(".twopage .form .next-step").on("click",function () {
                var data = huForm.getFormData($('.main-bg'));
                console.log(data)
            })

        }


        return serviceService;
    }
})(window, jQuery);
