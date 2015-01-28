<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
	<div id="ftm-grid-searcher" class="ftm-grid-searcher">
		<form id="ftm-search-form" class="form-inline">
				<div class="form-group ftm-search-field">
					<label for="name" class="col-xs-12 col-sm-4 control-label no-padding-right">用户名</label>
			
					<div class="col-xs-12 col-sm-8">
						<span class="block input-icon input-icon-right">
							<input type="text" id="name" name="name" class="width-100"/>
						</span>
					</div>
				</div>
				
				<div class="form-group ftm-search-field">
					<label for="realName" class="col-xs-12 col-sm-4 col-md-4 control-label no-padding-right">姓名</label>
			
					<div class="col-xs-12 col-sm-8">
						<span class="block input-icon input-icon-right">
							<input type="text" id="realName" name="realName"  class="width-100"/>
						</span>
					</div>
				</div>
				
				<div class="form-group">
					<label for="role" class="col-xs-12 col-sm-4 col-md-4 control-label no-padding-right">角色</label>
				</div>
				<div class="form-group">
					<div class="col-xs-12 col-sm-8 ftm-select">
						<span class="block input-icon input-icon-right">
							<select class="form-control" name="role">
								<option value="">--所有--</option>
								<c:forEach items="${roles}" var="item">
								<option value="${item.name}">${item.label}</option>
								</c:forEach>
							</select>
						</span>
					</div>
				</div>
				
				<div class="form-group ftm-search-field">
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
	
	<script src="${contextPath}res/yp/admin/user.js?v=${v}"></script>
	<script src="${contextPath}res/assets/js/sjcl.js"></script>
	<script type="text/javascript">
		jQuery(function($) {
			new ftm.admin.UserGrid();
		});
	</script>