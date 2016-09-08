$(document).ready(function(){

	getImages();

	function getImages() {
		var apiUrl = "https://api.unsplash.com/photos/?client_id=16c5ead3d3682535c3f1b486b00f6591cb7418abd33130bad1183e04ef7b0954&per_page=20";
		$.get(apiUrl, function(data) {
			var numberOfSquares = data.length;
			var elements = [];
			$.each(data, function(index, value) {
				var element = $("<div class='square'><div class='inner' style='background-image: url("+value.urls.regular+");'></div></div>");
				elements.push(element);
			});
			$('.container').append(elements);
			var container = $(".container")
			sizeSquares(container, numberOfSquares);
		});
	}

	function sizeSquares(element, numberOfSquares) {

		var scrollBarWidth = (function() {
			$(".container").css("overflow-y", "auto");
			var fullWidth = $(element).prop("clientWidth");
			console.log(fullWidth)
			$(".container").css("overflow-y", "scroll");
			var widthMinusScrollbar	= $(".container").prop("clientWidth");
			$(".container").css("overflow-y", "auto");
			return fullWidth-widthMinusScrollbar;
		})();

		var finalSquareWidth;
		var finalContainerWidth;
		var initialContainerWidth = $(".container").prop("clientWidth");
		var initialContainerHeight = $(".container").prop("clientHeight");
		var squaresPerRow = 5;
		var spaceBetweenSquares = 10;

		var numberOfRows = Math.floor(numberOfSquares/squaresPerRow);
		var initialSquareWidth = (initialContainerWidth-(spaceBetweenSquares*(squaresPerRow-1)))/squaresPerRow;
		var initialTotalContentHeight = numberOfRows*(initialSquareWidth+spaceBetweenSquares);

		if (initialTotalContentHeight > initialContainerHeight) {
			console.log("overflow will occur")
			finalContainerWidth = initialContainerWidth-scrollBarWidth;
			finalSquareWidth = (finalContainerWidth-(spaceBetweenSquares*(squaresPerRow-1)))/squaresPerRow;
			$(".container").css("overflow-y", "scroll");
			finalSetting();
		} else {
			console.log("overflow will not occur")
			finalContainerWidth = initialContainerWidth;
			finalSquareWidth = (finalContainerWidth-(spaceBetweenSquares*(squaresPerRow-1)))/squaresPerRow;
			finalSetting();
			$(".container").css("overflow-y", "hidden");
		}

		// Calculate initial container width without scrollbar
		// Do some maths to figure out if content is going to cause a scrollbar
		// If it does then adjust the container width to account for scrollbar

		function finalSetting() {
			console.log(finalSquareWidth)
			$(".square").css("width", finalSquareWidth+"px").css("height", finalSquareWidth+"px").css("margin-bottom", spaceBetweenSquares+"px");
			$(".square:not(:nth-child("+squaresPerRow+"n))").css("margin-right", spaceBetweenSquares+"px");
		}
	}

	$(window).resize(function() {
		getImages();
	});
});
