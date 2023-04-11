<!--
  * @author baoyuhao
  * @date 2023/4/4 17:13:58
  * @description 公司管理
  * @version 0.1.0
-->
<template>
  <t-card class="company-manage-card">
    <t-row justify="space-between" class="cardTop">
      <div class="cardTitle">
        <t-input class="inputStyle" v-model="companyManageTable.searchText" placeholder="请输入公司名称"
                 clearable></t-input>
        <t-button @click="searchData">
          <template #icon>
            <t-icon name="search"></t-icon>
          </template>
          查询
        </t-button>
      </div>
      <div>
        <t-button theme="primary">
          <template #icon>
            <t-icon name="add"></t-icon>
          </template>
          添加公司
        </t-button>
      </div>
    </t-row>
    <t-table
      class="tableStyle"
      :data="companyManageTable.tableData"
      :columns="COMPANY_MANAGE_TABLE_COLUMNS"
      row-key="id"

      hover
      stripe
      table-layout="auto"
      :table-content-width="tableContentWidth"
      :pagination="companyManageTable.pagination"
      :loading="companyManageTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="companyManageTablePageChange"
      size="small"
      v-resize="resize"
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
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { BASE_URL, COMPANY_MANAGE_TABLE_COLUMNS } from "./constants";


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
const companyManageTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  searchText: "",
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
  let obj = {
    currPage: companyManageTable.value.pagination.current,
    size: companyManageTable.value.pagination.pageSize,
    companyName: companyManageTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.searchCompanyByName, obj);
  getCompanyData(requestUrl);
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
const companyManageTablePageChange = (curr) => {
  console.log("分页变化", curr);
  companyManageTable.value.pagination.current = curr.current;
  companyManageTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: companyManageTable.value.pagination.current,
    size: companyManageTable.value.pagination.pageSize,
    companyName: companyManageTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.searchCompanyByName, obj);
  getCompanyData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getCompanyData = (requestUrl) => {
  companyManageTable.value.tableData = [];
  companyManageTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    companyManageTable.value.tableData = res.records;
    companyManageTable.value.pagination.total = res.total;
    for (let i = 0; i < companyManageTable.value.tableData.length; i++) {
      companyManageTable.value.tableData[i].index = (companyManageTable.value.pagination.current - 1) * companyManageTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    companyManageTable.value.tableLoading = false;
  });
};

// 搜索数据
const searchData = () => {
  companyManageTable.value.pagination.current = 1;
  let obj = {
    currPage: companyManageTable.value.pagination.current,
    size: companyManageTable.value.pagination.pageSize,
    companyName: companyManageTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.searchCompanyByName, obj);
  getCompanyData(requestUrl);
};
</script>

<style lang="less" scoped>
.company-manage-card {
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