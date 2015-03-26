package com.wzy.design.util;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.HashSet;
import java.util.Set;
/**
 * 注解工具类
 * <li>功能简述:
 * <li>详细描述:
 * @author  root
 * @version  [1.0 Dec 15, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public class AnnotationUtils {
    public static Set<String> getFieldsByAnnotation(Class<? extends Annotation> annotationClazz, Class<?> targetClazz) {
        Set<String> result = new HashSet<String>();
        while (targetClazz != null) {
            Field[] fields = targetClazz.getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(annotationClazz)) {
                    result.add(field.getName());
                }
            }
            targetClazz = targetClazz.getSuperclass();
        }

        return result;
    }
}
