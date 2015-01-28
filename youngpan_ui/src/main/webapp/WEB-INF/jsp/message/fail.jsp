<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    if(response.getStatus() == 403){
        request.setAttribute("summaryMessage", "无权限访问该页面！");
    } else if(response.getStatus() == 404){
        request.setAttribute("summaryMessage", "找不到页面");
        request.setAttribute("message", "您的访问地址可能有误，该页面可能已经移动，或者可能只是临时脱机");
    } else{
        request.setAttribute("summaryMessage", "处理发生异常！");
    }
%>    
<div class="error-container">
	<div class="well">
		<h1 class="grey lighter smaller">
			<span class="blue bigger-125">
				<i class="icon-sitemap"></i>
				<%=response.getStatus()%>
			</span>
			${summaryMessage}
		</h1>

		<hr />
		<h3 class="lighter smaller">${message}</h3>

		<div>
			
			<div class="space"></div>
			<h4 class="smaller">请尝试以下办法:</h4>

			<ul class="list-unstyled spaced inline bigger-110 margin-15">
				<li>
					<i class="icon-hand-right blue"></i>
					请检查输入地址是否正确
				</li>

				<li>
					<i class="icon-hand-right blue"></i>
					按照帮助进行操作
				</li>
			</ul>
		</div>

		<hr />
				
	</div>
</div>