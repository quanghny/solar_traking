import { sliceHour, sliceDay, hourInDay } from './sliceTime.js';
import { calculateMonth, calculateDayValue } from './render.js';

async function getData() {
  const res = await axios.get('/api/current-time');
  const time = res.data.createdAt;
  // Hour
  const currentHour = new Date(time).setMinutes(0, 0, 0);
  const nextHour = currentHour + 60 * 60 * 1000;
  const res_1 = axios({
    method: 'post',
    url: '/api/hour',
    data: {
      currentHour,
      nextHour,
    },
  });
  //------------------
  const currentDate = new Date(time).setHours(0, 0, 0, 0);
  const nextDate = currentDate + 24 * 60 * 60 * 1000;
  const res_2 = axios({
    method: 'post',
    url: '/api/date',
    data: {
      currentDate,
      nextDate,
    },
  });
  //--------------------
  const currentMonth = new Date(time).getMonth() + 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  let year = new Date(time).getFullYear();
  let year_nextMonth = currentMonth === 12 ? year + 1 : year;
  const res_3 = axios({
    method: 'post',
    url: '/api/month',
    data: {
      currentMonth: `${year}-${currentMonth}-1 0:`,
      nextMonth: `${year_nextMonth}-${nextMonth}-1 0:`,
    },
  });

  const hourData = await res_1;
  //--------------------
  const arrHourAmp = [...hourData.data].sort((a, b) => a.amp - b.amp);
  const arrHourVolt = [...hourData.data].sort((a, b) => a.volt - b.volt);
  const arrPower = [...hourData.data].map((item) => {
    return { value: item.volt * item.amp, time: item.createdAt };
  });
  const arrHourPower = arrPower.sort((a, b) => a.value - b.value);

  const resultHourAmp = {
    min: [arrHourAmp[0].amp, arrHourAmp[0].createdAt],
    max: [
      arrHourAmp[arrHourAmp.length - 1].amp,
      arrHourAmp[arrHourAmp.length - 1].createdAt,
    ],
  };

  const resultHourVolt = {
    min: [arrHourVolt[0].volt, arrHourVolt[0].createdAt],
    max: [
      arrHourVolt[arrHourVolt.length - 1].volt,
      arrHourVolt[arrHourVolt.length - 1].createdAt,
    ],
  };
  const resultHourPower = {
    min: [arrHourPower[0].value, arrHourPower[0].time],
    max: [
      arrHourPower[arrHourPower.length - 1].value,
      arrHourPower[arrHourPower.length - 1].time,
    ],
  };
  // Hour

  //Day
  const dayData = await res_2;
  // console.log(dayData);
  //--------------------

  const pureArr = dayData.data;
  const cloneArr = JSON.parse(JSON.stringify(pureArr));
  const arrDay = calculateDayValue(sliceHour(cloneArr, pureArr));
  const resultDayAmp = getValueMinMax(arrDay, 'amp');
  const resultDayVolt = getValueMinMax(arrDay, 'volt');
  const resultDayPower = getPowerMinMax(arrDay);
  //month
  const monthData = await res_3;
  //--------------------

  const pureArr1 = monthData.data;
  const cloneArr1 = JSON.parse(JSON.stringify(pureArr1));
  const arrMonth = calculateMonth(hourInDay(sliceDay(cloneArr1, pureArr1)));
  const resultMonthAmp = getValueMinMax(arrMonth, 'amp');
  const resultMonthVolt = getValueMinMax(arrMonth, 'volt');
  const resultMonthPower = getPowerMinMax(arrMonth);
  const htmlAmp = `
	        <tr>
	            <td class = 'hour'>Hour</td>
	            <td>
                <b>
                    ${resultHourAmp.min[0].toFixed(3)}A
                </b>
                - 
                <i>
                ${formatTime(resultHourAmp.min[1]).hour}
                </i>
                 </td>
	            <td>
                <b>
                    ${resultHourAmp.max[0].toFixed(3)}A
                </b>
                - 
                <i>
                ${formatTime(resultHourAmp.max[1]).hour}
                </i>
                 </td>
	        </tr>
	        <tr>
	            <td class = 'day'>Day</td>
	            <td>
                <b>
                    ${resultDayAmp.min.value.toFixed(3)}A
                </b>
                - 
                <i>
                ${formatTime(resultDayAmp.min.time).day}
                </i>
                 </td>
	            <td>
                <b>
                    ${resultDayAmp.max.value.toFixed(3)}A
                </b>
                - 
                <i>
                ${formatTime(resultDayAmp.max.time).day}
                </i>
                 </td>
	        </tr>
	        <tr>
	            <td class = 'month'>Month</td>
	            <td>
                <b>
                    ${resultMonthAmp.min.value.toFixed(3)}A
                </b>
                - 
                <i>
                ${formatTime(resultMonthAmp.min.time).month}
                </i>
                 </td>
	            <td>
                <b>
                    ${resultMonthAmp.max.value.toFixed(3)}A
                </b>
                - 
                <i>
                ${formatTime(resultMonthAmp.max.time).month}
                </i>
                 </td>
	        </tr>
	        
	`;
  document.getElementById('tbody-amp').innerHTML = htmlAmp;
  //Volt
  const htmlVolt = `
	        <tr>
	            <td class = 'hour'>Hour</td>
	            <td>
                <b>
                ${resultHourVolt.min[0].toFixed(2)}V
                </b>
                -
                <i>
                ${formatTime(resultHourVolt.min[1]).hour}
    </i></td>
	            <td>
                <b>
                ${resultHourVolt.max[0].toFixed(2)}V
                </b>
                 - 
                 <i>
                 ${formatTime(resultHourVolt.max[1]).hour}
                 </i>
                 
                 </td>
	        </tr>
	        <tr>
	            <td class = 'day'>Day</td>
	            <td>
                <b>
                ${resultDayVolt.min.value.toFixed(2)}V
                </b>
                 - 
                 <i>
                 ${formatTime(resultDayVolt.min.time).day}
                 </i>
                 
                 </td>
	            <td>
                <b>
                ${resultDayVolt.max.value.toFixed(2)}V
                </b>
                 - 
                 <i>
                 ${formatTime(resultDayVolt.max.time).day}
                 </i>
                 
                 </td>
	        </tr>
	        <tr>
	            <td class = 'month'>Month</td>
	            <td>
                <b>
                ${resultMonthVolt.min.value.toFixed(2)}V
                </b>
                - 
                <i>
                ${formatTime(resultMonthVolt.min.time).month}</td>
                </i>
	            <td>
                <b>
                ${resultMonthVolt.max.value.toFixed(2)}V
                </b>
                - 
                <i>
                ${formatTime(resultMonthVolt.max.time).month}</td>
                </i>
	        </tr>
	        
	`;
  document.getElementById('tbody-volt').innerHTML = htmlVolt;
  //power
  const htmlPower = `
	        <tr>
	            <td class = 'hour'>Hour</td>
	            <td>
                <b>
                ${resultHourPower.min[0].toFixed(2)}W
                </b>
                 - 
                 <i>
                 ${formatTime(resultHourPower.min[1]).hour}</td>
                 </i>
	            <td>
                <b>
                ${resultHourPower.max[0].toFixed(2)}W
                </b>
                 - 
                 <i>
                 ${formatTime(resultHourPower.max[1]).hour}</td>
                 </i>
	        </tr>
	        <tr>
	            <td class = 'day'>Day</td>
	            <td>
                <b>
                ${resultDayPower.min.value.toFixed(2)}W
                </b>
                 - 
                 <i>
                 ${formatTime(resultDayPower.min.time).day}</td>
                 </i>
	            <td>
                <b>
                ${resultDayPower.max.value.toFixed(2)}W
                </b>
                 - 
                 <i>
                 ${formatTime(resultDayPower.max.time).day}</td>
                 </i>
	        </tr>
	        <tr>
	            <td class = 'month'>Month</td>
	            <td>
                <b>
                ${resultMonthPower.min.value.toFixed(2)}W
                </b>
                 - 
                 <i>
                 ${formatTime(resultMonthPower.min.time).month}
              </td>
                 </i>
	            <td>
                <b>
                ${resultMonthPower.max.value.toFixed(2)}W
                </b>
                 - 
                 <i>
                 ${formatTime(resultMonthPower.max.time).month}
                 </i>
	        </tr>
	        
	`;
  document.getElementById('tbody-power').innerHTML = htmlPower;
}
getData();
function formatTime(value) {
  const minute = new Date(value).getMinutes();
  const hour = new Date(value).getHours();
  const day = new Date(value).getDate();
  const month = new Date(value).getMonth();

  return {
    hour: `${hour}:${minute} ${day}/${month + 1}`,
    day: `${hour}h ${day}/${month + 1}`,
    month: `${day}/${month + 1}`,
  };
}

function getValueMinMax(arr, param) {
  const arrSortTotal = parseArray(arr).sort((a, b) => a[param] - b[param]);
  return {
    min: {
      value: arrSortTotal[0][param],
      time: arrSortTotal[0].time,
    },
    max: {
      value: arrSortTotal[arrSortTotal.length - 1][param],
      time: arrSortTotal[arrSortTotal.length - 1].time,
    },
  };
}

function getPowerMinMax(arr) {
  const resultPower = parseArray(arr).sort((a, b) => a.power - b.power);
  return {
    min: {
      value: resultPower[0].power,
      time: resultPower[0].time,
    },
    max: {
      value: resultPower[resultPower.length - 1].power,
      time: resultPower[resultPower.length - 1].time,
    },
  };
}

function parseArray(arr) {
  return JSON.parse(JSON.stringify(arr));
}
