<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
	
<form class="form-horizontal" id="sample-form">
		<div class="form-group">
			<label for="oldPassword" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">旧密码</label>
	
			<div class="col-xs-12 col-sm-9">
				<span class="block input-icon input-icon-right">
					<input type="password" id="oldPassword" name="oldPassword" required placeholder="请输入旧密码" class="width-100"/>
				</span>
			</div>
		</div>
		<div class="form-group">
			<label for="password" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">新密码</label>
	
			<div class="col-xs-12 col-sm-9">
				<span class="block input-icon input-icon-right">
					<input type="passWord" id="password" name="passWord" required placeholder="请输入密码" class="width-100"/>
				</span>
			</div>
		</div>
		<div class="form-group">
			<label for="confirmPassword" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">重复输入密码</label>
	
			<div class="col-xs-12 col-sm-9">
				<span class="block input-icon input-icon-right">
					<input type="password" id="confirmPassword" name="confirmPassword" required confirmPassword="true" placeholder="请再次输入密码" class="width-100"/>
				</span>
			</div>
		</div>
		<input type="hidden" name="name" value="${user.name}" />
</form>		
