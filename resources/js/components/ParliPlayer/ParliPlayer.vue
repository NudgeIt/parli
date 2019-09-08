<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card card-default">
          <div class="card-body">
            <h1>
              EFF Woman vs ANC Women in Parliament
            </h1>
            <h2>Cost: R{{ formatPrice(cost) }}</h2>

            <youtube
              :video-id="videoId"
              player-width="100%"
              :player-vars="{ autoplay: 1 }"
              @ready="ready"
              @playing="playing"
              @paused="paused"
              @ended="ended"
              @stop="stop"
            ></youtube>

            <blockquote>
              Parliament annual budget: R{{ formatPrice(yearlyBudgetInRands)
              }}<br />
              Cost per month: R{{ formatPrice(costPerMonth) }}<br />
              Cost per hour: R{{ formatPrice(costPerHour) }}<br />
              Cost per second: R{{ formatPrice(costPerSecond) }}<br />
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoId: "w6511AHae_U",
      cost: 0,
      nrSecondsTicked: 0,
      isRunning: false,
      interval: 1000,
      yearlyBudgetInRands: 5000000000,
      clipLengthInSeconds: 21 * 60
    };
  },
  computed: {
    costPerMonth() {
      return this.yearlyBudgetInRands / 12;
    },
    costPerHour() {
      return this.yearlyBudgetInRands / 365 / 24;
    },
    costPerSecond() {
      return this.yearlyBudgetInRands / 365 / 24 / 60;
    }
  },
  methods: {
    ready(event) {
      console.log("ready");
      this.player = event.target;
      // this.isRunning = true;
    },
    playing(event) {
      console.log("playing");
      this.startTimer();
      // The player is playing a video.
    },
    change(event) {
      console.log("change");
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = "another video id";
    },
    stop(event) {
      console.log("stop");
      this.player.stopVideo();
      this.stopTimer();
    },
    paused(event) {
      console.log("pause");
      this.player.pauseVideo();
      this.stopTimer();
    },
    ended(event) {
      console.log("ended");
      this.stopTimer();
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    startTimer() {
      this.interval = setInterval(this.incrementTime, 1000);
      this.isRunning = true;
    },
    stopTimer() {
      clearInterval(this.interval);
      this.isRunning = false;
    },
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.interval);
        console.log("timer stops");
      } else {
        this.interval = setInterval(this.incrementTime, 1000);
      }
      this.isRunning = !this.isRunning;
    },
    incrementTime() {
      if (this.nrSecondsTicked >= this.clipLengthInSeconds) {
        this.isRunning = false;
      }
      this.nrSecondsTicked = parseInt(this.nrSecondsTicked) + 1;
      this.cost = this.cost + this.costPerSecond;
    }
  }
  //   mounted() {
  //     this.handleResize();

  //     if (!this.disableParticles) {
  //       CircleAnimation(this.$refs.canvas);
  //     }
  //     //    this.toggleTimer();
  //   },
  //   beforeDestroy() {
  //     window.removeEventListener('resize', this.handleResize);
  //   },
};
</script>
