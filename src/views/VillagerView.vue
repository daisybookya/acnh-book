<script setup>
import LayoutVue from "../components/Layout.vue";
import { hobby, person, species } from "../utility/translation";
import { backTop } from "../utility/common";
import { fetchData } from "../api/index";
import { reactive, onMounted, computed } from "vue";
const state = reactive({
  isError: false,
  errorMsg: "",
});
const filter = reactive({
  value: { text: "全部", value: "all" },
  keyword: "",
  list: [],
  result: computed(() => {
    return filter.list
      .filter(
        (item) =>
          item.name["name-TWzh"].indexOf(filter.keyword) > -1 ||
          item.name["name-JPja"].indexOf(filter.keyword) > -1
      )
      .filter((item) => {
        if (filter.value.value !== "all") {
          return item.species === filter.value.value;
        }
        return item;
      });
  }),
  opts: computed(() => {
    const result = [];
    for (const [key, value] of Object.entries(species)) {
      const item = Object.assign({}, { text: value, value: key });
      result.push(item);
    }
    result.unshift({ text: "全部", value: "all" });
    return result;
  }),
});
const page = reactive({
  current: 1,
  pageSize: 20,
  total: computed(() => {
    return filter.result.length;
  }),
});
onMounted(() => {
  fetchData("villagers")
    .then((response) => {
      filter.list = response;
    })
    .catch((error) => {
      state.isError = true;
      state.errorMsg = `${error.statusText}`;
      console.error("villagers:", error.status, error.statusText);
    });
});
const selectType = (type) => {
  filter.value = type.value;
  page.current = 1;
};
const searchName = (keyword) => {
  filter.keyword = keyword;
  page.current = 1;
};
const changeContent = (data) => {
  const startIndex = page.current === 1 ? 0 : page.current;
  const endIndex = Number(startIndex + page.pageSize);
  return data.slice(startIndex, endIndex);
};
const onChange = (index) => {
  backTop();
  page.current = index;
};
</script>
<template>
  <LayoutVue>
    <template #title>
      <h2 class="display-2">島民們 <span class="sp-font">Villagers</span></h2>
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
      <div class="search-list layout gutter--md">
        <div class="row">
          <div class="flex xs5">
            <div class="item">
              搜尋：
              <va-input
                class="flex mb-2 md3"
                placeholder="名稱關鍵字搜尋..."
                v-model="filter.keyword"
                @change="searchName"
              />
            </div>
          </div>
          <div class="flex xs5">
            <div class="item">
              <va-select
                class="mb-4"
                label="種族"
                @update:model-value="selectType"
                v-model="filter.value"
                :options="filter.opts"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="flex sm6 md4 lg3"
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
              <p class="nickname">{{ item.name["name-JPja"] }}</p>
            </va-card-title>
            <va-card-content>
              <p>
                生日：{{ item.birthday }} ({{
                  item.gender === "Female" ? "女" : "男"
                }})
              </p>
              <p>種族：{{ species[item.species] || item.species }}</p>
              <p>個性：{{ person[item.personality] || item.personality }}</p>
              <p>興趣：{{ hobby[item.hobby] || item.hobby }}</p>
              <p>口頭禪：{{ item["catch-translations"]["catch-TWzh"] }}</p>
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
.card-title {
  font-size: 1.1rem;
}
.nickname {
  display: block;
  padding: 0 10px;
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
