/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.projectlistService = projectlistService();

    function projectlistService() {
        var projectlistService = {
            pageNum:1,
            pageNo:1
        };


        
        
        $(function () {
            allclick();
            commonService.initQuery(init);
        });



        function gentPage() {
            var config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: projectlistService.pageNum,
                showNum: 5,
                current: projectlistService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    projectlistService.pageNo=pageNo;
                    commonService.setQuery('pageNo',pageNo);
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
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'universities/list/startup',
                that: $('.main')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    pageSize: 16,
                    pageNo: projectlistService.pageNo
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        $('.container .row').empty();
                        projectlistService.pageNum=Math.ceil(data.rsData[0].rsCount/10);
                        var data = data.rsData[0].rsData;
                        var HTML=''
                        for(var i=0;i<data.length;i++){
                            HTML +=
                                `<li>
                                    <a href="###">
                                    <h4>${data[i].title}</h4>
                                    <i></i> 
                                    <span>${data[i].brief}</span>
                                    </a>
                                </li>`;
                        }
                        $('.list').html(HTML);
                        gentPage();
                    }
                }
            })
        }

        function init() {
            projectlistService.pageNo=parseInt(commonService.getQuery('pageNo')) || 1;
            getData();
            gentPage();
        }

        

        return projectlistService;
    }
})(window, jQuery);
