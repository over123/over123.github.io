/*
 * @Author: xudan
 * @Date: 2024-07-26 12:20:23
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-16 15:45:29
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

// const defaultDateStart = '2024-07-26';
// const defaultDateEnd = '2024-07-28';
// const defaultWeek = '2024-07-26';


/** 表格内容数据 */
export interface ScheduleData {
    time: string;
    date: string;
    professor?: string;
    professorId?: string;
    platform?: string;
    meetingPlatform?: string;
    meetingId?: string;
    category?: string; // 英语类别: IELTS, business ...
    available?: boolean;
    remarks?: string;
    isDisabled?: boolean; // 当前日期/时间是否不可选
}

/** 模拟数据 */
export const scheduleData: ScheduleData[] = [
    {
        time: '10:00',
        date: '2024-08-14',
        professor: 'Gera',
        professorId: '130',
        platform: 'speak8',
        meetingPlatform: 'tencentMeeting',
        meetingId: '123456',
        category: 'IELTS',
        remarks: '备注内容'
    },
    {
        time: '10:00',
        date: '2024-07-29',
        professor: 'Gera',
        professorId: '130',
        platform: 'speak8',
        meetingPlatform: 'tencent meeting',
        meetingId: '123456',
        category: 'business'
    },
    {
        time: '10:00',
        date: '2024-08-14',
        available: true
    }
];

