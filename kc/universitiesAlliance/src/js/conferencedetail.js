/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.conferencedetailService = conferencedetailService();

    function conferencedetailService() {
        var conferencedetailService = {};
        conferencedetailService.id = commonService.getSearchParm('id');
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

        };

        function getData() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/get/meeting',
                that: $('#content')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    id:conferencedetailService.id
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData[0];
                        var newDate = new Date();
                        newDate.setTime(data.publishTime);
                        // console.log(data)
                        var html =
                            `<div>
                                <h2>${data.title}</h2>
                            </div>
                            <div class="hn-right">
                                <span>${newDate.toLocaleDateString()}</span>
                                <span>${data.universityName} </span>
                            </div>
                            <div class="hn-btn">
                                
                                <p>
                                ${data.content}
                                  </p>
                            </div>`
                        $(".main").append(html);
                    }
                }
            })
        }

        return conferencedetailService;
    }
})(window, jQuery);
