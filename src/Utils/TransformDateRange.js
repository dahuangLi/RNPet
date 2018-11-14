/**
 * 根据选择的筛选条件，返回对应的字符串格式的起始日期
 * 没有改变返回空数组，并且不会触发dispatch action
 * 0全部，返回null 1今天 2本周 3本月 4自定义
 */
import dateFormat from './DateFormat';

// 一天的时间戳
const dayTimeStamp = 1000 * 60 * 60 * 24;

// 获取本周第一天
function getWeekDay() {
	let weekIndex = new Date().getDay();
	if (weekIndex === 0) {
		weekIndex = 7;
	}
	return dateFormat(new Date(Date.now() - dayTimeStamp * (weekIndex - 1)), 'yyyy-mm-dd');
}

// 获取本月第一天
function getMonthDay() {
	let dateIndex = new Date().getDate();
	return dateFormat(new Date(Date.now() - dayTimeStamp * (dateIndex - 1)), 'yyyy-mm-dd');
}

function getAfterDays(afterDays) {
    return dateFormat(new Date(Date.now() + dayTimeStamp * afterDays), 'yyyy-mm-dd');
}

export default function transformDate(index) {
	let temp = dateFormat(new Date(), 'yyyy-mm-dd');
	switch(index) {
		case 0:
			return null;
		case 1:
			return [temp, temp];
		case 2:
			return [getWeekDay(), temp];
		case 3:
			return [getMonthDay(), temp];
	}
}

export function transformAfterDate(afterDays) {
    let temp = dateFormat(new Date(), 'yyyy-mm-dd');
    if (!afterDays){
		return null;
    } else {
		return [temp, getAfterDays(afterDays)];
    }
}
