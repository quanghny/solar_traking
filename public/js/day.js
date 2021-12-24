import { sliceHour } from './sliceTime.js';
import { renderChart, calculateDayValue } from './render.js';
import toggleYAxis from './toggleValue.js';
const btn_volt = document.getElementById('btn-volt');
const btn_amp = document.getElementById('btn-amp');
const btn_power = document.getElementById('btn-power');

document.getElementById('date').onblur = async (e) => {
	const time = e.target.value;
	getCurrentDate(time);
};
async function getCurrentDate(time) {
	const currentDate = new Date(time).getTime();
	const nextDate = currentDate + 24 * 60 * 60 * 1000;

	const date = await axios({
		method: 'post',
		url: '/api/date',
		data: {
			currentDate,
			nextDate,
		},
	});
	if (date.data.length === 0) {
		document.getElementById('message').innerHTML = 'No Data';
		const myChart = document.getElementById('myChart');
		if (myChart) {
			myChart.parentElement.removeChild(myChart);
		}
	} else {
		document.getElementById('message').innerHTML = '';
		const pureArr = date.data;
		const cloneArr = JSON.parse(JSON.stringify(pureArr));
		const arrHour = sliceHour(cloneArr, pureArr);
		const arr = calculateDayValue(arrHour);
		const myChart = renderChart(arr);
		configChart(myChart);
	}
}
function configChart(myChart) {
	myChart.config.options.scales.x.time.unit = 'hour';
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
getCurrentDate(new Date().setHours(0, 0, 0, 0));

const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	li.classList.remove('active');
}

document.querySelector('.item-day').classList.add('active');
