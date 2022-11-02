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
  value: "none",
  list: [],
  result: computed(() => {
    if (filter.value === "none") return filter.list;
    const data = [...filter.list];
    return data.sort((a, b) => {
      if (filter.value === "asc") return a.price - b.price;
      return b.price - a.price;
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
  { label: "無排序", value: "none" },
  { label: "價格低到高", value: "asc" },
  { label: "價格高到低", value: "desc" },
];

onMounted(() => {
  fetchData("fossils")
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
  filter.value = value;
  page.current = 1;
};
</script>
<template>
  <LayoutVue>
    <template #title>
      <h2 class="display-2">化石們 <span class="sp-font">Fossils</span></h2>
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
      <div class="flex search-list">
        <va-button-toggle
          outline
          size="small"
          v-model="filter.value"
          :options="options"
          class="mb-4"
          @update:model-value="changeType"
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
              <p>價格：{{ item["price"] }}</p>
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
}
@media (min-width: 768px) {
  .search-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>
