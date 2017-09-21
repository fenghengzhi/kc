/**
     * @author: 
     *    jiangrun002
     * @version: 
     *    v0.2.1
     * @license:
     *    Copyright 2017, jiangrun. All rights reserved.
     */

(function (window, $) {
    'use strict';

    window.hieknPrompt = gentService();

    function gentService() {
        var Service = function (options) {
            var self = this;
            var defaultOptions = {
                container: null,
                onSelectItemChange: $.noop,
                onSearchTextChange: $.noop,
                cache: {
                    enable: true,
                    maxNum: 50,
                    historyList: []
                },
                position: 'bottom',
                placeholder: '请输入关键词...',
                icon: {
                    search: {
                        enable: true,
                        clickEnable: true,
                        onclick: function (self) {
                            self.search();
                        },
                        content: '<svg fill="#aaa" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>' +
                        '<path d="M0 0h24v24H0z" fill="none"/></svg>'
                    },
                    close: {
                        enable: true,
                        onclick: function (self) {
                            self.clear();
                        },
                        content: '<svg fill="#aaa" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">' +
                        '<path d="M509.673002 100.805894c-225.963405 0-409.145447 183.179996-409.145447 409.143401 0 71.143317 18.162662 138.04196 50.096978 196.320271 1.695618 5.986341 4.848425 11.355629 9.057283 15.703657 71.742974 118.1714 ' +
                        '201.647603 197.11845 349.991186 197.11845 225.961358 0 409.143401-183.177949 409.143401-409.143401C918.816402 283.98589 735.63436 100.805894 509.673002 100.805894zM509.12451 ' +
                        '844.712661c-121.940237 0-228.66698-65.097624-287.352567-162.42837-1.641383-5.655813-4.584412-10.754948-8.490372-14.950504-25.177426-47.063899-39.469943-100.825336-39.469943-157.931962 0-185.187723 150.125159-335.312882 ' +
                        '335.312882-335.312882 185.185676 0 335.310835 150.125159 335.310835 335.312882C844.435345 694.588525 694.310186 844.712661 509.12451 844.712661zM668.784836 349.45702c-14.522762-14.522762-38.07006-14.522762-52.594869 ' +
                        '0.002047L509.571694 455.997522 402.632103 348.978113c-14.522762-14.524808-38.072107-14.526855-52.596915 0-14.522762 14.522762-14.522762 38.07006 0.002047 52.592822l107.251699 106.670461-106.607016 106.526175c-14.522762 ' +
                        '14.524808-14.524808 38.074154 0 52.596915 14.524808 14.522762 38.072107 14.522762 52.594869 0l106.418728-106.999966 106.470917 105.892749c14.524808 14.524808 37.250392 15.344476 51.774177 0.821715 14.524808-14.522762 ' +
                        '14.522762-38.07006-0.002047-52.594869L561.65491 508.120646l106.308211-106.888426C682.487929 386.707412 683.309644 363.979782 668.784836 349.45702z"></path>' +
                        '</svg>'
                    },
                    enter: {
                        enable: true,
                        clickEnable: true,
                        onclick: function (self) {
                            self.search();
                        },
                        content: '<svg fill="#aaa" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"/></svg>'
                    }
                },
                promptContainerParent: null,
                promptEnable: true,
                enableEmpty: false,
                onPrompt: function (pre, self) {
                    var param = {};
                    param.prefix = pre;
                    $.ajax({
                        url: self.options.promptUrl + '&' + $.param(param),
                        type: 'GET',
                        success: function (data) {
                            if (self.prompt == param.prefix) {
                                var d = data.data.rsData;
                                self.startDrawPromptItems(d, pre);
                            }
                        },
                        error: function () {
                            error('Prompt Fail！');
                        }
                    });
                },
                nodata: {
                    enable: true,
                    content: '抱歉,暂无数据'
                },
                drawPromptItems: function (data, pre) {
                    var $container = $('<div></div>');
                    data.forEach(function (v) {
                        var text = self.options.drawPromptItem(v, pre);
                        var title = self.options.drawItemTitle(v);
                        var $li = $('<li title="' + title + '">' + text + '</li>').data('data', v);
                        $container.append($li);
                    });
                    return $container.children();
                },
                drawPromptItem: function (data, pre) {
                    return data.name.replace(new RegExp('(' + pre + ')', 'gi'), '<span class="highlight">' + '$1' + '</span>');
                },
                drawItemTitle: function (data) {
                    return data.name;
                },
                promptUrl: null,
                onSearch: function (data, $container) {
                    console.log(data);
                },
                beforeSearch: $.noop,
                beforePrompt: $.noop
            };
            self.$container = null;
            self.$itemsContainer = null;
            self.hidePromptTimeout = null;
            self.options = $.extend(true, {}, defaultOptions, options);
            self.selectedItem = null;
            init(self);
        };

        function error(msg) {
            var prefix = 'Hiekn Prompt Tip: ';
            console.error(prefix + msg);
        }

        function drawIco(ico, $container, self) {
            if (ico.enable) {
                var $sObj = $(ico.content);
                $container.append($sObj);
                if (ico.clickEnable || typeof (ico.clickEnable) == 'undefined') {
                    $sObj.css('cursor', 'pointer');
                    $sObj.on('click', function (event) {
                        ico.onclick(self, event);
                    });
                }
            }
        }

        function init(self) {
            if (!self.options.container) {
                error('container is required');
                return;
            }
            self.$container = $(self.options.container);
            var $container = self.$container;
            var $input = $('<input type="text" autocomplete="off" placeholder="' + self.options.placeholder + '">');
            drawIco(self.options.icon.search, $container, self);
            $container.addClass('has-search');
            $container.append($input);
            drawIco(self.options.icon.enter, $container, self);
            $container.addClass('has-enter');
            drawIco(self.options.icon.close, $container, self);
            $container.addClass('has-close');

            var $showDom = $('<ul class="hiekn-search-prompt hide"></ul>');
            $container.addClass('hiekn-search-group');
            if (self.options.promptContainerParent) {
                $(self.options.promptContainerParent).append($showDom);
                var left = $container.offset().left;
                var top = $container.offset().top;
                if (self.options.position == 'bottom') {
                    $showDom.css({'left': left, 'top': (top + $container.height() + 1)});
                } else {
                    error('promptContainerParent && position = top is not support yet');
                    return;
                }
            } else {
                $container.append($showDom);
                if (self.options.position == 'top') {
                    var height = $container.height();
                    $showDom.css({'left': left, 'top': 'auto', 'bottom': height});
                }
            }
            self.$itemsContainer = $showDom;

            $showDom.on('click', 'li', function () {
                $(this).addClass('on').siblings('.on').removeClass('on');
                self.onSelectedItemChange();
                self.search();
            });

            $container.on('input focus keyup', 'input', function (event) {
                var pre = $input.val();
                // $showDom.empty();
                $showDom.removeClass('hide');
                self.hidePromptTimeout && clearTimeout(self.hidePromptTimeout);
                if (event.type == 'keyup' || event.type == 'focusin' || event.type == 'focus') {
                    var val = $input.val();
                    if (pre) {
                        $container.addClass('has-value');
                    } else {
                        $container.removeClass('has-value');
                    }
                    if (event.type == 'keyup') {
                        var all = $showDom.children().length;
                        if (all > 0) {
                            var key = window.event ? event.keyCode : event.which;
                            var $now = $showDom.find('li.on');
                            var nowIndex = $now.index();
                            var stop = true;
                            var data = null;
                            if (key == 13) {
                                $showDom.addClass('hide');
                                self.search();
                            } else if (key == 38) {
                                var prev = nowIndex == 0 ? all - 1 : nowIndex - 1;
                                $now = $showDom.children(':eq(' + prev + ')');
                                $now.addClass('on').siblings('li').removeClass('on');
                                data = $now.data('data');
                                self.onSelectedItemChange();
                                self.resetPromptPosition($now);
                            } else if (key == 40) {
                                var next = nowIndex == all - 1 ? 0 : nowIndex + 1;
                                $now = $showDom.children(':eq(' + next + ')');
                                $now.addClass('on').siblings('li').removeClass('on');
                                data = $now.data('data');
                                self.onSelectedItemChange();
                                self.resetPromptPosition($now);
                            } else {
                                stop = false;
                            }
                            if (stop) {
                                return;
                            }
                        }
                    } else if (event.type == 'focusin' || event.type == 'focus') {
                        $container.addClass('active');
                    }
                }
                if (self.options.promptEnable) {
                    if (pre || self.options.enableEmpty) {
                        self.onPromptStart(pre);
                    }
                } else {
                    if (event.type == 'keyup') {
                        var key = window.event ? event.keyCode : event.which;
                        if (key == 13) {
                            self.options.onSearch(pre, $container);
                        }
                    }
                }
                if (event.type == 'input') {
                    if (pre != $input.data('data')) {
                        self.options.onSearchTextChange(pre, self.$container);
                        $input.data('data', pre);
                    }
                }
            }).on('blur', 'input', function () {
                var self = this;
                setTimeout(function () {
                    $container.removeClass('active');
                    $showDom.addClass('hide');
                }, 300);
            });
        }

        Service.prototype.resetPromptPosition = function ($now) {
            var $parent = $now.offsetParent();
            var st = $parent.scrollTop();
            var ph = $parent.height();
            var ch = $now.height();
            var of = $now.position().top;
            if (of + ch > ph || of < 0) {
                $parent.scrollTop(st + of);
            }
        };

        Service.prototype.clear = function () {
            var self = this;
            self.$itemsContainer.empty();
            self.$container.removeClass('has-value');
            self.$container.find('input').val('');
            self.onSelectedItemChange();
            self.options.onSearchTextChange('', self.$container);
        };

        Service.prototype.search = function () {
            var self = this;
            var data = self.getSelectedItem();
            self.options.beforeSearch(data, self.$container);
            self.options.onSearch(data, self.$container);
        };

        Service.prototype.getSelectedItem = function () {
            var self = this;
            return self.selectedItem || self.getSearchText();
        };

        Service.prototype.setSelectedItem = function (item) {
            var self = this;
            self.selectedItem = item;
        };

        Service.prototype.onSelectedItemChange = function () {
            var self = this;
            var item = null;
            var $now = self.$itemsContainer.find('li.on');
            if ($now.length) {
                item = $now.data('data');
            }
            self.setSelectedItem(item);
            self.options.onSelectItemChange(item, self.$container);
        };

        Service.prototype.getSearchText = function () {
            var self = this;
            return self.$container.find('input').val();
        };

        Service.prototype.setSearchText = function (text) {
            var self = this;
            return self.$container.find('input').val(text);
        };

        Service.prototype.onPromptStart = function (pre) {
            var self = this;
            self.prompt = pre;
            self.hidePromptTimeout && clearTimeout(self.hidePromptTimeout);
            self.hidePromptTimeout = setTimeout(function () {
                self.beforePrompt && self.beforePrompt(pre, self);
                var data = self.history(pre);
                if (data.length) {
                    self.startDrawPromptItems(data, pre);
                } else {
                    self.options.onPrompt(pre, self, self.startDrawPromptItems);
                }
            }, 300);
        };

        Service.prototype.history = function (pre, data) {
            var self = this;
            if (self.options.cache.enable) {
                var hisList = self.options.cache.historyList;
                if (data) {
                    if (hisList.length >= self.options.cache.maxNum) {
                        hisList.shift();
                    }
                    hisList.push({
                        key: pre,
                        value: data
                    })
                } else {
                    for (var i = 0; i < hisList; i++) {
                        if (hisList[i].key) {
                            data = hisList[i].value;
                        }
                    }
                    return data || [];
                }
            } else if (data) {
                return [];
            }
        };

        Service.prototype.startDrawPromptItems = function (data, pre) {
            var self = this;
            var $itemsContainer = self.$itemsContainer;
            $itemsContainer.empty();
            if (data && data.length) {
                self.history(pre, data);
                $itemsContainer.html(self.options.drawPromptItems(data, pre));
                $itemsContainer.children('li').eq(0).addClass('on');
                self.onSelectedItemChange();
            } else {
                if (self.options.nodata.enable) {
                    var content = self.options.nodata.content;
                    var $li = $('<li class="no-data">' + content + '</li>');
                    $itemsContainer.append($li);
                }
                self.onSelectedItemChange();
            }
        };

        return Service;
    }
})(window, jQuery);