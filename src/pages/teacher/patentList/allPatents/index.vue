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
        <t-input class="inputStyle" placeholder="请输入查询内容" v-model="searchText" clearable></t-input>
        <t-button @click="searchData">
          <template #icon>
            <t-icon name="search"></t-icon>
          </template>
          查询
        </t-button>
      </div>
      <div>
        <t-button @click="exportReferences">
          <template #icon>
            <t-icon name="link-1"></t-icon>
          </template>
          导出引用
        </t-button>
      </div>
    </t-row>
    <t-table
      class="tableStyle"
      :data="allPatentsTable.tableData"
      :columns="ALL_PATENTS_TABLE_COLUMNS"
      row-key="index"
      hover
      stripe
      table-layout="auto"
      :pagination="allPatentsTable.pagination"
      :loading="allPatentsTable.tableLoading"
      :selected-row-keys="allPatentsTable.selectedRowKeys"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="allPatentsTablePageChange"
      @select-change="allPatentsTableSelectChange"
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
              <t-icon name="currency-exchange"></t-icon>
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

  <t-dialog
    v-model:visible="exportReferencesDialog.visible"
    :header="exportReferencesDialog.title"
    attach="body"
    width="800px"
  >
    <template #body>
      <div v-html="exportReferencesDialog.content" id="CopyContent"></div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <t-button theme="default" @click="exportReferencesDialog.visible = false">取 消</t-button>
        <t-button theme="primary" @click="copyExportReferences('CopyContent')">复 制</t-button>
      </div>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { ALL_PATENTS_TABLE_COLUMNS, BASE_URL } from "./constants";
import { isEmpty, isNotEmpty } from "@/utils/validate";


const store = useSettingStore();
const userStore = useUserStore();
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

const currUrl = ref("");
const currRequestBody = ref({
  currPage: 1,
  size: 20
});

// 导出引用
const exportReferencesDialog = reactive({
  visible: false,
  title: "导出引用",
  content: ""
});

/**
 * 搜索相关
 */
const searchField = reactive({
  value: "",
  options: [
    { label: "专利名称", value: "专利名称" },
    { label: "专利号", value: "专利号" }
  ]
});
const searchText = ref("");

/**
 * 表格相关
 */
const allPatentsTable = ref({
  tableLoading: false,// 表格加载
  selectedRowKeys: [],// 选中的行
  selectedPatents: [],// 已选择的专利
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
  currRequestBody.value = {
    currPage: 1,
    size: 20
  };
  currUrl.value = BASE_URL.getMyPatentPage;
  let requestUrl = setObjToUrlParams(currUrl.value, currRequestBody.value);
  getTableData(requestUrl);
});

/**
 * 操作钩子
 */
// 监听容器宽高变化
const resize = (resizeValue: { contentRect: { width: number; }; }[]) => {
  console.log(resizeValue[0].contentRect);
  if (resizeValue[0].contentRect.width > 1300) {
    tableContentWidth.value = resizeValue[0].contentRect.width + "px";
  } else {
    tableContentWidth.value = "1300px";
  }
};
// 查询字段选择器钩子
const searchFieldSelectChange = (value: any) => {
  // clearble会触发change钩子，此时value为 undefined
  if (value) {
    searchField.value = value;
  }
};
// 分页钩子
const allPatentsTablePageChange = (curr: { current: number; pageSize: number; }) => {
  console.log("分页变化", curr);
  allPatentsTable.value.pagination.current = curr.current;
  allPatentsTable.value.pagination.pageSize = curr.pageSize;
  currRequestBody.value.currPage = allPatentsTable.value.pagination.current;
  currRequestBody.value.size = allPatentsTable.value.pagination.pageSize;
  let requestUrl = setObjToUrlParams(currUrl.value, currRequestBody.value);
  getTableData(requestUrl);
};
// 表格选择钩子
const allPatentsTableSelectChange = (selectIndex: any[], { selectedRowData }: any) => {
  allPatentsTable.value.selectedRowKeys = selectIndex;
  allPatentsTable.value.selectedPatents = selectedRowData;
};

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl: string) => {
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
  allPatentsTable.value.pagination.pageSize = 20;
  if (isEmpty(searchField.value) && isEmpty(searchText.value)) {
    currRequestBody.value = {
      currPage: allPatentsTable.value.pagination.current,
      size: allPatentsTable.value.pagination.pageSize
    };
    currUrl.value = BASE_URL.getMyPatentPage;
    let requestUrl = setObjToUrlParams(currUrl.value, currRequestBody.value);
    getTableData(requestUrl);
  } else {
    if (isEmpty(searchField.value)) {
      MessagePlugin.warning("请选择查询字段");
      return;
    }
    if (isEmpty(searchText.value)) {
      MessagePlugin.warning("请输入查询内容");
      return;
    }
    let obj = {
      currPage: allPatentsTable.value.pagination.current,
      size: allPatentsTable.value.pagination.pageSize,
      userGh: userStore.userInfo.userGh,
      userName: userStore.userInfo.userName,
      zlmc: searchText.value,
      zlh: searchText.value
    };
    switch (searchField.value) {
      case "专利名称":
        currUrl.value = BASE_URL.getPatentPageByZLMC;
        delete obj.zlh;
        currRequestBody.value = obj;
        break;
      case "专利号":
        currUrl.value = BASE_URL.getPatentPageByZLH;
        delete obj.zlmc;
        currRequestBody.value = obj;
        break;
    }
  }
  let requestUrl = setObjToUrlParams(currUrl.value, currRequestBody.value);
  getTableData(requestUrl);
};

// 导出引用
function getPatentType(code: any) {
  switch (code) {
    case "1":
      return "发明专利";
    case "2":
      return "实用新型专利";
    case "3":
      return "外观设计专利";
    default:
      return "";
  }
}

const exportReferences = () => {
  console.log(allPatentsTable.value.selectedPatents);
  if (isEmpty(allPatentsTable.value.selectedPatents)) {
    MessagePlugin.warning("请选择要导出的专利");
    return;
  }
  let content = "";
  const selectedPatents = allPatentsTable.value.selectedPatents;

  if (selectedPatents.length > 0) {
    content = selectedPatents.map(patent => {
      const patentType = getPatentType(patent.zlh.split("")[4]);
      return `${patent.cymd}、${patent.zlmc}、${patentType}、${patent.zlh}`;
    }).join("<br><br>");
  }
  console.log(content);
  exportReferencesDialog.content = content;
  exportReferencesDialog.visible = true;
};

/**
 * 复制导出引用-老版本
 * document.execCommand("copy");（被弃用）
 * @param elId
 */
// const copyExportReferences = (elId: string) => {
//   const el = document.getElementById(elId);
//   if (document.createRange && window.getSelection) {
//     let range = document.createRange();
//     let sel = window.getSelection();
//     sel.removeAllRanges();
//     try {
//       range.selectNodeContents(el);
//       sel.addRange(range);
//     } catch (e) {
//       range.selectNode(el);
//       sel.addRange(range);
//     }
//     document.execCommand("copy");
//     //取消文本选中状态
//     window.getSelection().empty();
//     MessagePlugin.success("已复制！");
//   }
// };
/**
 * 复制导出引用-优化版本
 * @param elId
 */
const copyExportReferences = async (elId: string) => {
  const el = document.getElementById(elId);
  const textContent = el.innerHTML.replace(/<br>/g, "\n");
  try {
    await navigator.clipboard.writeText(textContent);
    await MessagePlugin.success("已复制！");
  } catch (error) {
    console.error("复制失败：", error);
    await MessagePlugin.error("复制失败！");
  }
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