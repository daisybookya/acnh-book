<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { menuLink } from "../router";
import { randomBk, backTop } from "../utility/common";
const navEnable = ref(true);
const move = ref("0");
const isOpen = ref(false);
const title = String("動物森友會").split("");

const checkActive = (path) => {
  const route = useRoute();
  return route.path === path;
};
const theBk = randomBk();

onMounted(() => {
  backTop();
});
</script>
<template>
  <div class="layout-page" :style="theBk">
    <div style="position: relative" class="app-bar">
      <va-app-bar>
        <h1>動物森友會圖鑑</h1>
        <va-spacer />
        <va-button
          icon="menu"
          class="mr-4 mb-2"
          border-color="primary"
          preset="secondary"
          @click="isOpen = !isOpen"
        />
      </va-app-bar>
    </div>
    <div class="item layout-menu" :class="{ open: isOpen }">
      <va-sidebar textColor="#fff" color="#35a7c2cc">
        <div class="title">
          <h1 class="logo sm">
            <span v-for="(item, index) in title" :key="index">{{ item }}</span>
          </h1>
        </div>
        <va-sidebar-item
          v-for="(item, index) in menuLink"
          :key="index"
          :active="checkActive(item.path)"
        >
          <va-sidebar-item-content>
            <va-sidebar-item-title>
              <RouterLink :to="item.path" v-slot="{ isActive }">{{
                item.label.split(" ")[0]
              }}</RouterLink>
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </va-sidebar>
    </div>
    <div class="item layout-content">
      <div class="flex banner">
        <div class="para-title">
          <slot name="title"></slot>
        </div>
      </div>

      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">Cheng Cheng Design ©2022 Created by Cheng</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-page {
  display: grid;
}
.layout-menu {
  position: relative;
  .btn-menu {
    position: absolute;
    top: 15px;
    right: -5rem;
    z-index: 1;
  }
}
.footer {
  margin: 20px 0;
  text-align: center;
}
.title {
  padding: 20px 10px;
}
.banner {
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    animation: scalebk 1.6s;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("/acnh.jpg");
  }
}
@keyframes scalebk {
  from {
    transform: scale(1.5);
  }
  to {
    transform: scale(1);
  }
}
.para-title {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}
@media (min-width: 150px) {
  .layout-page {
    grid-template-columns: 1fr;
  }
  .banner {
    height: 250px;
  }
  .layout-menu {
    height: 100%;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    transform: translateX(-100%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    &.open {
      opacity: 1;
      transform: translateX(0%);
      z-index: 99;
    }
  }
  .layout-content {
    overflow: scroll;
  }
  .content {
    padding: 3% 5%;
  }
  .app-bar {
    display: block;
    h1 {
      padding: 1rem;
      letter-spacing: 3px;
      font-size: 1.3rem;
      color: #fff;
    }
    .va-button {
      margin-top: 5px;
    }
  }
}
@media (min-width: 992px) {
  .app-bar {
    display: none;
  }
  .banner {
    height: 350px;
  }
  .layout-page {
    grid-template-columns: 1fr 5fr;
  }
  .layout-menu {
    display: flex;
    position: relative;
    height: auto;
    opacity: 1;
    transform: none;
    z-index: 9;
  }
  .layout-content {
    overflow: auto;
  }
}
</style>
