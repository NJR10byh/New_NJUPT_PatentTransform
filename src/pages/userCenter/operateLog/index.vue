<!--
  * @author baoyuhao
  * @date 2023/4/24 10:15:08
  * @description 操作记录
  * @version 0.1.0
-->
<template>
  <t-card class="operate-log-card">
    <t-row justify="end" class="cardTop">
      <div class="cardTitle">
        <t-input class="inputStyle" v-model="operateLogSearch.searchCondition.operatorName" placeholder="操作人姓名"
                 clearable />
        <t-input class="inputStyle" v-model="operateLogSearch.searchCondition.operatorGh" placeholder="操作人工号"
                 clearable />
        <t-input class="inputStyle" v-model="operateLogSearch.searchCondition.operatorDepartment"
                 placeholder="操作人所属部门" clearable />
        <t-date-range-picker class="inputStyle rangeInputStyle" v-model="operateTimeRange"
                             :placeholder="['操作时间 起', '操作时间 止']" clearable @change="operateTimeChange" />
        <t-button @click="searchData">
          <template #icon>
            <t-icon name="search"></t-icon>
          </template>
          查询
        </t-button>
      </div>
    </t-row>
    <t-table
      class="tableStyle"
      :data="operateLogTable.tableData"
      :columns="OPERATE_LOG_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :pagination="operateLogTable.pagination"
      :loading="operateLogTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="operateLogTablePageChange"
      size="small"
    >
      <template #operatorGh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.operatorGh }}
        </t-tag>
      </template>
      <template #operationType="slotProps">
        <t-tag theme="success" variant="light-outline" shape="round">
          {{ slotProps.row.operationType }}
        </t-tag>
      </template>


    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { BASE_URL, OPERATE_LOG_TABLE_COLUMNS } from "./constants";


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
 * 表格相关
 */
const operateLogTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  searchText: "",// 专利名称
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20
  }
});
const operateTimeRange = ref([]); // 操作日期
const operateLogSearch = ref({
  currPage: 1,
  size: 20,
  searchCondition: {
    operatorDepartment: "",
    operatorGh: "",
    operatorName: "",
    operatorTimeBegin: "",
    operatorTimeEnd: ""
  }
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取表格数据
  getTableData(BASE_URL.searchOperationRecord);
});

/**
 * 操作钩子
 */
// 分页钩子
const operateLogTablePageChange = (curr) => {
  console.log("分页变化", curr);
  operateLogTable.value.pagination.current = curr.current;
  operateLogTable.value.pagination.pageSize = curr.pageSize;
  operateLogSearch.value.currPage = curr.current;
  operateLogSearch.value.size = curr.pageSize;
  getTableData(BASE_URL.searchOperationRecord);
};
// 日期选择器选值改变钩子
const operateTimeChange = () => {
  console.log(operateTimeRange.value);
  if (operateTimeRange.value.length == 2) {
    operateLogSearch.value.searchCondition.operatorTimeBegin = operateTimeRange.value[0];
    operateLogSearch.value.searchCondition.operatorTimeEnd = operateTimeRange.value[1];
  } else {
    operateLogSearch.value.searchCondition.operatorTimeBegin = "";
    operateLogSearch.value.searchCondition.operatorTimeEnd = "";
  }
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  operateLogTable.value.tableData = [];
  operateLogTable.value.tableLoading = true;
  request.post({
    url: requestUrl,
    data: operateLogSearch.value
  }).then(res => {
    console.log(res);
    operateLogTable.value.tableData = res.records;
    operateLogTable.value.pagination.total = res.total;
    for (let i = 0; i < operateLogTable.value.tableData.length; i++) {
      operateLogTable.value.tableData[i].index = (operateLogTable.value.pagination.current - 1) * operateLogTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    operateLogTable.value.tableLoading = false;
  });
};

// 搜索数据
const searchData = () => {
  getTableData(BASE_URL.searchOperationRecord);
};
</script>

<style lang="less" scoped>
.operate-log-card {
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      display: flex;
      align-items: center;

      .inputStyle {
        width: 200px;
        margin-right: 10px;
      }

      .rangeInputStyle {
        width: 260px;
      }
    }
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