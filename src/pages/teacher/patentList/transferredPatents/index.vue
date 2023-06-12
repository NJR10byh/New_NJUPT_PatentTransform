<!--
  * @author baoyuhao
  * @date 2023/4/29 15:21:11
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="transferred-patents-card">
    <t-row justify="start" class="cardTop">
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="patentCompleteTimeRange"
                           :placeholder="['转化完成时间 起', '转化完成时间 止']" clearable />
    </t-row>
    <t-table
      class="tableStyle"
      :data="transferredPatentsTable.tableData"
      :columns="TRANSFERRED_PATENTS_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      table-layout="auto"
      :pagination="transferredPatentsTable.pagination"
      :loading="transferredPatentsTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="transferredPatentsTablePageChange"
      size="small"
      v-resize="resize"
    >
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
      <template #settings="slotProps">
        <div class="settingBtns">
          <t-button theme="warning">
            <template #icon>
              <t-icon name="edit"></t-icon>
            </template>
            修改
          </t-button>
          <t-button theme="danger">
            <template #icon>
              <t-icon name="delete"></t-icon>
            </template>
            删除
          </t-button>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { prefix } from "@/config/global";
import { BASE_URL, TRANSFERRED_PATENTS_TABLE_COLUMNS } from "./constants";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { isEmpty } from "@/utils/validate";

const store = useSettingStore();
const router = useRouter();

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
 * 搜索相关
 */
const patentCompleteTimeRange = ref([]); // 转化完成时间
/**
 * 表格相关
 */
const transferredPatentsTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  searchText: "",
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
    currPage: transferredPatentsTable.value.pagination.current,
    size: transferredPatentsTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getTransferredPatentPage, obj);
  getTableData(requestUrl);
});
/**
 * 操作钩子
 */
// 分页钩子
const transferredPatentsTablePageChange = (curr) => {
  console.log("分页变化", curr);
  transferredPatentsTable.value.pagination.current = curr.current;
  transferredPatentsTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: transferredPatentsTable.value.pagination.current,
    size: transferredPatentsTable.value.pagination.pageSize,
    companyName: transferredPatentsTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getTransferredPatentPage, obj);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  transferredPatentsTable.value.tableData = [];
  transferredPatentsTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    transferredPatentsTable.value.tableData = res.records;
    transferredPatentsTable.value.pagination.total = res.total;
    for (let i = 0; i < transferredPatentsTable.value.tableData.length; i++) {
      transferredPatentsTable.value.tableData[i].index = (transferredPatentsTable.value.pagination.current - 1) * transferredPatentsTable.value.pagination.pageSize + i + 1;
      transferredPatentsTable.value.tableData[i].patentPrice = isEmpty(transferredPatentsTable.value.tableData[i].patentPrice) ? "" : transferredPatentsTable.value.tableData[i].patentPrice + " 万元";
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    transferredPatentsTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.transferred-patents-card {
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .cardTop {
    //border: 1px solid red;
    align-items: center;
  }

  .tableStyle {
    width: 100%;
    margin-top: 10px;

    .settingBtns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: auto;
    }
  }
}
</style>