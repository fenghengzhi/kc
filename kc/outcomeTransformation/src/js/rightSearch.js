/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.rightSearchService = rightSearchService();

    function rightSearchService() {
        var rightSearchService = {};

        $(function () {
            allclick();
            suggest();
            // $('.carousel').slick({
            //     infinite: true,
            //     slidesToShow: 4,
            //     slidesToScroll: 1,
            //     autoplay:true
            // });
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            });
            $('.filterAll .hu-radio').click(function () {
                $(this).addClass('active').siblings().removeClass('active')
            });

            $('.search-btn').on('click', function () {

                var data = huForm.getFormData($('.search-box'));
                var type = data.type;
                var requireType = data.scope;
                // console.log(type);
                var q = $('#demo-prompt input').val();
                if (!q) {
                    if(requireType == ''){
                        window.location.href = "patentSearchList.html?type=" + type;
                    }else {
                        window.location.href = "patentSearchList.html?type=" + type + '&category=' + requireType;
                    }
                } else {
                    if(requireType == ''){
                        window.location.href = "patentSearchList.html?type=" + type + '&q=' + q;
                    }else {
                        window.location.href = "patentSearchList.html?type=" + type + '&category=' + requireType + '&q=' + q;
                    }
                }

                // console.log(type)
            });

        }


        function suggest() {
            var promptSettings = {
                container: '#demo-prompt',
                placeholder: '请输入关键词',
                onPrompt: function (pre, $self) {

                    $('.hiekn-search-prompt').empty().css('max-height','500px');
                    let type = 0;
                    let formData = huForm.getFormData($('.search-box'));
                    type = formData.scope;
                    if (type > 1 && type < 5) {
                        type = 2;
                    } else if (type == 0) {
                        type = '';
                    }
                    const q = $('.search-input').find('input').val();
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
                    }else{
                        let items = `<li class="on" title="${pre}" type=""><span>${pre}</span></li>`;
                        $('.hiekn-search-prompt').html(items);
                    }

                },
                onSearch: function (data, el) {
                    const formData = huForm.getFormData($('.search-box'));
                    window.location.href = "patentSearchList.html?type=" + formData.type + '&category=' + formData.scope + '&promptType=' + el.find('.on').attr('type') + '&q=' + el.find('.on').attr('title');

                }
            };
            new hieknPrompt(promptSettings);
        }


        return rightSearchService;
    }
})(window, jQuery);
