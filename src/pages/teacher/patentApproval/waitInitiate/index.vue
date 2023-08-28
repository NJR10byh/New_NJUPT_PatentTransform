<!--
  * @author baoyuhao
  * @date 2023/6/6 9:56:02
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="wait-initiate-card">
    <t-table
      class="tableStyle"
      :data="waitInitiateTable.tableData"
      :columns="WAIT_INITIATED_TABLE_COLUMNS"
      row-key="index"
      hover
      stripe
      table-layout="auto"
      :expand-icon="false"
      :expand-on-row-click="true"
      :pagination="waitInitiateTable.pagination"
      :loading="waitInitiateTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="waitInitiateTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #expandedRow="slotProps">
        <t-row class="content">
          <t-col class="contract" :span="2">
            <div class="contract-title">
              第一作者
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zldyzzxm }}
            </div>
          </t-col>
          <t-col class="contract" :span="4">
            <div class="contract-title">
              成员名单
            </div>
            <div class="contract-detail">
              {{ slotProps.row.cymd }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              专利权人
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zlqr }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              专利授权日期
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zlsqrq }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              最后更新时间
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zhgxsj }}
            </div>
          </t-col>
        </t-row>
      </template>
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
            编辑
          </t-button>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { BASE_URL, WAIT_INITIATED_TABLE_COLUMNS } from "./constants";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";
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

/* 表格相关 */
const waitInitiateTable = ref({
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
    currPage: waitInitiateTable.value.pagination.current,
    size: waitInitiateTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getBatchSavedTransferApplicationFormPage, obj);
  getTableData(requestUrl);
});
/**
 * 操作钩子
 */
const waitInitiateTablePageChange = (curr) => {
  console.log("分页变化", curr);
  waitInitiateTable.value.pagination.current = curr.current;
  waitInitiateTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: waitInitiateTable.value.pagination.current,
    size: waitInitiateTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getBatchSavedTransferApplicationFormPage, obj);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
const getTableData = (requestUrl) => {
  waitInitiateTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    waitInitiateTable.value.pagination.total = res.total;
    waitInitiateTable.value.tableData = res.records;
    for (let i = 0; i < waitInitiateTable.value.tableData.length; i++) {
      waitInitiateTable.value.tableData[i].index = (waitInitiateTable.value.pagination.current - 1) * waitInitiateTable.value.pagination.pageSize + i + 1;
      if (isNotEmpty(waitInitiateTable.value.tableData[i].patentPrice)) {
        waitInitiateTable.value.tableData[i].patentPrice += " 万元";
      }
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    waitInitiateTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.wait-initiate-card {
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

  .tableStyle {
    width: 100%;
    margin-top: 10px;

    .content {
      width: 100%;
      margin-top: -20px;

      .contract {
        height: 80px;

        &-title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 24px;
          margin: 20px 0 6px;
          font-size: 14px;
          color: var(--td-text-color-placeholder);
        }

        &-detail {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 40px;
          font-size: 14px;
          color: var(--td-text-color-secondary);
        }
      }

      .contract:last-child {
        margin-bottom: 0;
      }
    }

    .settingBtns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: auto;
    }
  }
}
</style>