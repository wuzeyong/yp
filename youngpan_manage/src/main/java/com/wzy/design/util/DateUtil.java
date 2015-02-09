package com.wzy.design.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


public class DateUtil {
    public static int getFiled(Date date, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(field);
    }
    
    /**
     * 将Date类型的时间转成:23:59:59
     */
    public static Date time2EndOfDay(Date date){
        Calendar tmp = Calendar.getInstance();
        tmp.setTime(date);
        Calendar calendar = Calendar.getInstance();
        calendar.set(tmp.get(Calendar.YEAR), tmp.get(Calendar.MONTH), tmp.get(Calendar.DATE),23,59,59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }
    
    public static Date string2Date(String str){
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	Date date = null;
		try {
			date = sdf.parse(str);
		} catch (ParseException e) {
			date = new Date();
		}
    	return date;
    }
}
