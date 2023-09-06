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
      row-key="index"
      stripe
      hover
      :pagination="licensePriceTable.pagination"
      :loading="licensePriceTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="licensePriceTablePageChange"
      style="margin-top: 10px"
    >
      <template #licencePriceIntention="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.licencePriceIntention }}
        </t-tag>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { BASE_URL, LICENCES_PRICE_TABLE_COLUMNS } from "./constants";
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
  let obj = {
    currPage: licensePriceTable.value.pagination.current,
    size: licensePriceTable.value.pagination.pageSize
  };
  const requestUrl = setObjToUrlParams(BASE_URL.getLicencePriceIntentionPage, obj);
  getTableData(requestUrl);
});

/**
 * 操作钩子
 */
// 分页钩子
const licensePriceTablePageChange = (curr: { current: number; pageSize: number; }) => {
  console.log("分页变化", curr);
  licensePriceTable.value.pagination.current = curr.current;
  licensePriceTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: licensePriceTable.value.pagination.current,
    size: licensePriceTable.value.pagination.pageSize
  };
  const requestUrl = setObjToUrlParams(BASE_URL.getLicencePriceIntentionPage, obj);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl: string) => {
  licensePriceTable.value.tableData = [];
  licensePriceTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    licensePriceTable.value.tableData = res.records;
    licensePriceTable.value.pagination.total = res.total;
    for (let i = 0; i < licensePriceTable.value.tableData.length; i++) {
      licensePriceTable.value.tableData[i].index = (licensePriceTable.value.pagination.current - 1) * licensePriceTable.value.pagination.pageSize + i + 1;
      if (isNotEmpty(licensePriceTable.value.tableData[i].licencePriceIntention)) {
        licensePriceTable.value.tableData[i].licencePriceIntention += " 万元";
      }
    }
  }).catch(err => {
    MessagePlugin.closeAll();
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