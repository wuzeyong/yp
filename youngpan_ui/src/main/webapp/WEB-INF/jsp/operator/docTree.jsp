<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<link rel="stylesheet" href="${contextPath}res/assets/css/easyui.css" />
<link rel="stylesheet" href="${contextPath}res/assets/css/icon.css" />
<div class="col-sm-6">
	<div class="widget-box">
		<div class="widget-header header-color-green2">
			<h4 class="lighter smaller">全部文件</h4>
		</div>
		<div class="widget-body">
			<div class="widget-main padding-8">
				<ul id="tree" class="easyui-tree"></ul>
			</div>
		</div>
	</div>
</div>
<script src="${contextPath}res/assets/js/jquery.easyui.min.js"></script>
<script type="text/javascript">
yp.constant.CONTEXT_PATH = "${contextPath}";
$(function(){  
	$('#tree').tree({
			url : yp.constant.CONTEXT_PATH+"operator/fileinfo/getNodes.do",
			checkbox : false,
			loadFilter : function(data) {
				if (data.treeNodes) {
					return data.treeNodes;
				} else {
					return data;
				}
			},
		   onClick:function(node){
		        
		  	}
		});
	});
</script>