/* global getFormatedTime, getPercentage */

if (!customElements.get("article-video")) {
	class ArticleVideo extends HTMLElement {
		constructor() {
			super();

			this.events = {
				click: { toggle: 'toggle', volume: 'toggleVolume' },
				mouseout: 'pausePreview',
				mouseover: 'playPreview',
			};

			this.$video = this.querySelector('video');
			this.$button = this.querySelector('button');
			this.$tracking = this.querySelector('tracking');
			this.$duration = this.querySelector('duration');
			this.$currentTime = this.querySelector('current-time');

			this.states = [...this.querySelectorAll('state')];

			this.$video.addEventListener('timeupdate', () => this.update());
			this.$video.addEventListener('ended', () => this.pause());

			const getDuration = setInterval(() => {
				const { duration, readyState } = this.$video;

				if (0 < readyState) {
					this.$duration.innerHTML = getFormatedTime(duration);

					clearInterval(getDuration);
				}
			}, 200);

			this.$button.addEventListener("click", () => this.toggle());
		}

		toggle() {
			if (this.$video.paused) {
				return this.play();
			}

			return this.pause();
		}

		async play() {
			this.classList.add('is-active');
			this.classList.add('group');
			this.states.forEach($state => $state.classList.add('is-active'));

			await this.$video.play();
		}

		pause() {
			this.classList.remove('is-active');
			this.classList.remove('group');
			this.states.forEach($state => $state.classList.remove('is-active'));

			this.$video.pause();
		}

		update() {
			this.$currentTime.innerHTML = getFormatedTime(this.$video.currentTime);
			this.$tracking.style.setProperty(
				'transform',
				`scaleX(${getPercentage(this.$video.currentTime, this.$video.duration)}%)`,
			);
		}
	}

	customElements.define("article-video", ArticleVideo);
}




