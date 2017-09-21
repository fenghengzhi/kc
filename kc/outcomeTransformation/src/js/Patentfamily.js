/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.PatentfamilyService = PatentfamilyService();

    function PatentfamilyService() {
        var PatentfamilyService = {};

        PatentfamilyService.id = commonService.getSearchParm('id');

        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click','li',function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $(".click-btn .btn1").on("click",function () {
                $(".tab-pane .tab-con .tb1").show().siblings().hide();
                $(".click-btn .btn1").addClass("active1");
                $(".click-btn .btn2").removeClass("active1");
            });
            $(".click-btn .btn2").on("click",function () {
                $(".tab-pane .tab-con .tb2").show().siblings().hide();
                $(".click-btn .btn2").addClass("active1");
                $(".click-btn .btn1").removeClass("active1");
            });

        }

        function getData() {
            hieknjs.kgLoader({
                type:0,
                url: configService.RESTFUL_SERVICE_BASE_URL2 + 'patent/get',
                that: $('.main')[0],
                loadingColor: '#5f8bc9',
                urlData: {
                    id:PatentfamilyService.id
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        // console.log(data);
                        var data = data.rsData[0].patent;
                        console.log(data);
                        var HTML=
                            `<h3>基本专利族概况</h3>
                            <div class="num">
                                <div class="left">
                                    <div><p>族内专利数量 : </p><span>1 件</span></div>
                                    <div><p>申请日区间 : </p><span> 2016年08月15日 — 2016年08月15日</span></div>
                                    <div><p>公开日区间 : </p><span> 2017年01月04日 — 2017年01月04日</span></div>
                                </div>
                                <div class="right">
                                    <div><p>国家/地区范围 : </p><span> 1 个：中国/CN</span></div>
                                    <div><p>包含PCT同族 : </p><span> 否</span></div>
                                    <div><p>包含EP同族 : </p><span> 否</span></div>
                                </div>
                            </div>
                            <h3>扩展专利族概况</h3>
                            <div class="num">
                                <div class="left">
                                    <div><p>族内专利数量 : </p><span> 1 件</span></div>
                                    <div><p>申请日区间 : </p><span> 2016年08月15日 — 2016年08月15日</span></div>
                                    <div><p>公开日区间 : </p><span> 2017年01月04日 — 2017年01月04日</span></div>
                                </div>
                                <div class="right">
                                    <div><p>国家/地区范围 : </p><span> 1 个：中国/CN</span></div>
                                    <div><p>包含PCT同族 : </p><span> 否</span></div>
                                    <div><p>包含EP同族 : </p><span> 否</span></div>
                                </div>
                            </div>
                
                            <h3>族内专利列表</h3>
                            <div class="tab-pane active" id="tab-r1">
                                <div class="click-btn">
                                    <button class="active1 btn1 hu-btn btn-primary-outline">基本专利族</button>
                                    <button class="btn2 hu-btn btn-primary-outline">扩展专利族</button>
                                </div>
                                <div class="tab-con">
                                    <table class="tb1">
                                        <thead>
                                        <tr>
                                            <th>法律效力</th>
                                            <th>申请号及申请日</th>
                                            <th>公开历史</th>
                                            <th>专利名称</th>
                                            <th>申请人</th>
                                            <th>被引来源</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>未授权</td>
                                            <td>CN201610670879.X 20160815</td>
                                            <td>CN106296362A 20170104</td>
                                            <td>Mixed ceagnostic systems</td>
                                            <td>DIAGNOSTIC HYBRIDS INC</td>
                                            <td>sad</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="tb2">
                                        <thead>
                                        <tr>
                                            <th>法律效力1</th>
                                            <th>申请号及申请日2</th>
                                            <th>公开历史3</th>
                                            <th>专利名称4</th>
                                            <th>申请人5</th>
                                            <th>被引来源6</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>未授权</td>
                                            <td>US200005600508</td>
                                            <td>US6280928B1 20010828</td>
                                            <td>Mixed ceag systems</td>
                                            <td>DIAGNOSTIC HYBRIDS INC</td>
                                            <td>sad</td>
                                        </tr>
                                        <tr>
                                            <td>未授权</td>
                                            <td>US200009520000508</td>
                                            <td>US6280920010828</td>
                                            <td>Mixed ceagnostic systems</td>
                                            <td>DIAGNOIC HYBRIDS INC</td>
                                            <td>sad</td>
                                        </tr>
                                        <tr>
                                            <td>未授权</td>
                                            <td>US200729520000508</td>
                                            <td>US6280928B1828</td>
                                            <td>Mixed ceagic systems</td>
                                            <td>DIAGNOSTIC HYDS INC</td>
                                            <td>sad</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>`;
                        $('.content').html(HTML);
                    }
                }
            })
        }

        return PatentfamilyService;
    }
})(window, jQuery);
