<!--
  * @author baoyuhao
  * @date 2023/4/5 22:46:45
  * @description 数据中心
  * @version 0.1.0
-->
<template>
  <t-card class="data-center-card">
    <t-row justify="start" class="cardTop">
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="tableType" @change="tableTypeChange">
        <t-radio-button value="1">专利列表</t-radio-button>
        <t-radio-button value="2">合同列表</t-radio-button>
      </t-radio-group>
      <!-- 专利列表 -->
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="patentSearch.searchCondition.contractType"
                     v-if="tableType=='1'" @change="patentTableRadioChange">
        <t-radio-button :value="0">全部</t-radio-button>
        <t-radio-button :value="1">普通实施许可</t-radio-button>
        <t-radio-button :value="2">排他许可</t-radio-button>
        <t-radio-button :value="3">独占许可</t-radio-button>
        <t-radio-button :value="5">开放许可</t-radio-button>
        <t-radio-button :value="4">转让</t-radio-button>
      </t-radio-group>
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="patentSearch.searchCondition.authorized"
                     v-if="tableType=='1'" @change="patentTableRadioChange">
        <t-radio-button value="">全部</t-radio-button>
        <t-radio-button :value="true">已授权</t-radio-button>
        <t-radio-button :value="false">未授权</t-radio-button>
      </t-radio-group>
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="patentSearch.searchCondition.patentState"
                     v-if="tableType=='1'" @change="patentTableRadioChange">
        <t-radio-button :value="0">全部</t-radio-button>
        <t-radio-button :value="1">已通过</t-radio-button>
        <t-radio-button :value="2">正在转化</t-radio-button>
        <t-radio-button :value="3">已转化</t-radio-button>
      </t-radio-group>
      <!-- 合同列表 -->
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="contractSearch.searchCondition.contractType"
                     v-if="tableType=='2'" @change="contractTableRadioChange">
        <t-radio-button :value="0">全部</t-radio-button>
        <t-radio-button :value="1">普通实施许可</t-radio-button>
        <t-radio-button :value="2">排他许可</t-radio-button>
        <t-radio-button :value="3">独占许可</t-radio-button>
        <t-radio-button :value="5">开放许可</t-radio-button>
        <t-radio-button :value="4">转让</t-radio-button>
      </t-radio-group>
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="contractSearch.searchCondition.contractState"
                     v-if="tableType=='2'" @change="contractTableRadioChange">
        <t-radio-button :value="0">全部</t-radio-button>
        <t-radio-button :value="1">正在转化</t-radio-button>
        <t-radio-button :value="2">已转化</t-radio-button>
      </t-radio-group>
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="contractSearch.searchCondition.hasAgency"
                     v-if="tableType=='2'" @change="contractTableRadioChange">
        <t-radio-button value="">全部</t-radio-button>
        <t-radio-button :value="true">有中介</t-radio-button>
        <t-radio-button :value="false">无中介</t-radio-button>
      </t-radio-group>
      <t-radio-group class="radioGroup" variant="primary-filled" v-model="contractSearch.searchCondition.hasAssociation"
                     v-if="tableType=='2'" @change="contractTableRadioChange">
        <t-radio-button value="">全部</t-radio-button>
        <t-radio-button :value="true">有关联关系</t-radio-button>
        <t-radio-button :value="false">无关联关系</t-radio-button>
      </t-radio-group>
    </t-row>
  </t-card>
  <t-card class="data-center-card">
    <!-- 专利列表搜索相关 -->
    <t-row justify="start" class="cardTop searchConditionStyle" v-if="tableType=='1'">
      <t-input class="inputStyle" v-for="item in PATENT_SEARCH_CONDITION" :key="item.name"
               v-model="patentSearch.searchCondition[item.name]" :placeholder="item.placeholder" clearable />
      <t-range-input class="inputStyle rangeInputStyle" v-model="patentPriceRange"
                     :placeholder="['价格（万元）起', '价格（万元）止']"
                     clearable />
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="patentTimeRange"
                           :placeholder="['专利申请时间 起', '专利申请时间 止']" clearable />
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="patentSQRQRange"
                           :placeholder="['专利授权时间 起', '专利授权时间 止']" clearable />
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="patentCompleteTimeRange"
                           :placeholder="['转化完成时间 起', '转化完成时间 止']"
                           clearable />
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="patentContractTimeRange"
                           :placeholder="['合同签订时间 起', '合同签订时间 止']"
                           clearable />
      <t-cascader class="inputStyle cascaderStyle" :options="chinaAreaOptions" placeholder="行政区划" clearable />
    </t-row>
    <!-- 合同列表搜索相关 -->
    <t-row justify="start" class="cardTop" v-if="tableType=='2'">
      <t-input class="inputStyle" v-for="item in CONTRACT_SEARCH_CONDITION" :key="item.name"
               v-model="contractSearch.searchCondition[item.name]" :placeholder="item.placeholder" clearable>
      </t-input>
      <t-range-input class="inputStyle rangeInputStyle" v-model="contractCodeRange"
                     :placeholder="['合同编号 起', '合同编号 止']" clearable />
      <t-range-input class="inputStyle rangeInputStyle" v-model="contractAmountRange"
                     :placeholder="['价格（万元）起', '价格（万元）止']" clearable />
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="contractCompleteTimeRange"
                           :placeholder="['转化完成时间 起', '转化完成时间 止']" clearable />
      <t-date-range-picker class="inputStyle rangeInputStyle" v-model="contractTimeRange"
                           :placeholder="['合同签订时间 起', '合同签订时间 止']" clearable />
      <t-cascader class="inputStyle cascaderStyle" :options="chinaAreaOptions" placeholder="行政区划" clearable />
    </t-row>
  </t-card>
  <t-card class="data-center-card">
    <t-row justify="end" class="cardTop">
      <t-button @click="searchData">
        <template #icon>
          <t-icon name="search"></t-icon>
        </template>
        查询
      </t-button>
      <t-button theme="success">
        <template #icon>
          <t-icon name="file-excel"></t-icon>
        </template>
        导出Excel
      </t-button>
    </t-row>

    <!-- 专利列表 -->
    <t-table
      v-if="tableType=='1'"
      :data="dataCenterPatentTable.tableData"
      :columns="PATENT_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :pagination="dataCenterPatentTable.pagination"
      :loading="dataCenterPatentTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="dataCenterPatentTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
    </t-table>

    <!-- 合同列表 -->
    <t-table
      v-if="tableType=='2'"
      :data="dataCenterContractTable.tableData"
      :columns="CONTRACT_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :pagination="dataCenterContractTable.pagination"
      :loading="dataCenterContractTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="dataCenterContractTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #projectCode="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.projectCode }}
        </t-tag>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { regionData } from "element-china-area-data";
