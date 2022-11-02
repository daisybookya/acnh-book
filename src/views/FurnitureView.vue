<script setup>
import LayoutVue from "../components/Layout.vue";
import { backTop } from "../utility/common";
import { fetchData, fetchTemp } from "../api/index";
import { reactive, onMounted, computed } from "vue";
const state = reactive({
  isError: false,
  errorMsg: "",
  isOpen: false,
  view: [],
});
const filter = reactive({
  keyword: "",
  diy: "all",
  tag: "",
  list: [],
  result: computed(() => {
    return filter.list
      .filter((item) => item[0].name["name-TWzh"].indexOf(filter.keyword) > -1)
      .filter((item) => {
        if (filter.diy == "all") return item;
        return item[0].isDIY === filter.diy;
      })
      .filter((item) => {
        if (filter.tag == "") return item;
        return (
          item[0].tag === filter.tag || item[0]["hha-concept-1"] === filter.tag
        );
      });
  }),
});
const page = reactive({
  current: 1,
  pageSize: 20,
  total: computed(() => {
    return filter.result.length;
  }),
});
const options = [
  { label: "全部", value: "all" },
  { label: "訂購品", value: false },
  { label: "非賣品(DIY製作)", value: true },
];
onMounted(() => {
  fetchData("houseware")
    .then((response) => {
      //console.log(response);
      filter.list = response;
    })
    .catch((error) => {
      state.isError = true;
      state.errorMsg = `${error.statusText}`;
      console.error(error);
    });
});
const changeContent = (data) => {
  const startIndex = page.current === 1 ? 0 : page.current;
  const endIndex = Number(startIndex + page.pageSize);
  return data.slice(startIndex, endIndex);
};
const onChange = (index) => {
  backTop();
  page.current = index;
};
const changeType = (value) => {
  filter.diy = value;
};
const changeTag = (value) => {
  filter.tag = value;
  backTop();
};
const checkColor = (item) => {
  state.isOpen = !state.isOpen;
  state.view = item;
};
</script>
<template>
  <LayoutVue>
    <template #title>
      <h2 class="display-2">居家用品 <span class="sp-font">Houseware</span></h2>
    </template>
    <va-alert
      v-if="state.isError"
      color="warning"
      :title="state.errorMsg"
      icon="info"
      class="mb-4"
    >
      請通知網站管理員
    </va-alert>
    <div v-else class="card-list flex layout gutter--sm gutter--md gutter--lg">
      <div class="flex search-list">
        <div class="row">
          <div class="flex xs12 sm12">
            <va-button-toggle
              outline
              size="small"
              v-model="filter.diy"
              :options="options"
              class="mb-4"
              @update:model-value="changeType"
            />
          </div>
          <div class="flex xs12 sm6 lg6">
            <va-input
              placeholder="名稱關鍵字搜尋..."
              v-model="filter.keyword"
            />
          </div>
          <div class="flex xs12 sm6 lg6">
            標籤：
            <span>{{ filter.tag === "" ? "--" : filter.tag }}</span>
            <va-button
              :rounded="false"
              @click="filter.tag = ''"
              :style="{ marginLeft: '15px' }"
              size="small"
              >清除標籤</va-button
            >
          </div>
        </div>
      </div>
      <div class="row house">
        <div
          class="flex sm12 md12 lg6"
          :key="index"
          v-for="(item, index) in changeContent(filter.result)"
        >
          <va-card>
            <va-image :src="item[0].image_uri">
              <template #loader>
                <va-progress-circle indeterminate />
              </template>
              <template #error> Image not found! :( </template>
            </va-image>
            <div class="infor-title">
              <span class="card-title">{{
                `[No.${item[0]["internal-id"]}] ${item[0].name["name-TWzh"]}`
              }}</span>
              <p class="nickname">{{ item[0].name["name-EUen"] }}</p>
              <p class="nickname">{{ item[0].name["name-JPja"] }}</p>
              <span class="sp"
                >家具尺寸：{{ item[0]["size"] }} / 版本：{{
                  item[0]["version"]
                }}</span
              >
              <p class="sp">
                購買價格：{{
                  item[0]["buy-price"] ? item[0]["buy-price"] : "--"
                }}
              </p>
              <span class="sp">轉賣價格：{{ item[0]["sell-price"] }}</span>
            </div>
            <va-divider />
            <va-card-content class="infor-content">
              <span>
                可否客製樣式：{{ item[0].canCustomizeBody ? "可以" : "不能" }}
              </span>
              <span>可否DIY製作：{{ item[0].isDIY ? "可以" : "不能" }}</span>
            </va-card-content>
            <div class="infor-action">
              <va-button
                outline
                @click="(e) => changeTag(item[0].tag)"
                size="small"
                v-if="item[0].tag !== ''"
                >{{ item[0].tag }}</va-button
              >
              <va-button
                v-if="item[0]['hha-concept-1'] !== null"
                class="tag-style"
                @click="(e) => changeTag(item[0]['hha-concept-1'])"
                outline
                size="small"
              >
                {{ item[0]["hha-concept-1"] }}
              </va-button>
              <va-button
                :style="{ marginLeft: '20px' }"
                @click="checkColor(item)"
                size="small"
                v-if="item.length > 1"
              >
                多色可選
              </va-button>
            </div>
          </va-card>
        </div>
      </div>

      <div class="page">
        <va-pagination
          :visible-pages="7"
          v-model="page.current"
          :total="page.total"
          boundary-numbers
          :page-size="page.pageSize"
          @update:model-value="onChange"
        />
        <va-backtop @click="backTop"></va-backtop>
      </div>
      <va-modal v-model="state.isOpen" title="Overview">
        <template #content="{ ok }">
          <va-card-title class="card-title"
            >{{ state.view[0].name["name-TWzh"] }} - 共{{ state.view.length }}色
            <va-button @click="ok" size="small" :style="{ marginLeft: '15px' }"
              >close</va-button
            ></va-card-title
          >
          <va-card-content class="view-item">
            <va-image
              :style="{ width: '120px' }"
              v-for="(color, index) in state.view"
              :src="color.image_uri"
              :key="index"
            >
              <template #loader>
                <va-progress-circle indeterminate />
              </template>
            </va-image>
          </va-card-content>
          <va-card-actions> </va-card-actions>
        </template>
      </va-modal>
    </div>
  </LayoutVue>
</template>

<style lang="scss">
.search-list {
  display: flex;
  margin-bottom: 30px;
}
.card-list {
  margin-top: 30px;
}
.card-title {
  font-size: 1.1rem;
}
.house {
  .va-card__inner {
    display: grid;
    grid-template-columns: 1fr 2fr;
    .va-image {
      margin: 15px;
    }
  }
  .infor-action {
    grid-column-start: 1;
    grid-column-end: 3;
    padding: 0 1.25rem;
    padding-bottom: 20px;
    .va-button {
      margin: 0 5px;
    }
  }
  .va-divider {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}

.view-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.infor-title {
  padding: 15px;
  .sp {
    font-size: 0.9rem;
  }
}

.infor-content {
  padding-top: 0;
  padding-bottom: 10px;
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.tag-style {
  margin: 0 5px;
}

.nickname {
  color: #999;
  font-size: 0.9rem;
}
.va-card__content {
  font-size: 0.9rem;
}
.page {
  margin: 30px 0;
  .va-pagination {
    margin: 0 auto;
  }
}
</style>
