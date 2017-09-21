/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.planPublishService = planPublishService();

    function planPublishService() {
        var planPublishService = {};

        $(function () {
            allclick();
            //tag添加
            $('#tag-input').keypress(function (event) {
                // window.test=this;
                if (event.keyCode === 13) {
                    if (this.value.indexOf('>') >= 0 || this.value.indexOf('<') >= 0) {
                        toastr.info('非法字符');
                        return;
                    }
                    var tags = $('#tag-container>div[name=tag]');
                    var _this = this;
                    if (tags.filter(function () {
                            return (this.innerText === _this.value)
                        }).length > 0) {
                        toastr.info('已有标签');
                        return;
                    }
                    $('#tag-container').append(`<div class="hu-tag tag-primary tag-action" hu-data-type="array" hu-data-container name="tag"><span hu-data-item="">${this.value}</span><i class="close"></i></div>`);
                    this.value = '';
                }
            });
            //推送对象
            $('.push-targets').on('click', '.push-target', function () {
                $(this).toggleClass('selected');
            });
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });$('#btn').on('click', function () {
                var data = huForm.getFormData($('.main'));
                var bean = JSON.stringify(data);
                getData(bean)
            });
        }

        function getData(bean) {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/add/require',
                that: $('.main')[0],
                urlData: {},
                postData: {
                    bean
                },
                success: function (data) {

                }
            })
        }

        planPublishService.showpage = function (pagenum,currentpage) {
            if(commonService.checkData($('.main-form' + currentpage))){
                $('.main-form').addClass('hide');
                var willshowpage = $('.main-form' + pagenum);
                willshowpage.removeClass('hide');
                $('.tradingProcess-top').attr('step', pagenum);
                if ($(window).scrollTop() > willshowpage.offset().top) {
                    $(window).scrollTop(willshowpage.offset().top)
                }
            }
        };

        return planPublishService;
    }
})(window, jQuery);
