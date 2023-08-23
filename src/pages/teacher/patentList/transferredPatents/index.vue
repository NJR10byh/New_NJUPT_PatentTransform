<!--
  * @author baoyuhao
  * @date 2023/4/29 15:21:11
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="transferred-patents-card">
    <t-row justify="start" class="cardTop">
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="patentCompleteTimeRange"
                           :placeholder="['转化完成时间 起', '转化完成时间 止']" clearable @change="dateRangeChange" />
    </t-row>
    <t-table
      class="tableStyle"
      :data="transferredPatentsTable.tableData"
      :columns="TRANSFERRED_PATENTS_TABLE_COLUMNS"
      row-key="index"
      hover
      stripe
      table-layout="auto"
      :expand-icon="false"
      :expand-on-row-click="true"
      :pagination="transferredPatentsTable.pagination"
      :loading="transferredPatentsTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="transferredPatentsTablePageChange"
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
          <t-col class="contract" :span="1">
            <div class="contract-title">
              申请日期
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zlapplyrq }}
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
          <t-col class="contract" :span="1">
            <div class="contract-title">
              价格
            </div>
            <div class="contract-detail">
              <t-tag theme="primary" variant="light">{{ slotProps.row.patentPrice }}</t-tag>
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              归属单位
            </div>
            <div class="contract-detail">
              {{ slotProps.row.gsdw }}
            </div>
          </t-col>
          <t-col class="contract" :span="1">
            <div class="contract-title">
              省
            </div>
            <div class="contract-detail">
              {{ slotProps.row.paProvince }}
            </div>
          </t-col>
          <t-col class="contract" :span="1">
            <div class="contract-title">
              市
            </div>
            <div class="contract-detail">
              {{ slotProps.row.paCity }}
            </div>
          </t-col>
          <t-col class="contract" :span="1">
            <div class="contract-title">
              区
            </div>
            <div class="contract-detail">
              {{ slotProps.row.paDistrict }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              完成时间
            </div>
            <div class="contract-detail">
              {{ slotProps.row.completeTime }}
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
import { computed, onMounted, reactive, ref } from "vue";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { prefix } from "@/config/global";
import { BASE_URL, TRANSFERRED_PATENTS_TABLE_COLUMNS } from "./constants";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { isEmpty, isNotEmpty } from "@/utils/validate";

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
 * 搜索相关
 */
const patentCompleteTimeRange = ref([]); // 转化完成时间
/**
 * 表格相关
 */
const transferredPatentsTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20
  }
});

const currentParams = reactive({
  currPage: 1,
  size: 20,
  completeTimeBegin: "1970-01-01",
  completeTimeEnd: "2999-12-31"
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  let requestUrl = setObjToUrlParams(BASE_URL.getTransferredPatentPage, currentParams);
  getTableData(requestUrl);
});
/**
 * 操作钩子
 */
// 分页钩子
const transferredPatentsTablePageChange = (curr: { current: number; pageSize: number; }) => {
  transferredPatentsTable.value.pagination.current = curr.current;
  transferredPatentsTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: transferredPatentsTable.value.pagination.current,
    size: transferredPatentsTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getTransferredPatentPage, obj);
  getTableData(requestUrl);
};

// 日期选择器钩子
const dateRangeChange = (dateRange: any) => {
  if (isNotEmpty(dateRange)) {
    Object.assign(currentParams, {
      currPage: 1,
      size: 20,
      completeTimeBegin: dateRange[0],
      completeTimeEnd: dateRange[1]
    });
  } else {
    Object.assign(currentParams, {
      currPage: 1,
      size: 20,
      completeTimeBegin: "1970-01-01",
      completeTimeEnd: "2999-12-31"
    });
  }
  let requestUrl = setObjToUrlParams(BASE_URL.getTransferredPatentPage, currentParams);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl: string) => {
  transferredPatentsTable.value.tableData = [];
  transferredPatentsTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    transferredPatentsTable.value.tableData = res.records;
    transferredPatentsTable.value.pagination.total = res.total;
    transferredPatentsTable.value.tableData.map((item, index) => {
      item.index = (transferredPatentsTable.value.pagination.current - 1) * transferredPatentsTable.value.pagination.pageSize + index + 1;
      item.patentPrice = isEmpty(item.patentPrice) ? "" : item.patentPrice + " 万元";
    });
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    transferredPatentsTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.transferred-patents-card {
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