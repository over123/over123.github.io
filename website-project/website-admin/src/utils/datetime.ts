/*
 * @Author: xudan
 * @Date: 2024-07-26 12:02:19
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-01 18:09:11
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

/**
 * @description: 生成前后三天的日期列表(共七天),表格首行数据
 * @return {*}
 */
const generateDateList = () => {
    const dateList = [];
    const today = new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = -3; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const formattedDate = date.toISOString().split('T')[0];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const isDisabled = date < today;
        dateList.push({ date: formattedDate, dayOfWeek, isDisabled });
    }
    return dateList;
}

/**
 * @description: 生成早8点到晚12点的时间列表
 * @return {*}
 */
const generateTimeList = () => {
    const timeList = [];
    let hour = 8;
    let minute = 0;
    const today = new Date();
    const currentHour = today.getHours();

    while (hour < 24) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isDisabled = hour < currentHour;
        timeList.push({ time, isDisabled });

        minute += 30;
        if (minute >= 60) {
            hour++;
            minute = 0;
        }
    }

    // timeList.push({ time: '00:00', isDisabled: true });
    return timeList;
}


/**
 * @description: 生成表格
 * @return {*}
 */
const generateScheduleList = () => {
    const schedulesData: any = new Array(timeList.length).fill({});
    return schedulesData
}


export const dateList = generateDateList()
export const timeList = generateTimeList()
export const scheduleList = generateScheduleList()