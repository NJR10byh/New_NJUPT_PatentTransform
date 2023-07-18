<!--
  * @author baoyuhao
  * @date 2023/7/7 14:35:25
  * @description 文件管理首页
  * @version 0.1.0
-->
<template>
  <div style="display: flex;justify-content: flex-start;align-items: center;">
    <t-message theme="warning" content="提示：请打开小程序进行自动备案"
               v-if="!filesStore.filesInfo.isCheckListFill && isNotEmpty(filesStore.filesInfo.contract) && isNotEmpty(filesStore.filesInfo.voucherList)" />
    <t-message theme="warning" content="提示：请打开小程序进行自动填发票"
               v-if="!filesStore.filesInfo.isInvoiceFill && isNotEmpty(filesStore.filesInfo.contract) && isNotEmpty(filesStore.filesInfo.voucherList)"
               style="margin-left: 10px;" />
  </div>
  <t-card class="files-manage-home-card">
    <t-row justify="space-between" class="cardTop">
      <div style="display: flex;justify-content: flex-start;align-items: center;">
        <t-button @click="back">
          <template #icon>
            <t-icon name="rollback"></t-icon>
          </template>
          返回
        </t-button>
        <div style="margin-left: 10px;font-size: 16px;color: var(--td-gray-color-7);">
          项目名称：{{ filesStore.filesInfo.projectName }}
        </div>
      </div>
      <div>
        <t-button theme="success">
          <template #icon>
            <t-icon name="share"></t-icon>
          </template>
          发送文件至财务处
        </t-button>
        <t-button>
          <template #icon>
            <t-icon name="share"></t-icon>
          </template>
          发送文件至老师
        </t-button>
      </div>
    </t-row>
  </t-card>

  <t-card class="files-manage-home-card">
    <t-table
      :data="filesManageHomeTable.tableData"
      :columns="FILES_MANAGE_HOME_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="filesManageHomeTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      size="small"
    >
      <template #fileName="slotProps">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
          <t-icon :name="getFileIcon(slotProps.row.fileName)" :style="getFileIconColor(slotProps.row.fileName)" />
          <t-link
            v-if="['合同','合同（已盖章）','入账通知单','科技成果认定清单','发票','专利证书','个人所得税备案'].includes(slotProps.row.fileName)"
            :disabled="isEmpty(slotProps.row.updateTime)" style="margin-left: 5px;">
            {{ slotProps.row.fileName }}
          </t-link>
          <t-link
            v-if="['收益分配','到款凭证','其他相关文件'].includes(slotProps.row.fileName)" style="margin-left: 5px;"
            @click="openFolder(slotProps.row.fileName)">
            {{ slotProps.row.fileName }}
          </t-link>
        </div>
      </template>
      <template #settings="slotProps">
        <div class="settingBtns">
          <t-button variant="text" theme="primary">
            <template #icon>
              <t-icon name="upload"></t-icon>
            </template>
            上传
          </t-button>
          <t-button variant="text" theme="primary"
                    v-if="isNotEmpty(slotProps.row.updateTime)&&['合同','科技成果认定清单','入账通知单','发票','专利证书','个人所得税备案'].includes(slotProps.row.fileName)">
            <template #icon>
              <t-icon name="download"></t-icon>
            </template>
            下载
          </t-button>
          <t-button variant="text" theme="primary" v-if="['合同'].includes(slotProps.row.fileName)">
            <template #icon>
              <t-icon name="view-module"></t-icon>
            </template>
            生成合同模版
          </t-button>
          <t-button variant="text" theme="primary" v-if="['合同'].includes(slotProps.row.fileName)">
            <template #icon>
              <t-icon name="download"></t-icon>
            </template>
            下载合同模版
          </t-button>
          <t-button variant="text" theme="primary" v-if="['入账通知单'].includes(slotProps.row.fileName)">
            <template #icon>
              <t-icon name="view-module"></t-icon>
            </template>
            生成入账通知单
          </t-button>
          <t-button variant="text" theme="primary" v-if="['科技成果认定清单'].includes(slotProps.row.fileName)">
            <template #icon>
              <t-icon name="edit"></t-icon>
            </template>
            填写技术合同备案编号
          </t-button>
          <t-button variant="text" theme="primary" v-if="['科技成果认定清单','发票'].includes(slotProps.row.fileName)">
            <template #icon>
              <t-icon name="jump"></t-icon>
            </template>
            打开小程序
          </t-button>
        </div>
      </template>
      <template #updateTime="slotProps">
        <div style="color: var(--td-gray-color-7);">{{ slotProps.row.updateTime }}</div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useFilesStore, useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { prefix } from "@/config/global";
import { FILES_MANAGE_HOME_TABLE_COLUMNS } from "./constants";
import { isEmpty, isNotEmpty } from "@/utils/validate";

const store = useSettingStore();
const filesStore = useFilesStore();
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
 * 表格相关
 */
