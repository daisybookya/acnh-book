<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { menuLink } from "../router";
import { backTop } from "../utility/common";

const colorTitle = String("動森會圖鑑").split("");
const viewInfor = ref("");
const isActive = reactive({
  title: false,
  nav: false,
  about: false,
});
const menu = computed(() => {
  return menuLink.filter((item) => item.path !== "/" && item.path !== "/about");
});
const preview = (v) => {
  viewInfor.value = v;
};
const leaveLink = () => {
  viewInfor.value = "";
};
onMounted(() => {
  backTop();
  setTimeout(() => {
    isActive.title = true;
  }, 800);

  let navBook = document.getElementsByClassName("book filter")[0];
  let about = document.getElementsByClassName("bg-y")[0];
  function checkBorder(scrollPos) {
    if (
      scrollPos < navBook.offsetTop + navBook.clientHeight &&
      scrollPos > navBook.offsetTop / 2 &&
      !isActive.nav
    ) {
      isActive.title = false;
      isActive.nav = true;
    }
    if (scrollPos > about.offsetTop - 200 && !isActive.about) {
      isActive.about = true;
    }
    if (scrollPos < 100 && !isActive.title) {
      isActive.title = true;
    }
  }
  let lastKnownScrollPosition = 0;
  let ticking = false;
  document.addEventListener("scroll", function (e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        checkBorder(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
});
</script>

<template>
  <div :style="{ position: 'relative' }">
    <div class="header">
      <h1 class="logo" :class="{ active: isActive.title }">
        <span v-for="letter in colorTitle" :key="letter.id">{{ letter }}</span>
      </h1>
    </div>
    <div class="book"></div>
    <div class="book filter">
      <div
        class="preview top"
        :style="{ background: `url(${viewInfor})` }"
      ></div>
      <div
        class="preview bottom"
        :style="{ background: `url(${viewInfor})` }"
      ></div>
      <div class="item-box">
        <div class="nav-book" :class="{ active: isActive.nav }">
          <RouterLink
            v-for="(item, index) in menu"
            :key="index"
            :to="item.path"
            @mouseenter="preview(item.url)"
            @mouseout="leaveLink"
            >{{ item.label }}</RouterLink
          >
        </div>
      </div>
    </div>
    <div class="book bg-y">
      <div class="layout gutter--md">
        <div class="row about" :class="{ active: isActive.about }">
          <div class="flex md7">
            <va-card stripe stripe-color="#5cd48d">
              <va-card-title>關於動物森友會圖鑑</va-card-title>
              <va-card-content>
                <h5 class="display-5">如何使用本圖鑑</h5>
                <p class="space">依照個人需求查找分類項目，搜尋需要的資源。</p>
                <h5 class="display-5">遊戲簡介</h5>
                <p class="space">
                  《集合啦！動物森友會》（日版名：あつまれ
                  どうぶつの森，英文版名：Animal Crossing: New
                  Horizons）是一款由任天堂企劃製作本部開發並由任天堂發行在任天堂Switch上的生活模擬遊戲。
                </p>
                <p>
                  >>> 資料取自
                  <a
                    href="https://zh.m.wikipedia.org/zh-tw/%E9%9B%86%E5%90%88%E5%95%A6%EF%BC%81%E5%8B%95%E7%89%A9%E6%A3%AE%E5%8F%8B%E6%9C%83"
                    target="_blank"
                    class="link"
                    >維基百科</a
                  >
                  / 本站圖片取自
                  <a
                    class="link"
                    href="https://www.nintendo.tw/switch/animal_crossing_new_horizons/"
                    target="_blank"
                    >動物森友會官網</a
                  >
                </p>
              </va-card-content>
            </va-card>
          </div>
          <div class="flex md5">
            <va-card stripe stripe-color="#fba185">
              <va-card-title>關於本站</va-card-title>
              <va-card-content>
                <b>本站使用 ACNH API (v1)</b>
                <p>
                  >>>
                  <a href="http://acnhapi.com/doc" class="link" target="_blank"
                    >http://acnhapi.com/doc</a
                  >
                </p>
                <p class="space">
                  >>> 背景圖片取自<a
                    href="https://www.toptal.com/designers/subtlepatterns/"
                    class="link"
                    target="_blank"
                    >Toptal</a
                  >
                </p>
                <p><b>網站設計</b></p>
                <p class="space">cheng cheng design</p>

                <p><b>工具搭建</b></p>
                <p>
                  本站使用：vue3 + (路由) vue-router + (前端建構工具) vite +
                  (ui框架) vuestic + axios + scss
                </p>
              </va-card-content>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.header {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 5%;
  position: fixed;
  top: 0;
  left: 0;
  background: url("./acnh4.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.parallax-box {
  height: 100vh;
  position: relative;
  scroll-behavior: smooth;
  overflow: hidden;
  z-index: -1;
}
.parallax-img {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  will-change: transform;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
}

.book {
  display: block;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .item-box {
    position: relative;
    padding: 1.5rem;
    .intro {
      position: absolute;
      top: 2%;
      left: 0;
      right: 0;
    }
    a {
      opacity: 0;
      width: 100%;
      display: block;
      font-size: 24px;
      line-height: 48px;
      text-align: center;
      border-bottom: 1px solid #fff;
      transition: all 0.4s ease-in-out;
      @for $i from 1 through 7 {
        &:nth-child(#{$i}) {
          //transition-delay: $i * 0.1s;
          transform: translateX($i * 50px);
        }
      }
      &:hover {
        color: #000;
      }
    }
  }
}
.nav-book {
  width: 30vw;
  &.active {
    a {
      opacity: 1;
      @for $i from 1 through 7 {
        &:nth-child(#{$i}) {
          transform: translateX(0);
        }
      }
    }
  }
}
.about {
  padding: 0 3rem;
  &.active {
    .flex {
      opacity: 1;
      transform: rotateY(0);
    }
  }
  .flex {
    opacity: 0;
    transform: rotateY(180deg);
    transition: all 1s ease-in-out;
    &:nth-child(2) {
      transition-delay: 0.4s;
    }
  }
}
.filter {
  backdrop-filter: blur(10px);
  border-top: 1px solid #fff;
}
$max: 5;
h1.logo {
  @for $i from 1 through $max {
    span {
      opacity: 0;
      display: inline-block;
      transition: all 0.7s ease-in-out;
      &:nth-child(#{$i*2}) {
        transform: translateY($i * -40px);
      }
      &:nth-child(#{$i*2-1}) {
        transform: translateY($i * 40px);
      }
    }
  }
  &.active {
    span {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
.preview {
  width: 100%;
  height: 130px;
  position: absolute;
  left: 0;
  &.top {
    top: 0;
  }
  &.bottom {
    bottom: 0;
  }
}
.bg-y {
  background: url("./old_map.png");
}

@media (min-width: 1024px) {
}
</style>
