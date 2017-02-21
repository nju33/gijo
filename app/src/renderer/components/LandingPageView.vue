<template>
  <div class="box"  @mousemove="handleMousemove">
    <div v-for="(axis, idx) in phase" class="jogi"
         @click="phase.length === 1 ? nextPhase() : resetPhase()">
      <div class="x" :style="{transform: getTranslateX(idx)}"></div>
      <div class="y" :style="{transform: getTranslateY(idx)}"></div>
    </div>
  </div>
</template>

<script>
  import CurrentPage from './LandingPageView/CurrentPage';
  import Links from './LandingPageView/Links';
  import Versions from './LandingPageView/Versions';
  export default {
    name: 'jogi',
    data() {
      return {
        phase: [
          {
            x: 0,
            y: 0
          }
        ],
      };
    },
    methods: {
      getTranslateX(phaseIdx) {
        return `translateX(${this.$data.phase[phaseIdx].x}px)`;
      },
      getTranslateY(phaseIdx) {
        return `translateY(${this.$data.phase[phaseIdx].y}px)`;
      },
      getScreenPoint() {
        const {x, y} = this.$electron.screen.getCursorScreenPoint();
        return {
          x: x - 6,
          y: y - 26
        };
      },
      handleMousemove() {
        const {x, y} = this.getScreenPoint();
        const phase = this.phase[this.phase.length - 1];
        phase.x = x;
        phase.y = y ;
      },
      nextPhase() {
        this.phase.push({x: 0, y: 0});
      },
      resetPhase() {
        this.phase = [{x: 0, y: 0}];
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .jogi {
    width: 100vw;
    height: 100vh;
    position: absolute;
  }

  .x {
    height: 100vh;
    border-right: 1px solid #000;
    width: 1px;
    position: absolute;
  }

  .y {
    width: 100vw;
    border-bottom: 1px solid #000;
    height: 1px;
    position: absolute;
  }
</style>
