package com.wzy.design.util;

import java.util.List;

import org.hibernate.Query;

import com.wzy.design.support.CriteriaCreator;
import com.wzy.design.support.Page;
import com.wzy.design.support.QueryCreator;

public class QueryUtil {
    @SuppressWarnings("unchecked")
    public static <T> Page<T> createPageByCriteria(CriteriaCreator criteriaCreator,int start, int limit) {
        List<T> list = criteriaCreator.create(false)
                .setFirstResult(start)
                .setMaxResults(limit)
                .list();
        Long counts = (Long) criteriaCreator.create(true).uniqueResult();
        Page<T> page = new Page<T>();
        page.setRecords(list);
        page.setTotal(counts == null ? 0 : counts.intValue());
        page.setStart(start);
        page.setLimit(limit);
        return page;
    }
    
    @SuppressWarnings("unchecked")
    public static <T> Page<T> createPageByQuery(QueryCreator queryCreator,int start, int limit) {
        Query query = queryCreator.creatQuery(false);
        List<T> list = query.setFirstResult(start)
                .setMaxResults(limit)
                .list();
        Long counts = (Long) queryCreator.creatQuery(true).uniqueResult();
        Page<T> page = new Page<T>();
        page.setRecords(list);
        page.setTotal(counts == null ? 0 : counts.intValue());
        page.setStart(start);
        page.setLimit(limit);
        return page;
    }
}
