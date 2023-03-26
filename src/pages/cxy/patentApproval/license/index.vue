<!--
  * @author baoyuhao
  * @date 2023/3/26 15:57:43
  * @description 专利审批-许可
  * @version 0.1.0
-->
<template>
  <t-card>
    <t-tabs :default-value="tabsData[0].value" placement="left" @change="tabChange">
      <!-- 待审批 -->
      <t-tab-panel class="tabPanel" :value="tabsData[0].value" :label="tabsData[0].label">
        <t-row justify="end" class="cardTop">
          <t-select class="selectStyle" v-model="tabsData[0].searchField.value"
                    :options="tabsData[0].searchField.options"
                    placeholder="查询字段" clearable>
          </t-select>
          <t-input class="inputStyle"></t-input>
          <t-button>
            <template #icon>
              <t-icon name="search"></t-icon>
            </template>
            查询
          </t-button>
        </t-row>
        <t-table
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"
          vertical-align="center"
          bordered
          hover
          stripe
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          style="margin-top: 10px;"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline">
              {{ slotProps.row.state }}
            </t-tag>
          </template>
          <template #settings="slotProps">
            <t-button theme="danger">
              <template #icon>
                <t-icon name="delete"></t-icon>
              </template>
            </t-button>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 已通过审批 -->
      <t-tab-panel class="tabPanel" :value="tabsData[1].value" :label="tabsData[1].label">
        <t-table
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"
          vertical-align="center"
          bordered
          hover
          stripe
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          style="margin-top: 10px;"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline">
              {{ slotProps.row.state }}
            </t-tag>
          </template>
          <template #settings="slotProps">
            <t-button theme="danger">
              <template #icon>
                <t-icon name="delete"></t-icon>
              </template>
            </t-button>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 正在转化 -->
      <t-tab-panel class="tabPanel" :value="tabsData[2].value" :label="tabsData[2].label">
        <t-row justify="end" class="cardTop">
          <t-select class="selectStyle" v-model="tabsData[0].searchField.value"
                    :options="tabsData[0].searchField.options"
                    placeholder="查询字段" clearable>
          </t-select>
          <t-input class="inputStyle"></t-input>
          <t-button>
            <template #icon>
              <t-icon name="search"></t-icon>
            </template>
            查询
          </t-button>
        </t-row>
        <t-table
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"
          vertical-align="center"
          bordered
          hover
          stripe
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          style="margin-top: 10px;"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline">
              {{ slotProps.row.state }}
            </t-tag>
          </template>
          <template #settings="slotProps">
            <t-button theme="danger">
              <template #icon>
                <t-icon name="delete"></t-icon>
              </template>
            </t-button>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 已转化 -->
      <t-tab-panel class="tabPanel" :value="tabsData[3].value" :label="tabsData[3].label">
        <t-row justify="end" class="cardTop">
          <t-select class="selectStyle" v-model="tabsData[0].searchField.value"
                    :options="tabsData[0].searchField.options"
                    placeholder="查询字段" clearable>
          </t-select>
          <t-input class="inputStyle"></t-input>
          <t-button>
            <template #icon>
              <t-icon name="search"></t-icon>
            </template>
            查询
          </t-button>
        </t-row>
        <t-table
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"
          vertical-align="center"
          bordered
          hover
          stripe
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          style="margin-top: 10px;"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline">
              {{ slotProps.row.state }}
            </t-tag>
          </template>
          <template #settings="slotProps">
            <t-button theme="danger">
              <template #icon>
                <t-icon name="delete"></t-icon>
              </template>
            </t-button>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 未通过 -->
      <t-tab-panel class="tabPanel" :value="tabsData[4].value" :label="tabsData[4].label">
        <t-table
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"
          vertical-align="center"
          bordered
          hover
          stripe
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          style="margin-top: 10px;"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline">
              {{ slotProps.row.state }}
            </t-tag>
          </template>
          <template #settings="slotProps">
            <t-button theme="danger">
              <template #icon>
                <t-icon name="delete"></t-icon>
              </template>
            </t-button>
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
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { PATENT_APPROVAL_TABLE_COLUMNS, PATENT_STATE } from "./constants";
import { MessagePlugin } from "tdesign-vue-next";
import { chargeAllState } from "@/utils/transferState";

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

const baseUrl = "/cxy/getTransferApplicationFromByCondition";

/**
 * Tab相关
 */
