<script setup>
import LayoutVue from "../components/Layout.vue";
import { backTop } from "../utility/common";
import { fetchData, fetchTemp } from "../api/index";
import { reactive, onMounted, computed } from "vue";
const state = reactive({
  isError: false,
  errorMsg: "",
});
const filter = reactive({
  value: "all",
  type: "all",
  list: [],
  result: computed(() => {
    let data = [...filter.list];
    if (filter.value !== "all") {
      const key = filter.value === "yes" ? true : false;
      data = data.filter((item) => item.hasFake === key);
    }
    if (filter.type !== "all") {
      data = data.filter(
        (item) => item.name["name-TWzh"].indexOf(filter.type) > -1
      );
    }
    return data;
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
  { label: "沒有仿冒", value: "no" },
  { label: "有仿冒品", value: "yes" },
];
const typeOpts = [
  { label: "全部", value: "all" },
  { label: "名畫", value: "名畫" },
  { label: "雕塑", value: "雕" },
];
onMounted(() => {
  fetchData("art")
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
const changeType = (value, type) => {
  const label = type;
  filter[label] = value;
  page.current = 1;
};
</script>
<template>
  <LayoutVue>
    <template #title>
      <h2 class="display-2">藝術品 <span class="sp-font">Art</span></h2>
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
    <div v-else class="card-list flex layout gutter--xl">
      <div class="search-list">
        <va-button-toggle
          outline
          size="small"
          v-model="filter.value"
          :options="options"
          class="mb-4"
          @update:model-value="(v) => changeType(v, 'value')"
        />
        <va-button-toggle
          outline
          size="small"
          v-model="filter.type"
          :options="typeOpts"
          class="mb-4"
          @update:model-value="(v) => changeType('type')"
        />
      </div>
      <div class="row">
        <div
          class="flex xs12 sm6 md4 lg3"
          :key="index"
          v-for="(item, index) in changeContent(filter.result)"
        >
          <va-card>
            <va-image :src="item.image_uri">
              <template #loader>
                <va-progress-circle indeterminate />
              </template>
              <template #error> Image not found! :( </template>
            </va-image>
            <va-card-title class="card-title"
              >{{ item.name["name-TWzh"] }}
            </va-card-title>
            <va-card-content
              ><p class="subtitle">{{ item.name["name-EUen"] }}</p>
              <p class="subtitle">{{ item.name["name-JPja"] }}</p>
              <va-divider />
              <p>購買價格：{{ item["buy-price"] }}</p>
              <p>轉賣價格：{{ item["sell-price"] }}</p>
              <va-chip class="tag-style" :outline="!item.hasFake">
                {{ item.hasFake ? "有" : "沒有" }}仿冒品
              </va-chip>
            </va-card-content>
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
    </div>
  </LayoutVue>
</template>

<style lang="scss">
.card-title {
  font-size: 1.1rem;
}
.subtitle {
  color: #999;
  font-size: 0.9rem;
}
.tag-style {
  margin: 10px 0;
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
@media (min-width: 150px) {
  .card-list {
    margin-top: 0px;
  }
  .search-list {
    display: block;
    margin-bottom: 30px;
  }
}
@media (min-width: 768px) {
  .search-list {
    display: flex;
    justify-content: space-around;
  }
}
@media (min-width: 992px) {
  .card-list {
    margin-top: 30px;
  }
}
</style>
