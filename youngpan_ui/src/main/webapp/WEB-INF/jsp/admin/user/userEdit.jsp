<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
	
<form class="form-horizontal" id="sample-form">
	<c:if test="${isCreate}">
		<div class="form-group">
			<label for="name" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">登录名</label>
	
			<div class="col-xs-12 col-sm-9">
				<span class="block input-icon input-icon-right">
					<input type="text" id="name" name="name" value="${user.name}" required username="true" remote="checkName.do" placeholder="只能填写字母、数字、横线或下划线" class="width-100"/>
				</span>
			</div>
		</div>
		<div class="form-group">
			<label for="password" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">密码</label>
	
			<div class="col-xs-12 col-sm-9">
				<span class="block input-icon input-icon-right">
					<input type="password" id="password" name="password" required password="true" placeholder="请输入密码" class="width-100"/>
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
	
		<div class="form-group">
			<label for="role" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">角色</label>
	
			<div class="col-xs-12 col-sm-9">
				<span class="block input-icon input-icon-right">
					<select class="form-control" name="role">
						<c:forEach items="${roles}" var="item">
							<option value="${item.name}">${item.label}</option>
						</c:forEach>
					</select>
				</span>
			</div>
		</div>	
	</c:if>
	<div class="form-group">
		<label for="realName" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">姓名</label>

		<div class="col-xs-12 col-sm-9">
			<span class="block input-icon input-icon-right">
				<input type="text" id="realName" name="realName" value="${user.realName}" required placeholder="请填写用户的真实姓名" class="width-100"/>
			</span>
		</div>
	</div>
	<div class="form-group">
		<label for="email" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">电子邮箱</label>

		<div class="col-xs-12 col-sm-9">
			<span class="block input-icon input-icon-right">
				<input type="text" id="email" name="email" value="${user.email}" email="true" placeholder="请填写电子邮箱地址" class="width-100"/>
			</span>
		</div>
	</div>
	<div class="form-group">
		<label for="mobile" class="col-xs-12 col-sm-3 col-md-3 control-label no-padding-right">手机</label>

		<div class="col-xs-12 col-sm-9">
			<span class="block input-icon input-icon-right">
				<input type="text" id="mobile" name="mobile" value="${user.mobile}" mobile="true" placeholder="请填写手机" class="width-100"/>
			</span>
		</div>
	</div>
	<input type="hidden" name="id" value="${user == null ? 0 : user.id}" />
</form>		