import {
  BASE_URL,
  CONTRACT_SEARCH_CONDITION,
  CONTRACT_TABLE_COLUMNS,
  PATENT_SEARCH_CONDITION,
  PATENT_TABLE_COLUMNS
} from "@/pages/cxy/dataCenter/constants";
import { useSettingStore } from "@/store";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { isEmpty } from "@/utils/validate";

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
const tableType = ref("1");

/**
 * 搜索相关
 */
// 行政区采集
const chinaAreaOptions = ref(regionData);

/* 专利列表搜索 */
const patentPriceRange = ref([]); // 价格区间
const patentTimeRange = ref([]); // 专利申请时间
const patentSQRQRange = ref([]); // 专利授权时间
const patentCompleteTimeRange = ref([]); // 转化完成时间
const patentContractTimeRange = ref([]); // 合同签订时间

let patentSearch = {
  currPage: 1, // 当前页
  size: 20, // 每页数据大小
  searchCondition: {
    authorized: "", // 是否授权
    patentState: 0, // 专利状态：0全部 1已通过 2正在转化 3已转化
    contractType: 0, // 合同类型：0全部 1普通实施许可 2排他许可 3独占许可 4转让 5开放许可

    zlh: "", // 专利号
    zlmc: "", // 专利名称
    cymd: "", // 专利发明人
    cygh: "", // 专利发明人工号
    zldyzzxm: "", // 专利第一作者
    zldyzzgh: "", // 专利第一作者工号
    gsdw: "", // 归属单位

    fzyName: "", // 负责人姓名
    fzyGh: "", // 负责人工号
    fzyPhone: "", // 负责人电话
    fzyDepartment: "", // 负责人单位
    paProvince: "", // 省
    paCity: "", // 市
    paDistrict: "", // 区

    patentPriceBegin: "", // 价格区间 起
    patentPriceEnd: "", // 价格区间 止
    completeTimeBegin: "", // 转化完成时间 起
    completeTimeEnd: "", // 转化完成时间 止
    timeBegin: "", // 专利申请时间 起
    timeEnd: "", // 专利申请时间 止
    zlsqrqBegin: "", // 专利授权时间 起
    zlsqrqEnd: "", // 专利授权时间 止
    contractTimeBegin: "", // 合同签订时间 起
    contractTimeEnd: "" // 合同签订时间 止
  }
};

