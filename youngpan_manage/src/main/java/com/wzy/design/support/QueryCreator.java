package com.wzy.design.support;

import org.hibernate.Query;

public interface QueryCreator {
    public Query creatQuery(boolean count);
}
