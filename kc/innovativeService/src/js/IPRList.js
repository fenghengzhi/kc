/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.IPRListService = IPRListService();

    function IPRListService() {
        var IPRListService = {};

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function getData() {
            IPRListService.pageNo = parseInt(commonService.getQuery('pageNo')) || 1;
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/supplier',
                that: $('.main')[0],
                postData: {
                },
                urlData: {
                    pageNo: IPRListService.pageNo,
                    pageSize: 10,
                    supplierType:11
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        IPRListService.pageNum=Math.ceil(data.rsCount/2);
                        var data=data.rsData;
                        var html='';
                        for(var val of data){


                            html+=`<div class="item">
                                        <!--<div class="item-left"><img src="http://img.kechuang.cn/u${val.memberId}.jpg?imageMogr2/thumbnail/1200x120&time=1504774799220" alt=""></div>-->
                                        <div class="item-mid">
                                            <div class="title">${val.name}</div>
                                            <div class="content" title="${val.brief}">${val.brief}</div>
                                            <div class="address"><i style="background-image: url(../images/address.svg);"></i>${val.address}</div>
                                        </div>
                                        <div class="item-right">
                                            <a href="IPRDetails.html?id=${val.id}" class="hu-btn btn-primary btn-sm view-details-btn">查看详情</a>
                                        </div>
                                    </div>`
                        }
                        $('.items').html(html);
                        gentPage()
                    }else{
                        $('.main-con').html('<div style="display: flex;justify-content: center;align-content: center;width: 100%;"><img style="display: flex;width: 200px;height: 200px;margin: 50px auto 200px" src="../images/icon-no-data.svg"></div>');
                        $('#page-1').empty();
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
                total: IPRListService.pageNum,
                showNum: 5,
                current: IPRListService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    IPRListService.pageNo=pageNo;
                    commonService.setQuery('pageNo', pageNo);
                    getData();
                }
            };
            new huPagination(config4);
        }


        return IPRListService;
    }
})(window, jQuery);