/* 合同列表搜索 */
const contractCodeRange = ref([]); // 合同编号
const contractAmountRange = ref([]); // 价格区间
const contractCompleteTimeRange = ref([]); // 转化完成时间
const contractTimeRange = ref([]); // 合同签订日期

let contractSearch = {
  currPage: 1, // 当前页
  size: 20, // 每页数据大小
  searchCondition: {
    contractState: 0, // 合同状态：0全部 1正在转化 2已转化
    contractType: 0, // 合同类型：0全部 1普通实施许可 2排他许可 3独占许可 4转让 5开放许可
    hasAgency: "", // 是否有中介(null=全部,true=有,false=无)
    hasAssociation: "", // 是否有关联关系(null=全部,true=有,false=无)

    paName: "", // 受让方名称
    pbContactPerson: "", // 乙方联系人
    pcName: "", // 中介名称
    projectName: "", // 合同名称
    gsdw: "", // 学院
    paProvince: "", // 省
    paCity: "", // 市
    paDistrict: "", // 区

    codeBegin: "", // 合同编号 起
    codeEnd: "", // 合同编号 止
    amountBegin: "", // 价格区间 起
    amountEnd: "", // 价格区间 止
    completeTimeBegin: "", // 转化完成时间 起
    completeTimeEnd: "", // 转化完成时间 止
    timeBegin: "", // 合同签订日期 起
    timeEnd: "" // 合同签订日期 止
  }
};

/**
 * 表格相关
 */
const dataCenterPatentTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20
  }
});
const dataCenterContractTable = ref({
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
  getPatentTableData(BASE_URL.getPatentByCondition);
});

