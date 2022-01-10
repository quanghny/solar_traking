import { renderChart, calculateHourValue } from './render.js';
import toggleYAxis from './toggleValue.js';

const btn_volt = document.getElementById('btn-volt');
const btn_amp = document.getElementById('btn-amp');
const btn_power = document.getElementById('btn-power');

document.getElementById('hour').onblur = async (e) => {
	const value = e.target.value;
	getCurrentHour(value);
};
async function getCurrentHour(time) {
	const currentHour = new Date(time).setMinutes(0, 0, 0);
	const nextHour = currentHour + 60 * 60 * 1000;

	const hour = await axios({
		method: 'post',
		url: '/api/hour',
		data: {
			currentHour,
			nextHour,
		},
	});

	if (hour.data.length === 0) {
		document.getElementById('message').innerHTML = 'No Data';
		const myChart = document.getElementById('myChart');
		if (myChart) {
			myChart.parentElement.removeChild(myChart);
		}
	} else {
		document.getElementById('message').innerHTML = '';
		const arr = calculateHourValue(hour.data);
		const myChart = renderChart(arr);
		configChart(myChart);
	}
}
function configChart(myChart) {
	myChart.config.options.scales.x.time.unit = 'minute';
	myChart.config.options.scales.x.time.parser = 'HH:mm';
	myChart.config.options.scales.x.time.displayFormats.minute = 'HH:mm';
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

getCurrentHour(new Date().setMinutes(0, 0, 0));
const list = document.querySelector('.list-nav');
const li_list = list.children;

for (let li of li_list) {
	li.classList.remove('active');
}

document.querySelector('.item-hour').classList.add('active');
