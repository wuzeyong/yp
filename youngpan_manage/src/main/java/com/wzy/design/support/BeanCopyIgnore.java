package com.wzy.design.support;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 是否BeanCopy忽略标志
 * <li>功能简述:
 * <li>详细描述:
 * @author  nihy
 * @version  [1.0 Dec 12, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface BeanCopyIgnore {
    
}
