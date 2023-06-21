<!--
  * @author baoyuhao
  * @date 2023/6/21 15:12:19
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="change-distribution-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">授权 实施转化的科技成果</div>
    </t-row>
    <t-table
      :data="changeDistributionTable.tableData"
      :columns="CHANGE_DISTRIBUTION_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="changeDistributionTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      style="margin-top: 10px"
    >
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
import { BASE_URL, CHANGE_DISTRIBUTION_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";

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

/* 转让价格 */
const changeDistributionTable = ref({
  tableLoading: false,// 表格加载
  tableData: []// 表格数据
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  getTableData(BASE_URL.getDistributionProportion);
});
/**
 * 操作钩子
 */

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  changeDistributionTable.value.tableData = [];
  changeDistributionTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    changeDistributionTable.value.tableData = res[0].data;
    for (let i = 0; i < changeDistributionTable.value.tableData.length; i++) {
      changeDistributionTable.value.tableData[i].recipientProportion += "%";
      changeDistributionTable.value.tableData[i].schoolProportion += "%";
      changeDistributionTable.value.tableData[i].agencyProportion += "%";
      changeDistributionTable.value.tableData[i].departmentProportion += "%";
      changeDistributionTable.value.tableData[i].priceRange = changeDistributionTable.value.tableData[i].priceRangeBegin + " ~ " + changeDistributionTable.value.tableData[i].priceRangeEnd + " 万元";
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    changeDistributionTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.change-distribution-card {
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