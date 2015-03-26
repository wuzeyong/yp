<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div id="uploadify"></div>
<div >
	<button id="btn2" class="btn  btn-sm btn-success">上传</button>
	<button id="btn3" class="btn btn-sm btn-yellow">取消</button>
	<button id="btn4" class="btn btn-sm btn-danger">暂停</button>
	<button id="btn5" class="btn btn-sm btn-purple">继续</button>
</div>
<script type="text/javascript">
yp.constant.CONTEXT_PATH = "${contextPath}";
var id = "${id}"
$(function(){
		var instanceNumber;
		var up = $('#uploadify').Huploadify({
			auto:false,
			fileTypeExts:'*.*',
			multi:true,
			formData:{id:id},
			fileSizeLimit:104857600,
			showUploadedPercent:true,
			showUploadedSize:true,
			removeTimeout:9999999,
			uploader:yp.constant.CONTEXT_PATH+'operator/fileinfo/upload.do',   
			onUploadStart:function(file){
				if(file.size > 104857600 ){
					yp.utils.notice.info("文件大小不能超过100M","错误信息",1000);
					var uploadItem = $("#fileupload_"+instanceNumber+"_"+file.index);
					uploadItem.remove();
				}
			},
			onInit:function(obj){
				instanceNumber = obj.instanceNumber;
			},
			onUploadComplete:function(file){
				var uploadItem = $("#fileupload_"+instanceNumber+"_"+file.index);
				uploadItem.find(".progressnum").remove();
				uploadItem.find(".uploadbtn").remove();
				uploadItem.find(".delfilebtn").remove();
				uploadItem.find(".uploadify-progress").css({"width":"200px"});
				uploadItem.find(".up_filename").css({"width":"150px"});
			},
			onCancel:function(file){
			},
			onClearQueue:function(queueItemCount){
			},
			onDestroy:function(){
			},
			onSelect:function(file){
			},
			onQueueComplete:function(queueData){
			},
			onUploadError:function(file,response){
				if(response.status == 413){
					yp.utils.notice.info("文件大小不能超过100M","错误提示",1000);
					var uploadItem = $("#fileupload_"+instanceNumber+"_"+file.index);
					uploadItem.remove();
				}
				var obj = eval('(' + response.responseText + ')');
				if(response.status == 400){
					if(obj.status == 'fail'){
						yp.utils.notice.info(obj.message,"错误提示",1000);
						var uploadItem = $("#fileupload_"+instanceNumber+"_"+file.index);
						uploadItem.remove();
					}
				}
			}
		});

		$('#btn2').click(function(){
			up.upload('*');
		});
		$('#btn3').click(function(){
			up.cancel('*');
		});
		$('#btn4').click(function(){
			//up.disable();
			up.Huploadify('disable');
		});
		$('#btn5').click(function(){
			up.ennable();
		});
});
</script>
