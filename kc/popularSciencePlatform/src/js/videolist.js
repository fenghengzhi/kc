/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.videolistService = videolistService();

    function videolistService() {
        let videolistService = {};

        $(function () {
            allclick();
            commonService.initQuery(init);
        });

        function init() {

            getInfo();
        }



        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

        }

        let pageSize = 8;

        function getInfo() {
            let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;
            let queryCondition=filterService.getQueryCondition();
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/list/video',
                that: $('#content')[0],
                postData: {
                    queryCondition
                },
                urlData: {
                    pageNo,
                    pageSize
                },
                success: function (data) {
                    console.log(data);
                    setInfo(data, pageNo);
                }
            })
        }

        function setInfo(data, pageNo) {
            let html = '';
            for (let d of data.rsData) {
                let da = new Date(d.addTime);
                html +=
                    `<a href="popularVideoDetails.html?id=${d.id}" class="bgImg">
                <img src="${d.image?`../resources/popular_science_video/${d.image}`:'http://placehold.it/327x327'}" alt="">
                <div>
                    <h4>${d.title} </h4>
                </div>
            </a>`;
            }
            $('.main .row').html(html);
            let total = Math.ceil(data.rsCount / pageSize);
            // console.log(total);
            gentPage(pageNo, total);

        }

        function gentPage(current, total) {
            let config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: total,
                showNum: 5,
                current: current,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    commonService.setQuery('pageNo',pageNo);

                }
            };
            new huPagination(config);
        }

        return videolistService;
    }
})(window, jQuery);
