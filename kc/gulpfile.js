'use strict';
var gulp = require('gulp');    //载入gulp
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
gulp.task('replace', function () {
    let dirnames = {
        4: 'policyMatch',
        5: 'huqionghezuo',
        6: 'outcomeTransformation',
        7: 'resourceSharing',
        9: 'popularSciencePlatform',
        13: 'innovativeService',
        100: 'technicalTransaction'
    };
    // let indexmenu = `<li><a href="/haikou/首页.html">首页</a></li>
    //                 <li><a href="/haikou/项目简介.html">项目简介</a></li>
    //                 <li><a href="/haikou/院士谷.html">院士谷</a></li>
    //                 <li><a href="/haikou/zffw.htm">政府服务</a></li>
    //                 <li><a href="/haikou/沪琼合作首页.html">沪琼合作</a></li>
    //                 <li><a href="/kc/outcomeTransformation/index.html">科技成果转化</a></li>
    //                 <li><a href="/haikou/科创资源共享首页.html">科创资源共享</a></li>
    //                 <li><a href="/haikou/index.html">大数据开放平台</a></li>
    //                 <li><a href="/kc/popularSciencePlatform/popularhome.html">科普平台</a></li>
    //                 <li><a href="/haikou/海口今日科创介绍.html">海口今日科创</a></li>
    //                 <li><a href="/haikou/领导版客户端介绍.html">领导版客户端</a></li>
    //                 <li><a href="/haikou/影视周开幕式.html">影视周开幕式</a></li>
    //                 <li><a href="/kc/innovativeService/index.html">科创服务</a></li>`;
    //
    // let submenu = {
    //     4: `<li><a href="/haikou/zffw.htm">首页</a></li>
    //         <li><a href="/haikou/通知通告.html">通知公告</a></li>
    //         <li><a href="/haikou/政策法规.html">政策法规</a></li>
    //         <li><a href="###href015">在线办理</a></li>
    //         <li><a href="###href016">权力清单</a></li>
    //         <li class="selected"><a href="/kc/policyMatch/policyMatch.html">科技政策匹配</a></li>`,
    //
    //     5: `<li><a href="/haikou/沪琼合作首页.html">首页</a></li>
    //         <li><a href="/haikou/实验室共享.html">实验室共享</a></li>
    //         <li class="selected"><a href="/kc/huqionghezuo/technicalliterature.html">科技文献</a></li>
    //         <li><a href="###href015">专家推荐</a></li>`,
    //
    //     6: ``,
    //
    //     7: `<li><a href="/haikou/科创资源共享首页.html">首页</a></li>
    //         <li><a href="/haikou/共享业务管理.html">共享业务管理</a></li>
    //         <li><a href="/haikou/创新载体展现.html">创新载体展示</a></li>
    //         <li><a href="/haikou/人才检索.html">人才推荐</a></li>
    //         <li><a href="/haikou/仪器共享.html">仪器共享</a></li>
    //         <li><a href="/kc/resourceSharing/intelligencePeriodical.html">科技情报</a></li>
    //         <li><a href="/kc/resourceSharing/techSearchList.html">科技查新</a></li>
    //         <li><a href="###href015">企业信息查询</a></li>`,
    //
    //     9: ``,
    //
    //     13: ``,
    //
    //     100:``
    // };
    //
    // for (let i in dirnames) {
    //     let dirname = dirnames[i];
    //     gulp.src(`./${dirname}/*.html`)
    //         .pipe(cheerio({
    //             run: function ($, file) {
    //                 // $('#content > div.header > div.header-part1 > div > ul').html(indexmenu);
    //                 // $(`#content > div.header > div.header-part1 > div > ul > li:nth-child(${i})`).addClass('selected');
    //                 // if (submenu[i]) {
    //                 //     $('#content > div.header > div.header-part2 > ul').html(submenu[i]);
    //                 // }
    //                 $('#content > div.header > div.header-part1 > div > ul > li:nth-child(13)').remove();
    //             }, parserOptions: {decodeEntities: false}
    //         }))
    //         .pipe(gulp.dest(`./${dirname}/`));
    // }
    //


    gulp.src(`./innovativeService/*.html`)
        .pipe(cheerio({
            run: function ($, file) {
                $('#content > div.header > div.header-part2 > ul > li:nth-child(1)').remove();
                $('#content > div.header > div.header-part2 > ul').prepend(
                `<li><a href="http://101.226.6.177:8089/kc/outcomeTransformation/index.html">首页</a></li>
                <li><a href="http://101.226.6.177:8089/kc/outcomeTransformation/rightSearch.html">全球知识产权库</a></li>
                <li><a href="http://101.226.6.177:8089/kc/outcomeTransformation/DemandList.html">成果转化开发平台</a></li>
                <li><a href="http://101.226.6.177:8089/kc/outcomeTransformation/ServiceList.html">第三方服务</a></li><li><a href="http://101.226.6.177:8089/haikou/基金.html">科创基金</a></li>
                <li><a href="http://101.226.6.177:8089/kc/technicalTransaction/index.html">技术交易市场</a></li>`);

            }, parserOptions: {decodeEntities: false}
        }))
        .pipe(gulp.dest(`./innovativeService/`));


    // gulp.src(`./*/*.html`)
    //     .pipe(replace(`<a href="/kc/outcomeTransformation/rightSearch.html">科技成果转化</a>`,`<a href="/kc/outcomeTransformation/rightSearch.html">知识产权服务</a>`))
    //
    //     .pipe(gulp.dest(`./`));


});