/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.baselistService = baselistService();

    function baselistService() {
        let baselistService = {};

        $(function () {
            allclick();
            commonService.initQuery(init);
        });

        function init() {

            getInfo();
        }


        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        let pageSize = 4;

        // let conditions = ['location', 'type'];

        function getInfo() {

            let queryCondition = filterService.getQueryCondition();
            let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/list/base',
                that: $('.main')[0],
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
            if (!data.rsCount) {
                html = `<img src="../images/icon-no-data.svg" style="width: 102px;margin:100px auto;display:block;" alt="">`
                $('.list').html(html);
            } else {
                for (let d of data.rsData) {
                    html +=
                        `<div class="universities">
                <img src="${d.photo}" alt="img">
                <div class="details">
                    <span>${d.name}</span>
                    <p>${d.brief}</p>
                    <a href="basedetail.html?id=${d.id}" class="hu-btn btn-primary btn-sm">查看更多</a>
                </div>
            </div>`;
                }
                html += `<div id="page"></div>`
                $('.list').html(html);
                let total = Math.ceil(data.rsCount / pageSize);
                // console.log(total);
                gentPage(pageNo, total);

            }

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
                    commonService.setQuery('pageNo', pageNo);
                }
            };
            new huPagination(config);
        }


        return baselistService;
    }
})(window, jQuery);
