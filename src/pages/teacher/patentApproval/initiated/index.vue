<!--
  * @author baoyuhao
  * @date 2023/6/6 9:55:21
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="initiated-card">
    <t-row justify="start" class="cardTop">
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="filterCondition.type"
                     @change="typeChange">
        <t-radio-button :value="0">全部</t-radio-button>
        <t-radio-button :value="1">未通过</t-radio-button>
        <t-radio-button :value="2">已通过</t-radio-button>
        <t-radio-button :value="3">正在转化</t-radio-button>
      </t-radio-group>
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="filterCondition.isZLDYZZ"
                     @change="isZLDYZZChange">
        <t-radio-button :value="true">第一发明人</t-radio-button>
        <t-radio-button :value="false">专利成员</t-radio-button>
      </t-radio-group>
    </t-row>
  </t-card>
  <t-card class="initiated-card">
    <t-row justify="space-between" class="cardTop">
      <div class="cardTitle">
        已提交的审批
      </div>
      <div>
        <t-button theme="primary" @click="toSavedApproval">
          <template #icon>
            <t-icon name="jump"></t-icon>
          </template>
          已保存的审批
        </t-button>
      </div>
    </t-row>
    <t-table
      :data="initiatedTable.tableData"
      :columns="INITIATED_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :pagination="initiatedTable.pagination"
      :loading="initiatedTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="initiatedTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
      <template #state="slotProps">
        <t-tag v-if="slotProps.row.state.indexOf('未通过')!=-1" theme="warning" variant="light-outline"
               shape="round">
          <template #icon>
            <t-icon name="info-circle"></t-icon>
          </template>
          {{ slotProps.row.state }}
        </t-tag>
        <t-tag v-else-if="slotProps.row.state=='已转化'" theme="success" variant="light-outline" shape="round">
          <template #icon>
            <t-icon name="check-circle"></t-icon>
          </template>
          {{ slotProps.row.state }}
        </t-tag>
        <t-tag v-else theme="success" variant="light-outline" shape="round">
          {{ slotProps.row.state }}
        </t-tag>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { BASE_URL, INITIATED_TABLE_COLUMNS } from "./constants";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";
import { request } from "@/utils/request";
import { isEmpty } from "@/utils/validate";
import { MessagePlugin } from "tdesign-vue-next";
import { setObjToUrlParams } from "@/utils/request/utils";
import { chargeTransferState } from "@/utils/transferState";
import router from "@/router";

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

const filterCondition = ref({
  type: 0,
  isZLDYZZ: true,
  currPage: 1,
  size: 20
});

/* 表格相关 */
const initiatedTable = ref({
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
  getInitiatedTableData(BASE_URL.getApplicationPage);
});
/**
 * 操作钩子
 */
const typeChange = () => {
  filterCondition.value.currPage = 1;
  initiatedTable.value.pagination.current = 1;
  getInitiatedTableData(BASE_URL.getApplicationPage);
};
const isZLDYZZChange = () => {
  filterCondition.value.currPage = 1;
  initiatedTable.value.pagination.current = 1;
  getInitiatedTableData(BASE_URL.getApplicationPage);
};
const initiatedTablePageChange = (curr) => {
  console.log("分页变化", curr);
  initiatedTable.value.pagination.current = curr.current;
  initiatedTable.value.pagination.pageSize = curr.pageSize;
  filterCondition.value.currPage = curr.current;
  filterCondition.value.size = curr.pageSize;
  getInitiatedTableData(BASE_URL.getApplicationPage);
};

/**
 * 业务相关
 */
const getInitiatedTableData = (requestUrl) => {
  initiatedTable.value.tableLoading = true;
  requestUrl = setObjToUrlParams(requestUrl, filterCondition.value);
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    initiatedTable.value.pagination.total = res.total;
    initiatedTable.value.tableData = res.records;
    for (let i = 0; i < initiatedTable.value.tableData.length; i++) {
      initiatedTable.value.tableData[i].index = (initiatedTable.value.pagination.current - 1) * initiatedTable.value.pagination.pageSize + i + 1;
      if (!isEmpty(initiatedTable.value.tableData[i].patentPrice)) {
        initiatedTable.value.tableData[i].patentPrice += " 万元";
        initiatedTable.value.tableData[i].state = chargeTransferState(initiatedTable.value.tableData[i]);
      }
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    initiatedTable.value.tableLoading = false;
  });
};

// 已保存的审批
const toSavedApproval = () => {
  router.push("/patentApproval/savedApproval");
};
</script>

<style lang="less" scoped>
.initiated-card {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;
  transition: 1s;

  .cardTop {
    //border: 1px solid red;
    align-items: center;
    flex-wrap: wrap;

    .radioGroup {
      margin: 5px;
    }

    .inputStyle {
      width: 200px;
      margin: 5px;
    }

    .rangeInputStyle {
      width: 410px;
    }

    .cascaderStyle {
      width: 410px;
    }
  }
}
</style>