/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.ServerDetailService = ServerDetailService();

    function ServerDetailService() {
        var ServerDetailService = {};

        $(function () {
            allclick();
            getInfo();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });


        }
        function getInfo() {
            let id=commonService.getSearchParm('id');
            hieknjs.kgLoader({
                    type: 0,
                    url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/get/supplier',
                    // that: $('#content')[0],
                    postData: {},
                    urlData: {
                        id
                    },
                    success: function (data) {
                        let d=data.rsData[0];
                        console.log(supplierType,data);
                           let html = `<div class="server clearfix">
            <ul>
                <li style="margin-right:120px;">
                    <div class="server-left clearfix">
                        <div class="title">
                            <h5>买采见面服务</h5>
                            <span style="cursor: pointer;">申请服务&nbsp;》</span>
                        </div>
                        <div class="server-detail">

                            <div class="service-flow" style="margin-top:24px;">
                                <p>服务流程：</p>
                                <span>在采买会举办之前在采买会举办之前，特意咨询会首先手机买卖双方的采买需求进行需求配对，并进行需求配对。</span>
                            </div>
                            <div class="service-flow" style="position: relative;">
                                <p>及其内容：</p>
                                <span>在采买会举办之前在采买会举办之前，特意咨询会首先手机买卖双方的采买需求进行需求配对，并进行需求配对。</span>
                                <div class="details">
                                    <div style="line-height: 1;">详情</div><div class="icon hufont ic-navigate-next ic" style="line-height: 1;"></div>
                                </div>
                            </div>
                            <div class="service-flow">
                                <p>服务对象：</p>
                                <span>微型企业，小型企业，中型企业，大型企业</span>
                            </div>
                            <div class="service-flow" style="position: relative;">
                                <p>服务方式：</p>
                                <span>电话服务，上门服务，网络服务，其他服务</span>
                                <div class="details" style="top:0;">
                                    <div>详情</div><div class="icon hufont ic-navigate-next"></div>
                                </div>
                            </div>
                            <div class="service-flow">
                                <p>单位名称：</p>
                                <span>${d.name}</span>
                            </div>
                            <div class="service-flow">
                                <p>电子邮箱：</p>
                                <span>${d.contactsEmail||'没有邮箱'}</span>
                            </div>
                            <div class="service-flow">
                                <p>网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</p>
                                <span style="color:#5f8bc9"><a href="${d.url}">${d.url||'没有网址'}</a></span>
                            </div>
                            <div class="service-flow" style="margin-bottom:32px;">
                                <p>联&nbsp;系&nbsp;人&nbsp;：</p>
                                <span>${d.contactsName||'没有联系人'}</span>
                            </div>
                            <a href="AgencyDetail.html?id=${id}" class="hu-btn btn-primary-outline">查询机构详情</a>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="server-right-logo">
                    <img src="http://img.kechuang.cn/u57109.jpg?imageMogr2/thumbnail/1200x120&time=1504774799220" alt="">
</div>
                    
                </li>
            </ul>
        </div>`;

                        $('.main').html(html);
                    }
                })



        }

        return ServerDetailService;
    }
})(window, jQuery);
