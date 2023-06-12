<!--
  * @author baoyuhao
  * @date 2023/6/6 9:55:21
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="initiated-card">
    <t-row justify="space-between" class="cardTop">
      <div>
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
  </t-card>
  <t-card class="initiated-card">
    <t-table
      class="tableStyle"
      :data="initiatedTable.tableData"
      :columns="INITIATED_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      table-layout="auto"
      table-content-width="1600px"
      :pagination="initiatedTable.pagination"
      :loading="initiatedTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="initiatedTablePageChange"
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
          <t-button theme="primary"
                    v-if="!['未转化','产学研未通过','审批表已撤回','第一作者未通过'].includes(slotProps.row.state)">
            <template #icon>
              <t-icon name="file"></t-icon>
            </template>
            查看审批表
          </t-button>
          <t-button variant="outline" theme="warning" v-if="['等待第一作者确认'].includes(slotProps.row.state)">
            <template #icon>
              <t-icon name="rollback"></t-icon>
            </template>
            撤回
          </t-button>
          <t-button theme="warning"
                    v-if="['产学研未通过', '审批表已撤回', '第一作者未通过'].includes(slotProps.row.state)">
            <template #icon>
              <t-icon name="edit"></t-icon>
            </template>
            修改
          </t-button>
          <t-button variant="outline" theme="primary" v-if="['第一作者未通过'].includes(slotProps.row.state)">
            <template #icon>
              <t-icon name="tips"></t-icon>
            </template>
            查看原因
          </t-button>
          <t-button theme="danger"
                    v-if="['产学研未通过', '第一作者未通过', '审批表已撤回'].includes(slotProps.row.state)">
            <template #icon>
              <t-icon name="delete"></t-icon>
            </template>
            删除
          </t-button>

          <t-button
            variant="outline"
            theme="primary"
            v-if="['等待上传到款凭证'].includes(slotProps.row.state)"
          >
            <template #icon>
              <t-icon name="upload"></t-icon>
            </template>
            上传到款凭证
          </t-button>

          <!-- 转化文件管理 -->
          <t-button
            variant="outline"
            theme="primary"
            v-if="slotProps.row.sendTeacher"
          >
            <template #icon>
              <t-icon name="folder-open"></t-icon>
            </template>
            转化文件管理
          </t-button>
        </div>
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
import { MessagePlugin } from "tdesign-vue-next";
import { setObjToUrlParams } from "@/utils/request/utils";
import { chargeTransferState } from "@/utils/transferState";
import router from "@/router";
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
  let requestUrl = setObjToUrlParams(BASE_URL.getApplicationPage, filterCondition.value);
  getTableData(requestUrl);
});
/**
 * 操作钩子
 */
const typeChange = () => {
  initiatedTable.value.pagination.current = 1;
  filterCondition.value.currPage = initiatedTable.value.pagination.current;
  let requestUrl = setObjToUrlParams(BASE_URL.getApplicationPage, filterCondition.value);
  getTableData(requestUrl);
};
const isZLDYZZChange = () => {
  initiatedTable.value.pagination.current = 1;
  filterCondition.value.currPage = initiatedTable.value.pagination.current;
  let requestUrl = setObjToUrlParams(BASE_URL.getApplicationPage, filterCondition.value);
  getTableData(requestUrl);
};
const initiatedTablePageChange = (curr) => {
  console.log("分页变化", curr);
  initiatedTable.value.pagination.current = curr.current;
  initiatedTable.value.pagination.pageSize = curr.pageSize;
  filterCondition.value.currPage = initiatedTable.value.pagination.current;
  filterCondition.value.size = initiatedTable.value.pagination.pageSize;
  let requestUrl = setObjToUrlParams(BASE_URL.getApplicationPage, filterCondition.value);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
const getTableData = (requestUrl) => {
  initiatedTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    initiatedTable.value.pagination.total = res.total;
    initiatedTable.value.tableData = res.records;
    for (let i = 0; i < initiatedTable.value.tableData.length; i++) {
      initiatedTable.value.tableData[i].index = (initiatedTable.value.pagination.current - 1) * initiatedTable.value.pagination.pageSize + i + 1;
      if (isNotEmpty(initiatedTable.value.tableData[i].patentPrice)) {
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
  }

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
}
</style>