/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.quoteService = quoteService();
    function quoteService() {
        var quoteService = {};

        quoteService.id = commonService.getSearchParm('id');

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $(".click-btn .btn1").on("click", function () {
                $(".tab-pane .tab-con .tb1").show().siblings().hide();
                $(".click-btn .btn1").addClass("active1");
                $(".click-btn .btn2").removeClass("active1");
            });
            $(".click-btn .btn2").on("click", function () {
                $(".tab-pane .tab-con .tb2").show().siblings().hide();
                $(".click-btn .btn2").addClass("active1");
                $(".click-btn .btn1").removeClass("active1");
            })

        }

        function getData() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL2 + 'patent/get',
                that: $('.main')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    id: quoteService.id
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        console.log(data);
                        var data = data.rsData[0].patent;
                        console.log(data);
                        var html='';
                        // for(var i = 0;i < data.length;i++){
                            html += `
                                    <tr>
                                        <td>未授权</td>
                                        <td>${data.application_number}${data.application_date}</td>
                                        <td>US6280928B1 20010828</td>
                                        <td>${data.title.original}</td>
                                        <td>${data.applicants[0].name.original}</td>
                                        <td>sad</td>
                                    </tr>`;
                        // }
                        $('.content #tab-r1 .tab-con .tb1 tbody').html(html);

                    }
                }

            })
        }

        return quoteService;
    }
})(window, jQuery);
