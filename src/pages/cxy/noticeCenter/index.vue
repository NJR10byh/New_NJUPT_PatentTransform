<!--
  * @author baoyuhao
  * @date 2023/3/20 0:03:01
  * @description 通知中心-产学研
  * @version 0.1.0
-->
<template>
  <t-card class="notice-cxy-card">
    <t-row justify="space-between" class="cardTop">
      <div class="cardTitle">小程序管理</div>
      <div>
        <t-button href="https://cgzh.njupt.edu.cn/download/main.zip">
          <template #icon>
            <t-icon name="download"></t-icon>
          </template>
          下载小程序
        </t-button>
      </div>
    </t-row>
  </t-card>
  <t-card class="notice-cxy-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">视频管理</div>
    </t-row>
    <t-table
      :data="videoManageTable.tableData"
      :columns="VIDEO_MANAGE_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="videoManageTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      style="margin-top: 10px"
      size="small"
    >
      <template #title="slotProps">
        <t-link :href="'https://cgzh.njupt.edu.cn/video/' + slotProps.row.filename" theme="primary" target="_blank">
          {{ slotProps.row.title }}
        </t-link>
      </template>
      <template #settings="slotProps">
        <t-button theme="danger">
          <template #icon>
            <t-icon name="delete"></t-icon>
          </template>
        </t-button>
      </template>
    </t-table>
  </t-card>
  <t-card class="notice-cxy-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">通知管理</div>
    </t-row>
    <t-table
      :data="noticeManageTable.tableData"
      :columns="NOTICE_MANAGE_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :pagination="noticeManageTable.pagination"
      :loading="noticeManageTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="patentTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #noticeTitle="slotProps">
        <t-link theme="primary" @click="getNoticeDetail(slotProps.row)">{{ slotProps.row.noticeTitle }}</t-link>
      </template>
      <template #settings="slotProps">
        <t-button theme="warning" variant="base">
          <template #icon>
            <t-icon name="edit"></t-icon>
          </template>
          修改
        </t-button>
        <t-button theme="danger">
          <template #icon>
            <t-icon name="delete"></t-icon>
          </template>
        </t-button>
      </template>
    </t-table>
  </t-card>

  <t-dialog
    v-model:visible="noticeInfo.noticeDetailVisible"
    :header="noticeInfo.noticeDetail.noticeTitle"
    :body="noticeInfo.noticeDetail.content"
    :footer="false"
    attach="body"
    width="800px"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { BASE_URL, NOTICE_MANAGE_TABLE_COLUMNS, VIDEO_MANAGE_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";


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

// 通知详情
const noticeInfo = ref({
  noticeDetailVisible: false,
  noticeDetail: {
    noticeTitle: "",
    content: "",
    updateTime: ""
  }
});
/**
 * 表格相关
 */
/* 视频管理 */
const videoManageTable = ref({
  tableLoading: false,// 表格加载
  tableData: []// 表格数据
});

/* 通知管理 */
const noticeManageTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10
  }
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(async () => {
  let obj = {
    currPage: noticeManageTable.value.pagination.current,
    size: noticeManageTable.value.pagination.pageSize
  };
  // 获取表格数据
  getVideoData(BASE_URL.getVideoList);
  let notice_data_request = setObjToUrlParams(BASE_URL.getNoticeModelPage, obj);
  getNoticeData(notice_data_request);
});
/**
 * 操作钩子
 */
// 分页钩子
const patentTablePageChange = (curr: { current: number; pageSize: number; }) => {
  console.log("分页变化", curr);
  const requestUrl = "/notice/getNoticePage";
  noticeManageTable.value.pagination.current = curr.current;
  noticeManageTable.value.pagination.pageSize = curr.pageSize;
  getNoticeData(requestUrl);
};

/**
 * 业务相关
 */
// 获取视频列表
const getVideoData = (videoUrl: string) => {
  videoManageTable.value.tableData = [];
  videoManageTable.value.tableLoading = true;
  request.get({
    url: videoUrl
  }).then(res => {
    videoManageTable.value.tableData = res;
    for (let i = 0; i < videoManageTable.value.tableData.length; i++) {
      videoManageTable.value.tableData[i].index = i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    videoManageTable.value.tableLoading = false;
  });
};
// 获取通知列表
const getNoticeData = (noticeUrl: string) => {
  noticeManageTable.value.tableData = [];
  noticeManageTable.value.tableLoading = true;
  request.get({
    url: noticeUrl
  }).then(res => {
    console.log(res);
    noticeManageTable.value.tableData = res.records;
    noticeManageTable.value.pagination.total = res.total;
    for (let i = 0; i < noticeManageTable.value.tableData.length; i++) {
      noticeManageTable.value.tableData[i].index = (noticeManageTable.value.pagination.current - 1) * noticeManageTable.value.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    noticeManageTable.value.tableLoading = false;
  });
};

// 获取通知详情
const getNoticeDetail = (notice: { noticeTitle: string; content: string; updateTime: string; }) => {
  console.log(notice);
  noticeInfo.value.noticeDetail.noticeTitle = notice.noticeTitle;
  noticeInfo.value.noticeDetail.content = notice.content;
  noticeInfo.value.noticeDetail.updateTime = notice.updateTime;
  noticeInfo.value.noticeDetailVisible = true;
};
</script>

<style lang="less" scoped>
.notice-cxy-card {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .cardSearchArea {
    margin-top: 10px;
  }

}
</style>