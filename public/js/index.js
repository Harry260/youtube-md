const generateButton = $(".gen-btn");
const inputVideoId = $(".video-id-in");
const previewImage = $(".preview-img");
const resultTxt = $(".result-txt");
const downloadImage = $(".download-img");
const rangeSlider = $(".range-slider");
const setSize = $(".set-size");
const sizeWrap = $(".size-wrap");
const sizeBtn = $(".size-btn");

var imageSize = {
	width: 640,
	height: 360,
};

const YouTube = {
	getVideoID: function (url) {
		var regExp =
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
		var match = url.match(regExp);
		return match && match[7].length == 11 ? match[7] : false;
	},
	checkVideo: function (id, callback) {
		fetch(
			`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					callback(false);
				} else {
					callback(data);
				}
			});
	},
};

function Generate(videoID) {
	resultTxt.fadeOut(300);
	downloadImage.removeClass("go-btn");
	previewImage.attr("src", `./images/lodaing.gif`);
	if (videoID) {
		inputVideoId.val(videoID);
		YouTube.checkVideo(videoID, function (data) {
			if (data) {
				var embedLink = `${location.href}${videoID}/${imageSize.width}/${imageSize.height}`;
				previewImage.attr("src", embedLink).attr("alt", data.title);

				previewImage.click(function () {
					window.open(data.url, "_blank");
				});

				var result = `[![${data.title}](${embedLink})](${data.url})`;

				previewImage.on("load", function () {
					resultTxt
						.text(result)
						.attr("data-clipboard-text", result)
						.css({ cursor: "pointer", display: "block" });
					var clip = new ClipboardJS(".result-txt");
					clip.on("success", function (e) {
						alert("Copied to clipboard");
					});
					downloadImage.addClass("go-btn");
				});
			} else {
				alert("Video Not found! Check your video id or URL!");
			}
		});
	} else {
		alert("Invalid Video ID or URL!");
	}
}

async function getImage(imageSrc, filename = "Download") {
	const image = await fetch(imageSrc);
	const imageBlog = await image.blob();
	const imageURL = URL.createObjectURL(imageBlog);

	const link = document.createElement("a");
	link.href = imageURL;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

generateButton.click(function () {
	var videoIdVal = inputVideoId.val();
	var isUrl = YouTube.getVideoID(videoIdVal);

	var videoID = isUrl ? isUrl : videoIdVal;
	Generate(videoID);
});

downloadImage.click(function () {
	if (downloadImage.hasClass("go-btn")) {
		var imageSrc = previewImage.attr("src");
		var filename = previewImage.attr("alt");
		getImage(imageSrc, filename);
	}
});

rangeSlider.on("input", function () {
	$(this).parent().find(".sub-size").text($(this).val());
});

setSize.click(function () {
	var height = parseInt($(".height-slider").val());
	var width = parseInt($(".width-slider").val());

	imageSize = {
		height,
		width,
	};

	sizeWrap.fadeOut();
	generateButton.click();
});

sizeBtn.click(function () {
	sizeWrap.fadeIn().css({ display: "flex" });
});

Generate("jNQXAC9IVRw");
