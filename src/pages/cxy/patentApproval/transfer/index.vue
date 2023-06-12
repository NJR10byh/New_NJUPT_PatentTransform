<!--
  * @author baoyuhao
  * @date 2023/3/24 21:54:22
  * @description 专利审批-转让
  * @version 0.1.0
-->
<template>
  <t-card>
    <t-tabs :default-value="tabsData[0].value" placement="left" @change="tabChange">
      <!-- 待审批 -->
      <t-tab-panel class="tabPanel" :value="tabsData[0].value" :label="tabsData[0].label">
        <t-row justify="end" class="cardTop">
          <t-select class="selectStyle" v-model="searchField.value"
                    :options="searchField.options"
                    placeholder="查询字段" clearable @change="searchFieldSelectChange">
          </t-select>
          <t-input class="inputStyle" placeholder="请输入查询内容" v-model="requestData.condition" clearable></t-input>
          <t-button @click="searchPatentApproval">
            <template #icon>
              <t-icon name="search"></t-icon>
            </template>
            查询
          </t-button>
        </t-row>
        <t-table
          class="tableStyle"
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"
          hover
          stripe
          table-layout="auto"
          table-content-width="1600px"
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline" shape="round">
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

              <t-button theme="warning">
                <template #icon>
                  <t-icon name="edit"></t-icon>
                </template>
                修改
              </t-button>

              <t-button theme="success" v-if="['等待产学研审批', '产学研未通过'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="check-circle"></t-icon>
                </template>
                通过
              </t-button>

              <t-button theme="danger" v-if="['等待产学研审批'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="close-circle"></t-icon>
                </template>
                不通过
              </t-button>

              <t-button theme="danger" v-if="['等待产学研创建合同'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="rollback"></t-icon>
                </template>
                撤销通过
              </t-button>

              <t-button theme="danger" variant="outline">
                <template #icon>
                  <t-icon name="close"></t-icon>
                </template>
                取消转化
              </t-button>
            </div>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 已通过审批 -->
      <t-tab-panel class="tabPanel" :value="tabsData[1].value" :label="tabsData[1].label">
        <t-table
          class="tableStyle"
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"

          hover
          stripe
          table-layout="auto"
          table-content-width="1600px"
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline" shape="round">
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

              <t-button theme="warning">
                <template #icon>
                  <t-icon name="edit"></t-icon>
                </template>
                修改
              </t-button>

              <t-button theme="success" v-if="['等待产学研审批', '产学研未通过'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="check-circle"></t-icon>
                </template>
                通过
              </t-button>

              <t-button theme="danger" v-if="['等待产学研审批'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="close-circle"></t-icon>
                </template>
                不通过
              </t-button>

              <t-button theme="danger" v-if="['等待产学研创建合同'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="rollback"></t-icon>
                </template>
                撤销通过
              </t-button>

              <t-button theme="danger" variant="outline">
                <template #icon>
                  <t-icon name="close"></t-icon>
                </template>
                取消转化
              </t-button>
            </div>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 正在转化 -->
      <t-tab-panel class="tabPanel" :value="tabsData[2].value" :label="tabsData[2].label">
        <t-row justify="end" class="cardTop">
          <t-select class="selectStyle" v-model="searchField.value"
                    :options="searchField.options"
                    placeholder="查询字段" clearable @change="searchFieldSelectChange">
          </t-select>
          <t-input class="inputStyle" placeholder="请输入查询内容" v-model="requestData.condition" clearable></t-input>
          <t-button @click="searchPatentApproval">
            <template #icon>
              <t-icon name="search"></t-icon>
            </template>
            查询
          </t-button>
        </t-row>
        <t-table
          class="tableStyle"
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"

          hover
          stripe
          table-layout="auto"
          :table-content-width="tableContentWidth"
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          size="small"
          v-resize="resize"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline" shape="round">
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

              <t-button theme="warning">
                <template #icon>
                  <t-icon name="edit"></t-icon>
                </template>
                修改
              </t-button>

              <t-button theme="success" v-if="['等待产学研审批', '产学研未通过'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="check-circle"></t-icon>
                </template>
                通过
              </t-button>

              <t-button theme="danger" v-if="['等待产学研审批'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="close-circle"></t-icon>
                </template>
                不通过
              </t-button>

              <t-button theme="danger" v-if="['等待产学研创建合同'].includes(slotProps.row.state)">
                <template #icon>
                  <t-icon name="rollback"></t-icon>
                </template>
                撤销通过
              </t-button>
            </div>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 已转化 -->
      <t-tab-panel class="tabPanel" :value="tabsData[3].value" :label="tabsData[3].label">
        <t-row justify="end" class="cardTop">
          <t-select class="selectStyle" v-model="searchField.value"
                    :options="searchField.options"
                    placeholder="查询字段" clearable @change="searchFieldSelectChange">
          </t-select>
          <t-input class="inputStyle" placeholder="请输入查询内容" v-model="requestData.condition" clearable></t-input>
          <t-button @click="searchPatentApproval">
            <template #icon>
              <t-icon name="search"></t-icon>
            </template>
            查询
          </t-button>
        </t-row>
        <t-table
          class="tableStyle"
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"

          hover
          stripe
          table-layout="auto"
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="success" variant="light-outline" shape="round">
              <template #icon>
                <t-icon name="check-circle"></t-icon>
              </template>
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
      <!-- 未通过 -->
      <t-tab-panel class="tabPanel" :value="tabsData[4].value" :label="tabsData[4].label">
        <t-table
          class="tableStyle"
          :data="patentApprovalTable.tableData"
          :columns="PATENT_APPROVAL_TABLE_COLUMNS"
          row-key="id"

          hover
          stripe
          table-layout="auto"
          table-content-width="1500px"
          :pagination="patentApprovalTable.pagination"
          :loading="patentApprovalTable.tableLoading"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="patentApprovalTablePageChange"
          size="small"
        >
          <template #zlh="slotProps">
            <t-tag theme="primary" variant="light-outline">
              {{ slotProps.row.zlh }}
            </t-tag>
          </template>
          <template #state="slotProps">
            <t-tag theme="warning" variant="light-outline" shape="round">
              <template #icon>
                <t-icon name="info-circle"></t-icon>
              </template>
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

              <t-button theme="warning">
                <template #icon>
                  <t-icon name="edit"></t-icon>
                </template>
                修改
              </t-button>

              <t-button theme="success" v-if="['等待产学研审批', '产学研未通过'].includes(slotProps.row.state)">
                通过
              </t-button>

              <t-button theme="danger" variant="outline">
                <template #icon>
                  <t-icon name="close"></t-icon>
                </template>
                取消转化
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
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { PATENT_APPROVAL_TABLE_COLUMNS, PATENT_STATE } from "./constants";
import { MessagePlugin } from "tdesign-vue-next";
import { chargeTransferState } from "@/utils/transferState";

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
// tableContentWidth
const tableContentWidth = ref("1300px");

