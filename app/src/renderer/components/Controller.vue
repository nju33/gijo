<template>
  <div class="box">
    <menu>
      <button @click="addLayer">Add</button>
    </menu>
    <ul>
      <li v-for="(layer, key) in layers" :key="key" :data-active="$store.state.current === key" @click="selectLayer(key)">1</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    layers() {
      return this.$store.state.layers;
    }
  },
  methods: {
    addLayer() {
      return this.$store.commit("addLayer");
    },
    selectLayer(index) {
      return this.$store.commit("selectLayer", {index})
    }
  }
};
</script>

<style scoped>
.box {
  width: 200px;
  max-height: 300px;
  background: #f8f8f8;
  position: absolute;
  z-index: 9999999;
  left: 10px;
  top: 10px;
}

[data-active="true"] {
  color: orange;
}
</style>