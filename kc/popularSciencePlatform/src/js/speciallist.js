/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.speciallistService = speciallistService();

    function speciallistService() {
        let speciallistService = {};

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
            })

        }
        let pageSize = 8;

        function getInfo() {
            let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;
            console.log('test');
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/list/project',
                that: $('#content')[0],
                postData: {},
                urlData: {
                    pageNo: pageNo,
                    pageSize: pageSize
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
                html +=
                    `<div class="list">
                <a href="specialdetail.html?id=${d.id}"><span></span>${d.name} <span>[${moment(d.publishTime).format('YYYY-MM-DD')}]</span></a>
                <div>
                    <p><span>成果名称:</span>&nbsp;&nbsp;${d.name}</p>
                    <p><span>通讯地址及邮编:</span>&nbsp;&nbsp;${d.address}，${d.postcode}</p>
                </div>
            </div>`;
            }
            $('#lists').html(html);
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

        return speciallistService;
    }
})(window, jQuery);
