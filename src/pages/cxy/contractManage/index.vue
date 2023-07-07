<!--
  * @author baoyuhao
  * @date 2023/4/2 23:24:01
  * @description 合同管理
  * @version 0.1.0
-->
<template>
  <t-card>
    <t-tabs :default-value="tabsData[0].value" placement="left" @change="tabChange">
      <!-- 进行中 -->
      <t-tab-panel class="tabPanel" :value="tabsData[0].value" :label="tabsData[0].label">
        <t-row justify="end" class="cardTop">
          <t-button theme="primary" :href="BASE_URL.PUBLICITY_PAGE" target="_blank">
            <template #icon>
              <t-icon name="link"></t-icon>
            </template>
            公示页
          </t-button>
          <t-button theme="warning">
            <template #icon>
              <t-icon name="edit-1"></t-icon>
            </template>
            草稿箱
          </t-button>
          <t-button theme="danger">
            <template #icon>
              <t-icon name="delete"></t-icon>
            </template>
            垃圾箱
          </t-button>
        </t-row>
        <t-table
          class="tableStyle"
          :data="contractManageTable.tableData"
          :columns="CONTRACT_MANAGE_TABLE_COLUMNS"
          row-key="id"
          hover
          stripe
          table-layout="auto"
          :table-content-width="tableContentWidth"
          :pagination="contractManageTable.pagination"
          :loading="contractManageTable.tableLoading"
          :header-affixed-top="{ offsetTop, container: getContainer }"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="contractManageTablePageChange"
          size="small"
          v-resize="resize"
        >
          <template #projectName="slotProps">
            <t-link theme="primary" target="_blank">
              {{ slotProps.row.projectName }}
            </t-link>
          </template>
          <template #projectCode="slotProps">
            <div style="display: flex;align-items: center;">
              {{ slotProps.row.projectCode }}
              <t-link theme="warning" style="margin-left: 3px">
                <t-icon name="edit"></t-icon>
              </t-link>
            </div>
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
          <template #isContractSent="slotProps">
            <t-tag v-if="slotProps.row.isContractSent" theme="success" variant="light">是</t-tag>
            <t-tag v-else theme="danger" variant="light">否</t-tag>
          </template>
          <template #settings="slotProps">
            <div class="settingBtns">
              <t-button theme="default" variant="outline">
                <template #icon>
                  <t-icon name="chat"></t-icon>
                </template>
                备注
              </t-button>

              <t-button theme="warning">
                <template #icon>
                  <t-icon name="edit"></t-icon>
                </template>
                修改
              </t-button>


              <t-button v-if="!slotProps.row.isPublicNotice" theme="primary">
                <template #icon>
                  <t-icon name="internet"></t-icon>
                </template>
                合同公示
              </t-button>

              <t-button v-if="slotProps.row.isPublicNotice && !slotProps.row.isContractSent" theme="success"
                        variant="outline">
                <template #icon>
                  <t-icon name="mail"></t-icon>
                </template>
                合同寄出
              </t-button>

              <t-button v-if="slotProps.row.hasCashReward && !slotProps.row.isCashRewardPublicNotice" theme="primary"
                        variant="outline">
                <template #icon>
                  <t-icon name="internet"></t-icon>
                </template>
                现金奖励公示
              </t-button>

              <t-button v-if="slotProps.row.isCashRewardPublicNotice && !slotProps.row.isWithdrawal" theme="success">
                <template #icon>
                  <t-icon name="creditcard"></t-icon>
                </template>
                已提现
              </t-button>

              <t-button v-if="['等待流程结束'].includes(slotProps.row.state)" theme="success">
                <template #icon>
                  <t-icon name="check-circle"></t-icon>
                </template>
                确认流程结束
              </t-button>

              <t-button theme="primary" @click="To_FilesManage(slotProps.row)">
                <template #icon>
                  <t-icon name="folder-open"></t-icon>
                </template>
                转化文件管理
              </t-button>

            </div>
          </template>
        </t-table>
      </t-tab-panel>
      <!-- 已转化 -->
      <t-tab-panel class="tabPanel" :value="tabsData[1].value" :label="tabsData[1].label">
        <t-row justify="end" class="cardTop">
          <t-button>
            <template #icon>
              <t-icon name="link"></t-icon>
            </template>
            公示页
          </t-button>
          <t-button theme="warning">
            <template #icon>
              <t-icon name="edit-1"></t-icon>
            </template>
            草稿箱
          </t-button>
          <t-button theme="danger">
            <template #icon>
              <t-icon name="delete"></t-icon>
            </template>
            垃圾箱
          </t-button>
        </t-row>
        <t-table
          class="tableStyle"
          :data="contractManageTable.tableData"
          :columns="CONTRACT_MANAGE_TABLE_COLUMNS"
          row-key="id"
          hover
          stripe
          table-layout="auto"
          :table-content-width="tableContentWidth"
          :pagination="contractManageTable.pagination"
          :loading="contractManageTable.tableLoading"
          :header-affixed-top="{ offsetTop, container: getContainer }"
          :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
          :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
          @page-change="passedTablePageChange"
          size="small"
          v-resize="resize"
        >
          <template #projectName="slotProps">
            <t-link theme="primary" target="_blank">
              {{ slotProps.row.projectName }}
            </t-link>
          </template>
          <template #projectCode="slotProps">
            <div style="display: flex;align-items: center;">
              {{ slotProps.row.projectCode }}
              <t-link theme="warning" style="margin-left: 3px">
                <t-icon name="edit"></t-icon>
              </t-link>
            </div>
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
          <template #isContractSent="slotProps">
            <t-tag v-if="slotProps.row.isContractSent" theme="success" variant="light">是</t-tag>
            <t-tag v-else theme="danger" variant="light">否</t-tag>
          </template>
          <template #settings="slotProps">
            <div class="settingBtns">
              <t-button theme="default" variant="outline">
                <template #icon>
                  <t-icon name="chat"></t-icon>
                </template>
                备注
              </t-button>

              <t-button v-if="slotProps.row.isCashRewardPublicNotice && !slotProps.row.isWithdrawal" theme="success">
                <template #icon>
                  <t-icon name="creditcard"></t-icon>
                </template>
                已提现
              </t-button>

              <t-button theme="primary" @click="To_FilesManage(slotProps.row)">
                <template #icon>
                  <t-icon name="folder-open"></t-icon>
                </template>
                转化文件管理
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
import { BASE_URL, CONTRACT_MANAGE_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { chargeContractState } from "@/utils/contractState";
import { fileInfoToCache } from "@/utils/files";
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
// tableContentWidth
const tableContentWidth = ref("1600px");

/**
 * Tab相关
 */
const tabsData = ref([
  {
    value: 1,
    label: "进行中"
  },
  {
    value: 2,
    label: "已转化"
  }
]);
/**
 * 表格相关
 */
const contractManageTable = ref({
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
  // 获取进行中数据
  getTableData(BASE_URL.getTransferringContractPage);
});

/**
 * 操作钩子
 */
// 监听容器宽高变化
const resize = (resizeValue) => {
  if (resizeValue[0].contentRect.width > 1300) {
    tableContentWidth.value = resizeValue[0].contentRect.width + "px";
  } else {
    tableContentWidth.value = "1300px";
  }
};
// 分页钩子
const contractManageTablePageChange = (curr) => {
  console.log("分页变化", curr);
  contractManageTable.value.pagination.current = curr.current;
  contractManageTable.value.pagination.pageSize = curr.pageSize;
  getTableData(BASE_URL.getTransferringContractPage);
};
const passedTablePageChange = (curr) => {
  console.log("分页变化", curr);
  contractManageTable.value.pagination.current = curr.current;
  contractManageTable.value.pagination.pageSize = curr.pageSize;
  getTableData(BASE_URL.getTransferredContractPage);
};
// Tab页切换钩子
const tabChange = async (value) => {
  contractManageTable.value.pagination.current = 1;
  switch (value) {
    case 1:
      await getTableData(BASE_URL.getTransferringContractPage);
      break;
    case 2:
      await getTableData(BASE_URL.getTransferredContractPage);
      break;
    default:
      await getTableData(BASE_URL.getTransferringContractPage);
      break;
  }
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  contractManageTable.value.tableData = [];
  contractManageTable.value.tableLoading = true;
  let obj = {
    currPage: contractManageTable.value.pagination.current,
    size: contractManageTable.value.pagination.pageSize
  };
  requestUrl = setObjToUrlParams(requestUrl, obj);
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    contractManageTable.value.tableData = res.records;
    contractManageTable.value.pagination.total = res.total;
    for (let i = 0; i < contractManageTable.value.tableData.length; i++) {
      contractManageTable.value.tableData[i].index = (contractManageTable.value.pagination.current - 1) * contractManageTable.value.pagination.pageSize + i + 1;
      contractManageTable.value.tableData[i].state = chargeContractState(contractManageTable.value.tableData[i]);
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    contractManageTable.value.tableLoading = false;
  });
};

const To_FilesManage = (row) => {
  console.log(row);
  let obj = {
    contractInfoId: row.contractInfoId
  };
  request.get({
    url: setObjToUrlParams(BASE_URL.getFileListByContractInfoId, obj)
  }).then(async res => {
    await fileInfoToCache(res);
    await router.push("/filesManage/home");
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