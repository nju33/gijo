<template>
  <div>
  <!-- <div v-for="(layer, key) in $state.layers" :key="key"> -->
    <jogi></jogi>
    <!-- </div> -->
    <controller></controller>
  </div>
</template>

<script>
export default {
  computed: {
    layers() {
      console.log(this);
      return this.$state.layers;
    }
  }
}
</script>