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
	/**
	 *  TOTAL_MINUTES = 60 vì một phút call 1 lần, 1h call 60 lần
	 *  i < length || cloneArr.length !== 0; vì để kiểm tra xem thử nếu mà i+=60 mà vượt quá length
	 *  nhưng cloneArr chưa rỗng thì mình phải lặp tiếp để lấy tất cả những phần còn lại
	 *  1. pureArr[length-1].createdAt < timeline
	 *    - thì mình sẽ lấy tất cả các phần tử từ đầu đến cuối mảng
	 */
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
			//  (point,timeLine)
			const timeline = new Date(point).setHours(startHour + 1, 0, 0, 0);
			// point dùng để mượn ngày tháng năm còn hour thì cộng thêm vào nên ở đây có thể thay thế point = start như nhau
			// vì đều cùng ngày tháng năm

			// -----------| timeLine |------------
			// -------*---| timeLine |------------ cộng thêm: i++ => isCheckLess = true
			// -----------| timeLine |-*---------- trừ lại => isCheckGreater = true; i--;
			if (point < timeline) {
				isCheckLess = true;

				if (i === length - 1) {
					// Phần tử cuối cùng nằm trong khoảng thỏa
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

export { sliceDay, sliceHour };
