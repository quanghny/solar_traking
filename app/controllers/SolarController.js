const SolarModel = require('../models/Solar');
class Solar {
	// ------------------------------------
	// [GET] /api/time {dev}
	async receive(req, res) {
		//Find
		const data = await SolarModel.find(
			{
				createdAt: {
					$gt: new Date('2021-11-07 0:'),
					$lt: new Date('2021-12-07 0:'),
				},
			},
			{ volt: 1, amp: 1, _id: 0, createdAt: 1 }
		).lean();

		return res.json(data);
	}
	// [DELETE] data {dev} /api/delete
	async delete(req, res) {
		const { startDay, endDay } = req.body;
		await SolarModel.deleteMany({
			createdAt: {
				$gt: new Date(startDay),
				$lt: new Date(endDay),
			},
		});
		res.json('OK!');
	}
	// [DELETE] /api/delete/date {dev}
	async deleteDate(req, res) {
		const { date } = req.body;

		await SolarModel.findOneAndDelete({
			createdAt: {
				$eq: date,
			},
		});

		res.json('OK!');
	}
	// ------------------------------------

	// [POST] /
	async send(req, res) {
		try {
			const { volt, amp } = req.body;
			const newData = new SolarModel({ volt, amp });
			await newData.save();
			res.status(201).json({ message: 'success' });
		} catch (error) {
			res
				.status(400)
				.json({ message: 'Send data fail', error: error.messages });
		}
	}

	// [POST] /api/date
	async getDate(req, res) {
		try {
			const { nextDate, currentDate } = req.body;
			const data = await SolarModel.find(
				{
					createdAt: {
						$gte: currentDate,
						$lt: nextDate,
					},
				},
				{ _id: 0, createdAt: 1, volt: 1, amp: 1 },
        {
					sort: {
						createdAt: 1,
					},
				} 
			).lean();
			res.json(data); //if no data then return []
		} catch (error) {
			res.status(400).json({ message: 'Get data fail', error: error.messages });
		}
	}

	// [POST] /api/hour
	async getHour(req, res) {
		try {
			const { currentHour, nextHour } = req.body;

			const data = await SolarModel.find(
				{
					createdAt: {
						$gte: currentHour,
						$lt: nextHour,
					},
				},
				{ _id: 0, createdAt: 1, volt: 1, amp: 1 },
        {
					sort: {
						createdAt: 1,
					},
				} 
			).lean();
			res.json(data);
		} catch (error) {
			res.status(400).json({ message: 'Get data fail', error: error.messages });
		}
	}

	// [POST] /api/month
	async getMonth(req, res) {
		try {
			const { currentMonth, nextMonth } = req.body;
			const data = await SolarModel.find(
				{
					createdAt: {
						$gte: new Date(currentMonth).getTime(),
						$lt: new Date(nextMonth).getTime(),
					},
				},
				{ _id: 0, createdAt: 1, volt: 1, amp: 1 },
        {
					sort: {
						createdAt: 1,
					},
				} 
			).lean();
			res.json(data);
		} catch (error) {
			res.status(400).json({ message: 'Get data fail', error: error.messages });
		}
	}

	// [POST] /api/current-time
	async currentTime(req, res) {
		try {
			const data = await SolarModel.findOne(
				{},
				{ _id: 0, createdAt: 1, volt: 1, amp: 1 },
				{ sort: { createdAt: -1 } }
			).lean();
			res.json(data);
		} catch (error) {
			res.status(400).json({ message: 'Get data fail', error: error.messages });
		}
	}
}
module.exports = new Solar();
