/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.investServiceListService = investServiceListService();

    function investServiceListService() {
        var investServiceListService = {};

        $(function () {
            allclick();
            getInfo1();
            getInfo3();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function getInfo1() {

            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'innovative/list/competition/new',
                that: $('#content')[0],
                postData: {

                },
                urlData: {

                },
                success: function (data) {
                    console.log(data);

                    setInfo1(data);
                }
            })
        }

        function setInfo1(data) {
            let html = '';
            for (let d of data.rsData.slice(0, 8)) {
                html +=
                    `<div class="item">
                            <div><img src="${d.image||'http://placehold.it/236x160'}" alt=""></div>
                            <div class="item-content">
                                <a href="investServiceDetails.html?id=${d.id}" class="title">${d.title}</a>
                                <div class="line1"><i style="background-image: url(../images/time.svg);"></i>${moment(d.startTime).format('YYYY-MM-DD')}~${moment(d.endTime).format('YYYY-MM-DD')}
                                </div>
                                <div class="line2"><i style="background-image: url(../images/address.svg);"></i>${d.location}</div>
                                <div class="line3">${moment(d.addTime).format('YYYY-MM-DD')} 发布</div>
                                <a href="investServiceSignUp.html?id=${d.id}" class="hu-btn btn-primary sign-up-btn">报名</a>
                            </div>
                        </div>`;
            }
            $('#tab-bt1').html(html);
        }
        function getInfo3() {

            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'innovative/list/competition/hot',
                that: $('#content')[0],
                postData: {

                },
                urlData: {

                },
                success: function (data) {
                    console.log(data);

                    setInfo3(data);
                }
            })
        }

        function setInfo3(data) {
            let html = '';
            for (let d of data.rsData.slice(0, 8)) {
                html +=
                    `<div class="item">
                            <div><img src="${d.image||'http://placehold.it/236x160'}" alt=""></div>
                            <div class="item-content">
                                <a href="investServiceDetails.html?id=${d.id}" class="title">${d.title}</a>
                                <div class="line1"><i style="background-image: url(../images/time.svg);"></i>${moment(d.startTime).format('YYYY-MM-DD')}~${moment(d.endTime).format('YYYY-MM-DD')}
                                </div>
                                <div class="line2"><i style="background-image: url(../images/address.svg);"></i>${d.location}</div>
                                <div class="line3">${moment(d.addTime).format('YYYY-MM-DD')} 发布</div>
                                <a href="investServiceSignUp.html?id=${d.id}" class="hu-btn btn-primary sign-up-btn">报名</a>
                            </div>
                        </div>`;
            }
            $('#tab-bt3').html(html);
        }

        return investServiceListService;
    }
})(window, jQuery);