const filesManageHomeTable = ref({
  tableLoading: false,// 表格加载
  tableData: [
    {
      fileName: "合同",
      updateTime: isEmpty(filesStore.filesInfo.emptyContract) ? "" : filesStore.filesInfo.emptyContract.gmtCreate,
      fileId: isEmpty(filesStore.filesInfo.emptyContract) ? "" : filesStore.filesInfo.emptyContract.fileId
    },
    {
      fileName: "合同（已盖章）",
      updateTime: isEmpty(filesStore.filesInfo.contract) ? "" : filesStore.filesInfo.contract.gmtCreate,
      fileId: isEmpty(filesStore.filesInfo.contract) ? "" : filesStore.filesInfo.contract.fileId
    },
    {
      fileName: "到款凭证",
      updateTime: isEmpty(filesStore.filesInfo.voucherList) ? "" : filesStore.filesInfo.voucherList[filesStore.filesInfo.voucherList.length - 1].gmtCreate
    },
    {
      fileName: "科技成果认定清单",
      updateTime: isEmpty(filesStore.filesInfo.checklist) ? "" : filesStore.filesInfo.checklist.gmtCreate,
      fileId: isEmpty(filesStore.filesInfo.checklist) ? "" : filesStore.filesInfo.checklist.fileId
    },
    {
      fileName: "入账通知单",
      updateTime: isEmpty(filesStore.filesInfo.accounting) ? "" : filesStore.filesInfo.accounting.gmtCreate,
      fileId: isEmpty(filesStore.filesInfo.accounting) ? "" : filesStore.filesInfo.accounting.fileId
    },
    {
      fileName: "发票",
      updateTime: isEmpty(filesStore.filesInfo.invoice) ? "" : filesStore.filesInfo.invoice.gmtCreate,
      fileId: isEmpty(filesStore.filesInfo.invoice) ? "" : filesStore.filesInfo.invoice.fileId
    },
    {
      fileName: "收益分配",
      updateTime: "",
      fileId: ""
    },
    {
      fileName: "其他相关文件",
      updateTime: "",
      fileId: ""
    }

  ]// 表格数据
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  console.log(filesStore.filesInfo);
  // getTableData(filesStore.filesInfo);
});
/**
 * 操作钩子
 */

/**
 * 业务相关
 */
// 根据文件类型获取图标名称
const getFileIcon = (fileName) => {
  if (["入账通知单", "个人所得税备案"].includes(fileName)) {
    return "file-word";
  } else if (["合同", "合同（已盖章）", "科技成果认定清单", "发票", "专利证书"].includes(fileName)) {
    return "file-pdf";
  } else if (["到款凭证", "收益分配", "其他相关文件"].includes(fileName)) {
    return "folder";
  }
  // 返回默认图标名称
  return "file-unknown";
};

// 根据文件类型获取图标颜色
const getFileIconColor = (fileName) => {
  if (["入账通知单", "个人所得税备案"].includes(fileName)) {
    return { color: "#0058df" };
  } else if (["合同", "合同（已盖章）", "科技成果认定清单", "发票", "专利证书"].includes(fileName)) {
    return { color: "#e34d59" };
  } else if (["到款凭证", "收益分配", "其他相关文件"].includes(fileName)) {
    return { color: "#ebb105" };
  }
  // 返回默认图标颜色
  return { color: "#0058df" };
};
// 获取表格数据
const getTableData = (filesInfo) => {
  filesManageHomeTable.value.tableData = [];
  filesManageHomeTable.value.tableLoading = true;
  const tableData = [];
  let obj = {
    fileName: "",
    updateTime: "",
    fileId: ""
  };
  obj.fileName = "合同";
  obj.updateTime = isEmpty(filesInfo.emptyContract) ? "" : filesInfo.emptyContract.gmtCreate;
  obj.fileId = isEmpty(filesInfo.emptyContract) ? "" : filesInfo.emptyContract.fileId;
  tableData.push(obj);

  obj.fileName = "合同（已盖章）";
  obj.updateTime = isEmpty(filesInfo.contract) ? "" : filesInfo.contract.gmtCreate;
  obj.fileId = isEmpty(filesInfo.contract) ? "" : filesInfo.contract.fileId;
  tableData.push(obj);

  obj.fileName = "到款凭证";
  obj.updateTime = isEmpty(filesInfo.voucherList) ? "" : filesInfo.voucherList[filesInfo.voucherList.length - 1].gmtCreate;
  tableData.push(obj);

  obj.fileName = "科技成果认定清单";
  obj.updateTime = isEmpty(filesInfo.checklist) ? "" : filesInfo.checklist.gmtCreate;
  obj.fileId = isEmpty(filesInfo.checklist) ? "" : filesInfo.checklist.fileId;
  tableData.push(obj);

  obj.fileName = "入账通知单";
  obj.updateTime = isEmpty(filesInfo.accounting) ? "" : filesInfo.accounting.gmtCreate;
  obj.fileId = isEmpty(filesInfo.accounting) ? "" : filesInfo.accounting.fileId;
  tableData.push(obj);

  obj.fileName = "发票";
  obj.updateTime = isEmpty(filesInfo.invoice) ? "" : filesInfo.invoice.gmtCreate;
  obj.fileId = isEmpty(filesInfo.invoice) ? "" : filesInfo.invoice.fileId;
  tableData.push(obj);

  obj.fileName = "收益分配";
  obj.updateTime = "";
  obj.fileId = "";
  tableData.push(obj);

  obj.fileName = "其他相关文件";
  obj.updateTime = "";
  obj.fileId = "";
  tableData.push(obj);
  filesManageHomeTable.value.tableData = tableData;
  filesManageHomeTable.value.tableLoading = false;
};

// 返回上个页面
const back = () => {
  router.go(-1);
};

// 打开文件夹
const openFolder = (folderName) => {
  switch (folderName) {
    case "收益分配":
      router.push("/filesManage/incomeDistribution");
      break;
    case "其他相关文件":
      router.push("/filesManage/otherFiles");
      break;
  }
};
</script>

<style lang="less" scoped>
.files-manage-home-card {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;

  .cardTop {
    //border: 1px solid red;
    align-items: center;
  }

  .settingBtns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

}
</style>