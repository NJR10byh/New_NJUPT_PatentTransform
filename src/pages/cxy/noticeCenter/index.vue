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
    <t-row justify="space-between" class="cardTop">
      <div class="cardTitle">视频管理</div>
      <t-button theme="primary" @click="addVideo">
        <template #icon>
          <t-icon name="add"></t-icon>
        </template>
        发布视频
      </t-button>
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
        <t-button theme="danger" @click="deleteVideo(slotProps.row)">
          <template #icon>
            <t-icon name="delete"></t-icon>
          </template>
          删除
        </t-button>
      </template>
    </t-table>
  </t-card>
  <t-card class="notice-cxy-card">
    <t-row justify="space-between" class="cardTop">
      <div class="cardTitle">通知管理</div>
      <t-button theme="primary" @click="addNotice">
        <template #icon>
          <t-icon name="add"></t-icon>
        </template>
        新增通知
      </t-button>
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
      @page-change="noticeTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #noticeTitle="slotProps">
        <t-link theme="primary" @click="getNoticeDetail(slotProps.row)">{{ slotProps.row.noticeTitle }}</t-link>
      </template>
      <template #settings="slotProps">
        <t-button theme="warning" @click="editNotice(slotProps.row)">
          <template #icon>
            <t-icon name="edit"></t-icon>
          </template>
          修改
        </t-button>
        <t-button theme="danger" @click="deleteNotice(slotProps.row)">
          <template #icon>
            <t-icon name="delete"></t-icon>
          </template>
          删除
        </t-button>
      </template>
    </t-table>
  </t-card>

  <!-- 通知详情 -->
  <t-dialog
    v-model:visible="noticeInfo.noticeDetailVisible"
    :header="noticeInfo.noticeDetail.noticeTitle"
    :body="noticeInfo.noticeDetail.content"
    :footer="false"
    attach="body"
    width="800px"
  />

  <!-- 发布视频 -->
  <t-dialog header="发布视频" v-model:visible="addVideoVisible" width="600px" :footer="false">
    <t-form :data="addVideoFormData" :rules="addVideoFormRules" @submit="submitVideo">
      <t-form-item label="视频标题" name="videoTitle">
        <t-input placeholder="请输入视频标题" v-model="addVideoFormData.videoTitle" />
      </t-form-item>
      <t-form-item label="视频文件" name="videoFile">
        <div style="display: flex;flex-direction: column;">
          <t-upload
            ref="uploadVideo"
            v-model="addVideoFormData.file"
            accept="video/*"
            :autoUpload="false"
            :showUploadProgress="false"
            :useMockProgress="false"
            :request-method="uploadVideoFile"
            tips="只支持上传视频文件，且视频大小在100M内"
            :size-limit="{ size: 100, unit: 'MB' }"
            @validate="validateFile"
          />
          <div style="width:200px;margin-top: 10px;" v-if="showVideoProgress">
            <t-progress :percentage="videoProgress" />
          </div>
        </div>
      </t-form-item>
      <div class="formBtns">
        <t-button theme="default">取消</t-button>
        <t-button theme="primary" type="submit" :loading="addVideoBtnLoading">提交</t-button>
      </div>
    </t-form>
  </t-dialog>

  <!-- 新增通知 -->
  <t-dialog header="新增通知" v-model:visible="addNoticeVisible" width="600px" :footer="false">
    <t-form :data="addNoticeFormData" :rules="addNoticeFormRules" @submit="submitNotice">
      <t-form-item label="通知标题" name="noticeTitle">
        <t-input placeholder="请输入通知标题" v-model="addNoticeFormData.noticeTitle" />
      </t-form-item>
      <t-form-item label="通知内容" name="content">
        <t-textarea placeholder="请输入通知内容" :autosize="{ minRows: 3, maxRows: 3 }"
                    v-model="addNoticeFormData.content" />
      </t-form-item>
      <t-form-item label="相关附件" name="noticeFile">
        <div style="display: flex;flex-direction: column;">
          <t-upload
            ref="uploadNotice"
            v-model="addNoticeFormData.file"
            :autoUpload="false"
            :showUploadProgress="false"
            :useMockProgress="false"
            :request-method="uploadNoticeFile"
            tips="要求文件大小在1M内"
            :size-limit="{ size: 1, unit: 'MB' }"
            @validate="validateFile"
          />
          <div style="width:200px;margin-top: 10px;" v-if="showNoticeProgress">
            <t-progress :percentage="noticeProgress" />
          </div>
        </div>
      </t-form-item>
      <div class="formBtns">
        <t-button theme="default">取消</t-button>
        <t-button theme="primary" type="submit" :loading="addNoticeBtnLoading">提交</t-button>
      </div>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { BASE_URL, NOTICE_MANAGE_TABLE_COLUMNS, VIDEO_MANAGE_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { DialogPlugin, MessagePlugin } from "tdesign-vue-next";
import { uploadFile, validateFile } from "@/utils/files";

const store = useSettingStore();
const router = useRouter();
const userStore = useUserStore();

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
 * 通知相关
 */
// 新增通知
const uploadNotice = ref();
const showNoticeProgress = ref(false);
const noticeProgress = ref(0);
const addNoticeVisible = ref(false);
const addNoticeBtnLoading = ref(false);
const addNoticeFormData = reactive({
  noticeTitle: "",
  content: "",
  file: []
});
const addNoticeFormRules = {
  noticeTitle: [{ required: true, message: "通知标题必填" }],
  content: [{ required: true, message: "通知内容必填" }]
};
// 通知详情
const noticeInfo = reactive({
  noticeDetailVisible: false,
  noticeDetail: {
    noticeTitle: "",
    content: "",
    updateTime: ""
  }
});
// 通知列表
const noticeManageTable = reactive({
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
 * 视频相关
 */
// 新增视频
const uploadVideo = ref();
const showVideoProgress = ref(false);
const videoProgress = ref(0);
const addVideoVisible = ref(false);
const addVideoBtnLoading = ref(false);
const addVideoFormData = reactive({
  videoTitle: "",
  file: []
});
const addVideoFormRules = {
  videoTitle: [{ required: true, message: "视频标题必填" }]
};
// 视频列表
const videoManageTable = reactive({
  tableLoading: false,// 表格加载
  tableData: []// 表格数据
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(async () => {
  getVideoData();
  refreshNoticeData();
});
/**
 * 操作钩子
 */
// 分页钩子
const noticeTablePageChange = (curr: {
  current: number;
  pageSize: number;
}) => {
  console.log("分页变化", curr);
  noticeManageTable.pagination.current = curr.current;
  noticeManageTable.pagination.pageSize = curr.pageSize;
  getNoticeData();
};

/**
 * 业务相关
 */
// 获取视频列表
const getVideoData = () => {
  videoManageTable.tableData = [];
  videoManageTable.tableLoading = true;
  request.get({
    url: BASE_URL.getVideoList
  }).then(res => {
    videoManageTable.tableData = res;
    for (let i = 0; i < videoManageTable.tableData.length; i++) {
      videoManageTable.tableData[i].index = i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    videoManageTable.tableLoading = false;
  });
};
// 删除视频
const deleteVideo = (video: any) => {
  const confirmDialog = DialogPlugin.confirm({
    header: "提示",
    theme: "warning",
    body: "此操作将永久删除该视频, 是否继续？",
    confirmBtn: {
      content: "删除",
      variant: "base",
      theme: "danger"
    },
    cancelBtn: "取消",
    onConfirm: () => {
      let obj = {
        fileId: video.fileId
      };
      let requestUrl = setObjToUrlParams(BASE_URL.deleteVideoById, obj);
      request.get({
        url: requestUrl
      }).then(res => {
        console.log(res);
        MessagePlugin.success("删除成功");
      }).catch(err => {
        MessagePlugin.error(err.message);
      }).finally(() => {
        getVideoData();
      });
      // 请求成功后，销毁弹框
      confirmDialog.destroy();
    },
    onClose: () => {
      confirmDialog.hide();
    }
  });
};

// 获取通知列表
const getNoticeData = () => {
  noticeManageTable.tableData = [];
  noticeManageTable.tableLoading = true;
  let obj = {
    currPage: noticeManageTable.pagination.current,
    size: noticeManageTable.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getNoticeModelPage, obj);
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    noticeManageTable.tableData = res.records;
    noticeManageTable.pagination.total = res.total;
    for (let i = 0; i < noticeManageTable.tableData.length; i++) {
      noticeManageTable.tableData[i].index = (noticeManageTable.pagination.current - 1) * noticeManageTable.pagination.pageSize + i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    noticeManageTable.tableLoading = false;
  });
};

// 刷新通知列表
const refreshNoticeData = () => {
  noticeManageTable.pagination.current = 1;
  noticeManageTable.pagination.pageSize = 10;
  getNoticeData();
};

// 获取通知详情
const getNoticeDetail = (notice: {
  noticeTitle: string;
  content: string;
  updateTime: string;
}) => {
  noticeInfo.noticeDetail.noticeTitle = notice.noticeTitle;
  noticeInfo.noticeDetail.content = notice.content;
  noticeInfo.noticeDetail.updateTime = notice.updateTime;
  noticeInfo.noticeDetailVisible = true;
};
// 编辑通知
const editNotice = (notice: any) => {
  console.log(notice);
};
// 删除通知
const deleteNotice = (notice: any) => {
  console.log(notice);
  const confirmDialog = DialogPlugin.confirm({
    header: "提示",
    theme: "warning",
    body: "此操作将永久删除该通知, 是否继续？",
    confirmBtn: {
      content: "删除",
      variant: "base",
      theme: "danger"
    },
    cancelBtn: "取消",
    onConfirm: () => {
      let obj = {
        noticeId: notice.noticeId
      };
      let requestUrl = setObjToUrlParams(BASE_URL.deleteNoticeById, obj);
      request.get({
        url: requestUrl
      }).then(res => {
        console.log(res);
        MessagePlugin.success("删除成功");
      }).catch(err => {
        MessagePlugin.error(err.message);
      }).finally(() => {
        refreshNoticeData();
      });
      // 请求成功后，销毁弹框
      confirmDialog.destroy();
    },
    onClose: () => {
      confirmDialog.hide();
    }
  });
};
/**
 * 新增视频
 */
const addVideo = () => {
  addVideoFormData.videoTitle = "";
  addVideoFormData.file = [];
  addVideoVisible.value = true;
};
// 上传视频文件
const uploadVideoFile = (file: { raw: string | Blob; }) => {
  let fileFormData = new FormData();
  fileFormData.append("file", file.raw);
  fileFormData.append("title", addVideoFormData.videoTitle);
  // TODO 研究一下如何将上传进度返回给组件
  // let percent = 0;
  // const percentTimer = setInterval(() => {
  //   if (percent + 10 < 99) {
  //     percent += 10;
  //     uploadVideo.value.uploadFilePercent();
  //   } else {
  //     clearInterval(percentTimer);
  //   }
  // }, 100);
  // const timer = setTimeout(() => {
  //   // resolve 参数为关键代码
  //   resolve({ status: "success", response: { url: "https://tdesign.gtimg.com/site/avatar.jpg" } });
  //
  //   clearTimeout(timer);
  //   clearInterval(percentTimer);
  // }, 1000);
  showVideoProgress.value = true;
  uploadFile(BASE_URL.uploadVideo, fileFormData, percentCompleted => {
    videoProgress.value = percentCompleted;
  }).then(res => {
    MessagePlugin.success("新增成功");
  }).catch(err => {
    MessagePlugin.error(err);
  }).finally(() => {
    addVideoVisible.value = false;
    addVideoBtnLoading.value = false;
    showVideoProgress.value = false;
    getVideoData();
  });
};
// 提交视频
const submitVideo = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    if (addVideoFormData.file.length === 0) {
      MessagePlugin.warning("请上传视频文件");
      return;
    }
    addVideoBtnLoading.value = true;
    uploadVideo.value.uploadFiles();
  } else {
    MessagePlugin.warning(firstError);
  }
};

/**
 * 新增通知
 */
const addNotice = () => {
  addNoticeFormData.noticeTitle = "";
  addNoticeFormData.content = "";
  addNoticeFormData.file = [];
  addNoticeVisible.value = true;
};
// 上传通知文件
const uploadNoticeFile = () => {
  let fileFormData = new FormData();
  fileFormData.append("file", addNoticeFormData.file[0].raw);
  fileFormData.append("content", addNoticeFormData.content);
  fileFormData.append("noticeTitle", addNoticeFormData.noticeTitle);
  fileFormData.append("publishUser", userStore.userInfo.userName);
  showNoticeProgress.value = true;
  uploadFile(BASE_URL.addNotice, fileFormData, percentCompleted => {
    noticeProgress.value = percentCompleted;
  }).then(res => {
    MessagePlugin.success("新增成功");
  }).catch(err => {
    MessagePlugin.error(err);
  }).finally(() => {
    addNoticeVisible.value = false;
    addNoticeBtnLoading.value = false;
    showNoticeProgress.value = false;
    refreshNoticeData();
  });
};
// 提交通知
const submitNotice = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    if (addNoticeFormData.file.length === 0) {
      MessagePlugin.warning("请上传通知文件");
      return;
    }
    addNoticeBtnLoading.value = true;
    uploadNotice.value.uploadFiles();
  } else {
    MessagePlugin.warning(firstError);
  }
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

.formBtns {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>