/*
 * @Author: xudan
 * @Date: 2024-07-26 12:02:19
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-12 13:48:27
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
/**
 * @description: Generate a list of dates for the next seven days, including today
 * @return {Array}
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
 * @description: Generate a list of times from 8:00 AM to 11:30 PM
 * @return {Array}
 */
const generateTimeList = () => {
    const timeList = [];
    let hour = 8;
    let minute = 0;
    const today = new Date();
    const currentHour = today.getHours();

    while (hour < 24) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isDisabled = hour <= currentHour;
        timeList.push({ time, isDisabled });

        minute += 30;
        if (minute >= 60) {
            hour++;
            minute = 0;
        }
    }

    return timeList;
}

/**
 * @description: Generate an empty schedule list with the same length as the time list
 * @return {Array}
 */
const generateScheduleList = () => {
    const timeList = generateTimeList();
    const schedulesData = new Array(timeList.length).fill({});
    return schedulesData;
}

export const dateList = generateDateList();
export const timeList = generateTimeList();
export const scheduleList = generateScheduleList();
