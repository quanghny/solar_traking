import { sliceDay,hourInDay } from './sliceTime.js';
import { renderChart, calculateMonthValue,calculateMonth } from './render.js';
import toggleYAxis from './toggleValue.js';

const btn_volt = document.getElementById('btn-volt');
const btn_amp = document.getElementById('btn-amp');
const btn_power = document.getElementById('btn-power');

document.getElementById('month').onblur = async (e) => {
	const date = e.target.value;
	getCurrentMonth(date);
};
async function getCurrentMonth(time) {
	const currentMonth = new Date(time).getMonth() + 1;
	const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
	let year = new Date(time).getFullYear();
	let year_nextMonth = currentMonth === 12 ? year + 1 : year;

	const month = await axios({
		method: 'post',
		url: '/api/month',
		data: {
			currentMonth: `${year}-${currentMonth}-1 0:`,
			nextMonth: `${year_nextMonth}-${nextMonth}-1 0:`,
		},
	});

	if (month.data.length === 0) {
		document.getElementById('message').innerHTML = 'No Data';
		const myChart = document.getElementById('myChart');
		if (myChart) {
			myChart.parentElement.removeChild(myChart);
		}
	} else {
		document.getElementById('message').innerHTML = '';
		const pureArr = month.data;
		const cloneArr = JSON.parse(JSON.stringify(pureArr));
		const arrDay = sliceDay(cloneArr, pureArr);
		const arr = calculateMonth(hourInDay(arrDay));
		const myChart = renderChart(arr);
		configChart(myChart);
	}
}
function configChart(myChart) {
	myChart.config.options.scales.x.time.unit = 'day';
	myChart.config.options.plugins.tooltip.callbacks = {
		title: function (params) {
			const arr = params[0].label.split(', ');
			return `${arr[0]} , ${arr[1]}`;
		},
	};
	myChart.update();
	btn_volt.onclick = () => {
		toggleYAxis(0, myChart);
	};
	btn_amp.onclick = () => {
		toggleYAxis(1, myChart);
	};
	btn_power.onclick = () => {
		toggleYAxis(2, myChart);
	};
}
getCurrentMonth(Date.now());
const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	for (let li of li_list) {
		li.classList.remove('active');
	}
}
document.querySelector('.item-month').classList.add('active');
