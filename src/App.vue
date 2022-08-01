<script setup>
import { RouterLink, RouterView } from "vue-router";
//src="@/assets/logo.svg"
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
      <!-- 要加:key，否則進入的渲染動畫會失效(官方文檔沒加) -->
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.fade-enter-from {
  // transform: translateY(100px);
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s ease-out;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
