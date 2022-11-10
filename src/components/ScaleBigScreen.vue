<template>
  <div ref="container" class="container" v-show="status">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ScaleBigScreen",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import _ from "lodash";
const container = ref();
const status = ref(false);
const handleContainer = () => {
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;
  console.log(clientWidth, document.body.offsetWidth);
  const h = clientHeight / 1080;
  const w = clientWidth / 1920;
  const r = h > w ? w : h;
  container.value.style.transform = `scale(${r},${r}) translate(-50%,-50%)`;
};
onMounted(() => {
  handleContainer();
  const observer = new ResizeObserver(
    _.debounce(() => {
      handleContainer();
      status.value = true;
    }, 500)
  );
  observer.observe(document.documentElement);
});
</script>
<style>
.container {
  transition: all 0.3s ease-in;
  width: 1920px;
  height: 1080px;
  position: absolute;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  z-index: 999;
}
</style>
