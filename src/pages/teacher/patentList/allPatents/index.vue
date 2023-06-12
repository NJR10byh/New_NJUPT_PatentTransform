<!--
  * @author baoyuhao
  * @date 2023/4/29 15:20:52
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="all-patents-card">
    <t-row justify="space-between" class="cardTop">
      <div class="cardTitle">
        <t-select class="selectStyle" v-model="searchField.value"
                  :options="searchField.options"
                  placeholder="查询字段" clearable @change="searchFieldSelectChange">
        </t-select>
        <t-input class="inputStyle" placeholder="请输入查询内容" v-model="requestData.condition" clearable></t-input>
        <t-button>
          <template #icon>
            <t-icon name="search"></t-icon>
          </template>
          查询
        </t-button>
      </div>
    </t-row>
    <t-table
      class="tableStyle"
      :data="allPatentsTable.tableData"
      :columns="ALL_PATENTS_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      table-layout="auto"
      :pagination="allPatentsTable.pagination"
      :loading="allPatentsTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="allPatentsTablePageChange"
      size="small"
      v-resize="resize"
    >
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
      <template #settings="slotProps">
        <div class="settingBtns">
          <t-button theme="primary" v-if="slotProps.row.zlzsxzdz != '' || slotProps.row.certificateId != null">
            <template #icon>
              <t-icon name="edit"></t-icon>
            </template>
            填写审批
          </t-button>
          <t-button variant="outline" theme="primary" v-if="!slotProps.row.price_filled">
            <template #icon>
              <t-icon name="money-circle"></t-icon>
            </template>
            价格意向
          </t-button>
          <t-button variant="outline" theme="primary"
                    v-if="isEmpty(slotProps.row.zlzsxzdz) && isEmpty(slotProps.row.certificateId)">
            <template #icon>
              <t-icon name="upload"></t-icon>
            </template>
            上传专利证书
          </t-button>
          <t-button variant="outline" theme="primary"
                    v-if="isNotEmpty(slotProps.row.zlzsxzdz) || isNotEmpty(slotProps.row.certificateId)">
            <template #icon>
              <t-icon name="download"></t-icon>
            </template>
            下载专利证书
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
import { ALL_PATENTS_TABLE_COLUMNS, BASE_URL } from "./constants";
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

// tableContentWidth
const tableContentWidth = ref("1300px");

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
const allPatentsTable = ref({
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

// 请求体
const requestData = ref({
  contractType: 1,
  currPage: allPatentsTable.value.pagination.current,
  size: allPatentsTable.value.pagination.pageSize,
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
  let obj = {
    currPage: allPatentsTable.value.pagination.current,
    size: allPatentsTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getMyPatentPage, obj);
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
const allPatentsTablePageChange = (curr) => {
  console.log("分页变化", curr);
  allPatentsTable.value.pagination.current = curr.current;
  allPatentsTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: allPatentsTable.value.pagination.current,
    size: allPatentsTable.value.pagination.pageSize,
    companyName: allPatentsTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getPatentPageByZLMC, obj);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  allPatentsTable.value.tableData = [];
  allPatentsTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    allPatentsTable.value.tableData = res.records;
    allPatentsTable.value.pagination.total = res.total;
    for (let i = 0; i < allPatentsTable.value.tableData.length; i++) {
      allPatentsTable.value.tableData[i].index = (allPatentsTable.value.pagination.current - 1) * allPatentsTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    allPatentsTable.value.tableLoading = false;
  });
};

// 搜索数据
const searchData = () => {
  allPatentsTable.value.pagination.current = 1;
  let obj = {
    currPage: allPatentsTable.value.pagination.current,
    size: allPatentsTable.value.pagination.pageSize,
    companyName: allPatentsTable.value.searchText
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getPatentPageByZLMC, obj);
  getTableData(requestUrl);
};
</script>

<style lang="less" scoped>
.all-patents-card {
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

      .selectStyle {
        width: 130px;
        margin-right: 10px;
      }

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