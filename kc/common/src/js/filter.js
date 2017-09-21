/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.filterService = filterService();

    function filterService() {

        let filterService = {};
        filterService.getQueryCondition = function () {
            let queryCondition = [];
            $('.filter .filter-line').each(function () {
                let _this = $(this);
                let name = _this.attr('name');
                let selected = _this.find('li.selected')
                let value = selected.text() === '全部' ? void(0) : (selected.attr('value') || selected.text());
                let JSON_value = _this.attr('JSON-value')
                // console.log(_this.attr('condition'))
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
        }
        $(function () {
            allclick();
            moreFilter();
        });

        function allclick() {

            //点击筛选项
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

            $('.filter .filter-line').each(function () {
                let value = commonService.getQuery($(this).attr('name'));
                // console.log($(this).attr('name'))
                if (value) {
                    console.log($(this).find('li').filter(function () {
                        return $(this).text() === value;
                    }))
                    $(this).find('li').filter(function () {
                        return $(this).text() === value;
                    }).addClass('selected').siblings('li').removeClass('selected');
                }
            });


            // 点击更多
            $('.filter').on('click', '.more-filter', function () {
                if ($(this).closest('.filter-line').height() > 20) {
                    $(this).closest('.filter-line').animate({'height': '16px'}, 200)
                    $(this).find("i").removeClass('rotate')
                } else {
                    let h = $(this).siblings('ul').eq(0).height();
                    $(this).closest('.filter-line').animate({'height': h + 'px'}, 200)
                    $(this).find("i").addClass('rotate')
                }
            })

        }

        function moreFilter() {
            $('.filter-line ul').each(function (i, e) {
                if ($(this).height() > 30) {
                    $(this).closest('.filter-con').append('<div class="more-filter" style="-moz-user-select: none; -khtml-user-select: none; user-select: none;">更多<i class="icon more hufont ic-navigate-next"></i></div>');
                }
            });

        }


        return filterService;
    }
})(window, jQuery);