/* 工具类 */
// 初始化分页
const initPagination = () => {
  switch (tableType.value) {
    case "1":
      patentSearch.currPage = 1;
      dataCenterPatentTable.value.tableData = [];
      dataCenterPatentTable.value.pagination.current = 1;
      break;
    case "2":
      contractSearch.currPage = 1;
      dataCenterContractTable.value.tableData = [];
      dataCenterContractTable.value.pagination.current = 1;
      break;
  }
};
const initPatentSearch = () => {
  patentSearch = {
    currPage: 1, // 当前页
    size: 20, // 每页数据大小
    searchCondition: {
      authorized: "", // 是否授权
      patentState: 0, // 专利状态：0全部 1已通过 2正在转化 3已转化
      contractType: 0, // 合同类型：0全部 1普通实施许可 2排他许可 3独占许可 4转让 5开放许可

      zlh: "", // 专利号
      zlmc: "", // 专利名称
      cymd: "", // 专利发明人
      cygh: "", // 专利发明人工号
      zldyzzxm: "", // 专利第一作者
      zldyzzgh: "", // 专利第一作者工号
      gsdw: "", // 归属单位

      fzyName: "", // 负责人姓名
      fzyGh: "", // 负责人工号
      fzyPhone: "", // 负责人电话
      fzyDepartment: "", // 负责人单位
      paProvince: "", // 省
      paCity: "", // 市
      paDistrict: "", // 区

      patentPriceBegin: "", // 价格区间 起
      patentPriceEnd: "", // 价格区间 止
      completeTimeBegin: "", // 转化完成时间 起
      completeTimeEnd: "", // 转化完成时间 止
      timeBegin: "", // 专利申请时间 起
      timeEnd: "", // 专利申请时间 止
      zlsqrqBegin: "", // 专利授权时间 起
      zlsqrqEnd: "", // 专利授权时间 止
      contractTimeBegin: "", // 合同签订时间 起
      contractTimeEnd: "" // 合同签订时间 止
    }
  };
};
const initContractSearch = () => {
  contractSearch = {
    currPage: 1, // 当前页
    size: 20, // 每页数据大小
    searchCondition: {
      contractState: 0, // 合同状态：0全部 1正在转化 2已转化
      contractType: 0, // 合同类型：0全部 1普通实施许可 2排他许可 3独占许可 4转让 5开放许可
      hasAgency: "", // 是否有中介(null=全部,true=有,false=无)
      hasAssociation: "", // 是否有关联关系(null=全部,true=有,false=无)

      paName: "", // 受让方名称
      pbContactPerson: "", // 乙方联系人
      pcName: "", // 中介名称
      projectName: "", // 合同名称
      gsdw: "", // 学院
      paProvince: "", // 省
      paCity: "", // 市
      paDistrict: "", // 区

      codeBegin: "", // 合同编号 起
      codeEnd: "", // 合同编号 止
      amountBegin: "", // 价格区间 起
      amountEnd: "", // 价格区间 止
      completeTimeBegin: "", // 转化完成时间 起
      completeTimeEnd: "", // 转化完成时间 止
      timeBegin: "", // 合同签订日期 起
      timeEnd: "" // 合同签订日期 止
    }
  };
};
/**
 * 操作钩子
 */
// 表格类型切换
const tableTypeChange = (val) => {
  console.log(val);
  initPagination();
  switch (val) {
    case "1":
      getPatentTableData(BASE_URL.getPatentByCondition);
      break;
    case "2":
      getContractTableData(BASE_URL.getContractByCondition);
      break;
  }
};
const patentTableRadioChange = () => {
  initPagination();
  getPatentTableData(BASE_URL.getPatentByCondition);
};
const contractTableRadioChange = () => {
  initPagination();
  getContractTableData(BASE_URL.getContractByCondition);
};

// 分页钩子
const dataCenterPatentTablePageChange = (curr) => {
  console.log("分页变化", curr);
  dataCenterPatentTable.value.pagination.current = curr.current;
  dataCenterPatentTable.value.pagination.pageSize = curr.pageSize;
  patentSearch.currPage = curr.current;
  patentSearch.size = curr.pageSize;
  getPatentTableData(BASE_URL.getPatentByCondition);
};
const dataCenterContractTablePageChange = (curr) => {
  console.log("分页变化", curr);
  dataCenterContractTable.value.pagination.current = curr.current;
  dataCenterContractTable.value.pagination.pageSize = curr.pageSize;
  contractSearch.currPage = curr.current;
  contractSearch.size = curr.pageSize;
  getContractTableData(BASE_URL.getContractByCondition);
};

/**
 * 业务相关
 */
