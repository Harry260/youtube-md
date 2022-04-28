import express from "express";
import "dotenv/config";
import { screenShot, checkVideo, getSize } from "./utils.js";

import path from "path";
var { dirname } = path;
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get(["/:url/:w/:h", "/:url/:w/", "/:url"], async (request, response) => {
	var videoid = request.params.url || request.query.url || false;

	var width = request.params.w || request.query.w || false;
	var height = request.params.h || request.query.h || false;

	var size = getSize(width, height);

	if (videoid) {
		checkVideo(videoid, (exist) => {
			if (exist) {
				var url = "https://www.youtube.com/embed/" + videoid;
				screenShot({ url, size }, (data) => {
					if (data) {
						response.set("Content-Type", "image/png");
						response.status(200).send(data);
					} else {
						sendError();
					}
				});
			} else {
				sendError();
			}
		});
	} else {
		sendError();
	}

	function sendError(error) {
		response
			.status(400)
			.sendFile("./public/images/error.jpg", { root: "." });
	}
});

app.listen(port, function () {
	console.log("Your app is listening on port " + port);
});
