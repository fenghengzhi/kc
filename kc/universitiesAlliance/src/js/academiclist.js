/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.academiclistService = academiclistService();

    function academiclistService() {
        var academiclistService = {
            pageNo :1,
            pageNum:10
        };

        $(function () {
            allclick();
            commonService.initQuery(init)
        });

        function gentPage() {
            var config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: academiclistService.pageNum,
                showNum: 5,
                current: academiclistService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    academiclistService.pageNo = pageNo;
                    commonService.setQuery('pageNo',pageNo);
                    getData();
                }
            };
            new huPagination(config);
        }

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function getData() {
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/science',
                that: $('.main')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    pageSize: 16,
                    pageNo: academiclistService.pageNo
                },
                success: function (data) {
                    if(data && data.rsData && data.rsData.length){
                        $(".list").empty();
                        academiclistService.pageNum = Math.ceil(data.rsCount/10);
                        var data = data.rsData;
                        var newDate = new Date();
                        for(var i = 0;i < data.length;i ++ ){
                            newDate.setTime(data[i].publishTime);
                            // console.log(newDate.toLocaleDateString())
                            var html =
                                `<li>
                                    <a target="_blank" href="academicdetail.html?id=${data[i].id}">
                                    <h4>${data[i].title}</h4>
                                    <i></i> 
                                    <span>${newDate.toLocaleDateString()}</span>
                                    </a>
                                </li>`;
                            $(".list").append(html);
                        }
                        gentPage();
                    }
                }
            })
        }
        function init() {
            academiclistService.pageNo = parseInt(commonService.getQuery('pageNo')) || 1;
            getData();
            gentPage()
        }
        return academiclistService;
    }
})(window, jQuery);
