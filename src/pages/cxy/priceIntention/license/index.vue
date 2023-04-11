<!--
  * @author baoyuhao
  * @date 2023/3/20 0:03:01
  * @description 价格意向-许可
  * @version 0.1.0
-->
<template>
  <t-card class="license-price-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">许可价格意向</div>
    </t-row>
    <t-table
      :data="licensePriceTable.tableData"
      :columns="LICENCES_PRICE_TABLE_COLUMNS"
      row-key="id"

      stripe
      hover
      :pagination="licensePriceTable.pagination"
      :loading="licensePriceTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="licensePriceTablePageChange"
      style="margin-top: 10px"
    />
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { LICENCES_PRICE_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";


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

/* 许可价格 */
const licensePriceTable = ref({
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

  // 获取表格数据
  const requestUrl = "/intention/getLicencePriceIntentionPage";
  getLicensePriceData(requestUrl);
});

/**
 * 操作钩子
 */
// 分页钩子
const licensePriceTablePageChange = (curr) => {
  console.log("分页变化", curr);
  const requestUrl = "/intention/getLicencePriceIntentionPage";
  licensePriceTable.value.pagination.current = curr.current;
  licensePriceTable.value.pagination.pageSize = curr.pageSize;
  getLicensePriceData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getLicensePriceData = (requestUrl) => {
  licensePriceTable.value.tableData = [];
  let obj = {
    currPage: licensePriceTable.value.pagination.current,
    size: licensePriceTable.value.pagination.pageSize
  };
  requestUrl = setObjToUrlParams(requestUrl, obj);
  licensePriceTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    licensePriceTable.value.tableData = res.records;
    licensePriceTable.value.pagination.total = res.total;
    for (let i = 0; i < licensePriceTable.value.tableData.length; i++) {
      licensePriceTable.value.tableData[i].index = (licensePriceTable.value.pagination.current - 1) * licensePriceTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    licensePriceTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.license-price-card {
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