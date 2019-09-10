<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card card-default">
          <div class="card-body">
            <h2>Entertaining? <small>Think again.</small></h2>
            <h3 class="mb-0">Cost: R{{ formatPrice(cost) }}</h3>
            <span v-if="!isRunning"
              >Play the video to see how much this<br />
              debate cost the SA taxpayer.</span
            >

            <youtube
              :video-id="videoId"
              player-width="320"
              player-height="180"
              :player-vars="{ autoplay: 1 }"
              @ready="ready"
              @playing="playing"
              @paused="paused"
              @ended="ended"
              @stop="stop"
            ></youtube>

            <blockquote>
              <h3>South Africa - Parliament</h3>
              Annual budget:
              <strong>R{{ formatPrice(yearlyBudgetInRands) }}</strong
              ><br />
              Month: R{{ formatPrice(costPerMonth) }}<br />
              Hourly: R{{ formatPrice(costPerHour) }}<br />
              Second: R{{ formatPrice(costPerSecond) }}<br />
            </blockquote>

            <div style="border-top: 1px solid #ececec; padding-top: 1rem;">
              Share using:<br />
              <social-sharing
                url="https://parli.nudge.tech/"
                title="Debates in parliament and how much they cost"
                description="Showing you how much a parliamentary debate costs in taxes, which is why it's so important that parliament, just like all other state institutions, function properly."
                quote="The cost of debates in the South African parliament."
                hashtags="saparliament"
                inline-template
              >
                <div>
                  <network network="facebook">
                    <i class="fa fa-facebook" style="color: #3b5998;"></i>
                    Facebook
                  </network>
                  <network network="whatsapp">
                    <i class="fa fa-whatsapp" style="color: #00bfa5;"></i>
                    Whatsapp
                  </network>
                </div>
              </social-sharing>
            </div>
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
      videoId: "jwO6DH5JiXU",
      cost: 0,
      isRunning: false,
      interval: 1000,
      yearlyBudgetInRands: 5000000000,
      clipLengthInSeconds: 21 * 60,
      currentTime: 0,
      totalTime: 0
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
      return this.yearlyBudgetInRands / 365 / 24 / 60 / 60;
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
      this.totalTime = event.target.getDuration();
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
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
      this.currentTime = this.player.getCurrentTime();
      this.cost = this.currentTime * this.costPerSecond;
    }
  }
};
</script>

<style scoped>
.mb-0 {
  margin-bottom: 0;
}
.container {
  padding: 1rem 0rem;
  background: #fff;
  opacity: 0.9;
}
</style>
