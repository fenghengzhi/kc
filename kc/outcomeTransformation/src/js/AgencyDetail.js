/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.AgencyDetailService = AgencyDetailService();

    function AgencyDetailService() {
        var AgencyDetailService = {};

        $(function () {
            allclick();
            getInfo();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }
        function getInfo() {
            let id=commonService.getSearchParm('id');
            for (let supplierType = 1; supplierType <= 6; ++supplierType) {
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
                            <h5>${d.name}</h5>
                        </div>
                        <div class="server-detail">

                            <div class="service-flow clearfix" style="margin-top:24px;">
                                <p>服务类别：</p>
                                <span>产品信息查询，企业信息查询，法律法规信息查询，之策信息查询，其他信息服务，标准信息查询，价格行情查询，物流信息查询</span>
                            </div>
                            <div class="service-flow clearfix" style="position: relative;">
                                <p>联系电话：</p>
                                <span>${d.contactsTel}</span>
                            </div>
                            <div class="service-flow clearfix">
                                <p>电子邮箱：</p>
                                <span>021-96810588@163.com</span>
                            </div>
                            <div class="service-flow clearfix" style="position: relative;margin-bottom:32px;">
                                <p>通信地址：</p>
                                <span>${d.address}</span>
                            </div>
                        </div>

                    </div>
                </li>
                <li>
                    <div class="server-right-logo"></div>
                </li>
            </ul>
        </div>

        <div class="information">
            <div class="title" style="margin-top:0;">
                <h5>机构介绍</h5>
            </div>
            <div class="information-content">
                <div class="top"><p>特易咨询（TOPEASE）成立于2004年7月，是一家专注于国际贸易信息服务领域，并对行业进行垂直化深入研究的服务商。以为外贸企业提供精准的数据分析及全面的外贸资讯信息服务为宗旨。其依靠高速的信息流动和以人为中心的操作模式完成对海量信息更有效的汇聚、关联、整理以及交互呈现。</p></div>
                <div class="bottom"><p>2013年，上海跨国采购发展（集团）有限公司正式入股特易资讯；同年7月，特易与商务部国际电子商务中心（CIECC）再度合作。14年特易又成为了“中国联合国采购促进会”信息培训中心的承办方。10年来，特意会员已突破20万家，推动会员企业年度交易额突破17亿美元。与客户共同“化资讯为资本”是我们孜孜以求的理想</p></div>
            </div>
        </div>
        <div class="information" style="margin-bottom:100px;">
            <div class="title">
                <h5>活动信息</h5>
            </div>
            <div class="information-content">
                <div class="top"><p>特易咨询（TOPEASE）成立于2004年7月，是一家专注于国际贸易信息服务领域，并对行业进行垂直化深入研究的服务商。以为外贸企业提供精准的数据分析及全面的外贸资讯信息服务为宗旨。其依靠高速的信息流动和以人为中心的操作模式完成对海量信息更有效的汇聚、关联、整理以及交互呈现。</p></div>
                <div class="bottom"><p>2013年，上海跨国采购发展（集团）有限公司正式入股特易资讯；同年7月，特易与商务部国际电子商务中心（CIECC）再度合作。14年特易又成为了“中国联合国采购促进会”信息培训中心的承办方。10年来，特意会员已突破20万家，推动会员企业年度交易额突破17亿美元。与客户共同“化资讯为资本”是我们孜孜以求的理想</p></div>
            </div>
        </div>`;

                        $('.main').html(html);
                    }
                })
            }


        }

        return AgencyDetailService;
    }
})(window, jQuery);
