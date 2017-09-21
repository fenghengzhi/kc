/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.specialdetailService = specialdetailService();

    function specialdetailService() {
        let specialdetailService = {};

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
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/get/project',
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
                <p>发布日期: <span> &nbsp;${moment(d.publishTime).format('YYYY-MM-DD')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                <p>访问次数: <span> &nbsp;${d.readNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p>信息来源: <span> &nbsp;${d.source}</span></p>
            </div>
        </div>
        <div class="match">
            <div><p>成果名称: </p><span> &nbsp;${d.name}</span></div>
            <div><p>成果类型: </p><span> &nbsp;${d.type}</span></div>
            <div><p>完成人: </p><span> &nbsp;${d.executers}</span></div>
            <div><p>研究起止时间: </p><span> &nbsp;${moment(d.startTime).format('YYYY年MM月')}—${moment(d.endTime).format('YYYY年MM月')}</span></div>
            <div><p>组织评价单位: </p><span> &nbsp;${d.institution}</span></div>
            <div><p>评价日期: </p><span> &nbsp;${moment(d.evaluateTime).format('YYYY-MM-DD')}</span></div>
            <div><p>联系人: </p><span> &nbsp;${d.contact}</span></div>
            <div><p>联系电话: </p><span> &nbsp;${d.contactWay}</span></div>
            <div><p>通讯地址及邮编: </p><span> &nbsp;${d.address}${d.postcode}</span></div>
            <div><p>内容简介: </p><span> &nbsp;${d.content}</span>
            </div>
        </div>`;
            $('.main').html(html);

        }

        return specialdetailService;
    }
})(window, jQuery);
