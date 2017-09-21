/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.indexService = indexService();

    function indexService() {
        var indexService = {};

        $(function () {
            allclick();
            getInfo1();
            getInfo2();
            getInfo3();
            getInfo4();

        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }
        function getInfo1() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/achievement',
                // that: $('#content')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":["1"]}]'
                },
                urlData: {
                    pageNo:1,
                    pageSize:5
                },
                success: function (data) {
                    console.log(data);
                    let html = '';
                    for (let d of data.rsData) {
                        html +=
                            `<a href="../technicalTransaction/outcomeBiddingDetail.html?id=${d.id}" class="line-text">${d.title}</a>`;
                    }
                    $('#page1').html(html);
                }
            })
        }
        function getInfo2() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/require',
                // that: $('#content')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":["1"]}]'
                },
                urlData: {
                    pageNo:1,
                    pageSize:5
                },
                success: function (data) {
                    console.log(data);
                    let html = '';
                    for (let d of data.rsData) {
                        html +=
                            `<a href="../technicalTransaction/demandRewardDetail.html?id=${d.id}" class="line-text">${d.title}</a>`;
                    }
                    $('#page2').html(html);
                }
            })
        }
        function getInfo3() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/require',
                // that: $('#content')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":["2"]}]'
                },
                urlData: {
                    pageNo:1,
                    pageSize:5
                },
                success: function (data) {
                    console.log(data);
                    let html = '';
                    for (let d of data.rsData) {
                        html +=
                            `<a href="../technicalTransaction/tradeShowDetail.html?url=require&id=${d.id}" class="line-text">${d.title}</a>`;
                    }
                    $('#page3').html(html);
                }
            })
        }
        function getInfo4() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/list/achievement',
                // that: $('#content')[0],
                postData: {
                    queryCondition:'[{"field":"status","condition":"eq","relation":"and","vList":["2"]}]'
                },
                urlData: {
                    pageNo:1,
                    pageSize:5
                },
                success: function (data) {
                    console.log(data);
                    let html = '';
                    for (let d of data.rsData) {
                        html +=
                            `<a href="../technicalTransaction/tradeShowDetail.html?url=achievement&id=${d.id}" class="line-text">${d.title}</a>`;
                    }
                    $('#page4').html(html);
                }
            })
        }


        return indexService;
    }
})(window, jQuery);
