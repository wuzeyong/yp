package com.wzy.design.support;

import org.hibernate.Criteria;

public interface CriteriaCreator {

    Criteria create(boolean count);

}
