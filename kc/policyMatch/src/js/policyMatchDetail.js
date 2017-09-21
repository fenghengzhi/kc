/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.policyMatchDetailService = policyMatchDetailService();

    function policyMatchDetailService() {
        var policyMatchDetailService = {};
        policyMatchDetailService.id = commonService.getSearchParm('id');
        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })
        }

        function getData() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + "policy/get/policy",
                that: $("#content")[0],
                loadingColor: "#5f8bc9",
                urlData: {
                    id: policyMatchDetailService.id
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData[0];
                        console.log(data)
                        var newDate = new Date();
                        newDate.setTime(data.publishTime);
                        var html =
                            ` <div class="top">
                                <h1>${data.title}</h1>
                                <div class="h2">${data.publishTime ? moment(data.publishTime).format('YYYY-MM-DD') : ''}</div>
                            </div>
                            <div class="digest">
                                <div class="h3">
                                    <h3>详细信息</h3>
                                </div>
                                <div class="message">
                                    <div class="con">
                                        <p>${data.content ? data.content : ''}</p>
                                    </div>
                                </div>
                            </div>`
                        $(".main").html(html);
                    }

                }
            })
        }


        return policyMatchDetailService;
    }
})(window, jQuery);
