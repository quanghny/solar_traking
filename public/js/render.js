function calculateHourValue(arrTime) {
	const arr = arrTime.map((item) => {
		let volt = 0;
		let amp = 0;
		volt += item.volt;
		amp += item.amp;
		return {
			volt: volt,
			amp: amp,
			power: volt * amp,
			time: new Date(item.createdAt).setSeconds(0, 0),
		};
	});
	return arr;
}

function calculateMonthValue(arrTime) {
	const arr = arrTime.map((list) => {
		let volt = 0;
		let amp = 0;
		for (let item of list) {
			volt += item.volt;
			amp += item.amp;
		}
		volt = volt / list.length;
		amp = amp / list.length;
		return {
			volt: volt,
			amp: amp,
			power: volt * amp,
			time: new Date(list[0].createdAt).setHours(0, 0, 0, 0),
		};
	});
	return arr;
}

function calculateDayValue(arrTime) {
	const arr = arrTime.map((list) => {
		let volt = 0;
		let amp = 0;
		for (let item of list) {
			volt += item.volt;
			amp += item.amp;
		}
		volt = volt / list.length;
		amp = amp / list.length;
		return {
			volt,
			amp,
			power: volt * amp,
			time: new Date(list[0].createdAt).setMinutes(0, 0, 0),
		};
	});
	return arr;
}
function renderChart(arr) {
	if (document.getElementById('myChart')) {
		document
			.getElementById('myChart')
			.parentElement.removeChild(document.getElementById('myChart'));
	}

	document
		.querySelector('.chartBox')
		.insertAdjacentHTML('afterbegin', `<canvas id="myChart"></canvas>`);
	const ctx = document.getElementById('myChart').getContext('2d');
	const gradientBg = ctx.createLinearGradient(0, 0, 0, 500);
	gradientBg.addColorStop(0.1, '#fbb584'); //rgba(#fbb584,0.3)
	gradientBg.addColorStop(0.8, '#fff');
	// setup
	const data = {
		datasets: [
			{
				label: 'Volt',
				data: arr,
				backgroundColor: '#906fd9',
				borderColor: '#906fd9',
				pointStyle: 'circle',
				borderWidth: 3,
				tension: 0.1,
				pointBackgroundColor: 'white',
				pointBorderColor: '#906fd9',
				pointRadius: 0,
				pointHoverRadius: 5,
				pointBorderWidth: 1,
				pointHitRadius: 20,
				yAxisID: 'volt',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'volt',
				},
			},
			{
				label: 'Amp',
				data: arr,
				backgroundColor: '#f96e6e',
				borderColor: '#f96e6e',
				pointStyle: 'circle',
				borderWidth: 3,
				tension: 0.1,
				pointBackgroundColor: 'white',
				pointBorderColor: '#f96e6e',
				pointRadius: 0,
				pointHoverRadius: 5,
				pointBorderWidth: 1,
				pointHitRadius: 20,
				yAxisID: 'amp',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'amp',
				},
			},
			{
				label: 'Power',
				data: arr,
				backgroundColor: gradientBg,
				borderColor: '#fc9f5d',
				pointStyle: 'circle',
				borderWidth: 1,
				tension: 0.1,
				pointBackgroundColor: 'white',
				pointBorderColor: '#fc9f5d',
				pointRadius: 0,
				pointHoverRadius: 5,
				fill: true,
				pointBorderWidth: 1,
				pointHitRadius: 20,
				yAxisID: 'power',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'power',
				},
			},
		],
	};

	// config
	const config = {
		type: 'line',
		data,
		options: {
			maintainAspectRatio: true,
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: false,
					text: 'Solar',
					padding: 0,
				},
				tooltip: {
					backgroundColor: function (params) {
						const color = params.tooltip.labelColors[0].borderColor;
						return color;
					},
					callbacks: {
						// month
						// title: function (params) {
						// 	const arr = params[0].label.split(', ');
						// 	return `${arr[0]} , ${arr[1]}`;
						// },
					},
				},
			},
			scales: {
				x: {
					grid: {
						display: false,
					},
					type: 'time',
					time: {
						displayFormats: { minute: 'HH:mm' },
					},
				},

				volt: {
					type: 'linear',
					position: 'left',
					grid: {
						display: false,
						borderWidth: 0,
					},
					min: 0,

					ticks: {
						color: '#906fd9',
						callback: function (value) {
							return value + ' (V)';
						},
					},
					grace: '5%',
				},
				amp: {
					type: 'linear',
					position: 'left',
					ticks: {
						color: '#f74646',
						callback: function (value) {
							return value + ' (A)';
						},
					},
					min: 0,

					grid: {
						display: false,
						borderWidth: 0,
					},
					grace: '5%',
				},
				power: {
					type: 'linear',
					position: 'left',
					ticks: {
						color: '#fc9f5d',
						callback: function (value) {
							return value + ' (W)';
						},
					},
					min: 0,

					grid: {
						display: false,
						borderWidth: 0,
					},
					grace: '5%',
				},
			},
		},
	};

	// render init block
	const myChart = new Chart(document.getElementById('myChart'), config);
	return myChart;
}
export {
	renderChart,
	calculateHourValue,
	calculateMonthValue,
	calculateDayValue,
};
