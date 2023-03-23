<!--
  * @author baoyuhao
  * @date 2023/3/20 0:03:01
  * @description 通知中心-产学研
  * @version 0.1.0
-->
<template>
  <t-card class="transfer-price-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">转让价格意向</div>
    </t-row>
    <t-table
      :data="transferPriceTable.tableData"
      :columns="LICENCES_PRICE_TABLE_COLUMNS"
      row-key="id"
      vertical-align="center"
      hover
      :pagination="transferPriceTable.pagination"
      :loading="transferPriceTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="patentTablePageChange"
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

/* 转让价格 */
const transferPriceTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10
  }
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  console.log("onMounted");
  // 获取表格数据
  const transferPriceUrl = "/intention/getTransferPriceIntentionPage";
  getTransferPriceData(transferPriceUrl);
});

/**
 * 操作钩子
 */
// 分页钩子
const patentTablePageChange = (curr) => {
  console.log("分页变化", curr);
  const requestUrl = "/intention/getTransferPriceIntentionPage";
  transferPriceTable.value.pagination.current = curr.current;
  transferPriceTable.value.pagination.pageSize = curr.pageSize;
  getTransferPriceData(requestUrl);
};

/**
 * 业务相关
 */
// 获取通知列表
const getTransferPriceData = (noticeUrl) => {
  transferPriceTable.value.tableData = [];
  let obj = {
    currPage: transferPriceTable.value.pagination.current,
    size: transferPriceTable.value.pagination.pageSize
  };
  noticeUrl = setObjToUrlParams(noticeUrl, obj);
  transferPriceTable.value.tableLoading = true;
  request.get({
    url: noticeUrl
  }).then(res => {
    console.log(res);
    transferPriceTable.value.tableData = res.records;
    transferPriceTable.value.pagination.total = res.total;
    for (let i = 0; i < transferPriceTable.value.tableData.length; i++) {
      transferPriceTable.value.tableData[i].index = (transferPriceTable.value.pagination.current - 1) * transferPriceTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    transferPriceTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.transfer-price-card {
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