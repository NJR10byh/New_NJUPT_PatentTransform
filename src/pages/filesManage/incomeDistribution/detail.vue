<!--
  * @author baoyuhao
  * @date 2023/7/18 11:07:10
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="files-manage-income-distribution-detail-card">
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
        <t-button theme="primary">
          <template #icon>
            <t-icon name="root-list"></t-icon>
          </template>
          生成个人所得税备案表
        </t-button>
        <t-button theme="primary">
          <template #icon>
            <t-icon name="upload"></t-icon>
          </template>
          上传专利证书
        </t-button>
        <t-button theme="primary">
          <template #icon>
            <t-icon name="view-module"></t-icon>
          </template>
          查看审批表
        </t-button>
        <t-button theme="primary">
          <template #icon>
            <t-icon name="link"></t-icon>
          </template>
          公示页
        </t-button>
      </div>
    </t-row>
  </t-card>

  <t-card class="files-manage-income-distribution-detail-card">
    <t-table
      :data="filesManageIncomeDistributionDetailTable.tableData"
      :columns="FILES_MANAGE_INCOME_DISTRIBUTION_DETAIL_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="filesManageIncomeDistributionDetailTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      size="small"
    >
      <template #zlmc="slotProps">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
          <t-icon :name="getFileIcon(slotProps.row.fileName)" :style="getFileIconColor(slotProps.row.fileName)" />
          <t-link style="margin-left: 5px;">
            {{ slotProps.row.fileName }}
          </t-link>
        </div>
      </template>
      <template #settings="slotProps">
        <div class="settingBtns">
          <t-button variant="text" theme="primary">
            <template #icon>
              <t-icon name="download"></t-icon>
            </template>
            下载
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
import { useRoute, useRouter } from "vue-router";
import {
  FILES_MANAGE_INCOME_DISTRIBUTION_DETAIL_TABLE_COLUMNS
} from "@/pages/filesManage/incomeDistribution/constants";
import { useFilesStore, useSettingStore } from "@/store";
import { prefix } from "@/config/global";
import { isNotEmpty } from "@/utils/validate";

const store = useSettingStore();
const filesStore = useFilesStore();
const route = useRoute();
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
const filesManageIncomeDistributionDetailTable = ref({
  tableLoading: false,
  tableData: []
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取传递的参数
  const files = findElement(filesStore.filesInfo.patentList, "zlmc", route.query.zlmc);
  const fileTypes = ["certificate", "oa", "tax"];
  const tableData = filesManageIncomeDistributionDetailTable.value.tableData;
  fileTypes.forEach((fileType) => {
    if (isNotEmpty(files[fileType])) {
      const file = {
        fileName: files[fileType].fileDisplayName,
        updateTime: files[fileType].gmtCreate,
        fileId: files[fileType].fileId
      };
      tableData.push(file);
    }
  });
});
// 根据文件类型获取图标名称
const getFileIcon = (fileName) => {
  const fileExtension = fileName.split(".").pop().toLowerCase();
  if (["doc", "docx"].includes(fileExtension)) {
    return "file-word";
  } else if (["pdf"].includes(fileExtension)) {
    return "file-pdf";
  } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
    return "file-image";
  }
  // 返回默认图标名称
  return "file-unknown";
};

// 根据文件类型获取图标颜色
const getFileIconColor = (fileName) => {
  const fileExtension = fileName.split(".").pop().toLowerCase();
  if (["doc", "docx"].includes(fileExtension)) {
    return { color: "#0058df" };
  } else if (["pdf"].includes(fileExtension)) {
    return { color: "#e34d59" };
  } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
    return { color: "#00a870" };
  }
  // 返回默认图标颜色
  return { color: "#0058df" };
};
/**
 * 操作钩子
 */

// 返回上个页面
const back = () => {
  router.go(-1);
};

// 根据属性值查找元素
const findElement = (arr, property, value) => {
  return arr.find(element => element[property] === value);
};
</script>

<style lang="less" scoped>
.files-manage-income-distribution-detail-card {
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