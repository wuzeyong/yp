/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * caihuiji   2013-6-24   comment
 * caihuiji  2013-6-24  Created
 * The type com.fasterxml.jackson.core.JsonGenerator cannot be resolved. It is indirectly referenced from required 
 */
package com.wzy.design.web.support;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonGenerator;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

/**
 * json 视图类
 * @author wzy
 * 
 */
public class JsonView extends MappingJackson2JsonView {

    private String status;

    @SuppressWarnings("unchecked")
    @Override
    protected void renderMergedOutputModel(
                                           Map<String, Object> model,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {

        model = (Map<String, Object>) filterModel(model);

        if (!model.containsKey("message")) {
            model.put("message", "操作成功");
        }
        model.put("status", status);

        super.renderMergedOutputModel(model, request, response);
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return this.status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

}
