/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.patentDetailService = patentDetailService();

    function patentDetailService() {
        var patentDetailService = {};
        patentDetailService.id = commonService.getSearchParm('id') || 'ep20030723023';
        // patentDetailService.id = 'cn200910144612';
        $(function () {
            allclick();
            getData();
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $('.main-nav').on('click', 'p', function () {
                $('#tabBox').find('.' + $(this).attr('id')).removeClass('hide').siblings().addClass('hide');
                $(this).closest('.hu-card').addClass('selected').siblings('.hu-card').removeClass('selected');
            });

            $('body').on("click", '.bt-ctr', function () {
                if ($(this).parents('.mata-code-mes').find(".for-control").is(":visible")) {
                    $(this).parents('.mata-code-mes').find(".for-control").hide();
                    $(this).attr("class", "bt-ctr icon hufont ic-control-point");
                } else {
                    $(this).parents('.mata-code-mes').find(".for-control").show();
                    $(this).attr("class", "bt-ctr icon hufont ic-remove-circle-outline").addClass('change-color');
                }
            })

            $('body').on('click', '.inventors9', function () {
                var id = $(this).find('a').attr('href').split('-')[2];
                var kw = $(this).find('a').text();
                getPoepleOthersData(0, id, kw)
            })
            $('body').on('click', '.applicants9', function () {
                var id = $(this).find('a').attr('href').split('-')[2];
                var kw = $(this).find('a').text();
                getPoepleOthersData(1, id, kw)
            })

            //引用与被引
            $(".quote").on("click", '.click-btn .btn1', function () {
                $(".quote .tab-pane .tab-con .tb1").show().siblings().hide();
                $(".quote .click-btn .btn1").addClass("active1");
                $(".quote .click-btn .btn2").removeClass("active1");
            });
            $(".quote").on("click", '.click-btn .btn2', function () {
                $(".quote .tab-pane .tab-con .tb2").show().siblings().hide();
                $(".quote .click-btn .btn2").addClass("active1");
                $(".quote .click-btn .btn1").removeClass("active1");
            })


        }

        function getData() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL2 + 'patent/get',
                that: $('.main')[0],
                urlData: {
                    id: patentDetailService.id,
                },
                success: function (data) {
                    //第一页
                    let d = data.rsData[0];
                    try {
                        $('.patentBaseInfo').html(
                            `
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
        <div hidden class="main-date">
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
                                if (d.legal && d.legal.patent_legal_status && d.legal.patent_legal_status.assignees) {
                                    for (let d1 of d.legal.patent_legal_status.assignees) {
                                        arr.push(`${d1.name.original}（${d1.countries.join(',')}） （${d1.type}）<br>${d1.address.original}`);
                                    }
                                }

                                return arr.join('<br>');
                            })()}
                        </span></div>
            <div class="de-pa-litem">
                <p class="de-pa-litem-p">专利权人历史:</p>
                <span class="detail-word">
                            ${(() => {
                                let arr = [];
                                if (d.legal && d.legal.patent_legal_status && d.legal.patent_legal_status.assignees_history) {
                                    for (let d1 of d.legal.patent_legal_status.assignees_history) {
                                        arr.push(d1.name.original);
                                    }
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
                            <span class="word-mes"></span>
                            <i class="icon hufont ic-control-point bt-ctr "></i>
                        </div>
                        <div class="for-control">
                            <ul class="G-detail">
                            ${(() => {
                                        let html = '';
                                        for (let d2 of d1.ancestors) {
                                            html += `<li class="detail-show">
                                    <p class="detail-show-p">${d2.toUpperCase()}</p>
                                    <span class="detail-show-span"></span>
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
        <div class="creater-patent tabs-nav-container show-all">
            <p class="for-not-change">发明人专利</p>
            <div class="cre-patent tabs-wrap">
                <ul class="hu-tabs tabs-primary show-all">
                ${(() => {
                                var arr = d.patent.inventors;
                                var html = '';
                                var i=0;
                                for (var val of arr) {
                                    html += '<li class="inventors9" id="' + val.id + '"><a href="#tab-six-' + val.id + '" class="link-one" >' + val.name.original + '</a></li>'
                                }

                                return html;
                            })()}
                    
                    <span>共<em id="num001">0</em>条</span>
                    <li class="tabs-decoration" style="width: 80px; left: 0px;"></li>
                </ul>

            </div>
            <div class="cre-patent-rect hu-tab-content">
            ${(() => {
                                var arr = d.patent.inventors;
                                var html = '';

                                for (var val of arr) {
                                    html += '<div class="tab-pane" id="tab-six-' + val.id + '">加载中...</div>'
                                }

                                patentDetailService.inventors0 = arr[0];
                                return html;
                            })()}
                
            </div>
            <div class="showmore">
                     <span class="load">
                        <!--<a href="">点击查看更多>></a>-->
                    </span>
            </div>

        </div>
        <div class="creater-patent tabs-nav-container show-all">
            <p class="for-not-change">申请人专利</p>
            <div class="cre-patent tabs-wrap">
                <ul class="hu-tabs tabs-primary show-all">
                ${(() => {
                                var arr = d.patent.applicants;
                                var html = '';

                                for (var val of arr) {
                                    console.log(val);
                                    html += '<li class="applicants9" id="' + val.id + '"><a href="#tab-six-' + val.id + '" class="link-one" >' + val.name.original + '</a></li>'
                                }

                                return html;
                            })()}
                    
                    <span>共<em id="num002">0</em>条</span>
                    <li class="tabs-decoration" style="width: 80px; left: 0px;"></li>
                </ul>

            </div>
            <div class="cre-patent-rect hu-tab-content">
            ${(() => {
                                var arr = d.patent.applicants;
                                var html = '';

                                for (var val of arr) {
                                    html += '<div class="tab-pane " id="tab-six-' + val.id + '">加载中...</div>'
                                }


                                patentDetailService.applicants0 = arr[0];
                                return html;
                            })()}
                
            </div>
            <div class="showmore">
                     <span class="load">
                        <!--<a href="">点击查看更多>></a>-->
                    </span>
            </div>

        </div>
        
        `);

                        $('#' + patentDetailService.inventors0.id).addClass('active');
                        $('#tab-six-' + patentDetailService.inventors0.id).addClass('active');
                        $('#tab-six-' + patentDetailService.applicants0.id).addClass('active');
                        $('#tab-six-' + patentDetailService.applicants0.id).addClass('active');


                        // getPoepleOthersData(0, patentDetailService.inventors0.id, patentDetailService.inventors0.name.original);
                        // getPoepleOthersData(1, patentDetailService.applicants0.id, patentDetailService.applicants0.name.original);
                        $('.inventors9').eq(0).click();
                        $('.applicants9').eq(0).click();
                    } catch (err) {
                        console.log(err)
                    }
                    //第一页

                    //第二页


                    //第二页


                    if (data && data.rsData && data.rsData.length) {
                        var patent = data.rsData[0].patent || {application_number: ''};
                        var legal = data.rsData[0].legal ? data.rsData[0].legal.patent_legal_status || {
                            legal_status: 0,
                            lapse_date: ''
                        } : 0;
                        var mainNameHTML = `
                                            <!--<div class="main-name">-->
                                                <h3>${patent.title.original}</h3>
                                                <h6>${patent.title.en}</h6>
                                                <div class="main-name-left">
                                                    <div class="left">
                                                        <p>申请号 : <span>${patent.application_number}</span></p>
                                                        <p>申请日 : <span>${JSON.stringify(patent.application_date).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日")}</span></p>
                                                    </div>
                                                    <div class="cent">
                                                        <p>最早优先权日 :${patent.earliest_priority_date} </p>
                                                        <p>最早公开日 :${patent.earliest_publication_date}</p>
                                                    </div>
                                                    <div class="right">
                                                        <p>公开号 :${patent.publication_number}</p>
                                                        <p>专利类型 : ${patent.type ? (['', '发明', '新型', '外观'][patent.type]) : ''}</p>
                                                    </div>
                                                </div>
                                            <!--</div>-->
                                            `
                        $('.main-name').html(mainNameHTML);


                        var legal_status_history = '';
                        if (legal && legal.legal_status_history && legal.legal_status_history.length) {
                            for (var val of legal.legal_status_history) {
                                legal_status_history += `<div class="box-line">
                                                        <p><i class="icon hufont ic-access-time"></i>${val.publication_date}</p>
                                                        <p class="con">${val.description}</p>
                                                    </div>`
                            }
                        }


                        moment.locale('zh-cn');
                        var nowTime = moment().format("YYYYMMDD");
                        var applyTime = patent.application_date;
                        var expireTime = legal.lapse_date;
                        var liveTime, surplusTime, a, b, c;
                        if (nowTime <= expireTime) {
                            expireTime = JSON.stringify(expireTime).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3").split('-');
                            nowTime = nowTime.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3").split('-');
                            applyTime = JSON.stringify(applyTime).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3").split('-');
                            liveTime = moment(applyTime).fromNow(true);
                            a = moment(expireTime);
                            b = moment(nowTime);
                            c = moment(applyTime);
                            if (a != undefined && b != undefined) {
                                surplusTime = a.from(b, true);
                            } else {
                                surplusTime = ''
                            }

                        } else {
                            console.log(a, b, c)
                            if (a != undefined && c != undefined) {
                                liveTime = a.from(c, true);
                            } else {
                                liveTime = '';
                            }

                            surplusTime = 0;
                        }


                        var legalinformationHTML = `<div class="content">
                                                        <h3>当前法律信息</h3>
                                                        <div class="num">
                                                            <div class="left">
                                                                <div><p>当前法律状态 : </p><span> ${legal.legal_status ? ['', '空开', '授权', '失信'][legal.legal_status] : ''}</span></div>
                                                                <div><p>申请日 : </p><span> ${JSON.stringify(patent.application_date).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日")}</span></div>
                                                                <div><p>首次公开日 : </p><span> ${JSON.stringify(patent.earliest_publication_date).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日")}</span></div>
                                                            </div>
                                                            <div class="right">
                                                                <div><p>存活期 : </p><span> ${liveTime}</span></div>
                                                                <div><p>预期剩余寿命 : </p><span>${surplusTime}</span></div>
                                                                <div><p>预期失效日 : </p><span> ${legal.lapse_date ? JSON.stringify(legal.lapse_date).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日") : ''}</span></div>
                                                            </div>
                                                        </div>
                                                        <h3>代理信息</h3>
                                                        <div class="num">
                                                            <div class="left">
                                                                <div><p>专利代理机构 : </p><span> ${patent.agencies ? patent.agencies : ''}</span></div>
                                                            </div>
                                                            <div class="right">
                                                                <div><p>专利代理人 : </p><span> ${patent.agents ? patent.agents : ''}</span></div>
                                                            </div>
                                                        </div>
                                                        <h3>公用公知状态</h3>
                                                        <div class="num">
                                                            <div class="left">
                                                                <div><p>公用公知状态 : </p><span> ${patent.ifree_to_operate1_2 ? patent.ifree_to_operate1_2 : '' }</span></div>
                                                            </div>
                                                        </div>
                                                        <h3>法律状态变更历史</h3>
                                                        ${legal_status_history}
                                                        
                                                        <!--<h3>法律信息历史</h3>-->
                                                        <!--<div class="box-line">-->
                                                            <!--<p><i class="icon hufont ic-access-time"></i>2017年01月04日54654645</p>-->
                                                            <!--<p class="con">公87496849开</p>-->
                                                        <!--</div>-->
                                                        <!--<div class="box-line">-->
                                                            <!--<p><i class="icon hufont ic-access-time"></i>2017年02月354165401日 </p>-->
                                                            <!--<p class="con">实质65464审查</p>-->
                                                        <!--</div>-->
                                                    </div>`
                        $('.legalinformation').html(legalinformationHTML);
                        try {
                            //引用与被引
                            $('.quote').html(
                                `<div class="content">
        <h3>引用与被引</h3>
        <div class="University-bg commonality-bg">
            <div class="hu-tabs-container ">
                <div class="tabs-nav-container show-all">
                    <div class="tabs-wrap">
                        <ul class="hu-tabs tabs-secondary">
                            <li class="active">
                                <a href="#quote-tab-r1">
                                    专利引用表
                                </a>
                            </li>
                            <li class="">
                                <a href="#quote-tab-r2">
                                    专利被引表
                                </a>
                            </li>
                            <li class="">
                                <a href="#quote-tab-r3">
                                    文献引用表
                                </a>
                            </li>
                            <li class="tabs-decoration" style="height: 38px; top: 0px;">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="hu-tab-content">
                    <div class="tab-pane active" id="quote-tab-r1">
                        <div class="click-btn">
                            <button class="active1 btn1 hu-btn btn-primary-outline">本专利(<i class="num tb1-num">0</i>)</button>
                            <button class="btn2 hu-btn btn-primary-outline">专利族(<i class="num tb2-num">0</i>)</button>
                        </div>
                        <div class="tab-con">
                            <table class="tb1">
                                <thead>
                                <tr>
                                    <!--th>法律效力</th-->
                                    <th>申请号</th>
                                    <th>申请日</th>
                                    <th>公开历史</th>
                                    <th>专利名称</th>
                                    <th>申请人</th>
                                    <th>被引来源</th>
                                </tr>
                                </thead>
                                <tbody>
                                    ${
                                    (() => {
                                        for (let d1 of d.patent.citing_patents) {
                                            hieknjs.kgLoader({
                                                type: 0,
                                                url: configService.RESTFUL_SERVICE_BASE_URL2 + 'patent/get',
                                                that: $('.main')[0],
                                                urlData: {
                                                    id: d1.id.toLowerCase(),
                                                },
                                                success: function (data) {
                                                    try {
                                                        if (!(data.rsData.length > 0)) {
                                                            return
                                                        }
                                                    }
                                                    catch (err) {
                                                        return
                                                    }
                                                    let d = data.rsData[0];
                                                    let html = `<tr>
                                                                    <!--<td>test</td>法律效力-->
                                                                    <td>${d.patent.application_number}</td>
                                                                    <td>${d.patent.application_date}</td>
                                                                    <td>${d1.id}</td>
                                                                    <td>${d.patent.title.original||d.patent.title.en}</td>
                                                                    <td>${(() => {
                                                        let arr = [];
                                                        for (let d1 of d.patent.applicants) {
                                                            arr.push(d1.name.original);
                                                        }
                                                        return arr.join('<br>');
                                                    })()}</td>
                                                                    <td>${d1.remark}</td>
                                                                </tr>`;
                                                    if (parseInt(d1.type) === 1) {
                                                        $('#quote-tab-r1 table.tb1 tbody').append(html);
                                                        $('#quote-tab-r1 i.tb1-num')[0].innerText++;
                                                    } else if (parseInt(d1.type) === 2) {
                                                        $('#quote-tab-r1 table.tb2 tbody').append(html);
                                                        $('#quote-tab-r1 i.tb2-num')[0].innerText++;
                                                    }
                                                }
                                            });
                                        }
                                        return '';
                                    })()
                                    }
                                    </tbody>
                                    </table>
                                    <table class="tb2">
                                    <thead>
                                    <tr>
                                    <!--th>法律效力</th-->
                                    <th>申请号</th>
                                    <th>申请日</th>
                                    <th>公开历史</th>
                                    <th>专利名称</th>
                                    <th>申请人</th>
                                    <th>被引来源</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                    </table>
                                    </div>
                                    </div>
                                    <div class="tab-pane" id="quote-tab-r2">
                                    <div class="click-btn">
                                    <button class="active1 btn1 hu-btn btn-primary-outline">本专利(<i class="num tb1-num">0</i>)</button>
                                    <button class="btn2 hu-btn btn-primary-outline">专利族(<i class="num tb2-num">0</i>)</button>
                                    </div>
                                    <div class="tab-con">
                                    <table class="tb1">
                                    <thead>
                                    <tr>
                                    <!--th>法律效力</th-->
                                    <th>申请号</th>
                                    <th>申请日</th>
                                    <th>公开历史</th>
                                    <th>专利名称</th>
                                    <th>申请人</th>
                                    <th>被引来源</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                                                        ${
                                    (() => {
                                        for (let d1 of d.patent.cited_patents) {
                                            hieknjs.kgLoader({
                                                type: 0,
                                                url: configService.RESTFUL_SERVICE_BASE_URL2 + 'patent/get',
                                                that: $('.main')[0],
                                                urlData: {
                                                    id: d1.id.toLowerCase(),
                                                },
                                                success: function (data) {
                                                    try {
                                                        if (!(data.rsData.length > 0)) {
                                                            return
                                                        }
                                                    }
                                                    catch (err) {
                                                        return
                                                    }
                                                    let d = data.rsData[0];
                                                    let html = `<tr>
                                                                    <!--<td>test</td>法律效力-->
                                                                    <td>${d.patent.application_number}</td>
                                                                    <td>${d.patent.application_date}</td>
                                                                    <td>${d1.id}</td>
                                                                    <td>${d.patent.title.original||d.patent.title.en}</td>
                                                                    <td>${(() => {
                                                        let arr = [];
                                                        for (let d1 of d.patent.applicants) {

                                                            arr.push(d1.name.original);
                                                        }
                                                        return arr.join('<br>');
                                                    })()}</td>
                                                                    <td>${d1.remark}</td>
                                                                </tr>`;
                                                    if (parseInt(d1.type) === 1) {
                                                        $('#quote-tab-r2 table.tb1 tbody').append(html);
                                                        $('#quote-tab-r2 i.tb1-num')[0].innerText++;
                                                    } else if (parseInt(d1.type) === 2) {
                                                        $('#quote-tab-r2 table.tb2 tbody').append(html);
                                                        $('#quote-tab-r2 i.tb2-num')[0].innerText++;
                                                    }
                                                }
                                            });
                                        }
                                        return '';
                                    })()
                                    }
                                    </tbody>
                                    </table>
                                    <table class="tb2">
                                    <thead>
                                    <tr>
                                    <!--th>法律效力</th-->
                                    <th>申请号</th>
                                    <th>申请日</th>
                                    <th>公开历史</th>
                                    <th>专利名称</th>
                                    <th>申请人</th>
                                    <th>被引来源</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                                                               </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="tab-pane" id="quote-tab-r3">
                                    <div class="tab-con">
                                        <table class="tb1">
                                            <thead>
                                            <tr>
                                                <th>文献说明</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            ${(() => {
                                    let html = '';
                                    for (let d1 of d.patent.cited_literatures) {
                                        html += `<tr><td>${d1.original}</td></tr>`;
                                    }
                                    return html;
                                })()}
                                    </tbody>
                                    </table>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>`);
                        }

                        catch (err) {
                        }

                    }
                }
            });

        }

        function getPoepleOthersData(type, id, kw) {
            var queryCondition;
            var subid = id;
            if (!type) {
                queryCondition = '[{"field":"inventors.id","condition":"eq","relation":"and",vList:["' + id + '"]}]'
            } else {
                queryCondition = '[{"field":"applicants.id","condition":"eq","relation":"and",vList:["' + id + '"]}]'
            }
            hieknjs.kgLoader({
                type: 1,
                url: 'http://www.kechuang.cn/hk_patent_ws/api/patent/search',
                postData: {
                    kw,
                    queryCondition
                },
                urlData: {
                    pageNo: 1,
                    pageSize: 6
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        if (type) {
                            $('#num002').text(data.rsCount);
                        } else {
                            $('#num001').text(data.rsCount);
                        }


                        var HTML = '';
                        var max=0;
                        for (var val of data.rsData) {
                            if(max<6){
                                HTML += `<div class="six">
                                            <a href="patentDetail.html?id=${val.id}"><span>${val.patent.title.original}</span></a>
                                            <ul>
                                                <li class="list-one"></li>
                                                <li class="list-one"></li>
                                                <li class="list-one"></li>
                                                <li class="list-one"></li>
                                            </ul>
                                            <div class="th-introd">
                                                <ul>
                                                    <li class="list-two">
                                                        <p class="patten">申请人：</p>
                                                        <span class="department" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap">${(() => {

                                    var arr = [];

                                    for (var val2 of val.patent.applicants) {
                                        arr.push(val2.name.original)
                                    }
                                    return arr.length > 1 ? arr.join(',') : arr[0];
                                })()}
                                                        </span>
                                                    </li>
                                                    <li class="list-two">
                                                        <p class="patten">发明人：</p>
                                                        <span class="department" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap">${(() => {

                                    var arr = [];
                                    for (var val3 of val.patent.inventors) {
                                        arr.push(val3.name.original)
                                    }
                                    return arr.join(',');
                                })()}
                                                        
                                                    </span>
                                                    </li>
                                                    <li class="list-two">
                                                        <p class="patten">专利类型：</p>
                                                        <span class="department">${val.patent.type ? (['', '发明', '新型', '外观'][val.patent.type]) : ''}</span>
                                                    </li>
                    
                                                </ul>
                                            </div>
                                        </div>`;
                            }
                            max++;

                        }
                        if(data.rsCount>6){
                        HTML+=`<div class="showmore">
                <span class="load">
                <a href="patentSearchList.html?q=${kw}">点击查看更多>></a>
                </span>
                </div>`;}

                        $('#tab-six-' + subid).html(HTML);

                    } else {
                        if (type) {
                            $('#num002').text(0);
                        } else {
                            $('#num001').text(0);
                        }
                        $('.tab-six-' + subid).html('<div style="display: flex;justify-content: center;align-content: center;width: 100%;"><img style="display: flex;width: 200px;height: 200px;margin: 50px auto 200px" src="../images/icon-no-data.svg"></div>')
                    }
                }
            })
        }


        return patentDetailService;
    }
})
(window, jQuery);
