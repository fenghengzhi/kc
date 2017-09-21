/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.popularVideoDetailsService = popularVideoDetailsService();

    function popularVideoDetailsService() {
        let popularVideoDetailsService = {};

        $(function () {
            allclick();
            getInfo();
            addComment();
        });

        function addComment() {
            $('textarea[name=add_comment]').on('input', function () {
                $('.box1 .hint').text(`还可以输入${140 - $(this).val().length}字`);
                console.log('test');
            });
            // $('.box2 .submit-btn').click(function () {
            //     hieknjs.kgLoader({
            //         type: 0,
            //         url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/get/video',
            //         // that: $('#content')[0],
            //         postData: {},
            //         urlData: {
            //             id: id,
            //         },
            //         success: function (data) {
            //             // console.log(data);
            //             // setInfo(data, pageNo);
            //             History.Adapter.trigger(window,'onstatechange ')
            //         }
            //     })
            // });
        }

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })

        }


        function getInfo(pageNo) {
            let id = commonService.getQuery('id');
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/get/video',
                // that: $('#content')[0],
                postData: {},
                urlData: {
                    id: id,
                },
                success: function (data) {
                    console.log(data);
                    setInfo(data, pageNo);
                }
            })
        }

        function setInfo(data, pageNo) {

            let d = data.rsData[0];

            $('.main-part1').html(
                `<div class="main-part1-top">
                <div class="title">${d.title}</div>
                <div class="attrs">
                    <div class="play">播放：${d.readNum?d.readNum:0}</div>
                    <!--<div class="comment">评论：300</div>-->
                    <div class="time">上传时间：${moment(d.publishTime).format('YYYY-MM-DD HH:MM')}</div>
                </div>
            </div>
            <video style="width: 864px;height: 524px;" id="my-video" class="video-js vjs-default-skin" controls width="864" height="524"
                   
                    >
                    <!--poster="../assets/oceans.mp4.jpg"-->
                    <!--data-setup='{ "playbackRates": [1, 1.5, 2] }'-->
                <source src="../resources/popular_science_video/${d.source}" type='video/mp4'>
            </video>`
            );
            // videojs('my-video',{
            //     language: 'zh-CN'
            // });
            commonService.initQuery(initComment);
        }


        let pageSize = 8;

        function initComment() {
            let id = commonService.getQuery('id');
            let pageNo = commonService.getQuery('pageNo');
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'popular/science/list/comment',
                that: $('#content')[0],
                postData: {},
                urlData: {
                    id: id,
                    pageNo: pageNo,
                    pageSize: pageSize
                },
                success: function (data) {
                    console.log(data);
                    setComment(data, pageNo);
                }
            })
        }

        function setComment(data, pageNo) {
            let html = '';
            if(data.rsData.length){
                for (let d of data.rsData) {
                    html +=
                        `<div class="item">
        <div class="item-top">
        <div class="avatar"><img src="../images/user01.png" alt=""></div>
        <div class="username">${d.username}</div>
        <div class="desc">企业·专家</div>
        </div>
        <div class="item-con">
        ${d.content}
        </div>
        </div>`;
                }
                $('.main-part3').html(html);
                $('.comment').text(`评论：${data.rsCount}`);
                let total = Math.ceil(data.rsCount / pageSize);
                // console.log(total);
                gentPage(pageNo, total);
            }



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

        return popularVideoDetailsService;
    }
})
(window, jQuery);
