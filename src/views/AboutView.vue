<script setup>
import LayoutVue from "../components/Layout.vue";
</script>
<template>
  <LayoutVue>
    <template #title>
      <h2 class="display-2">關於圖鑑 <span class="sp-font">About</span></h2>
    </template>
    <div class="card-list flex">
      <div class="row">
        <div class="flex md12">
          <div class="item">
            <va-card stripe stripe-color="#5cd48d" class="infor-card">
              <va-card-title>關於動物森友會</va-card-title>
              <va-card-content>
                <h5 class="display-5">如何使用本圖鑑</h5>
                <p class="space">依照個人需求查找分類項目，搜尋需要的資源。</p>
                <h5 class="display-5">遊戲簡介</h5>
                <p class="space">
                  《集合啦！動物森友會》（日版名：あつまれ
                  どうぶつの森，英文版名：Animal Crossing: New
                  Horizons，又譯作「動物森友會：新地平線」）是一款由任天堂企劃製作本部開發並由任天堂發行在任天堂Switch上的生活模擬遊戲。本作是動物森友會系列的第7款作品，也是系列首次繁體中文化和第二次簡體中文化[註
                  1]。遊戲首次公布於2018年任天堂直面會，當時預計2019年發售，後來延期至2020年3月20日。
                </p>
                <h5 class="display-5">遊戲玩法</h5>
                <p class="space">
                  《集合啦！動物森友會》是款生活模擬遊戲，玩家扮演的角色參與Nook
                  Inc.推出的「無人島移居計劃」，打算展開全新的生活。遊戲一開始，玩家將設定角色姓名、生日及外觀，並在北半球、南半球共4座島嶼中選擇移居的島嶼，兩者在季節上會有不同的變化。到了無人島，遊戲角色狸克（英語：Tom
                  Nook）會讓玩家自行搭建帳篷，並要求玩家幫忙準備營火大會。活動結束後，狸克會帶著請款單要求玩家繳清活動費用，玩家能選擇「鈴錢」和「哩數」償還債務，前者透過販賣物品賺取，後者需要完成「Nook集哩遊」上的目標獲得
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
        </div>
        <div class="flex md6">
          <va-card stripe stripe-color="#fba185" class="infor-card">
            <va-card-title>資料來源</va-card-title>
            <va-card-content
              >本站使用 ACNH API (v1)
              <p>
                >>>
                <a href="http://acnhapi.com/doc" class="link" target="_blank"
                  >http://acnhapi.com/doc</a
                >
              </p>
            </va-card-content>
          </va-card>
        </div>
        <div class="flex md6">
          <va-card stripe stripe-color="#85cbfb" class="infor-card">
            <va-card-title>工具搭建</va-card-title>
            <va-card-content
              >本站使用：vue3 + (路由) vue-router + (前端建構工具) vite +
              (ui框架) vuestic + axios + scss</va-card-content
            >
          </va-card>
        </div>
      </div>
    </div>
  </LayoutVue>
</template>

<style lang="scss">
.infor-card {
  margin: 20px;
}
.card-list {
  margin-top: 30px;
}
</style>
