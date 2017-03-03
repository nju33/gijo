<template>
  <div class="box"
       :style="{color: themeColor}"
       @mousemove="handleMousemove">
    <div v-for="(axis, idx) in phase" class="jogi"
         @click="phase.length === 1 ? nextPhase() : donePhase()">
      <div class="x"
           :style="{
             transform: getTranslateX(idx),
             'border-color': themeColor
           }"></div>
      <div class="y"
           :style="{
             transform: getTranslateY(idx),
             'border-color': themeColor
           }"></div>
    </div>
    <div v-if="phase.length === 2" class="measure"
      :style="{
        left: measurePositionX + 'px',
        top: measurePositionY + 'px',
        width: diffX + 'px',
        height: diffY + 'px',
        'z-index': done ? 99999 : 0
      }">
      <div class="refocus-btn phase1"
           :style="{
             background:  themeColor
           }"
           @click="refocus(1)">
      </div>
      <div class="refocus-btn phase2"
           :style="{
             background:  themeColor
           }"
           @click="refocus(2)">
      </div>
      <button v-if="done" @click="resetPhase" class="close-btn">
        <Octicon name="x" :style="{fill: themeColor}"></Octicon>
      </button>
      <div class="theme-btn-group">
        <button v-if="theme === 'dark'" class="theme-btn light" @click="changeTheme('light')"></button>
        <button v-else-if="theme === 'light'" class="theme-btn dark" @click="changeTheme('dark')"></button>
      </div>
      <div class="measure-x" v-text="diffX"></div>
      <div class="measure-y" v-text="diffY"></div>
    </div>
  </div>
</template>

<script>
  import Octicon from 'vue-octicon/components/Octicon';
  import 'vue-octicon/icons/x';

  export default {
    components: {
      Octicon
    },
    name: 'jogi',
    data() {
      return {
        theme: 'light',
        themes: {
          light: '#ebebeb',
          dark: '#131313',
        },
        done: false,
        phase: [this.getScreenPoint()],
        active: false
      };
    },
    computed: {
      themeColor() {
        return this.theme === 'light' ? this.themes.light : this.themes.dark;
      },
      diffX() {
        return Math.abs(this.phase[0].x - this.phase[1].x);
      },
      diffY() {
        return Math.abs(this.phase[0].y - this.phase[1].y);
      },
      measurePositionX() {
        // p1-----p2
        if (this.phase[1].x > this.phase[0].x) {
          return this.phase[0].x;
        }
        return this.phase[1].x;
      },
      measurePositionY() {
        // p1
        // |
        // |
        // p2
        if (this.phase[1].y > this.phase[0].y) {
          return this.phase[0].y;
        }
        return this.phase[1].y;
      }
    },
    methods: {
      getPositionX(phaseIdx) {
        return this.phase[phaseIdx].x;
      },
      getPositionY(phaseIdx) {
        return this.phase[phaseIdx].y;
      },
      getTranslateX(phaseIdx) {
        return `translateX(${this.phase[phaseIdx].x}px)`;
      },
      getTranslateY(phaseIdx) {
        return `translateY(${this.phase[phaseIdx].y}px)`;
      },
      getScreenPoint() {
        const {x, y} = this.$electron.screen.getCursorScreenPoint();
        return {
          x: x - 6,
          y: y - 26
        };
      },
      handleMousemove() {
        if (this.done && !this.active) {
          return;
        }

        if (this.active) {
          const {x, y} = this.getScreenPoint();

          const phase = this.phase[this.active - 1];
          phase.x = x;
          phase.y = y ;
          return;
        }
        const {x, y} = this.getScreenPoint();
        const phase = this.phase[this.phase.length - 1];
        phase.x = x;
        phase.y = y ;
      },
      nextPhase() {
        const {x, y} = this.getScreenPoint();
        this.phase.push({x, y});
      },
      donePhase() {
        this.done = true;
        this.active = false;
      },
      resetPhase() {
        this.phase = [this.getScreenPoint()];
        this.done = false;
      },
      changeTheme(theme) {
        this.theme = theme;
      },
      refocus(idx) {
        const target = (() => {
          if (idx === 1 && this.phase[1].y > this.phase[0].y) {
            return 1;
          } else if (idx === 1 && this.phase[1].y <= this.phase[0].y) {
            return 2;
          } else if (idx === 2 && this.phase[1].y > this.phase[0].y) {
            return 2;
          } else {
            return 1;
          }
        })();
        this.active = target;
        this.done = false;
      }
    },
    mounted() {
      this.$electron.ipcRenderer.on('reset', () => {
        this.resetPhase();
      });
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

  .jogi:nth-child(1) {
    z-index: 1;
  }

  .jogi:nth-child(2) {
    z-index: 2;
  }

  .x {
    height: 100vh;
    border-right: 1px solid #000;
    position: absolute;
    display: flex;
    align-items: center;
  }

  .y {
    width: 100vw;
    border-bottom: 1px solid #000;
    position: absolute;
    text-align: center;
  }

  .measure {
    position: absolute;
  }

  .measure-x {
    position: absolute;
    right: 50%;
    transform: translateY(50%);
    top: -2em;
  }

  .measure-y {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    left: -2em;
  }

  .close-btn {
    position: absolute;
    right: -2em;
    top: -2em;
    z-index: 9;
    background: transparent;
    border: none;
  }

  .close-btn svg {
    fill: inherit;
  }

  .theme-btn-group {
    position: absolute;
    right: -2.05em;
    top: .5em;
    width: 1.5em;
  }

  .theme-btn {
    width: 1.3em;
    height: 1.3em;
    border: none;
    border-radius: 50%;
  }

  .theme-btn.light {
    background: #ebebeb;
  }

  .theme-btn.dark {
    background: #131313;
  }

  .refocus-btn {
    width: .5em;
    height: .5em;
    border-radius: 50%;
    cursor: pointer;
  }

  .refocus-btn.phase1 {
    position: absolute;
    left: -.25em;
    top: -.25em;
  }

  .refocus-btn.phase2 {
    position: absolute;
    right: -.25em;
    bottom: -.25em;
  }
</style>
