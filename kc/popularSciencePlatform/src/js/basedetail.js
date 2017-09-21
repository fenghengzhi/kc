/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.basedetailService = basedetailService();

    function basedetailService() {
        let basedetailService = {};

        $(function () {
            allclick();
            getInfo();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }

        function getInfo() {
            let id = commonService.getSearchParm('id');
            console.log(id);
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/get/base',
                that: $('#content')[0],
                postData: {},
                urlData: {
                    id: id,

                },
                success: function (data) {
                    console.log(data);
                    setInfo(data);
                }
            })
        }

        function setInfo(data) {
            let d = data.rsData[0];

            let html = `<div>
            <h2>${d.name}</h2>
            <div>
                <p>发布日期: <span> &nbsp;${moment(d.addTime).format('YYYY-MM-DD')}　</span></p>
                <p>访问次数: <span> &nbsp;${d.readNum}　</span></p>
                <p>信息来源: <span> &nbsp;${d.source}</span></p>
            </div>
        </div>
        <div class="article">
            ${d.content}
        </div>`;
            $('.main').html(html);

        }

        return basedetailService;
    }
})(window, jQuery);