const baseUrl = "/cxy/getTransferApplicationFromByCondition";

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
 * 搜索相关
 */
const searchField = ref({
  value: "",
  options: [
    { label: "专利名称", value: 1 },
    { label: "专利第一作者", value: 2 },
    { label: "成员名单", value: 3 },
    { label: "所属学院", value: 4 }
  ]
});

/**
 * 表格相关
 */
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

// 请求体
const requestData = ref({
  contractType: 0,
  currPage: patentApprovalTable.value.pagination.current,
  size: patentApprovalTable.value.pagination.pageSize,
  search: 0,
  patentState: 5,
  condition: ""
});
/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取Tab数据
  getLabelNum();
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
// Tab页切换钩子
const tabChange = async (value) => {
  patentApprovalTable.value.pagination.current = 1;
  requestData.value.currPage = 1;
  let requestUrl = "";
  switch (value) {
    case 1:
      requestData.value.patentState = PATENT_STATE.WAIT_APPROVAL;
      requestUrl = setObjToUrlParams(baseUrl, requestData.value);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 2:
      requestData.value.patentState = PATENT_STATE.PASSED_APPROVAL;
      requestUrl = setObjToUrlParams(baseUrl, requestData.value);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 3:
      requestData.value.patentState = PATENT_STATE.TRANSFERRING;
      requestUrl = setObjToUrlParams(baseUrl, requestData.value);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 4:
      requestData.value.patentState = PATENT_STATE.TRANSFERRED;
      requestUrl = setObjToUrlParams(baseUrl, requestData.value);
      await getPatentApprovalTableData(requestUrl);
      break;
    case 5:
      requestData.value.patentState = PATENT_STATE.FAILED;
      requestUrl = setObjToUrlParams(baseUrl, requestData.value);
      await getPatentApprovalTableData(requestUrl);
      break;
    default:
      requestData.value.patentState = PATENT_STATE.WAIT_APPROVAL;
      requestUrl = setObjToUrlParams(baseUrl, requestData.value);
      await getPatentApprovalTableData(requestUrl);
      break;
  }
};
// 查询字段选择器钩子
const searchFieldSelectChange = async (value) => {
  // clearble会触发change钩子，此时value为 undefined
  if (value != undefined) {
    requestData.value.search = value;
  } else {
    requestData.value.search = 0;
  }
};
// 分页钩子
const patentApprovalTablePageChange = (curr) => {
  console.log("分页变化", curr);
  patentApprovalTable.value.pagination.current = curr.current;
  patentApprovalTable.value.pagination.pageSize = curr.pageSize;
  requestData.value = {
    ...requestData.value,
    currPage: curr.current,
    size: curr.pageSize
  };
  let requestUrl = setObjToUrlParams(baseUrl, requestData.value);
  getPatentApprovalTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取Tab信息
const getLabelNum = async () => {
  const waitApprovalRequestUrl = setObjToUrlParams(baseUrl, requestData.value);
  await request.get({
    url: waitApprovalRequestUrl
  }).then(res => {
    console.log(res);
    tabsData.value[0].label = tabsData.value[0].label + " (" + res.total + ")";
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
  });
  requestData.value.patentState = PATENT_STATE.PASSED_APPROVAL;
  const passedRequestUrl = setObjToUrlParams(baseUrl, requestData.value);
  await request.get({
    url: passedRequestUrl
  }).then(res => {
    console.log(res);
    tabsData.value[1].label = tabsData.value[1].label + " (" + res.total + ")";
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
  });
  requestData.value.patentState = PATENT_STATE.WAIT_APPROVAL;
  await getPatentApprovalTableData(waitApprovalRequestUrl);

};
// 条件查询专利审批信息
const searchPatentApproval = () => {
  let requestUrl = setObjToUrlParams(baseUrl, requestData.value);
  getPatentApprovalTableData(requestUrl);
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
      patentApprovalTable.value.tableData[i].patentPrice += " 万元";
      patentApprovalTable.value.tableData[i].state = chargeTransferState(patentApprovalTable.value.tableData[i]);
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    patentApprovalTable.value.tableLoading = false;
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