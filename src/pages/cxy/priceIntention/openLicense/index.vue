<!--
  * @author baoyuhao
  * @date 2023/3/20 0:03:01
  * @description 价格意向-开放许可
  * @version 0.1.0
-->
<template>
  <t-card class="openLicense-price-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">开放许可价格意向</div>
    </t-row>
    <t-table
      :data="openLicensePriceTable.tableData"
      :columns="OPEN_LICENCES_PRICE_TABLE_COLUMNS"
      row-key="index"
      hover
      stripe
      :pagination="openLicensePriceTable.pagination"
      :loading="openLicensePriceTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="openLicensePriceTablePageChange"
      style="margin-top: 10px"
    >
      <template #openLicencePriceIntention="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.openLicencePriceIntention }}
        </t-tag>
      </template>
    </t-table>
    >
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { BASE_URL, OPEN_LICENCES_PRICE_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { isNotEmpty } from "@/utils/validate";


const store = useSettingStore();

/**
 * data
 */
// 根据是否使用多Tab页判断offsetTop
const offsetTop = computed(() => {
  return store.isUseTabsRouter ? 48 : 0;
});
// 获取当前容器
const getContainer = () => {
  return document.querySelector(`.${prefix}-layout`);
};
/**
 * 表格相关
 */

/* 开放许可价格 */
const openLicensePriceTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20
  }
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  let obj = {
    currPage: openLicensePriceTable.value.pagination.current,
    size: openLicensePriceTable.value.pagination.pageSize
  };
  const requestUrl = setObjToUrlParams(BASE_URL.getOpenLicencePriceIntentionPage, obj);
  // 获取表格数据
  getTableData(requestUrl);
});

/**
 * 操作钩子
 */
// 分页钩子
const openLicensePriceTablePageChange = (curr: { current: number; pageSize: number; }) => {
  console.log("分页变化", curr);
  openLicensePriceTable.value.pagination.current = curr.current;
  openLicensePriceTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: openLicensePriceTable.value.pagination.current,
    size: openLicensePriceTable.value.pagination.pageSize
  };
  const requestUrl = setObjToUrlParams(BASE_URL.getOpenLicencePriceIntentionPage, obj);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl: string) => {
  openLicensePriceTable.value.tableData = [];
  openLicensePriceTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    openLicensePriceTable.value.tableData = res.records;
    openLicensePriceTable.value.pagination.total = res.total;
    for (let i = 0; i < openLicensePriceTable.value.tableData.length; i++) {
      openLicensePriceTable.value.tableData[i].index = (openLicensePriceTable.value.pagination.current - 1) * openLicensePriceTable.value.pagination.pageSize + i + 1;
      if (isNotEmpty(openLicensePriceTable.value.tableData[i].openLicencePriceIntention)) {
        openLicensePriceTable.value.tableData[i].openLicencePriceIntention += " 万元";
      }
    }
  }).catch(err => {
    MessagePlugin.closeAll();
    MessagePlugin.error(err.message);
  }).finally(() => {
    openLicensePriceTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.openLicense-price-card {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      font-size: 20px;
      font-weight: bold;
    }
  }

}
</style>