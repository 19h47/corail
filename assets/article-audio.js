/* global getPercentage, getFormatedTime */
if (!customElements.get("article-audio")) {
	class ArticleAudio extends HTMLElement {
		constructor() {
			super();

			this.$audio = this.querySelector("audio");
			this.$currentTime = this.querySelector("current-time");
			this.$tracking = this.querySelector("tracking");
			this.$duration = this.querySelector("duration");
			this.$volume = this.querySelector("volume");
			this.$button = this.querySelector("button");

			this.$audio.addEventListener("timeupdate", () => this.update());
			this.$audio.addEventListener("ended", () => this.pause());

			const getDuration = setInterval(() => {
				const { duration, readyState } = this.$audio;

				if (0 < readyState) {
					this.$duration.innerHTML = getFormatedTime(duration);

					clearInterval(getDuration);
				}
			}, 200);

			this.$button.addEventListener("click", () => this.toggle());
			this.$volume.addEventListener("click", () => this.toggleVolume());
		}

		toggle() {
			if (this.$audio.paused) {
				return this.play();
			}

			return this.pause();
		}

		async play() {
			await this.$audio.play();
		}

		pause() {
			this.$audio.pause();
		}

		update() {
			this.$currentTime.innerHTML = getFormatedTime(this.$audio.currentTime);
			this.$tracking.style.setProperty(
				"transform",
				`scaleX(${getPercentage(this.$audio.currentTime, this.$audio.duration)}%)`
			);
		}

		toggleVolume() {
			this.$volume.classList.toggle("is-active");
			this.$audio.muted = !this.$audio.muted;
		}
	}

	customElements.define("article-audio", ArticleAudio);
}
