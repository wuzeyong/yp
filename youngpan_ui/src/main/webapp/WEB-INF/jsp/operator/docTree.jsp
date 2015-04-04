<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<link rel="stylesheet" href="${contextPath}res/assets/css/easyui.css" />
<form class="form-horizontal" id="sample-form">
			<div class="form-group">
				<ul id="tree" class="easyui-tree"></ul>
			</div>
			<input type="hidden" name="des" id="des">
	</form>		
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
		        $("#des").val(node.id);
		  	}
		});
	});
</script>