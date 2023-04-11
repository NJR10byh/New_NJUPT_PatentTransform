<!--
  * @author baoyuhao
  * @date 2023/4/4 17:50:17
  * @description 年费到期
  * @version 0.1.0
-->
<template>
  <t-card class="annual-fee-expiration-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">
        <t-input class="inputStyle" v-model="annualFeeExpirationTable.searchText" placeholder="请输入专利名称"
                 clearable></t-input>
        <t-button @click="searchData">
          <template #icon>
            <t-icon name="search"></t-icon>
          </template>
          查询
        </t-button>
      </div>
    </t-row>
    <t-table
      class="tableStyle"
      :data="annualFeeExpirationTable.tableData"
      :columns="ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS"
      row-key="id"

      hover
      stripe
      table-layout="auto"
      :table-content-width="tableContentWidth"
      :pagination="annualFeeExpirationTable.pagination"
      :loading="annualFeeExpirationTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="annualFeeExpirationTablePageChange"
      size="small"
      v-resize="resize"
    >
      <template #settings="slotProps">
        <div class="settingBtns">
          <t-button theme="warning">
            <template #icon>
              <t-icon name="mobile"></t-icon>
            </template>
            发送提醒短信
          </t-button>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS, BASE_URL } from "./constants";


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

// tableContentWidth
const tableContentWidth = ref("1300px");

/**
 * 表格相关
 */
const annualFeeExpirationTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  searchText: "",// 专利名称
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
  // 获取表格数据
  let obj = {
    currPage: annualFeeExpirationTable.value.pagination.current,
    size: annualFeeExpirationTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getRequireAnnualFeePatentPage, obj);
  getTableData(requestUrl);
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
const annualFeeExpirationTablePageChange = (curr) => {
  console.log("分页变化", curr);
  annualFeeExpirationTable.value.pagination.current = curr.current;
  annualFeeExpirationTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: annualFeeExpirationTable.value.pagination.current,
    size: annualFeeExpirationTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getRequireAnnualFeePatentPage, obj);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  annualFeeExpirationTable.value.tableData = [];
  annualFeeExpirationTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    annualFeeExpirationTable.value.tableData = res.records;
    annualFeeExpirationTable.value.pagination.total = res.total;
    for (let i = 0; i < annualFeeExpirationTable.value.tableData.length; i++) {
      annualFeeExpirationTable.value.tableData[i].index = (annualFeeExpirationTable.value.pagination.current - 1) * annualFeeExpirationTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    annualFeeExpirationTable.value.tableLoading = false;
  });
};

// 搜索数据
const searchData = () => {
  let obj = {
    currPage: annualFeeExpirationTable.value.pagination.current,
    size: annualFeeExpirationTable.value.pagination.pageSize,
    zlmc: annualFeeExpirationTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getRequireAnnualFeePatentPageByZLMC, obj);
  getTableData(requestUrl);
};
</script>

<style lang="less" scoped>
.annual-fee-expiration-card {
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      display: flex;
      align-items: center;

      .inputStyle {
        width: 240px;
        margin-right: 10px;
      }
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