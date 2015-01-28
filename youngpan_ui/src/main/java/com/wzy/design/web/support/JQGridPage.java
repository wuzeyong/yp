package com.wzy.design.web.support;

import java.io.Serializable;
import java.util.List;

import com.wzy.design.support.Page;





public class JQGridPage<T> implements Serializable{
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    
    private int total;
    private int records;
    private int page;
    private List<T> rows;
    
    @SuppressWarnings({"rawtypes", "unchecked"})
    public static JQGridPage<?> create(Page<?> page){
        JQGridPage<?> gridPage = new JQGridPage();
        gridPage.setRecords(page.getTotal());
        int totalPage = page.getTotal() / page.getLimit();
        int mod = page.getTotal() % page.getLimit();
        totalPage = mod > 0 ? totalPage + 1 : totalPage; 
        gridPage.setTotal(totalPage);
        gridPage.setPage(page.getStart() / page.getLimit() + 1);
        gridPage.setRows((List) page.getRecords());
        return gridPage;
    }
    
    public int getTotal() {
        return total;
    }
    public void setTotal(int total) {
        this.total = total;
    }
    public int getRecords() {
        return records;
    }
    public void setRecords(int records) {
        this.records = records;
    }
    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }
    public List<T> getRows() {
        return rows;
    }
    public void setRows(List<T> rows) {
        this.rows = rows;
    }
    
    
}
