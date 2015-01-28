<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

	<div id="ftm-grid-searcher" class="ftm-grid-searcher">
		<form id="ftm-search-form" class="form-inline">
				
				<div class="form-group ftm-search-field">
					<label for="operateType" class="col-xs-12 col-sm-4 col-md-4 control-label no-padding-right">操作事件</label>
					<div class="col-xs-12 col-sm-8">
						<span class="block input-icon input-icon-right">
							<select class="form-control" name="operateType" id="operateType">
								<option value="">--所有--</option>
								<c:forEach items="${operateTypes}" var="item">
								<option value="${item.name}">${item.label}</option>
								</c:forEach>
							</select>
						</span>
					</div>
				</div>
				
				<div class="form-group ftm-search-field">
					<label for="startTime" class="col-xs-12 col-sm-4 control-label no-padding-right">开始时间</label>
		
					<div class="col-xs-14 col-sm-8">
						<span class="block input-icon input-icon-right">
							<input class="form-control" id="startTime"  name="startTime"  size="16" type="text"/> 
						</span>
					</div>		
					
				</div>
				
				<div class="form-group ftm-search-field">
					<label for="endTime" class="col-xs-12 col-sm-4 col-md-4  control-label no-padding-right">结束时间</label>
					
					<div class="col-xs-12 col-sm-8">
						<span class="block input-icon input-icon-right">
							<input class="form-control" id="endTime"  name="endTime"  size="16" type="text"/> 
						</span>
					</div>	
				</div>
				
				<div class="form-group ftm-search-field" style="text-align:center; ">
					<div class="col-xs-12 col-sm-4">
						<button class="btn btn-primary btn-xs ftm-search">查询</button>
					</div>
					<div class="col-xs-12 col-sm-8"></div>
					</div>
			
		</form>	
	</div>
				
	
	<div id="ftm-grid-nav" class="ftm-grid-nav">
	</div>
	
	<div style="clear:both"></div>
	<table id="grid-table"></table>
	<div id="grid-pager"></div>
	<div id="dialog"></div>
	
	<script type="text/javascript" src="${contextPath}res/assets/js/date-time/bootstrap-datepicker.min.js" charset="UTF-8"></script>
	<script src="${contextPath}res/ftm/common/log.js?v=${v}"></script>
	<script type="text/javascript">
		jQuery(function($) { 
			new yp.common.FileGrid();
		});
	</script>
	
	<script type="text/javascript">
	$("#startTime").datepicker({
		autoclose: true,
		format: 'yyyy-mm-dd'
	});
	 
	 $("#endTime").datepicker({
		 format: "yyyy-mm-dd",
		 autoclose: true,
		}).on('changeDate',function(ev){
			  //var endTime = ev.date.valueOf();
			  var endTime =  document.getElementById("endTime").value;
			  var startTime = document.getElementById("startTime").value;
			  if(endTime<startTime){
			   		alert("结束时间不能小于开始时间!");
			   		//$("#endTime").datepicker({setDate(null)});
			  }else{
			   
			  } 
			}) ;
	</script>