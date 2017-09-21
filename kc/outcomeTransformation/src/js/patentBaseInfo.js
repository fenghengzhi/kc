/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.patentBaseInfoService = patentBaseInfoService();

    function patentBaseInfoService() {
        var patentBaseInfoService = {};

        $(function () {
            allclick();
            getInfo();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $('body').on("click", '.bt-ctr', function () {
                if ($(this).parents('.mata-code-mes').find(".for-control").is(":visible")) {
                    console.log(1)
                    $(this).parents('.mata-code-mes').find(".for-control").hide();
                    $(this).attr("class", "bt-ctr icon hufont ic-control-point");
                } else {
                    console.log(2)
                    $(this).parents('.mata-code-mes').find(".for-control").show();
                    $(this).attr("class", "bt-ctr icon hufont ic-remove-circle-outline").addClass('change-color');
                }
            })

        }

        function getInfo() {
            let id = commonService.getSearchParm('id');
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL2 + 'patent/get',
                that: $('#content')[0],
                postData: {},
                urlData: {
                    id
                },
                success: function (data) {
                    let d = data.rsData[0];
                    console.log(d);
                    try {
                        $('.main').html(
                            `<div class="main-topbg">
            <div class="main-nav">
                <div class="hu-card selected">
                    <div class="hu-card-body">
                        <a href="#">
                            <img src="../images/icon-outcome-basic.svg" alt="home">
                            基本信息
                        </a>
                    </div>
                </div>
                <div class="hu-card">
                    <div class="hu-card-body ">
                        <a href="claims.html?id=${id}">
                            <img src="../images/icon-outcome-right.svg" alt="bid">
                            权利要求
                        </a>
                    </div>
                </div>
                <div class="hu-card">
                    <div class="hu-card-body">
                        <a href="specification.html?id=${id}">
                            <img src="../images/icon-outcome-book.svg" alt="reward">
                            说明书
                        </a>
                    </div>
                </div>
                <div class="hu-card">
                    <div class="hu-card-body">
                        <a href="legalinformation.html?id=${id}">
                            <img src="../images/icon-outcome-law.svg" alt="transact">
                            法律信息
                        </a>
                    </div>
                </div>
                <div class="hu-card">
                    <div class="hu-card-body">
                        <a href="quote.html?id=${id}">
                            <img src="../images/icon-outcome-reference.svg" alt="statistics">
                            引用与被引
                        </a>
                    </div>
                </div>
                <div class="hu-card">
                    <div class="hu-card-body">
                        <a href="Patentfamily.html?id=${id}">
                            <img src="../images/icon-outcome-family.svg" alt="statistics">
                            专利家族
                        </a>
                    </div>
                </div>
            </div>
            <div class="main-name">
                <div class="main-name-one">
                    <p>${d.patent.title.original}</p>
                </div>
                <div class="main-name-two">
                    <div class="appraise">
                        <p>申请号 : <span>${d.patent.application_number}</span></p>
                        <em>未授权 : <span>剩余18年11月</span></em>
                    </div>
                    <div class="appraise-first">
                        <p>综合评分 : <span>★★★</span></p>
                        <em>权利评分 : <span>★★☆</span></em>
                    </div>
                    <div class="appraise-first">
                        <p>技术评分 : <span>★★</span></p>
                        <em>市场评分 : <span>☆</span></em>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-con">
            <h1>名称及摘要</h1>

            <p>中</p>
            <span>${d.patent.title.original}</span>
            <div class="word-int">
                ${d.patent.abstract.original}
            </div>
            <div class="addheight"></div>
            <p>英</p>
            <span>${d.patent.title.en}</span>
            <div class="word-int">
                ${d.patent.abstract.en}
            </div>
        </div>
        <div class="main-date">
            <h1>号码及日期</h1>
            ${(() => {
                                return `<div class="detail-mes">
                <ul>
                    <li><p>申请号</p><span>CN201610670879.X</span></li>
                    <li><p>申请日</p><span>2016年08月15日</span></li>
                    <li><p>本阶段公开号</p><span>CN106296362A 20170104</span></li>
                    <li><p>其他形式申请的号</p><span>CN201610670879</span></li>
                    <li><p>其他形式申请的号</p><span>CN201610670879</span></li>
                    <li><span>CN201610670879</span></li>
                    <li><span>CN201610670879</span></li>
                </ul>
            </div>
<div class="detail-mes">
                <ul>
                    <li><p>申请号</p><span>CN201610670879.X</span></li>
                    <li><p>申请日</p><span>2016年08月15日</span></li>
                    <li><p>本阶段公开号</p><span>CN106296362A 20170104</span></li>
                    <li><p>其他形式申请的号</p><span>CN201610670879</span></li>
                    <li><p>其他形式申请的号</p><span>CN201610670879</span></li>
                    <li><span>CN201610670879</span></li>
                    <li><span>CN201610670879</span></li>
                </ul>
            </div>`;
                            })()}
        </div>
        <div class="detail-patent">
            <p class="detail-patenter">
                专利及归属
            </p>
            <div class="de-pa-litem">
                <p class="de-pa-litem-p">本阶段申请人:</p>
                <span class="detail-word">
                            ${(() => {
                                let arr = [];
                                for (let d1 of d.patent.applicants) {
                                    arr.push(`${d1.name.original}（${d1.countries.join(',')}） （${d1.type}）<br>${d1.address.original}`);
                                }
                                return arr.join('<br>');
                            })()}
                        </span>
            </div>
            <div class="de-pa-litem">
                <p class="de-pa-litem-p">当前专利权人:</p>
                <span class="detail-word">
                            ${(() => {
                                let arr = [];
                                for (let d1 of d.legal.patent_legal_status.assignees) {
                                    arr.push(`${d1.name.original}（${d1.countries.join(',')}） （${d1.type}）<br>${d1.address.original}`);
                                }
                                return arr.join('<br>');
                            })()}
                        </span></div>
            <div class="de-pa-litem">
                <p class="de-pa-litem-p">专利权人历史:</p>
                <span class="detail-word">
                            ${(() => {
                                let arr = [];
                                for (let d1 of d.legal.patent_legal_status.assignees_history) {
                                    arr.push(d1.name.original);
                                }
                                return arr.join('<br>')
                            })()}
                        </span></div>
            <div class="de-pa-litem">
                <p class="de-pa-litem-p">本阶段发明人:</p>
                <span class="detail-word">
                     ${(() => {
                                let arr = [];
                                for (let d1 of d.patent.inventors) {
                                    arr.push(d1.name.original);
                                }
                                return arr.join(' ');
                            })()}
                        </span></div>

            <div class="de-pa-litem">

                <p class="de-pa-litem-p">&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp; 审查员:</p>
                <span class="detail-word">
                 ${d.patent.examiner.join(' ')}
                </span>
            </div>
        </div>
        <div class="main-patent">
            <p class="main-patent-p">专业分类</p>
            <div class="main-patent-ipc">
                <p class="main-ipc-title">
                    IPC分类号：
                </p>
                <ul class="mata-code">
                ${(() => {
                                let html = '';
                                for (let d1 of d.patent.ipcs) {
                                    html += `<li class="mata-code-mes">
                        <div class="for-block">
                            <p class="num-code">${d1.ipc.toUpperCase()} </p>
                            <span class="word-mes">
                         ??????
                        </span>
                            <i class="icon hufont ic-control-point bt-ctr "></i>
                        </div>
                        <div class="for-control">
                            <ul class="G-detail">
                            ${(() => {
                                        let html = '';
                                        for (let d2 of d1.ancestors) {
                                            html += `<li class="detail-show">
                                    <p class="detail-show-p">${d2.toUpperCase()}</p>
                                    <span class="detail-show-span">???</span>
                                </li>`
                                        }
                                        return html;
                                    })()}
                            </ul>
                        </div>
                    </li>`;
                                }
                                return html;
                            })()}
                </ul>

            </div>
        </div>
        <div hidden class="creater-patent tabs-nav-container show-all">
            <p class="for-not-change">发明人专利</p>
            <div class="cre-patent tabs-wrap">
                <ul class="hu-tabs tabs-primary show-all">
                    <li class="active"><a href="#tab-six-1" class="link-one">俞斌</a></li>
                    <li><a href="#tab-six-2" class="link-one">李远松</a></li>
                    <li><a href="#tab-six-3" class="link-one">罗亚娇</a></li>
                    <li><a href="#tab-six-4" class="link-one">汪玉</a></li>
                    <li><a href="#tab-six-5" class="link-one">李圆智</a></li>
                    <li><a href="#tab-six-6" class="link-one">丁津津</a></li>
                    <li><a href="#tab-six-7" class="link-one">高博</a></li>
                    <li><a href="#tab-six-8" class="link-one">郑国强</a></li>
                    <span>共<em>6</em>条</span>
                    <li class="tabs-decoration" style="width: 80px; left: 0px;"></li>
                </ul>

            </div>
            <div class="cre-patent-rect hu-tab-content">
                <div class="tab-pane active" id="tab-six-1">
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="tab-six-2">
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="tab-six-3">
                    <div>
                        <div class="six">
                            <span>智能变电站交换机网络性能评估方法</span>
                            <ul>
                                <li class="list-one">
                                    <button class="hu-btn btn-primary btn-xs">集合</button>

                                </li>
                                <li class="list-one">
                                    <button class="hu-btn btn-primary btn-xs">交换机</button>
                                </li>
                                <li class="list-one">
                                    <button class="hu-btn btn-primary btn-xs">交换机</button>
                                </li>
                                <li class="list-one">
                                    <button class="hu-btn btn-primary btn-xs">交换机</button>
                                </li>
                            </ul>
                            <div class="th-introd">
                                <ul>
                                    <li class="list-two">
                                        <p class="patten">申请人：</p>
                                        <span class="department">国网安徽省电力科学研究院</span>
                                    </li>
                                    <li class="list-two">
                                        <p class="patten">发明人：</p>
                                        <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                    </li>
                                    <li class="list-two">
                                        <p class="patten">专利申请：</p>
                                        <span class="department">发明专利</span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="six">
                            <div></div>
                        </div>
                        <div class="six">
                            <div></div>
                        </div>
                        <div class="six">
                            <div></div>
                        </div>
                        <div class="six">
                            <div></div>
                        </div>
                        <div class="six">
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="tab-six-4">
                    <div></div>
                </div>
                <div class="tab-pane" id="tab-six-5">
                    <div></div>
                </div>
                <div class="tab-pane" id="tab-six-6">
                    <div></div>
                </div>
                <div class="tab-pane" id="tab-six-7">
                    <div></div>
                </div>
                <div class="tab-pane" id="tab-six-8">
                    <div></div>
                </div>
            </div>
            <div class="showmore">
                     <span class="load">
                        <a href="">点击查看更多>></a>
                    </span>
            </div>

        </div>
        <div hidden class="creater-patent tabs-nav-container show-all">
            <p class="for-not-change">同单位专利</p>
            <div class="cre-patent tabs-wrap">
                <ul class="hu-tabs tabs-primary show-all">
                    <li class="active"><a href="#tab-six-one">国家电网公司</a></li>
                    <li><a href="#tab-six-two">国网安徽省电力公司电力科学研究院</a></li>
                    <span>共<em>77324</em>条</span>
                    <li class="tabs-decoration" style="width: 144px; left: 0px;"></li>
                </ul>
            </div>
            <div class="cre-patent-rect hu-tab-content">
                <div class="tab-pane active" id="tab-six-one">
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="tab-six-two">
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="six">
                        <span>智能变电站交换机网络性能评估方法</span>
                        <ul>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">集合</button>

                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                            <li class="list-one">
                                <button class="hu-btn btn-primary btn-xs">交换机</button>
                            </li>
                        </ul>
                        <div class="th-introd">
                            <ul>
                                <li class="list-two">
                                    <p class="patten">申请人：</p>
                                    <span class="department">国网安徽省电力科学研究院</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">发明人：</p>
                                    <span class="department">高博 丁津津 汪玉 李远松 罗亚桥</span>
                                </li>
                                <li class="list-two">
                                    <p class="patten">专利申请：</p>
                                    <span class="department">发明专利</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="showmore">
                     <span class="load">
                        <a href="">点击查看更多>></a>
                    </span>
            </div>

        </div>`);
                        // getInfo1();
                    } catch (err) {
                        console.log(err)
                        alert('出错')
                    }
                }
            })

        }

        function getInfo1() {
            let id = commonService.getSearchParm('id');
            hieknjs.kgLoader({
                type: 1,
                url: 'http://www.kechuang.cn/hk_patent_ws/api/patent/search',
                // that: $('#content')[0],
                postData: {
                    kw: '多晶硅还原炉'
                },
                urlData: {
                    pageNo: 1,
                    pageSize: 6
                },
                success: function (data) {
                    let d = data.rsData[0];
                    console.log(d);
                    try {

                    } catch (err) {
                        console.log(err)
                        alert('出错')
                    }
                }
            })

        }

        return patentBaseInfoService;
    }
})(window, jQuery);
