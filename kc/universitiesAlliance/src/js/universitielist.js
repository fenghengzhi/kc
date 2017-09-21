/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.universitielistService = universitielistService();

    function universitielistService() {
        var universitielistService = {
            pageNo: 1,
            pageNum: 1
        };


        $(function () {
            allclick();
            commonService.initQuery(getData);
        });


        function gentPage() {
            var config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: universitielistService.pageNum,
                showNum: 5,
                current: universitielistService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    universitielistService.pageNo = pageNo;
                    commonService.setQuery('pageNo', pageNo);
                    getData();
                }
            };
            new huPagination(config);
        }

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function getData() {
            universitielistService.pageNo = parseInt(commonService.getQuery('pageNo')) || 1;
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/college',
                that: $('.main')[0],
                postData: {},
                urlData: {
                    pageNo: universitielistService.pageNo,
                    pageSize: 6
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        universitielistService.pageNum = Math.ceil(data.rsCount / 6);
                        var data = data.rsData;
                        $('.main-box').empty();
                        for (var i = 0; i < data.length; i++) {
                            var brief = data[i].brief.substr(0, 123) + '...'
                            var listHTML = '<div class="universities">' +
                                '<a target="_blank" class="img" href="universitidetail.html?id=' + data[i].id + '">' +
                                '<img src="' + (data[i].developmentImage||'../images/universitiesAlliance-school85x85.png')+ '" alt="img">' +
                                '</a>' +
                                '<div class="details">' +
                                '<div class="logo">' +
                                '<a href="universitidetail.html?id=' + data[i].id + '">' + data[i].name + '</a>' +
                                '</div>' +
                                '<p>' + brief + '</p>' +
                                '</div>' +
                                '</div>';

                            $('.main-box').append(listHTML)

                        }

                        gentPage();
                    }

                }
            })
        }
    }
})(window,jQuery)


