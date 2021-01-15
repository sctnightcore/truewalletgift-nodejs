const express = require('express');
const axios = require("axios");
const app = express();

const port = 1234;

app.use(express.json());

async function RequestCheck(req, res, next) {
	if ((req.body.key || req.body.code) === 'undefined' || (req.body.key || req.body.code) === '') {
		res.status(400).send({
			'status': false,
			'message': 'Wrong key (pieapple), giftcode , mobile',
			'example': `http://127.0.0.1:${port}/?key=pieapple&code=ID1Fm1CHZSoemlnfof&mobile=0989193177`,
			'mobile': 'คือเบอร์ที่จะรับเงิน'
		})
	}
	next()
}


app.post('/', RequestCheck, async (req, res) => {
	let code = req.body.code;
	let key = req.body.key;
	let mobile = req.body.mobile;
	try {
		let result = await axios({
			method: 'post',
			url: `https://gift.truemoney.com/campaign/vouchers/${code}/redeem`,
			headers: {
				'accept': 'application/json',
				'accept-encoding': 'gzip, deflate, br',
				'accept-language': 'en-US,en;q=0.9',
				'content-length': '59',
				'content-type': 'application/json',
				'origin': 'https://gift.truemoney.com',
				'referer': `https://gift.truemoney.com/campaign/?v=${code}`,
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66',
			},
			data: {
				'mobile': moblie,
				'voucher_hash': code
			}

		})

		if (result) {
			res.status(200).send({
				'status': true,
				'data': result.data
			})
		}

	} catch (e) {

		res.status(200).send({
			'status': false,
			'data': [],
			'message': e.message
		})
	}

})


app.listen(port, () =>
	console.log(`Listening on port: ${port} `)
);