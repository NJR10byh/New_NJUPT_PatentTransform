<!--
  * @author baoyuhao
  * @date 2023/4/4 17:43:07
  * @description 中介管理
  * @version 0.1.0
-->
<template>
  <t-card class="agency-manage-card">
    <t-row justify="space-between" class="cardTop">
      <div class="cardTitle">
        <t-input class="inputStyle" v-model="agencyManageTable.searchText" placeholder="请输入中介名称"
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
          添加中介
        </t-button>
      </div>
    </t-row>
    <t-table
      class="tableStyle"
      :data="agencyManageTable.tableData"
      :columns="AGENCY_MANAGE_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      table-layout="auto"
      :table-content-width="tableContentWidth"
      :pagination="agencyManageTable.pagination"
      :loading="agencyManageTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="agencyManageTablePageChange"
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
import { AGENCY_MANAGE_TABLE_COLUMNS, BASE_URL } from "./constants";


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
const agencyManageTable = ref({
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
  // 获取表格数据
  let obj = {
    currPage: agencyManageTable.value.pagination.current,
    size: agencyManageTable.value.pagination.pageSize,
    agencyName: agencyManageTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.searchAgencyByName, obj);
  getAgencyData(requestUrl);
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
const agencyManageTablePageChange = (curr) => {
  console.log("分页变化", curr);
  agencyManageTable.value.pagination.current = curr.current;
  agencyManageTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: agencyManageTable.value.pagination.current,
    size: agencyManageTable.value.pagination.pageSize,
    agencyName: agencyManageTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.searchAgencyByName, obj);
  getAgencyData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getAgencyData = (requestUrl) => {
  agencyManageTable.value.tableData = [];
  agencyManageTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    agencyManageTable.value.tableData = res.records;
    agencyManageTable.value.pagination.total = res.total;
    for (let i = 0; i < agencyManageTable.value.tableData.length; i++) {
      agencyManageTable.value.tableData[i].index = (agencyManageTable.value.pagination.current - 1) * agencyManageTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    agencyManageTable.value.tableLoading = false;
  });
};

// 搜索数据
const searchData = () => {
  agencyManageTable.value.pagination.current = 1;
  let obj = {
    currPage: agencyManageTable.value.pagination.current,
    size: agencyManageTable.value.pagination.pageSize,
    agencyName: agencyManageTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.searchAgencyByName, obj);
  getAgencyData(requestUrl);
};
</script>

<style lang="less" scoped>
.agency-manage-card {
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