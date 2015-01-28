/**
 * yp 通用业务方法
 */
;
(function(name, yp , _ ,window) {
    var utils = yp.utils, Service = yp[name] ={

        /**
         * grid 和 dialog 结合 添加规范操作
         * 
         * @param dialog - dialog-ajax
         * @param grid - grid
         * @param url - dialog 打开的连接
         * @param submitUrl - dialog 提交的连接
         * @param data - 打开时候的附加参数
         */
        addByDialog2Grid : function(dialog, grid, url, submitUrl, data) {
            saveByDialog2Grid(dialog, grid, url, submitUrl, data);
        },

        /**
         * grid 和 dialog 结合 添加规范操作
         * 
         * @param dialog - dialog-ajax
         * @param grid - grid
         * @param url - dialog 打开的连接
         * @param submitUrl - dialog 提交的连接
         * @param data - 打开时候的附加参数
         */
        updateByDialog2Grid : function(dialog, grid, url, submitUrl, data) {
            var reloadUrl = !grid.generateSearchUrl ? null : grid.generateSearchUrl();
            saveByDialog2Grid(dialog, grid, url, submitUrl, data, reloadUrl);
        }
    };

    function saveByDialog2Grid(dialog, grid, url, submitUrl, data, reloadUrl) {
        dialog.once("onSuccess" , function() {
            grid.reload();
        });
        dialog.url = yp.utils.url(url, data);
        dialog.submitUrl = submitUrl;
        dialog.open();
    }

})("Service", yp, _ ,window);
