<!--
  * @author baoyuhao
  * @date 2023/3/31 17:42:24
  * @description 等待产学研负责人审批
  * @version 0.1.0
-->
<template>
  <t-card>
    <t-tabs :default-value="tabsData[0].value" placement="left" @change="tabChange">
      <!-- 待审批 -->
      <t-tab-panel class="tabPanel" :value="tabsData[0].value" :label="tabsData[0].label">
        <t-table
          class="tableStyle"
          :data="waitApprovalTable.tableData"
          :columns="WAIT_APPROVAL_TABLE_COLUMNS"
          row-key="id"

          hover
          stripe
          table-layout="auto"
          :table-content-width="tableContentWidth"
          :pagination="waitApprovalTable.pagination"
          :loading="waitApprovalTable.tableLoading"
          :header-affixed-top="{ offsetTop, container: getContainer }"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="waitApprovalTablePageChange"
          size="small"
          v-resize="resize"
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
          <template #settings="slotProps">
            <div class="settingBtns">
              <t-button theme="primary">
                <template #icon>
                  <t-icon name="file"></t-icon>
                </template>
                查看
              </t-button>

              <t-button theme="success">
                <template #icon>
                  <t-icon name="check-circle"></t-icon>
                </template>
                通过
              </t-button>
            </div>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 已通过审批 -->
      <t-tab-panel class="tabPanel" :value="tabsData[1].value" :label="tabsData[1].label">
        <t-table
          class="tableStyle"
          :data="waitApprovalTable.tableData"
          :columns="WAIT_APPROVAL_TABLE_COLUMNS"
          row-key="id"

          hover
          stripe
          table-layout="auto"
          :pagination="waitApprovalTable.pagination"
          :loading="waitApprovalTable.tableLoading"
          :header-affixed-top="{ offsetTop, container: getContainer }"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="passedTablePageChange"
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
          <template #settings="slotProps">
            <div class="settingBtns">
              <t-button theme="primary">
                <template #icon>
                  <t-icon name="file"></t-icon>
                </template>
                查看
              </t-button>
            </div>
          </template>
        </t-table>
      </t-tab-panel>
    </t-tabs>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { WAIT_APPROVAL_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { chargeTransferState } from "@/utils/transferState";

const store = useSettingStore();

// baseUrl
const baseUrl_waitApproval = ref("/cxy/getTransferApplicationFromByCXYFZR");
const baseUrl_passed = ref("/cxy/getApprovalTransferApplicationFromByCXYFZR");
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
// tableContentWidth
const tableContentWidth = ref("1300px");

/**
 * Tab相关
 */
const tabsData = ref([
  {
    value: 1,
    label: "待审批"
  },
  {
    value: 2,
    label: "已通过"
  }
]);
/**
 * 表格相关
 */
const waitApprovalTable = ref({
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
  // 获取待审批数据
  getTableData(baseUrl_waitApproval.value);
});

/**
 * 操作钩子
 */
// 监听容器宽高变化
const resize = (resizeValue) => {
  console.log(resizeValue[0].contentRect);
  if (resizeValue[0].contentRect.width > 1300) {
    tableContentWidth.value = resizeValue[0].contentRect.width + "px";
  } else {
    tableContentWidth.value = "1300px";
  }
};
// 分页钩子
const waitApprovalTablePageChange = (curr) => {
  console.log("分页变化", curr);
  waitApprovalTable.value.pagination.current = curr.current;
  waitApprovalTable.value.pagination.pageSize = curr.pageSize;
  getTableData(baseUrl_waitApproval.value);
};
const passedTablePageChange = (curr) => {
  console.log("分页变化", curr);
  waitApprovalTable.value.pagination.current = curr.current;
  waitApprovalTable.value.pagination.pageSize = curr.pageSize;
  getTableData(baseUrl_passed.value);
};
// Tab页切换钩子
const tabChange = async (value) => {
  waitApprovalTable.value.pagination.current = 1;
  switch (value) {
    case 1:
      await getTableData(baseUrl_waitApproval.value);
      break;
    case 2:
      await getTableData(baseUrl_passed.value);
      break;
    default:
      await getTableData(baseUrl_waitApproval.value);
      break;
  }
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  waitApprovalTable.value.tableData = [];
  waitApprovalTable.value.tableLoading = true;
  let obj = {
    currPage: waitApprovalTable.value.pagination.current,
    size: waitApprovalTable.value.pagination.pageSize
  };
  requestUrl = setObjToUrlParams(requestUrl, obj);
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    waitApprovalTable.value.tableData = res.records;
    waitApprovalTable.value.pagination.total = res.total;
    for (let i = 0; i < waitApprovalTable.value.tableData.length; i++) {
      waitApprovalTable.value.tableData[i].index = (waitApprovalTable.value.pagination.current - 1) * waitApprovalTable.value.pagination.pageSize + i + 1;
      waitApprovalTable.value.tableData[i].patentPrice += " 万元";
      waitApprovalTable.value.tableData[i].state = chargeTransferState(waitApprovalTable.value.tableData[i]);
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    waitApprovalTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.tabPanel {
  padding: 0 10px;

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

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .selectStyle {
      width: 130px;
      margin-right: 10px;
    }

    .inputStyle {
      width: 300px;
      margin-right: 10px;
    }
  }

}
</style>