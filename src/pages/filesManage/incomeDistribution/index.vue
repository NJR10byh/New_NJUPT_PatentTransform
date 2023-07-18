<!--
  * @author baoyuhao
  * @date 2023/7/17 17:40:22
  * @description 文件管理-收益分配
  * @version 0.1.0
-->
<template>
  <t-card class="files-manage-income-distribution-card">
    <t-row justify="space-between" class="cardTop">
      <div style="display: flex;justify-content: flex-start;align-items: center;">
        <t-button @click="back">
          <template #icon>
            <t-icon name="rollback"></t-icon>
          </template>
          返回
        </t-button>
        <div style="margin-left: 10px;font-size: 16px;color: var(--td-gray-color-7);">
          项目名称：{{ filesStore.filesInfo.projectName }}
        </div>
      </div>
      <div>
        <t-button theme="primary">
          <template #icon>
            <t-icon name="download"></t-icon>
          </template>
          一键生成下载备案表
        </t-button>
      </div>
    </t-row>
  </t-card>

  <t-card class="files-manage-income-distribution-card">
    <t-table
      :data="filesManageIncomeDistributionTable.tableData"
      :columns="FILES_MANAGE_INCOME_DISTRIBUTION_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="filesManageIncomeDistributionTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      size="small"
    >
      <template #zlmc="slotProps">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
          <t-icon name="folder" style="color: #ebb105;"></t-icon>
          <t-link style="margin-left: 5px;" @click="openFolder(slotProps.row)">
            {{ slotProps.row.zlmc }}
          </t-link>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useFilesStore, useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { prefix } from "@/config/global";
import { FILES_MANAGE_INCOME_DISTRIBUTION_TABLE_COLUMNS } from "./constants";

const store = useSettingStore();
const filesStore = useFilesStore();
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
const filesManageIncomeDistributionTable = ref({
  tableLoading: false,
  tableData: []
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  getTableData();
});
/**
 * 操作钩子
 */

/**
 * 业务相关
 */
// 获取文件列表
const getTableData = () => {
  filesManageIncomeDistributionTable.value.tableLoading = true;
  filesManageIncomeDistributionTable.value.tableData = filesStore.filesInfo.patentList;
  filesManageIncomeDistributionTable.value.tableLoading = false;
};
// 返回上个页面
const back = () => {
  router.go(-1);
};
// 查看明细
const openFolder = (row) => {
  console.log(row);
  // 创建响应式对象
  // const data = reactive({
  //   row
  // });
  router.push({
    path: "/filesManage/incomeDistributionDetail",
    query: { zlmc: row.zlmc }
  });
};
</script>

<style lang="less" scoped>
.files-manage-income-distribution-card {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;

  .cardTop {
    //border: 1px solid red;
    align-items: center;
  }

  .settingBtns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

}
</style>