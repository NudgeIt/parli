<template>
  <div :class="$style.stage" ref="stage">
    <canvas :class="$style.canvas" ref="canvas"></canvas>

    <vue-grid>
      <vue-grid-row>
        <vue-grid-item class="vueGridItem">
          <div :class="$style.block">
            <h1 :class="$style.mb3" style="font-size: 2rem;">EFF Woman vs ANC Women in Parliament</h1>
            <h2 style="font-size: 2rem;">Cost: R{{ formatPrice(cost) }}</h2>
          </div>
          <div :class="$style.playerWrapper">
            <youtube
              :class="$style.player"
              :video-id="videoId"
              player-width="100%"
              :player-vars="{ autoplay: 1 }"
              @ready="ready"
              @playing="playing"
              @paused="paused"
              @ended="ended"
              @stop="stop"
            ></youtube>
          </div>

          <h2>Cost per second: R{{ formatPrice(costPerSecond) }}</h2>
          <h4>Cost per month: R{{ formatPrice(costPerMonth) }}</h4>
          <h4>Cost per hour: R{{ formatPrice(costPerHour) }}</h4>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
import { CircleAnimation } from '../../../shared/animations/CircleAnimation';
import VueGrid from '@components/VueGrid/VueGrid.vue';
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueIconGithub from '@components/icons/VueIconGithub/VueIconGithub.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';

export default {
  components: { VueHeadline, VueIconGithub, VueGridItem, VueGridRow, VueGrid },
  props: {
    disableParticles: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      videoId: 'w6511AHae_U',
      cost: 0,
      nrSecondsTicked: 0,
      isRunning: false,
      interval: 1000,
      yearlyBudgetInRands: 5000000000,
      clipLengthInSeconds: 21 * 60,
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
    },
  },
  methods: {
    ready(event) {
      console.log('ready');
      this.player = event.target;
      // this.isRunning = true;
    },
    playing(event) {
      console.log('playing');
      this.startTimer();
      // The player is playing a video.
    },
    change(event) {
      console.log('change');
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = 'another video id';
    },
    stop(event) {
      console.log('stop');
      this.player.stopVideo();
      this.stopTimer();
    },
    paused(event) {
      console.log('pause');
      this.player.pauseVideo();
      this.stopTimer();
    },
    ended(event) {
      console.log('ended');
      this.stopTimer();
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    handleResize() {
      const canvas: HTMLCanvasElement = this.$refs.canvas;
      const stage: HTMLElement = this.$refs.stage;
      const stageRect: ClientRect =
        stage.getClientRects().length > 0
          ? stage.getClientRects().item(0)
          : ({
              width: 0,
              height: 0,
            } as ClientRect);

      canvas.width = stageRect.width;
      canvas.height = stageRect.height;
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
        console.log('timer stops');
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
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.handleResize();

    if (!this.disableParticles) {
      CircleAnimation(this.$refs.canvas);
    }
    //    this.toggleTimer();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.playerWrapper {
  max-width: 600px;
  margin: 0 auto;
}

.mb3 {
  margin-bottom: 3rem;
}

.block {
  padding: 3rem;
  // background: #efefef;
  opacity: 0.7;
}

.player iframe {
  border: 1px solid #cccccc;
  background: #efefef;
  padding: 1rem;
}

.stage {
  min-height: 300vh;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-shadow: 0 0 5px rgba(15, 15, 15, 0.4);
  // padding-top: $space-84;

  img {
    max-width: 12.8rem;
  }

  h1 {
    margin-bottom: $space-32;
    font-weight: $font-weight-light;
  }

  @include mediaMin(tabletPortrait) {
    min-height: 50vh;
    img {
      max-width: 25.6rem;
    }
  }
}

.canvas {
  min-height: 100vh;
  width: 100%;
  position: absolute;
  background-color: transparent;
  left: 0;
  top: 0;

  @include mediaMin(tabletPortrait) {
    min-height: 50vh;
  }
}

.github {
  font-size: $font-size-h1;
  display: inline-block;
  background: $brand-bg-color;
  transition: $button-transition;
  transition-property: box-shadow, background-color;
  color: $brand-link-color;

  &:hover {
    box-shadow: $button-active-shadow;
  }

  i {
    height: $font-size-h1;
    width: $font-size-h1;
  }
}
</style>
