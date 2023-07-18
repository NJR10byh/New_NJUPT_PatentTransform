<!--
  * @author baoyuhao
  * @date 2023/7/18 16:35:01
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="files-manage-other-files-card">
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
            <t-icon name="upload"></t-icon>
          </template>
          上传文件
        </t-button>
      </div>
    </t-row>
  </t-card>

  <t-card class="files-manage-other-files-card">
    <t-table
      :data="filesManageOtherFilesTable.tableData"
      :columns="FILES_MANAGE_OTHER_FILES_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="filesManageOtherFilesTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      size="small"
    >
      <template #fileDisplayName="slotProps">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
          <t-icon :name="getFileIcon(slotProps.row.fileDisplayName)"
                  :style="getFileIconColor(slotProps.row.fileDisplayName)" />
          <t-link style="margin-left: 5px;">
            {{ slotProps.row.fileDisplayName }}
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
          <t-button variant="text" theme="danger">
            <template #icon>
              <t-icon name="delete"></t-icon>
            </template>
            删除
          </t-button>
        </div>
      </template>
      <template #gmtCreate="slotProps">
        <div style="color: var(--td-gray-color-7);">{{ slotProps.row.gmtCreate }}</div>
      </template>
    </t-table>
  </t-card>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { FILES_MANAGE_OTHER_FILES_TABLE_COLUMNS } from "./constants";
import { useFilesStore, useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { prefix } from "@/config/global";

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
const filesManageOtherFilesTable = ref({
  tableLoading: false,
  tableData: []
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  getTableData();
});
/**
 * 操作钩子
 */

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = () => {
  filesManageOtherFilesTable.value.tableLoading = true;
  filesManageOtherFilesTable.value.tableData = filesStore.filesInfo.otherList;
  filesManageOtherFilesTable.value.tableLoading = false;
};
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

// 返回上个页面
const back = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
.files-manage-other-files-card {
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