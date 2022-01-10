function toggleYAxis(value, myChart) {
	const visibilityData = myChart.isDatasetVisible(value);
	if (visibilityData === true) {
		myChart.hide(value);
		switch (value) {
			case 0:
				myChart.config.options.scales.volt.display = false;
				document.getElementById('btn-volt').style.opacity = '0.2';
				break;
			case 1:
				myChart.config.options.scales.amp.display = false;
				document.getElementById('btn-amp').style.opacity = '0.2';
				break;
			case 2:
				myChart.config.options.scales.power.display = false;
				document.getElementById('btn-power').style.opacity = '0.2';
				break;
			default:
				break;
		}
		myChart.update();
	} else {
		myChart.show(value);
		switch (value) {
			case 0:
				myChart.config.options.scales.volt.display = true;
				document.getElementById('btn-volt').style.opacity = '1';
				break;
			case 1:
				myChart.config.options.scales.amp.display = true;
				document.getElementById('btn-amp').style.opacity = '1';
				break;
			case 2:
				myChart.config.options.scales.power.display = true;
				document.getElementById('btn-power').style.opacity = '1';
				break;
			default:
				break;
		}
		myChart.update();
	}
}

export default toggleYAxis;
