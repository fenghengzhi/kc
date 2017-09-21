/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.investServicePublishService = investServicePublishService();

    function investServicePublishService() {
        var investServicePublishService = {};

        $(function () {
            allclick();
            // getData()
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $('#btn').on('click', function () {
                var data = huForm.getFormData($('#main-part2-form'));
                var bean = JSON.stringify(data);
                getData(bean)
                var b= commonService.checkData($('#main-part2-form'));
                if(b){
                    var a={
                        content: $('#myModal')
                    };
                    toastr.box(a)
                }
            });

        }

        function getData(bean) {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'innovative/add/competition',
                that: $('.main')[0],
                urlData: {},
                postData: {
                    bean
                },
                success: function (data) {
                
                }
            })
        }


        return investServicePublishService;
    }
})(window, jQuery);
