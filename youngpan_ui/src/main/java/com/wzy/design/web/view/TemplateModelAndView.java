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

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

/**
 * 模板模型与视图
 * 
 * @author huanghangqiong
 * 
 */
public abstract class TemplateModelAndView extends ModelAndView {

    /**
     * 
     */
    private String MAIN_PAGE_PARAM = "MAIN_PAGE_PARAM";

    /**
     * 
     */
    private String templatePrefixPath = "";

    /**
     * 
     */
    public TemplateModelAndView() {
    }

    /**
     * @param viewName - 主内容路径
     */
    public TemplateModelAndView(String viewName) {
        super(viewName);
        changeViewName();
    }

    /**
     * @param viewName - 主内容路径
     * @param model
     */
    public TemplateModelAndView(String viewName, Map<String, ?> model) {
        super(viewName, model);
        changeViewName();
    }

    /**
     * 
     * @param viewName - 主内容路径
     * @param modelName
     * @param modelObject
     */
    public TemplateModelAndView(String viewName, String modelName, Object modelObject) {
        super(viewName, modelName, modelObject);
        changeViewName();
    }

    private void changeViewName() {
        this.templatePrefixPath = getTemplatePage().substring(0, getTemplatePage().lastIndexOf("/") + 1);
        this.addObject(MAIN_PAGE_PARAM, generateMainPage(super.getViewName()));
        super.setViewName(getTemplatePage());

    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.ModelAndView#setView(org.springframework.web.servlet.View)
     */
    @Override
    public void setView(View view) {
        throw new UnsupportedOperationException("use setViewName,view must be a jsp");
    }

    /**
     * 修改模板路径
     */
    @Override
    public void setViewName(String viewName) {
        super.setViewName(viewName);
    }

    /**
     * 获得模板路径
     * 
     * @return
     */
    public String getViewName() {
        return super.getViewName();
    }

    /**
     * 获得主内容页面
     * 
     * @return
     */
    public String getMainViewName() {
        return (String) this.getModelMap().get(MAIN_PAGE_PARAM);
    }

    /**
     * 设置主内容页面
     * 
     * @param viewName
     */
    public void setMainViewName(String viewName) {
        this.addObject(MAIN_PAGE_PARAM, generateMainPage(viewName));
    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.ModelAndView#getView()
     */
    @Override
    public View getView() {
        throw new UnsupportedOperationException("not supported");
    }

    // 页面主内容，即include进来的页面
    private String generateMainPage(String viewName) {
        return viewName.replace(this.templatePrefixPath, "") + ".jsp";
    }

    protected abstract String getTemplatePage();

}
