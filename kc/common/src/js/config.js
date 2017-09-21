(function (window,$) {
    'use strict';


    var RESTFUL_SERVICE_BASE_URL = 'http://101.226.6.177:8089/hk_ws/api/';


    window.configService = configService();
    function configService() {
        var configService = {
            RESTFUL_SERVICE_BASE_URL: RESTFUL_SERVICE_BASE_URL,
            RESTFUL_SERVICE_BASE_URL2: 'http://www.kechuang.cn/hk_patent_ws/api/'
        };
        return configService;
    }

    function initHiknjsConfig(config) {
        window.hieknjs.config = {
            ajaxConfig: {
                loadService: '',
                crossDomain: false,
                hideToast: true
            },
            defaultAppName: ''
        };
        $.extend(true, window.hieknjs.config, config);
    }
    window.configService = configService();



    $(function () {
        if(!window.hieknjs.config){
            initHiknjsConfig();
        }
        if (window.hieknjs.isWeixin()) {
            console.info('is X5');
            window.hieknjs.addLocaleCompare();
        }
    });

    window.hieknjs = window.hieknjs || {};
    window.hieknjs.initHiknjsConfig = initHiknjsConfig;

})(window,jQuery);