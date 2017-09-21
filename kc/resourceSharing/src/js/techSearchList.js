/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.techSearchListService = techSearchListService();

    function techSearchListService() {
        var techSearchListService = {};


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
            techSearchListService.pageNo = parseInt(commonService.getQuery('pageNo')) || 1;
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/supplier',
                that: $('.main')[0],
                postData: {},
                urlData: {
                    pageNo: techSearchListService.pageNo,
                    pageSize: 10,
                    supplierType: 10
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        techSearchListService.pageNum = Math.ceil(data.rsCount / 10);
                        var data = data.rsData;
                        var html = '';
                        for (var val of data) {
                            var domainhtml = '';
                            if(val.domain){
                                var arr = val.domain.split(',');
                                for (var value of arr) {
                                    domainhtml += '<div class="line"><i class="item-icon-1"></i>' + value + '</div>'
                                }
                            }else{
                                domainhtml='<p style="line-height: 1.5;height: 4.5em; overflow: hidden; white-space: nowrap;">'+val.aptitude+'</p>'
                            }

                            html += `<div class="item">
                                        <div class="item-left"><img src="${val.logo}" alt=""></div>
                                        <div class="item-mid">
                                            <div class="title">${val.name}</div>
                                            <div class="lines">
                                                ${domainhtml}
                                            </div>
                                        </div>
                                        <div class="item-right">
                                            <a href="techSearchDetail.html?id=${val.id}" class="hu-btn btn-primary btn-sm view-details-btn">查看详情</a>
                                        </div>
                                    </div>`
                        }
                        $('.items').html(html);
                        gentPage()
                    } else {
                        $('.main-con').html('<div style="display: flex;justify-content: center;align-content: center;width: 100%;"><img style="display: flex;width: 200px;height: 200px;margin: 50px auto 200px" src="../images/icon-no-data.svg"></div>');
                        $('#page').empty();
                    }
                }
            })
        }


        function gentPage() {
            var config4 = {
                data: {
                    id: 1
                },
                selector: '#page-1',
                total: techSearchListService.pageNum,
                showNum: 5,
                current: techSearchListService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    techSearchListService.pageNo = pageNo;
                    commonService.setQuery('pageNo', pageNo);
                    getData();
                }
            };
            new huPagination(config4);
        }

        return techSearchListService;
    }
})(window, jQuery);
