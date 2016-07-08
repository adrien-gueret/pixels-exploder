(function (window) {
	'use strict';

	function PixelsExploder(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.pixels_size = 1;
		this.image = null;
		this.grid_color = '#f3f3f3';
	}

	PixelsExploder.prototype.setPixelsSize = function(pixels_size) {
		this.pixels_size = parseInt(pixels_size, 10);
		return this;
	};

	PixelsExploder.prototype.setImage = function(image) {
		this.image = image;
		return this;
	};

	PixelsExploder.prototype.setGridColor = function(color) {
		this.grid_color = color;
		return this;
	};

	PixelsExploder.prototype.render = function() {
		if (!this.image) {
			return;
		}

		this.canvas.width = this.image.naturalWidth * 2 * this.pixels_size - this.pixels_size;
		this.canvas.height = this.image.naturalHeight * 2 * this.pixels_size - this.pixels_size;

		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;

		this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);

		return this.drawGrid();
	};

	PixelsExploder.prototype.drawGrid = function() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.grid_color;

		for (var i = this.pixels_size; i < this.canvas.width; i += 2 * this.pixels_size) {
			for (var j = 0; j < this.pixels_size; j++) {
				this.ctx.moveTo(i + j + .5, -1);
				this.ctx.lineTo(i + j + .5, this.canvas.height);
			}
		}

		for (var i = this.pixels_size; i < this.canvas.height; i += 2 * this.pixels_size) {
			for (var j = 0; j < this.pixels_size; j++) {
				this.ctx.moveTo(-1, i + j + .5);
				this.ctx.lineTo(this.canvas.width, i + j + .5);
			}
		}

		this.ctx.stroke();

		return this;
	};

	window.PixelsExploder = PixelsExploder;
})(window, document);