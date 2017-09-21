/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.PlanDetailService = PlanDetailService();


    function PlanDetailService() {
        var PlanDetailService = {};

        $(function () {
            allclick();
            getInfo();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherlinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });
            $('body').on('click', '.push', function () {
                if ($('.none').css('display') == 'none') {
                    $('.none').css('display', 'block');
                    $('.push>span>i').css('transform', 'rotateZ(90deg)');
                } else {
                    $('.none').css('display', 'none');
                    $('.push>span>i').css('transform', 'rotateZ(0deg)');
                }
            });


        }

        function getInfo() {
            let id = commonService.getSearchParm('id');
            console.log(id);
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/get/scheme',
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
            $('#detail-title').html(`<div class="roof main">
            <div class="title-top clearfix">
                <div class="portrait">
                <img src="../images/popularSciencePlatform-head70x70.png" alt="">
</div>
                <div class="tright">
                    <h4>${d.title}</h4>
                    <div class="people"><span class="lt">发布人</span><span class="rt">&nbsp;${d.issuer}</span></div>
                </div>
            </div>
            <div class="classify clearfix">
                <ul>
                    ${(function () {
                console.log(d.tag);
                let html = '';
                for (let tag of JSON.parse(d.tag)) {
                    html += `<li>${tag}</li>`;
                }
                return html;
            })()}
                </ul>
            </div>
            <div class="detail">
                <ul>
                    <li>
                        <div class="lf">
                            <div class="directory" style="margin-right:8px;">指定响应人</div>
                            <div class="dtail">全部</div>
                        </div>
                        <div class="mid" style="margin-right:135px;">
                            <div class="directory">方案类型</div>
                            <div class="dtail">${_.find([
                    {type: 1, name: '专利代理'},
                    {type: 2, name: '金融服务'},
                    {type: 4, name: '法律服务'},
                    {type: 5, name: '专业协会'},
                    {type: 6, name: '科研设备'},
                    {type: 10, name: '技术攻关'},
                    {type: 11, name: '专家咨询'},
                    {type: 12, name: '技术提供'},
                    {type: 13, name: '技术转移'}]
                , {type: parseInt(d.type)}).name}</div>
                        </div>
                        <div class="rg">
                            <div class="directory">地域</div>
                            <div class="dtail">${_.find(provinceList, {id: parseInt(d.province)}).province}&nbsp;${_.find(cityList, {id: d.city}).city}&nbsp;${(_.find(countyList, {id: parseInt(d.county)}) || {county: ''}).county}</div>
                        </div>
                    </li>
                    <li style="margin-top:8px;">
                        <div class="lf">
                            <div class="directory" style="margin-right:22px;">预算金额</div>
                            <div class="dtail" style="color:#5f8bc9">面议</div>
                        </div>
                        <div class="mid">
                            <div class="directory">剩余时间</div>
                            <div class="dtail">${(function () {
                moment.locale('zh-cn');
                let duration = moment.duration(d.expirationTime - (new Date()).valueOf());
                if (duration > 0) {
                    window.setInterval(function () {
                        let duration = moment.duration(d.expirationTime - (new Date()).valueOf());
                        $('#detail-title > div > div.detail > ul > li:nth-child(2) > div.mid > div.dtail').text(`${duration.get('days')}天${duration.hours()}时${duration.minutes()}分${duration.seconds()}秒`);
                    }, 1000);
                    return `${duration.get('days')}天${duration.hours()}时${duration.minutes()}分${duration.seconds()}秒`;
                }
                return '已过期';


            })()}</div>
                        </div>
                    </li>
                    <li>
                        <button class="hu-btn btn-primary btn-sm"
                                onclick="toastr.box({content:$('#responseBox'),closeBtn:0,title:false,zIndex:1,area: ['auto', 'auto']});">
                            寻求合作
                        </button>
                    </li>
                    <li>
                        <div class="${(function () {
                switch (parseInt(d.status)) {
                    case 1:
                        return 'jinxingzhong';
                    case 2:
                        return 'success';
                    case 3:
                        return 'over';
                }
            })()}"></div>
                    </li>
                </ul>
            </div>
        </div>`);
            $('#main').html(`<div class="list clearfix">
            <ul style="margin-bottom:16px;">
                <li>
                    <div class="left clearfix">

                        <div class="title">
                            <h5>方案描述</h5>
                        </div>

                        <div class="font">
                            ${d.content || ''}
                        </div>

                        <div class="push">
                            <span>收起/展开详情 <i class="icon hufont ic-navigate-next"></i></span>
                        </div>

                        <div class="none">
                            <div class="title">
                                <h5>方案详情</h5>
                            </div>

                            <div class="contact-detail">
                                <div><p>方案联系人信息：</p><span>${d.contactsName || ''}</span></div>
                                <div class="domain">
                                    <p>涉及技术领域：</p><span>${JSON.parse(d.domain).split('') || ''}</span>
                                </div>
                                <div class="part">
                                    <p>方案所需阶段：</p><span>${d.phase || ''}</span>
                                </div>
                                <div class="kind">
                                    <p>方案类型：</p><span>${d.requireType || ''}</span>
                                </div>
                            </div>

                            <div class="contact-detail" style="margin-top:30px;">
                                <p>方案详细内容：</p>
                                <div class="domain"><p>方案结局的主要技术难题：</p><span></span>
                                </div>
                                <div class="part">
                                    <p>预期达到的指标：</p><span>${d.requireIndex || ''}</span>
                                </div>
                                <div class="kind clearfix">
                                    <ul>
                                        <li style="width: 50%;"><p>方案投入经费：</p><span style="line-height: 24px;">${d.budget || ''}</span>
                                        </li>
                                        <li style="width: 50%;"><p>方案研发周期：</p><span style="line-height: 24px;">${d.developmentCycle || ''}</span>
                                        </li>
                                    </ul>

                                </div>
                                <div class="point">
                                    <p>主要关注点：</p><span>${d.focus || ''}</span>
                                </div>
                                <div class="cooperation">
                                    <p>期望合作方式：</p><span>${d.cooperationWay || ''}</span>
                                </div>
                                <div class="delivery">
                                    <p>期望交付方式：</p><span>${d.deliveryWay || ''}</span>
                                </div>
                                <div class="teamwork">
                                    <p>意向合作方：</p><span>${d.partner || ''}</span>
                                </div>
                                <div class="service">
                                    <p>期望其他服务：</p><span>${d.otherService || ''}</span>
                                </div>
                            </div>

                        </div>

                        <div class="response">
                            <div class="title">
                                <h5>响应人列表</h5>
                            </div>



                        </div>

                    </div>
                </li>
                <li>
                    <div class="right">

                        <div class="title">
                            <h5>精彩推荐</h5>
                        </div>

                        <div class="img-div clearfix">
                            <div class="im" style="padding-top:0;">
                                <img src="" alt="" style="background-color: #cccccc;margin-top:0;">
                                <div class="keepout">新型铅酸蓄电池隔板</div>
                            </div>
                            <div class="im">
                                <img src="" alt="" style="background-color: #cccccc;">
                                <div class="keepout">低风速叶尖系列化分段叶片</div>
                            </div>
                            <div class="im" style="border-bottom:none;">
                                <img src="" alt=""
                                     style="background-color: #cccccc;">
                                <div class="keepout">低风速叶尖系列化分</div>
                            </div>
                        </div>

                    </div>
                </li>
            </ul>
        </div>`);
            getData1();
            getData2();
        }


        function getData1() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/recommend/scheme',
                that: $('.right .img-div')[0],
                postData: {},
                urlData: {
                    tag: '材料',
                    pageNo: 1,
                    pageSize: 3
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var data = data.rsData;
                        console.log(data);
                        $('.right .img-div').empty();
                        for (var i = 0; i < data.length; i++) {
                            var listHTML =
                                `<a href="PlanDetail.html?id=${data[i].id}" class="im">
        <img src="${data[i].image || '../images/outcomeTransformation-demand 220x158.png'}" alt="" style="background-color: #cccccc;margin-top:0;">
        <div class="keepout">${data[i].title}</div>
        </a>`;

                            $('.right .img-div').append(listHTML)

                        }

                        // gentPage();
                    }

                }
            })
        }

        function getData2() {
            let id = commonService.getSearchParm('id');
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transformation/list/order',
                that: $('.right .img-div')[0],
                postData: {},
                urlData: {
                    pageNo: 1,
                    pageSize: 3,
                    way: 2,
                    id
                },
                success: function (data) {
                    $('.response').append(`<div class="user">
                                <div class="user-detail">
                                    <ul>
                                        <li>
                                            <div class="logo"><img src="${'../images/popularSciencePlatform-head70x70.png'}" alt=""></div>
                                            <div class="user-name">
                                                用户名称
                                            </div>
                                            <div class="test">
                                                企业-专家
                                            </div>
                                        </li>
                                        <li style="margin-bottom:70px;">
                                            <div class="talk"><p>
                                                与现代机器人技术努力着眼于“只要企业制造设备提升能想到的，就是我们要做的”工业化理念，致力于为企业解决工程技术难题，在技术致力于为企业解决工市场领域找到。</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>`);
                    for (let d of data.rsData) {
                        $('.response').append(`<div class="user">
                                <div class="user-detail">
                                    <ul>
                                        <li>
                                            <div class="logo">
                                            <img src="${'../images/popularSciencePlatform-head70x70.png'}" alt="">
</div>
                                            <div class="user-name">
                                                ${d.name}
                                            </div>
                                            <div class="test">
                                                企业-专家
                                            </div>
                                        </li>
                                        <li>
                                            <div class="talk">
                                                <p>${d.content}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>`)
                    }

                }
            })
        }

        return PlanDetailService;
    }
})(window, jQuery);