const getPatentTableData = (requestUrl) => {
  dataCenterPatentTable.value.tableLoading = true;
  request.post({
    url: requestUrl,
    data: patentSearch
  }).then(res => {
    console.log(res);
    dataCenterPatentTable.value.pagination.total = res.total;
    dataCenterPatentTable.value.tableData = res.records;
    for (let i = 0; i < dataCenterPatentTable.value.tableData.length; i++) {
      dataCenterPatentTable.value.tableData[i].index = (dataCenterPatentTable.value.pagination.current - 1) * dataCenterPatentTable.value.pagination.pageSize + i + 1;
      if (!isEmpty(dataCenterPatentTable.value.tableData[i].patentPrice)) {
        dataCenterPatentTable.value.tableData[i].patentPrice += " 万元";
      }
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    dataCenterPatentTable.value.tableLoading = false;
  });
};
const getContractTableData = (requestUrl) => {
  dataCenterContractTable.value.tableLoading = true;
  request.post({
    url: requestUrl,
    data: contractSearch
  }).then(res => {
    console.log(res);
    dataCenterContractTable.value.pagination.total = res.total;
    dataCenterContractTable.value.tableData = res.records;
    for (let i = 0; i < dataCenterContractTable.value.tableData.length; i++) {
      console.log(dataCenterContractTable.value.tableData[i].contractSigningDate);
      dataCenterContractTable.value.tableData[i].index = (dataCenterContractTable.value.pagination.current - 1) * dataCenterContractTable.value.pagination.pageSize + i + 1;
      if (!isEmpty(dataCenterContractTable.value.tableData[i].totalTransferAmount)) {
        dataCenterContractTable.value.tableData[i].totalTransferAmount += " 万元";
      }
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    dataCenterContractTable.value.tableLoading = false;
  });
};

const searchData = () => {
  initPagination();
  console.log(patentPriceRange.value);
  console.log(patentTimeRange.value);
  switch (tableType.value) {
    case "1":
      initPatentSearch();
      if (patentPriceRange.value.length != 0 && !isEmpty(patentPriceRange.value[0]) && !isEmpty(patentPriceRange.value[1])) {
        patentSearch.searchCondition.patentPriceBegin = patentPriceRange.value[0];
        patentSearch.searchCondition.patentPriceEnd = patentPriceRange.value[1];
      }
      if (patentTimeRange.value.length != 0) {
        patentSearch.searchCondition.timeBegin = patentTimeRange.value[0];
        patentSearch.searchCondition.timeEnd = patentTimeRange.value[1];
      }
      if (patentSQRQRange.value.length != 0) {
        patentSearch.searchCondition.zlsqrqBegin = patentSQRQRange.value[0];
        patentSearch.searchCondition.zlsqrqEnd = patentSQRQRange.value[1];
      }
      if (patentCompleteTimeRange.value.length != 0) {
        patentSearch.searchCondition.completeTimeBegin = patentCompleteTimeRange.value[0];
        patentSearch.searchCondition.completeTimeEnd = patentCompleteTimeRange.value[1];
      }
      if (patentContractTimeRange.value.length != 0) {
        patentSearch.searchCondition.contractTimeBegin = patentContractTimeRange.value[0];
        patentSearch.searchCondition.contractTimeEnd = patentContractTimeRange.value[1];
      }
      getPatentTableData(BASE_URL.getPatentByCondition);
      break;
    case "2":
      initContractSearch();
      if (contractCodeRange.value.length != 0 && !isEmpty(contractCodeRange.value[0]) && !isEmpty(contractCodeRange.value[1])) {
        contractSearch.searchCondition.codeBegin = contractCodeRange.value[0];
        contractSearch.searchCondition.codeEnd = contractCodeRange.value[1];
      }
      if (contractAmountRange.value.length != 0 && !isEmpty(contractAmountRange.value[0]) && !isEmpty(contractAmountRange.value[1])) {
        contractSearch.searchCondition.amountBegin = contractAmountRange.value[0];
        contractSearch.searchCondition.amountEnd = contractAmountRange.value[1];
      }
      if (contractCompleteTimeRange.value.length != 0) {
        contractSearch.searchCondition.completeTimeBegin = contractCompleteTimeRange.value[0];
        contractSearch.searchCondition.completeTimeEnd = contractCompleteTimeRange.value[1];
      }
      if (contractTimeRange.value.length != 0) {
        contractSearch.searchCondition.timeBegin = contractTimeRange.value[0];
        contractSearch.searchCondition.timeEnd = contractTimeRange.value[1];
      }
      getContractTableData(BASE_URL.getContractByCondition);
      break;
  }
};
</script>

<style lang="less" scoped>
.data-center-card {
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

    .inputStyle {
      width: 200px;
      margin: 5px;
    }

    .rangeInputStyle {
      width: 410px;
    }

    .cascaderStyle {
      width: 410px;
    }
  }
}
</style>