/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.conferencelistService = conferencelistService();

    function conferencelistService() {
        var conferencelistService = {
            pageNo :1,
            pageNum:1
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
                total: conferencelistService.pageNum,
                showNum: 5,
                current: conferencelistService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    conferencelistService.pageNo = pageNo;
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
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/meeting',
                that: $('.main')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    pageSize: 10,
                    pageNo: conferencelistService.pageNo
                },
                success: function (data) {
                    if(data && data.rsData && data.rsData.length){
                        $(".classify").empty();
                        conferencelistService.pageNum = Math.ceil(data.rsCount/10);
                        var data = data.rsData;
                        var newDate = new Date();
                        for(var i = 0;i < data.length;i ++ ){
                            var title=data[i].title
                            if(title.length>50){
                                title=data[i].title.substr(0,50)+'...';
                            }

                            newDate.setTime(data[i].publishTime);
                            var html = `<div class="universities city-img">
                                    <a target="_blank" href="conferencedetail.html?id=${data[i].id}"><img src="${data[i].image!='null' ? data[i].image : '../images/universitiesAlliance-conference476x326.png'}" onerror="onerror=null;src='../images/universitiesAlliance-conference476x326.png'" alt="img"></a>
                                    <div class="meeting">
                                    <h3><a href="conferencedetail.html?id=${data[i].id}"">${title}</a></h3>
                                        <h2><a href="conferencedetail.html?id=${data[i].id}">${data[i].universityName}</a><span>${newDate.toLocaleDateString()}</span></h2>
                                        <p>
                                    </div>
                                </div>`;
                            $(".classify").append(html);
                        }
                        gentPage();
                    }
                }
            })
        }

        function init() {
            conferencelistService.pageNo =  parseInt(commonService.getQuery ('pageNo')) || 1;
            getData();
            gentPage();
        }
        return conferencelistService;
    }
})(window, jQuery);
