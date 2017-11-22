/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.patentSearchListService = patentSearchListService();

    function patentSearchListService() {
        var patentSearchListService = {};
        patentSearchListService.pageNo = commonService.getQuery('pageNo') ? commonService.getQuery('pageNo') > 100 ? 100 : commonService.getQuery('pageNo') : 1;
        patentSearchListService.kw = commonService.getQuery('q') ? commonService.getQuery('q') : '';
        patentSearchListService.queryOrder = '';
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
            allclick();
            initPrompt();
            initFilter();
            // getCnInfo();
            $('.main-search').find('input').val(patentSearchListService.kw);
            commonService.initQuery(getCnInfo);
        });

        function initFilter() {
            let data = {};
            commonService.getQuery('category') ? data.scope = commonService.getQuery('category') : data.scope = 0;
            commonService.getQuery('type') ? data.type = JSON.parse("[" + commonService.getQuery('type') + "]") : data.type = [1, 2, 3];
            huForm.setFormData($('.filter'), data)
        }

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
                var kw = $('.main-search input').val();
                if (kw) {
                    const formData = huForm.getFormData($('.filter'));
                    window.location.href = "patentSearchList.html?type=" + formData.type + '&category=' + formData.scope + '&q=' + kw;
                } else {
                    toastr.info('请输入搜索关键词')
                }
            })

            //点击排序
            $('.main-sort').on('click', 'div', function () {
                if ($(this).attr('id') == 'relativity') {
                    $(this).addClass('selected').siblings('div').removeClass('selected');
                    patentSearchListService.queryOrder = '';
                } else {
                    if ($(this).hasClass('selected')) {
                        if ($(this).find('i').hasClass('ic-arrow-downward')) {
                            if ($(this).attr('id') == 'application') {
                                patentSearchListService.queryOrder = "[{'orderField':'application_date','orderType':'asc'}]";
                            } else {
                                patentSearchListService.queryOrder = "[{'orderField':'earliest_publication_date','orderType':'asc'}]";
                            }
                            $(this).find('i').removeClass('ic-arrow-downward').addClass('ic-arrow-upward');
                        } else {
                            if ($(this).attr('id') == 'application') {
                                patentSearchListService.queryOrder = "[{'orderField':'application_date','orderType':'desc'}]";
                            } else {
                                patentSearchListService.queryOrder = "[{'orderField':'earliest_publication_date','orderType':'desc'}]";
                            }
                            $(this).find('i').removeClass('ic-arrow-upward').addClass('ic-arrow-downward');
                        }
                    } else {
                        if ($(this).attr('id') == 'application') {
                            patentSearchListService.queryOrder = "[{'orderField':'application_date','orderType':'desc'}]";
                        } else {
                            patentSearchListService.queryOrder = "[{'orderField':'earliest_publication_date','orderType':'desc'}]";
                        }
                        $(this).addClass('selected').siblings('div').removeClass('selected');
                    }
                }
                getCnInfo();
            })


        }

        function initPrompt() {
            var promptSettings = {
                container: '#promptBox',
                placeholder: '请输入关键词',
                onPrompt: function (pre, $self) {
                    $('.hiekn-search-prompt').empty().css('max-height','500px');
                    let type = 0;
                    let formData = huForm.getFormData($('.filter'));
                    type = formData.scope;
                    if (type > 1 && type < 5) {
                        type = 2;
                    } else if (type == 0) {
                        type = '';
                    }
                    const q = $('#promptBox').find('input').val();
                    if (type != 5) {
                        hieknjs.kgLoader({
                            type: 0,
                            url: 'http://www.kechuang.cn/hk_patent_ws/api/patent/prompt',
                            urlData: {
                                type: type,
                                kw: q,
                                pageSize:3,
                                pageNo:1
                            },
                            success: function (data) {
                                var data = data.rsData;
                                let items = `<li class="on" title="${pre}" type="" style="height:50px;"><span style="color:#999;line-height:50px;font-size:14px;height:50px;display: inline-block;width: 36px;text-align: right;margin-right: 15px">关键字</span><span style="color:#5f8bc9;line-height:50px;font-size:14px;height:50px;">${pre}</span></li>`;
                                for (let val of data) {
                                    items += `<li title="${[val.name]}" type="${[val.type]}" style="height:50px;"><span style="color:#999;line-height:50px;font-size:14px;height:50px;display: inline-block;width: 36px;text-align: right;margin-right: 15px">${['', '关键词', '企业'][val.type]}</span><span style="color:#999;line-height:50px;font-size:14px;height:50px;">${val.name.replaceAll(pre,`<span style="color:#5f8bc9;">${pre}</span>`)}</span></li>`
                                }
                                $('.hiekn-search-prompt').html(items);
                            }
                        });
                    } else {
                        let items = `<li class="on" title="${pre}" type=""><span>${pre}</span></li>`;
                        $('.hiekn-search-prompt').html(items);
                    }
                },
                onSearch: function (data, el) {
                    const formData = huForm.getFormData($('.filter'));
                    window.location.href = "patentSearchList.html?type=" + formData.type + '&category=' + formData.scope + '&promptType=' + el.find('.on').attr('type') + '&q=' + el.find('.on').attr('title');
                }
            };
            new hieknPrompt(promptSettings);
        }

        // function getInfo() {
        //     let queryCondition = patentSearchListService.getQueryCondition();
        //     let pageNo = parseInt(commonService.getQuery('pageNo'), 10) || 1;
        //     hieknjs.kgLoader({
        //         type: 1,
        //         url: 'http://www.kechuang.cn/hk_patent_ws/api/patent/search',
        //         that: $('#content')[0],
        //         postData: {
        //             kw: patentSearchListService.kw,
        //             queryCondition
        //         },
        //         urlData: {
        //             pageNo: pageNo,
        //             pageSize: 10
        //         }
        //         ,
        //         success: function (data) {
        //             if (data && data.rsData && data.rsData.length) {
        //                 patentSearchListService.pageNum = Math.ceil(data.rsCount / 10) > 100 ? 100 : Math.ceil(data.rsCount / 10);
        //                 console.log(patentSearchListService.pageNum)
        //                 var leftHTML = '';
        //                 for (var val of data.rsData) {
        //                     $('.patentCount').find('span').text(data.rsCount);
        //                     leftHTML += `<div class="main-left-box">
        //                                     <a href="patentDetail.html?id=${val.id}" class="left-box-title" title="${val.patent.title.original ? val.patent.title.original : val.patent.title.en}">${val.patent.title.original ? val.patent.title.original.replaceAll(patentSearchListService.kw, '<span class="highLight">' + patentSearchListService.kw + '</span>') : val.patent.title.en ? val.patent.title.en : '标题暂缺'}</a>
        //                                     <div class="left-box-item">
        //                                         <p class="box-item-key">申请号：</p>
        //                                         <span class="box-item-value">${val.patent.application_number ? val.patent.application_number : ''}</span>
        //                                     </div>
        //                                     <div class="left-box-item">
        //                                         <p class="box-item-key">申请人：</p>
        //                                         <span class="box-item-value">${val.patent.applicants[0] ? val.patent.applicants[0].name ? val.patent.applicants[0].name.original ? val.patent.applicants[0].name.original : '' : '' : ''}</span>
        //                                     </div>
        //                                     <br>
        //
        //                                     <div class="left-box-item">
        //                                         <p class="box-item-key">发明人：</p>
        //                                         <span class="box-item-value">${val.patent.inventors[0] ? val.patent.inventors[0].name ? val.patent.inventors[0].name.original ? val.patent.inventors[0].name.original : '' : '' : ''}</span>
        //                                     </div>
        //
        //                                     <br>
        //                                     <div class="left-box-item">
        //                                         <p class="box-item-key">专利摘要：</p>
        //                                         <span class="box-item-value">${val.patent.abstract.original ? val.patent.abstract.original.replaceAll(patentSearchListService.kw, '<span class="highLight">' + patentSearchListService.kw + '</span>') : val.patent.abstract.en}</span>
        //                                     </div>
        //                                 </div>`;
        //                 }
        //                 $('.main-left').find('.hu-card-body').html(leftHTML);
        //             } else {
        //                 $('.main-left').find('.hu-card-body').html('<div style="display: flex;justify-content: center;align-content: center;width: 100%;"><img style="display: flex;width: 200px;height: 200px;margin: 50px auto 200px" src="../images/icon-no-data.svg"></div>')
        //             }
        //             gentPage();
        //         }
        //     })
        // }


        function getCnInfo() {
            let param = {
                type: commonService.getQuery('type')?'['+commonService.getQuery('type')+']':'[1,2,3]',
                scope: commonService.getQuery('category') ? commonService.getQuery('category') : '',
                queryQrder: patentSearchListService.queryOrder
            };
            commonService.getQuery('promptType') ? param.promptType = commonService.getQuery('promptType') : '';
            let pageNo = commonService.getQuery('pageNo') ? commonService.getQuery('pageNo') > 100 ? 100 : commonService.getQuery('pageNo') : 1

            hieknjs.kgLoader({
                type: 1,
                url: 'http://www.kechuang.cn/hk_patent_ws/api/patent/search/cn',
                that: $('#content')[0],
                postData: param,
                urlData: {
                    kw: patentSearchListService.kw,
                    pageNo: pageNo,
                    pageSize: 10
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        patentSearchListService.pageNum = Math.ceil(data.rsData[0].rsCount / 10) > 100 ? 100 : Math.ceil(data.rsData[0].rsCount / 10);
                        var leftHTML = '';
                        for (var val of data.rsData[0].patents) {
                            $('.patentCount').find('span').text(data.rsData[0].rsCount);
                            leftHTML += `<div class="main-left-box">
                                            <a href="patentDetail.html?id=${val.id}" class="left-box-title" title="${val.patent.title.original ? val.patent.title.original : val.patent.title.en}">${val.patent.title.original ? patentSearchListService.kw? val.patent.title.original.replaceAll(patentSearchListService.kw, '<span class="highLight">' + patentSearchListService.kw + '</span>') :val.patent.title.original: val.patent.title.en ? val.patent.title.en : '标题暂缺'}</a>
                                            <div class="left-box-item">
                                                <p class="box-item-key">申请号：</p>
                                                <span class="box-item-value">${val.patent.application_number ? val.patent.application_number : ''}</span>
                                            </div>
                                            <div class="left-box-item">
                                                <p class="box-item-key">申请人：</p>
                                                <span class="box-item-value">${(()=>{
                            // <span class="box-item-value">${val.patent.applicants[0] ? val.patent.applicants[0].name ? val.patent.applicants[0].name.original ? val.patent.applicants[0].name.original.replaceAll(patentSearchListService.kw, '<span class="highLight">' + patentSearchListService.kw + '</span>') : '' : '' : ''}</span>
                                                            let text=[]
                                                            if(val.patent&&val.patent.applicants&&val.patent.applicants.length){
                                                                for(let item of val.patent.applicants){
                                                                    if(item.name&&item.name.original){
                                                                        text.push(item.name.original)
                                                                    }
                                                                }
                                                            }
                                                            return text.join(',');
                                                        })()}</span>
                                            </div>
                                            <div class="left-box-item">
                                                <p class="box-item-key">申请日：</p>
                                                <span class="box-item-value">${ val.patent.application_date ? JSON.stringify(val.patent.application_date).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日") : '' }</span>
                                            </div>
                                            <div class="left-box-item">
                                                <p class="box-item-key">公开日：</p>
                                                <span class="box-item-value">${ val.patent.earliest_publication_date ? JSON.stringify(val.patent.earliest_publication_date).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日") : '暂无数据' }</span>
                                            </div>
                                           
                    
                                            <div class="left-box-item">
                                                <p class="box-item-key">发明人：</p>
                                                <span class="box-item-value">${(()=>{
                                // val.patent.inventors[0] ? val.patent.inventors[0].name ? val.patent.inventors[0].name.original ? val.patent.inventors[0].name.original.replaceAll(patentSearchListService.kw, '<span class="highLight">' + patentSearchListService.kw + '</span>') : '' : '' : ''
                                let text=[]
                                if(val.patent&&val.patent.inventors&&val.patent.inventors.length){
                                    for(let item of val.patent.inventors){
                                        if(item.name&&item.name.original){
                                            text.push(item.name.original)
                                        }
                                    }
                                }
                                return text.join(',');
                            })()}</span>
                                            </div>
                                            
                                            <br>
                                            <div class="left-box-item">
                                                <p class="box-item-key">专利摘要：</p>
                                                <span class="box-item-value">${val.patent.abstract.original ? patentSearchListService.kw ? val.patent.abstract.original.replaceAll(patentSearchListService.kw, '<span class="highLight">' + patentSearchListService.kw + '</span>'):val.patent.abstract.original : val.patent.abstract.en}</span>
                                            </div>
                                        </div>`;
                        }
                        $('.main-left').find('.hu-card-body').html(leftHTML);
                    } else {
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
                current: commonService.getQuery('pageNo') ? commonService.getQuery('pageNo') > 100 ? 100 : commonService.getQuery('pageNo') : 1,
                prevNextEnable: false,
                prevNextMultiEnable: true,
                startEndEnable: true,
                callback: function (event, pageNo, data) {
                    scrollTo(0, 0);
                    commonService.setQuery('pageNo', pageNo);
                    patentSearchListService.pageNo = pageNo;
                }
            };
            new huPagination(config);
        }


        return patentSearchListService;
    }
})(window, jQuery);
