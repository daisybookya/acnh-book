<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { menuLink } from "../router";
import { randomBk, backTop } from "../utility/common";
const navEnable = ref(true);
const move = ref("0");
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
    <div class="item layout-menu">
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
    <div class="item">
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
.footer {
  margin: 20px 0;
  text-align: center;
}
.title {
  padding: 20px 10px;
}
.banner {
  height: 350px;
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
@media (min-width: 576px) {
  .layout-page {
    grid-template-columns: 1fr;
  }
  .layout-menu {
    display: none;
  }
  .content {
    padding: 3% 5%;
  }
}
@media (min-width: 992px) {
  .layout-page {
    grid-template-columns: 1fr 5fr;
  }
  .layout-menu {
    display: flex;
  }
}
</style>
