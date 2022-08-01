<script setup>
import LayoutVue from "../components/Layout.vue";
import { speed } from "../utility/translation";
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
});
const columns = [
  { key: "icon_uri", label: "圖片", name: "image" },
  { key: "name.name-TWzh", label: "中文名稱" },
  { key: "name.name-JPja", label: "日文名稱" },
  { key: "speed", label: "速度", sortable: true, name: "speed" },
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
    const dataLen = filter.list.length;
    if (dataLen > 0) return Math.ceil(dataLen / page.perSize);
    return 1;
  }),
});

onMounted(() => {
  fetchData("sea")
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
function trunSpeed(value) {
  if (speed[value]) return speed[value];
  return value === "Very slow" ? "很慢" : "很快";
}
</script>
<template>
  <LayoutVue>
    <template #title>
      <h2 class="display-2">
        海洋生物 <span class="sp-font">Sea Creature</span>
      </h2>
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
      <div class="filter-list">
        搜尋：
        <va-input
          class="flex mb-2 md3"
          placeholder="關鍵字搜尋..."
          v-model="filter.keyword"
        />
      </div>
      <div class="data-list">
        <va-data-table
          striped
          sticky-header
          height="500px"
          :items="filter.list"
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
          <template #cell(speed)="{ value }">
            {{ trunSpeed(value) }}
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
