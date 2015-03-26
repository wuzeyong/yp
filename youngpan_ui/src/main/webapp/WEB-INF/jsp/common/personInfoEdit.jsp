<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form class="form-horizontal" id="sample-form">
	<div class="form-group">
		<label for="name"
			class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">用户名</label>

		<div class="col-xs-12 col-sm-9">
			<span class="block input-icon input-icon-right"> 
				<input type="text" id="name" name="name" value="${user.name}"  class="width-100" readonly="true" disabled="true"/>
			</span>
		</div>
	</div>
	
	<div class="form-group">
		<label for="name"
			class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">姓名</label>

		<div class="col-xs-12 col-sm-9">
			<span class="block input-icon input-icon-right"> 
				<input type="text" id="realName" name="realName" value="${user.realName}"  class="width-100"/>
			</span>
		</div>
	</div>
	<div class="form-group">
		<label for="mobile"
			class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">手机</label>

		<div class="col-xs-12 col-sm-9">
			<span class="block input-icon input-icon-right" > 
				<input type="text" id="mobile" name="mobile" value="${user.mobile}"  class="width-100" phone="true"/>
			</span>
		</div>
	</div>
	<div class="form-group">
		<label for="email"
			class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">邮箱</label>

		<div class="col-xs-12 col-sm-9">
			<span class="block input-icon input-icon-right"> 
				<input type="text" id="email" name="email" value="${user.email}"  class="width-100" email="true"/>
			</span>
		</div>
	</div>
	<input type="hidden" name="id" value="${user.id}" />
</form>
