/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.patentSearchListService = patentSearchListService();

    function patentSearchListService() {
        var patentSearchListService = {};
        patentSearchListService.pageNo = commonService.getQuery('pageNo') ? commonService.getQuery('pageNo') : 1;
        patentSearchListService.kw = commonService.getQuery('q') ? commonService.getQuery('q') : '';
        patentSearchListService.getQueryCondition = function () {
            let queryCondition = [];
            $('.filter .filter-line').each(function () {
                let _this = $(this);
                let name = _this.attr('name');
                let selected = _this.find('li.selected');
                let value = selected.text() === '全部' ? void(0) : (selected.attr('value') || selected.text());
                let JSON_value = _this.attr('JSON-value');
                if (value || JSON_value) {
                    queryCondition.push({
                        field: name,
                        condition: _this.attr('condition') || "eq",
                        relation: _this.attr('relation') || "and",
                        vList: JSON_value ? JSON.parse(JSON_value) : value.split(',')
                    });
                }
            });
            return JSON.stringify(queryCondition);
        };


        $(function () {
            $('.main-search').find('input').val(patentSearchListService.kw);
            allclick();
            commonService.initQuery(getInfo);
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });

            $('.filter').on('click', 'li', function () {
                let $this = $(this);
                $this.addClass('selected').siblings('li').removeClass('selected');
                let querys = {};
                let name = $this.parents('.filter-line').attr('name');
                let value = ($this.text() === '全部') ? void(0) : $(this).text();
                querys[name] = value;
                querys.pageNo = void(0);
                commonService.setQuerys(querys);
            });


            //点击左侧
            $('.main-right').on('click', '.right-box-title', function () {
                $(this).toggleClass('open').siblings('.rigth-box-con').toggleClass('hide');
                $(this).find('i').toggleClass('rotate')
            });

            //点击搜索
            $('.main-search button').click(function () {
                var kw=$('.main-search input').val();
                if(kw){
                    window.location.href='patentSearchList.html?q='+kw;
                }else{
                    toastr.info('请输入搜索关键词')
                }
            })



        }


        function getInfo() {
            let queryCondition = patentSearchListService.getQueryCondition();
            hieknjs.kgLoader({
                type: 1,
                url: 'http://www.kechuang.cn/hk_patent_ws/api/patent/search',
                that: $('#content')[0],
                postData: {
                    kw: patentSearchListService.kw,
                    queryCondition
                },
                urlData: {
                    pageNo: patentSearchListService.pageNo,
                    pageSize: 10
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        console.log(1)
                        patentSearchListService.pageNum = Math.ceil(data.rsCount / 10);
                        var leftHTML = '';
                        for (var val of data.rsData) {
                            leftHTML += `<div class="main-left-box">
                                            <a href="patentDetail.html?id=${val.id}" class="left-box-title" title="${val.patent.title.original ? val.patent.title.original : val.patent.title.en}">${val.patent.title.original ? val.patent.title.original : val.patent.title.en?val.patent.title.en:'标题暂缺'}</a>
                                            <div class="left-box-item">
                                                <p class="box-item-key">申请号：</p>
                                                <span class="box-item-value">${val.patent.application_number ? val.patent.application_number : ''}</span>
                                            </div>
                                            <div class="left-box-item">
                                                <p class="box-item-key">申请人：</p>
                                                <span class="box-item-value">${val.patent.applicants[0]?val.patent.applicants[0].name ? val.patent.applicants[0].name.original ? val.patent.applicants[0].name.original : '' : '':''}</span>
                                            </div>
                                            <br>
                    
                                            <div class="left-box-item">
                                                <p class="box-item-key">发明人：</p>
                                                <span class="box-item-value">${val.patent.inventors[0]?val.patent.inventors[0].name?val.patent.inventors[0].name.original?val.patent.inventors[0].name.original:'':'':''}</span>
                                            </div>
                                            
                                            <br>
                                            <div class="left-box-item">
                                                <p class="box-item-key">专利摘要：</p>
                                                <span class="box-item-value">${val.patent.abstract.original ? val.patent.abstract.original : val.patent.abstract.en}</span>
                                            </div>
                                        </div>`;
                        }
                        $('.main-left').find('.hu-card-body').html(leftHTML);
                    }else{
                        console.log(2)
                        $('.main-left').find('.hu-card-body').html('<div style="display: flex;justify-content: center;align-content: center;width: 100%;"><img style="display: flex;width: 200px;height: 200px;margin: 50px auto 200px" src="../images/icon-no-data.svg"></div>')
                    }
                    gentPage();
                }
            })
        }

        function gentPage() {
            var config = {
                data: {
                    id: 4
                },
                selector: '#page',
                total: patentSearchListService.pageNum,
                showNum: 5,
                current: patentSearchListService.pageNo,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    commonService.setQuery('pageNo', pageNo);
                    patentSearchListService.pageNo = pageNo;
                }
            };
            new huPagination(config);
        }


        return patentSearchListService;
    }
})(window, jQuery);
