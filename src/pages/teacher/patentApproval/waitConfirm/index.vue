<!--
  * @author baoyuhao
  * @date 2023/6/6 9:55:43
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="wait-confirm-card">
    <t-table
      class="tableStyle"
      :data="waitConfirmTable.tableData"
      :columns="WAIT_CONFIRM_TABLE_COLUMNS"
      row-key="index"
      hover
      stripe
      table-layout="auto"
      :expand-icon="false"
      :expand-on-row-click="true"
      :pagination="waitConfirmTable.pagination"
      :loading="waitConfirmTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="waitConfirmTablePageChange"
      size="small"
    >
      <template #expandedRow="slotProps">
        <t-row class="content">
          <t-col class="contract" :span="4">
            <div class="contract-title">
              成员名单
            </div>
            <div class="contract-detail">
              {{ slotProps.row.cymd }}
            </div>
          </t-col>
          <t-col class="contract" :span="4">
            <div class="contract-title">
              成员工号
            </div>
            <div class="contract-detail">
              {{ slotProps.row.cygh }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              专利第一作者姓名
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zldyzzxm }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              专利第一作者工号
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zldyzzgh }}
            </div>
          </t-col>
          <!--          <t-col class="contract" :span="1">-->
          <!--            <div class="contract-title">-->
          <!--              授权日期-->
          <!--            </div>-->
          <!--            <div class="contract-detail">-->
          <!--              {{ slotProps.row.sqrq }}-->
          <!--            </div>-->
          <!--          </t-col>-->
          <t-col class="contract" :span="3">
            <div class="contract-title">
              归属单位
            </div>
            <div class="contract-detail">
              {{ slotProps.row.gsdw }}
            </div>
          </t-col>
          <!--          <t-col class="contract" :span="1">-->
          <!--            <div class="contract-title">-->
          <!--              所有权人-->
          <!--            </div>-->
          <!--            <div class="contract-detail">-->
          <!--              {{ slotProps.row.zlqr }}-->
          <!--            </div>-->
          <!--          </t-col>-->
          <t-col class="contract" :span="1">
            <div class="contract-title">
              专利代理人
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zldlr }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              最后更新时间
            </div>
            <div class="contract-detail">
              {{ slotProps.row.gmtUpdate }}
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
          <t-button theme="primary">
            <template #icon>
              <t-icon name="file"></t-icon>
            </template>
            查看审批表
          </t-button>
          <t-button theme="success">
            <template #icon>
              <t-icon name="check-circle"></t-icon>
            </template>
            通过
          </t-button>
          <t-button theme="danger">
            <template #icon>
              <t-icon name="close-circle"></t-icon>
            </template>
            不通过
          </t-button>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useSettingStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { prefix } from "@/config/global";
import { BASE_URL, WAIT_CONFIRM_TABLE_COLUMNS } from "./constants";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";
import { isEmpty } from "@/utils/validate";
import { MessagePlugin } from "tdesign-vue-next";

const store = useSettingStore();
const userStore = useUserStore();
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
const waitConfirmTable = ref({
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
    currPage: waitConfirmTable.value.pagination.current,
    size: waitConfirmTable.value.pagination.pageSize,
    userGh: userStore.userInfo.userGh,
    userName: userStore.userInfo.userName
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getZLDYZZConfirmPage, obj);
  getTableData(requestUrl);
});
/**
 * 操作钩子
 */
const waitConfirmTablePageChange = (curr) => {
  console.log("分页变化", curr);
  waitConfirmTable.value.pagination.current = curr.current;
  waitConfirmTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: waitConfirmTable.value.pagination.current,
    size: waitConfirmTable.value.pagination.pageSize,
    userGh: userStore.userInfo.userGh,
    userName: userStore.userInfo.userName
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getZLDYZZConfirmPage, obj);
  getTableData(requestUrl);
};
/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  waitConfirmTable.value.tableData = [];
  waitConfirmTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    waitConfirmTable.value.tableData = res.records;
    waitConfirmTable.value.pagination.total = res.total;
    for (let i = 0; i < waitConfirmTable.value.tableData.length; i++) {
      waitConfirmTable.value.tableData[i].index = (waitConfirmTable.value.pagination.current - 1) * waitConfirmTable.value.pagination.pageSize + i + 1;
      waitConfirmTable.value.tableData[i].patentPrice = isEmpty(waitConfirmTable.value.tableData[i].patentPrice) ? "" : waitConfirmTable.value.tableData[i].patentPrice + " 万元";
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    waitConfirmTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.wait-confirm-card {
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

    .settingBtns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: auto;
    }
  }
}
</style>