const tabsData = ref([
  {
    value: 1,
    label: "待审批",
    searchField: {
      value: "",
      options: [
        { label: "专利名称", value: "1" },
        { label: "专利第一作者", value: "2" },
        { label: "成员名单", value: "3" },
        { label: "所属学院", value: "4" }
      ]
    }
  },
  {
    value: 2,
    label: "已通过审批"
  },
  {
    value: 3,
    label: "正在转化"
  },
  {
    value: 4,
    label: "已转化"
  },
  {
    value: 5,
    label: "未通过"
  }
]);
/**
 * 表格相关
 */

// 转让价格
const patentApprovalTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 50
  }
});

let requestData = {
  contractType: 1,
  currPage: patentApprovalTable.value.pagination.current,
  size: patentApprovalTable.value.pagination.pageSize,
  search: 0,
  patentState: 5
};
/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(async () => {
  // 获取Tab数据
  await getLabelNum();
});

/**
 * 操作钩子
 */
// Tab页切换钩子
const tabChange = async (value) => {
  console.log(value);
  patentApprovalTable.value.pagination.current = 1;
  let requestUrl = "";
  switch (value) {
    case 1:
      requestData = {
        ...requestData,
        patentState: PATENT_STATE.WAIT_APPROVAL
      };
      requestUrl = setObjToUrlParams(baseUrl, requestData);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 2:
      requestData = {
        ...requestData,
        patentState: PATENT_STATE.PASSED_APPROVAL
      };
      requestUrl = setObjToUrlParams(baseUrl, requestData);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 3:
      requestData = {
        ...requestData,
        patentState: PATENT_STATE.TRANSFERRING
      };
      requestUrl = setObjToUrlParams(baseUrl, requestData);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 4:
      requestData = {
        ...requestData,
        patentState: PATENT_STATE.TRANSFERRED
      };
      requestUrl = setObjToUrlParams(baseUrl, requestData);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 5:
      requestData = {
        ...requestData,
        patentState: PATENT_STATE.FAILED
      };
      requestUrl = setObjToUrlParams(baseUrl, requestData);
      await getPatentApprovalTableData(requestUrl);
      break;
    default:
      requestData = {
        ...requestData,
        patentState: PATENT_STATE.WAIT_APPROVAL
      };
      requestUrl = setObjToUrlParams(baseUrl, requestData);
      await getPatentApprovalTableData(requestUrl);
      break;
  }
};
// 分页钩子
const patentApprovalTablePageChange = (curr) => {
  console.log("分页变化", curr);
  patentApprovalTable.value.pagination.current = curr.current;
  patentApprovalTable.value.pagination.pageSize = curr.pageSize;
  requestData = {
    ...requestData,
    currPage: curr.current,
    size: curr.pageSize
  };
  let requestUrl = setObjToUrlParams(baseUrl, requestData);
  getPatentApprovalTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取Tab信息
const getLabelNum = async () => {
  const waitApprovalRequestUrl = setObjToUrlParams(baseUrl, requestData);
  await request.get({
    url: waitApprovalRequestUrl
  }).then(res => {
    console.log(res);
    tabsData.value[0].label = tabsData.value[0].label + " (" + res.total + ")";
  }).catch(err => {
    MessagePlugin.error(err);
  }).finally(() => {
  });
  requestData = {
    ...requestData,
    patentState: PATENT_STATE.PASSED_APPROVAL
  };
  const passedRequestUrl = setObjToUrlParams(baseUrl, requestData);
  await request.get({
    url: passedRequestUrl
  }).then(res => {
    console.log(res);
    tabsData.value[1].label = tabsData.value[1].label + " (" + res.total + ")";
  }).catch(err => {
    MessagePlugin.error(err);
  }).finally(() => {
  });
  await getPatentApprovalTableData(waitApprovalRequestUrl);

};
// 获取表格数据
const getPatentApprovalTableData = (requestUrl) => {
  patentApprovalTable.value.tableData = [];
  patentApprovalTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    patentApprovalTable.value.pagination.total = res.total;
    patentApprovalTable.value.tableData = res.records;
    for (let i = 0; i < patentApprovalTable.value.tableData.length; i++) {
      patentApprovalTable.value.tableData[i].index = (patentApprovalTable.value.pagination.current - 1) * patentApprovalTable.value.pagination.pageSize + i + 1;
      patentApprovalTable.value.tableData[i].state = chargeAllState(patentApprovalTable.value.tableData[i]);
    }
  }).catch(err => {
    MessagePlugin.error(err);
  }).finally(() => {
    patentApprovalTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.tabPanel {
  padding: 0 10px;

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