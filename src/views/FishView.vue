<script setup>
import LayoutVue from "../components/Layout.vue";
import { rarity, fishLocation } from "../utility/translation";
import { backTop, turnMonth } from "../utility/common";
import { fetchData, fetchTemp } from "../api/index";
import { reactive, onMounted, computed } from "vue";

const state = reactive({
  isError: false,
  errorMsg: "",
});
const filter = reactive({
  list: [],
  keyword: "",
  result: computed(() => {
    if (filter.rarity.value === "all") return filter.list;
    return filter.list.filter(
      (item) => item.availability.rarity === filter.rarity.value
    );
  }),
  rarity: { text: "全部", value: "all" },
  options: computed(() => {
    const result = [];
    Object.entries(rarity).forEach(([key, value]) => {
      const item = { text: value, value: key };
      result.push(item);
    });
    result.unshift({ text: "全部", value: "all" });
    return result;
  }),
});
const columns = [
  { key: "icon_uri", label: "圖片", name: "image" },
  { key: "name.name-TWzh", label: "中文名稱" },
  { key: "availability.location", label: "出現地點", name: "location" },
  { key: "availability.rarity", label: "稀有度", name: "rarity" },
  {
    key: "availability.time",
    label: "出現時間",
    name: "showTime",
    sortable: true,
  },
  {
    key: "availability.month-northern",
    label: "北半球月份",
    name: "showNorth",
    sortable: true,
  },
  {
    key: "availability.month-southern",
    label: "南半球月份",
    name: "showSouth",
    sortable: true,
  },

  { key: "price", label: "價格", sortable: true, sortingFn: (a, b) => a - b },
];
const page = reactive({
  current: 1,
  perSize: 15,
  total: computed(() => {
    const dataLen = filter.result.length;
    if (dataLen > 0) return Math.ceil(dataLen / page.perSize);
    return 1;
  }),
});
onMounted(() => {
  fetchData("fish")
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
const changeType = (value) => {
  filter.rarity = value.value;
  page.current = 1;
};

function turnRarity(value) {
  if (rarity[value]) return rarity[value];
  return value;
}
function turnLocation(value) {
  if (fishLocation[value]) return fishLocation[value];
  return value;
}
</script>
<template>
  <LayoutVue>
    <template #title>
      <h2 class="display-2">是魚啊 <span class="sp-font">Fish</span></h2>
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
    <div v-else class="flex">
      <div class="filter-list layout gutter--md">
        <div class="row">
          <div class="flex xs11 sm6">
            <va-input
              placeholder="名稱關鍵字搜尋..."
              v-model="filter.keyword"
            />
          </div>
          <div class="flex xs12 sm5">
            <va-select
              label="稀有度"
              @update:model-value="changeType"
              v-model="filter.rarity"
              :options="filter.options"
            />
          </div>
        </div>
      </div>
      <div class="data-list">
        <va-data-table
          striped
          sticky-header
          height="500px"
          :items="filter.result"
          :columns="columns"
          :per-page="page.perSize"
          :current-page="page.current"
          :filter="filter.keyword"
        >
          <template #cell(image)="{ value }">
            <va-image :src="value" :style="{ width: '70px' }">
              <template #loader>
                <va-progress-circle indeterminate />
              </template>
            </va-image>
          </template>
          <template #cell(location)="{ value }">
            {{ turnLocation(value) }}
          </template>
          <template #cell(rarity)="{ value }">
            {{ turnRarity(value) }}
          </template>
          <template #cell(showTime)="{ value }">
            <va-chip size="small" :outline="!value.length > 0">{{
              value.length > 0 ? value : "整天都有"
            }}</va-chip>
          </template>
          <template #cell(showNorth)="{ value }">
            <va-chip size="small" :outline="!value.length > 0">{{
              turnMonth(value)
            }}</va-chip>
          </template>
          <template #cell(showSouth)="{ value }">
            <va-chip size="small" :outline="!value.length > 0">{{
              turnMonth(value)
            }}</va-chip>
          </template>
          <template #bodyAppend>
            <tr>
              <td colspan="8">
                <va-pagination
                  v-model="page.current"
                  input
                  :pages="page.total"
                />
              </td>
            </tr>
          </template>
        </va-data-table>
        <va-backtop @click="backTop"></va-backtop>
      </div>
    </div>
  </LayoutVue>
</template>
