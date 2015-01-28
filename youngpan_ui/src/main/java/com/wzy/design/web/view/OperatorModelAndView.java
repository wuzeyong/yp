/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * huanghangqiong  2013-7-25  comment
 * huanghangqiong  2013-7-25  Created
 */
package com.wzy.design.web.view;

import java.util.Map;

/**
 * 操作员门户返回的ModelAndView
 * 
 * @author nihy
 * 
 */
public class OperatorModelAndView extends TemplateModelAndView {

    /**
     * 构造函数
     */
    public OperatorModelAndView() {
    }

    /**
     * @param viewName
     * @param model
     */
    public OperatorModelAndView(String viewName, Map<String, ?> model) {
        super(viewName, model);
    }

    /**
     * @param viewName
     * @param modelName
     * @param modelObject
     */
    public OperatorModelAndView(String viewName, String modelName, Object modelObject) {
        super(viewName, modelName, modelObject);
    }

    /**
     * @param viewName -
     */
    public OperatorModelAndView(String viewName) {
        super(viewName);
    }

    /* (non-Javadoc)
     * @see com.apusic.sip.tenant.view.TemplateModelAndView#getTemplatePage()
     */
    @Override
    protected String getTemplatePage() {
        return "operator/operatorTemplate";
    }

}
