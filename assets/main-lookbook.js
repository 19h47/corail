/* global gsap, ScrollTrigger, ScrollToPlugin */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

if (!customElements.get("main-lookbook")) {
	class MainLookbook extends HTMLElement {
		constructor() {
			super();

			this.$thumb = this.querySelector("thumb");
			this.foot = gsap.utils.toArray(this.querySelector(".js-foot").children);
			this.markers = gsap.utils.toArray(this.querySelectorAll("marker"));
			this.spans = this.markers.map($m => $m.children);

			gsap.set(this.$thumb, { yPercent: -100 });

			gsap.to(this.$thumb, {
				scrollTrigger: {
					trigger: this,
					scrub: 0.3,
					start: "top top",
					end: "bottom bottom",
				},
				yPercent: 0,
				transformOrigin: "center top",
				ease: "none",
			});

			const footTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: this,
					scrub: 0.3,
					start: "top top",
					end: "bottom bottom",
				},
			});

			this.foot.forEach(($feet, index) => {
				if (0 === index) {
					footTimeline.to($feet, { duration: 1, fontSize: "0.875rem", ease: "power4.out" }, "<");
				} else {
					footTimeline
						.to(this.foot[index - 1], { duration: 1, fontSize: "0.5rem", ease: "power4.in" })
						.to($feet, { duration: 1, fontSize: "0.875rem", ease: "power4.out" }, "<");
				}
			});

			const markersTimeline = gsap.timeline({
				paused: true,
				scrollTrigger: {
					trigger: this,
					scrub: 0.3,
					start: "top top",
					end: "bottom bottom",
				},
			});

			const deactiveMarkers = () => this.markers.forEach($m => $m.classList.remove("is-active"));
			const activeMarker = $marker => $marker.classList.add("is-active");

			this.markers.forEach(($marker, index) => {
				// console.log($marker);
				markersTimeline.call(deactiveMarkers, null, "+=1").call(activeMarker, [$marker], "+=1");

				if (0 === index) {
					markersTimeline
						.to($marker, { duration: 2, backgroundColor: "#FF7D6C", ease: "power4.out" })
						.to(
							$marker.querySelector("span"),
							{ duration: 2, scale: 1, opacity: 1, ease: "power4.out" },
							"-=2"
						);
				} else {
					markersTimeline
						.set(this.markers[index - 1], { clearProps: "backgroundColor" })
						.set(this.spans[index - 1], { duration: 2, scale: 0, opacity: 0, ease: "power4.in" })
						.to($marker, { duration: 2, backgroundColor: "#FF7D6C", ease: "power4.out" }, "-=2")
						.to(
							$marker.querySelector("span"),
							{ duration: 2, scale: 1, opacity: 2, ease: "power4.out" },
							"-=2"
						);
				}
			});
		}
	}

	customElements.define("main-lookbook", MainLookbook);
}
