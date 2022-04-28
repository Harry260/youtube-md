import puppeteer from "puppeteer";
import http from "http";

const screenShot = async (params, callback) => {
	var url = params.url;
	var size = params.size;
	try {
		const browser = await puppeteer.launch({
			args: ["--no-sandbox"],
		});

		const page = await browser.newPage();
		await page.setViewport(size);

		await page.goto(url);

		const image = await page.screenshot({ fullPage: true });
		await browser.close();

		cb(image);
	} catch (error) {
		cb(false);
	}

	function cb(data) {
		if (typeof callback === "function") {
			callback(data);
		}
	}
};

const checkVideo = (videoId, callback) => {
	var options = {
		method: "HEAD",
		host: "img.youtube.com",
		path: "/vi/" + videoId + "/0.jpg",
	};

	var req = http.request(options, function (res) {
		res.statusCode == 200 ? cb(true) : cb(false);
	});

	req.end();

	function cb(data) {
		if (typeof callback === "function") {
			callback(data);
		}
	}
};

const getSize = (width, height) => {
	if (width && height) {
		return {
			width: parseInt(width),
			height: parseInt(height),
		};
	} else if (width) {
		return {
			width: parseInt(width),
			height: parseInt(width),
		};
	} else if (!height && !width) {
		return {
			width: 640,
			height: 360,
		};
	}
};

export { screenShot, checkVideo, getSize };
