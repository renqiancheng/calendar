# 中国农历公历换算算法

本项目基于 [mumuy/calendar](https://github.com/mumuy/calendar) 修改维护。

## 参考标准

算法根据《中华人民共和国国家标准GB/T33661—2017〈农历的编算和颁行〉》标准开发，明确了干支纪年和生肖纪年起于正月初一0点，与农历新年同步。

## 与原版差异

相对原版，本仓库主要改动如下：

- **时区修复**：公历时间戳统一使用本地时区午夜（`getTimestampBySolar` / `getLunarByTimestamp` 基准点），`getToday()` 与 `getDateBySolar()` 走同一套逻辑，避免在西时区等环境下「今天」与日历格子日期不一致。
- **演示页**：移除自动跳转官网及 `stat.js` 中的域名重定向，便于本地调试。

## 安装

```bash
npm install @rqiancheng/calendar
```

```js
// ESM
import calendar from '@rqiancheng/calendar';

// CommonJS / Node
const calendar = require('@rqiancheng/calendar');

// 万年历 Web Component
import '@rqiancheng/calendar/widget-calendar';
```

发布前请执行 `npm run build`，NPM 仅包含 `dist/` 目录下的构建产物。

## 时区说明

- **浏览器端**：`getToday()`、`getDateBySolar()`、`widget-calendar` 均按用户**本地时区**解析日期，一般可正常使用。
- **Node / 服务端**：`getToday()` 取的是**服务器系统时区**的「今天」。容器默认 UTC 时，可能与国内用户看到的日期不同；服务端应传入客户端日期，或自行按业务时区（如 `Asia/Shanghai`）处理。

```js
// 服务端推荐：使用客户端传来的年月日，而非 getToday()
calendar.getDateBySolar(clientYear, clientMonth, clientDay);
```

## 法定节假日数据

节日名称（春节、端午、清明等）由农历、节气等算法计算；日历上的 **「休 / 班」** 标记来自 `src/module/config/holiday.js` 中的 `scheduleMap`，为**静态配置**，需按国务院每年发布的放假安排手动维护。

- 配置位置：`src/module/config/holiday.js` → `scheduleMap`
- 数据含义：`'MM-DD': 1` 表示放假（休），`'MM-DD': 0` 表示调休补班（班）
- 当前覆盖：2011～2026 年；新年份需待国务院办公厅通知发布后追加
- 官方来源：[中国政府网 · 节假日安排](https://www.gov.cn/zhengce/)（搜索「国办发明电」或「节假日安排」）

修改 `holiday.js` 后需重新执行 `npm run build`。

## 网页组件
```html
<widget-calendar date="2023-01-01"></widget-calendar>
```

```html
<widget-calendar>
    <div slot="item">
        <p>双鱼座</p>
    </div>    
</widget-calendar>
```

#### 自定义事件-选中日期: onSelect

```js
document.querySelector('widget-calendar').addEventListener('onSelect',function(event){
}
```

#### 自定义事件-切换日期: onChange

```js
document.querySelector('widget-calendar').addEventListener('onChange',function(event){
}
```

#### 自定义事件-初始化: onInit

```js
document.querySelector('widget-calendar').addEventListener('onInit',function(event){
}
```

## 方法调用

```js
// 农历日期: 2023年闰二月初十
calendar.getDateByLunar(2023,2,10,true);

// 公历日期：2022年10月1日
calendar.getDateBySolar(2022,10,1);

// 今天
calendar.getToday();
```

## 返回结果

```js
{
    "date":'2022-10-01',
    "sYear":2022,
    "sMonth":10,
    "sDay":1,
    "lYear":2022,
    "lMonth":9,
    "lDay":6,
    "isLeap":false,
    "lMonthZH":"九月",
    "lDayZH":"初六",
    "gzYearZH":"壬寅",
    "gzMonthZH":"己酉",
    "gzDayZH":"丁亥",
    "week":6,
    "weekZH":"星期六",
    "animal":"虎",
    "term":"",
    "zodiac":"天秤座",
    "festival":"国庆节"
}
```
