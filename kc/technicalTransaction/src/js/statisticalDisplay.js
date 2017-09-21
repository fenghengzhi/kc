/**
 * Created by Lx on 2017/8/17.
 */
(function (window, $) {
    'use strict';

    window.statisticalDisplayService = statisticalDisplayService();

    function statisticalDisplayService() {
        var statisticalDisplayService = {
            color: [
                [
                    {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#e8fca0'},
                                // {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#b7e021'}
                            ]
                        )
                    }
                    ,
                    {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#b7e021'},
                                // {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#e8fca0'}
                            ]
                        )
                    }
                ],
                [
                    {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                ]
            ]
        };

        $(function () {
            allclick();
            getData();
            // initECharts('echarts1', dataAxis, data, myChart1, statisticalDisplayService.color[0]);
            // initECharts('echarts2', dataAxis, data, myChart2, statisticalDisplayService.color[1]);
        });

        function allclick() {
            //点击footer链接
            $('.footer-otherslinks-title').on('click', 'li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $('.footer-otherslinks-links').eq($(this).index()).removeClass('hide').siblings('.footer-otherslinks-links').addClass('hide');
            })
        }

        var myChart1, myChart2, myChart3, myChart4, myChart5,myChart6;


        function initECharts(id, x, y, n, color) {


            var option = {
                xAxis: {
                    data: x,
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    },
                    z: 10
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {color: '#eee'}
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                grid: {
                    top: 10,
                    bottom: 40
                },
                series: [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            normal: {color: 'rgba(0,0,0,0)'}
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        animation: false
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: color[0].color
                            },
                            emphasis: {
                                color: color[1].color
                            }
                        },
                        data: y
                    }
                ]
            };
            n = echarts.init(document.getElementById(id));
            n.setOption(option);
        }

        function getData() {
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/require/sum',
                that: $('#echarts1')[0],
                postData: {},
                urlData: {
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var x=data.rsData[0].yList;
                        var y=data.rsData[0].xList;
                        initECharts('echarts1', x, y, myChart1, statisticalDisplayService.color[0])
                    }
                }
            });
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/require/finish/sum',
                that: $('#echarts2')[0],
                postData: {},
                urlData: {
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var x=data.rsData[0].yList;
                        var y=data.rsData[0].xList;
                        initECharts('echarts2', x, y, myChart2, statisticalDisplayService.color[1])
                    }
                }
            });
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/require/money/sum',
                that: $('#echarts3')[0],
                postData: {},
                urlData: {
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var x=data.rsData[0].yList;
                        var y=data.rsData[0].xList;
                        initECharts('echarts3', x, y, myChart3, statisticalDisplayService.color[0])
                    }
                }
            });
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/achievement/money/sum',
                that: $('#echarts4')[0],
                postData: {},
                urlData: {
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var x=data.rsData[0].yList;
                        var y=data.rsData[0].xList;
                        initECharts('echarts4', x, y, myChart4, statisticalDisplayService.color[1])
                    }
                }
            });
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/achievement/sum',
                that: $('#echarts5')[0],
                postData: {},
                urlData: {
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var x=data.rsData[0].yList;
                        var y=data.rsData[0].xList;
                        initECharts('echarts5', x, y, myChart5, statisticalDisplayService.color[0])
                    }
                }
            });
            hieknjs.kgLoader({
                type: 0,
                url: configService.RESTFUL_SERVICE_BASE_URL + 'transaction/get/achievement/finish/sum',
                that: $('#echarts6')[0],
                postData: {},
                urlData: {
                },
                success: function (data) {
                    if (data && data.rsData && data.rsData.length) {
                        var x=data.rsData[0].yList;
                        var y=data.rsData[0].xList;
                        initECharts('echarts6', x, y, myChart6, statisticalDisplayService.color[1])
                    }
                }
            });



        }


        return statisticalDisplayService;
    }
})(window, jQuery);
