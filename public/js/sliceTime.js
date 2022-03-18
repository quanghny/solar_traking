// For Month
function sliceDay(cloneArr, pureArr) {
	const arrDay = [];
	const length = pureArr.length;
	const start = new Date(pureArr[0].createdAt);
	const TOTAL_CALL = (24 * 60) / 5; // giảm đi 5 lần để test còn thực tế thì không / 5;
	let startDay = start.getDate();
	let preIndex = 0;

	for (let i = 0; i < length || cloneArr.length !== 0; i += TOTAL_CALL) {
		let isCheckLess = false;
		let isCheckGreater = false;
		if (i >= length) {
			i = length - 1;
		}
		do {
			const point = new Date(pureArr[i].createdAt).getTime();

			let nextDate = new Date(start).setDate(startDay) + 24 * 60 * 60 * 1000;

			const timeline = new Date(nextDate).setHours(0, 0, 0, 0);

			if (point < timeline) {
				isCheckLess = true;

				if (i === length - 1) {
					isCheckGreater = true; // exit
				}

				if (!isCheckGreater) {
					i++;
				}
			} else {
				isCheckGreater = true;
				i--;
			}
		} while (!(isCheckLess && isCheckGreater));
		arrDay.push(cloneArr.splice(0, i - preIndex + 1));
		preIndex = i + 1;
		if (cloneArr.length !== 0)
			startDay = new Date(cloneArr[0].createdAt).getDate();
	}

	return arrDay;
}

// For Day
function sliceHour(cloneArr, pureArr) {

	const arrHour = [];
	const length = pureArr.length;
	const start = new Date(pureArr[0].createdAt);
	const MINUTE_MAX = 59;
	const TOTAL_CALL = 60;
	let startHour = start.getHours();
	let startMinute = start.getMinutes();
	let preIndex = 0;

	for (
		let i = MINUTE_MAX - startMinute;
		i < length || cloneArr.length !== 0;
		i += TOTAL_CALL
	) {
		let isCheckLess = false;
		let isCheckGreater = false;

		if (i >= length) {
			i = length - 1;
		}
		do {
			const point = new Date(pureArr[i].createdAt).getTime();
		
			const timeline = new Date(point).setHours(startHour + 1, 0, 0, 0);
	
			if (point < timeline) {
				isCheckLess = true;

				if (i === length - 1) {
			
					isCheckGreater = true;
				}

				if (!isCheckGreater) {
					i++;
				}
			} else {
				isCheckGreater = true;
				i--;
			}
		} while (!(isCheckLess && isCheckGreater));
		arrHour.push(cloneArr.splice(0, i - preIndex + 1));
		preIndex = i + 1;
		if (cloneArr.length !== 0)
			startHour = new Date(cloneArr[0].createdAt).getHours();
	}
	return arrHour;
}
function hourInDay(arrDay) {
  return arrDay.map((item) => {
    return sliceHour(JSON.parse(JSON.stringify(item)), item);
  });
}
export { sliceDay, sliceHour,hourInDay };
