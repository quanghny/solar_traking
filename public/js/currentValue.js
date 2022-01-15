/**
 *  0 - 10  : 50deg
 *  11 - 20 :150deg
 *  21 - 30 :250deg
 *  31 - 40 :350deg
 * 
 * 0-0.3
 * 0.31-0.6
 * 0.61-0.9
 * 0.91
 */

function currentVolt(val) {
	const volt = document.querySelector('#volt-value');
	const value = parseFloat(val);
	const run = document.querySelector('.volt-wrapper circle');
	volt.innerHTML = val;
	if (value <= 10 && value >= 0) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '375px',
		});
	}
	if (value <= 20 && value >= 11) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '250px',
		});
	}
	if (value <= 30 && value >= 21) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '175px',
		});
	}
	if (value >= 31) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '50px',
		});
	}
}
function currentPower(val) {
	const power = document.querySelector('#power-value');
	const value = parseFloat(val);
	const run = document.querySelector('.power-wrapper circle');
	power.innerHTML = val;
	if (value <= 10 && value >= 0) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '375px',
		});
	}
	if (value <= 20 && value >= 11) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '250px',
		});
	}
	if (value <= 30 && value >= 21) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '175px',
		});
	}
	if (value >= 31) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '50px',
		});
	}
}
function currentAmp(val) {
	const amp = document.querySelector('#amp-value');
	const value = parseFloat(val);
	const run = document.querySelector('.amp-wrapper circle');
	amp.innerHTML = val;
	if (value <= 0.3 && value >= 0) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '375px',
		});
	}
	if (value <= 0.6 && value > 0.3) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '250px',
		});
	}
	if (value <= 0.9 && value > 0.6) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '175px',
		});
	}
	if (value > 0.9) {
		Object.assign(run.style, {
			transition: 'stroke-dashoffset 0.3s',
			'stroke-dashoffset': '50px',
		});
	}
}
async function getCurrentValue() {
	const { data } = await axios.get('/api/current-time');
	const { volt, amp } = data;
	currentVolt(volt.toFixed(2));
	currentAmp(amp.toFixed(2));
	currentPower((volt * amp).toFixed(2));
}
getCurrentValue();
setInterval(getCurrentValue, 60000);
