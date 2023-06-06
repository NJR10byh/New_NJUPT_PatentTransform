<!--
  * @author baoyuhao
  * @date 2023/6/6 9:56:02
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="wait-initiate-card">
    <t-table
      :data="waitInitiateTable.tableData"
      :columns="PATENT_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :pagination="waitInitiateTable.pagination"
      :loading="waitInitiateTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="waitInitiateTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { PATENT_TABLE_COLUMNS } from "@/pages/cxy/dataCenter/constants";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";

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

});
/**
 * 操作钩子
 */
const waitInitiateTablePageChange = () => {

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
}
</style>