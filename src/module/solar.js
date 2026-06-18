import {getDateString} from './tool.js';
import {minYear, minMonth, minDay} from './config/base.js';

// 星期
const weekMap = ['日','一','二','三','四','五','六'];

// 历法日序号（UTC 日界，不受夏令时影响）
const epochDayNumber = Math.floor(Date.UTC(minYear, minMonth - 1, minDay) / 86400000);

// 公历日期距纪元（农历正月初一对应公历日）的天数
export function getSolarDayOffset(sYear, sMonth, sDay) {
    return Math.floor(Date.UTC(sYear, sMonth - 1, sDay) / 86400000) - epochDayNumber;
}

// 距纪元天数还原为公历日期
export function getSolarDateByDayOffset(offset) {
    const dayNumber = epochDayNumber + offset;
    const date = new Date(dayNumber * 86400000);
    return {
        sYear: date.getUTCFullYear(),
        sMonth: date.getUTCMonth() + 1,
        sDay: date.getUTCDate()
    };
}

// 公历日期转时间戳（使用本地时区午夜，与 getSolarByTimestamp 一致）
export function getTimestampBySolar(sYear,sMonth,sDay){
    return new Date(sYear, sMonth - 1, sDay, 0, 0, 0, 0).getTime();
}

// 通过时间戳获取日期
export function getSolarByTimestamp(timestamp){
    let now = new Date(timestamp);
    let week = now.getDay();
    let item = {
        sYear:now.getFullYear(),
        sMonth:now.getMonth()+1,
        sDay:now.getDate(),
        week:week,
        weekZH:'星期'+weekMap[week]
    };
    item['date'] = getDateString(item['sYear'],item['sMonth'],item['sDay']);
    return item;
}

// 获取公历一个月天数
export function getSolarMonthDays(sYear,sMonth){
    return  new Date(sYear,sMonth,0).getDate();
}