/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.investServiceListAllService = investServiceListAllService();

    function investServiceListAllService() {
        var investServiceListAllService = {};

        $(function () {

            allclick();
            commonService.initQuery(getInfo);

        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })


        }

        let pageSize = 4;

        function getInfo() {
            let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;

            let queryCondition = filterService.getQueryCondition();
            hieknjs.kgLoader({
                type: 1,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'innovative/list/competition',
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
            if(!(data.rsData.length >0)){
                $('.serviceList').html(`<tr><td colspan="4"><div style="text-align: center;"><img style="width: 100px;" src="../images/icon-no-data.svg" alt=""></div></td></tr>`);
                return;
            }
            for (let d of data.rsData) {
                html +=
                    `<tr>
                <td><img src="${d.image || "http://placehold.it/236x160"}" alt=""></td>
                <td>
                    <a href="investServiceDetails.html?id=${d.id}" class="title">${d.title}</a>
                    <div class="line"><i style="background-image: url(../images/time.svg);"></i>${moment(d.startTime).format('YYYY-MM-DD')}~${moment(d.endTime).format('YYYY-MM-DD')}
                    </div>
                    <div class="line"><i style="background-image: url(../images/address.svg);"></i>${d.location}</div>
                    <div class="line">${moment(d.addTime).format('YYYY-MM-DD')} 发布</div>
                </td>
                <td>${(function () {
                        switch (parseInt(d.status, 10)) {
                            case 0:
                                return '已禁用';
                            case 1:
                                return '进行中';
                            case 2:
                                return '评审中';
                            case 3:
                                return '已结束';
                            default:
                                return '有问题';
                        }
                    })()}</td>
                <td><a class="icon hufont ic-star-border"></a></td>
            </tr>`;
            }
            html += `<tr>
<td colspan="4" style="text-align: center;">
<div id="page"></div>
</td>
</tr>`;
            $('.serviceList').html(html);
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
                    commonService.setQuery('pageNo', pageNo)


                }
            };
            new huPagination(config);
        }

        return investServiceListAllService;
    }
})(window, jQuery);
