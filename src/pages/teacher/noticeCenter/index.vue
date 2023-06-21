<!--
  * @author baoyuhao
  * @date 2023/3/20 0:03:21
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="notice-center-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">相关资料</div>
    </t-row>
    <div class="resouces">
      <div class="image-video-viewer" v-for="(item,index) in IMAGE_LIST">
        <t-image-viewer :key="item" :default-index="index" :images="IMAGE_LIST">
          <template #trigger="{ open }">
            <div class="tdesign-demo-image-viewer__ui-image">
              <img alt="test" :src="item" class="tdesign-demo-image-viewer__ui-image--img" />
              <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
                <span><t-icon name="browse" size="1.4em"></t-icon> 预览</span>
              </div>
            </div>
          </template>
        </t-image-viewer>
      </div>
      <div class="image-video-viewer" v-for="item in VIDEO_PLAY_LIST" :key="item.fileId">
        <div class="muiPlayer">
          <mui-video
            :container="'id' + item.fileId"
            :src="item.src"
            :title="item.title"
          />
        </div>
        <div class="videoInfo">
          <div class="video_title">
            {{ item.title }}
          </div>
          <div class="video_watchNum">
            <t-icon name="time" style="margin-right: 3px"></t-icon>
            <span>{{ item.gmtCreate }}</span>
          </div>
        </div>
      </div>
    </div>
  </t-card>
  <t-card class="notice-center-card">
    <t-row justify="start" class="cardTop">
      <div class="cardTitle">通知</div>
    </t-row>
    <t-list split v-for="item in NOTICE_LIST" :key="item.noticeId">
      <t-list-item>
        <t-link theme="primary" @click="getNoticeDetail(item)">{{ item.noticeTitle }}</t-link>
        <template #action>
          <span style="color: var(--td-gray-color-6);">{{ item.updateTime }}</span>
        </template>
      </t-list-item>
    </t-list>
    <t-pagination
      style="margin-top: 15px;"
      :total="noticeInfo.total"
      showPageNumber
      :showPageSize="false"
      showPreviousAndNextBtn
      totalContent
      @change="noticePageChange"
    />
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
import { onMounted, ref } from "vue";
import { BASE_URL, VIDEO_PREFIX } from "./constants";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";

// 引入MuiPlayer
import muiVideo from "@/components/muiPlayer/index.vue";


/**
 * data
 */
const IMAGE_LIST = ref([
  "https://cgzh.njupt.edu.cn/video/lct.png"
]);
const VIDEO_PLAY_LIST = ref([]);
const NOTICE_LIST = ref([]);

const noticeInfo = ref({
  total: 0,
  noticeDetailVisible: false,
  noticeDetail: {
    noticeTitle: "",
    content: "",
    updateTime: ""
  }
});


/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  let obj = {
    currPage: 1,
    size: 20
  };
  // 获取视频数据
  getVideoData(BASE_URL.getVideoList);

  let notice_data_request = setObjToUrlParams(BASE_URL.getNoticeModelPage, obj);
  // 获取通知数据
  getNoticeData(notice_data_request);
});

/**
 * 操作钩子
 */
const noticePageChange = (pageInfo) => {
  console.log(pageInfo);
  let obj = {
    currPage: pageInfo.current,
    size: pageInfo.pageSize
  };
  let notice_data_request = setObjToUrlParams(BASE_URL.getNoticeModelPage, obj);
  // 获取通知数据
  getNoticeData(notice_data_request);
};

/**
 * 业务相关
 */
// 获取视频数据
const getVideoData = (requestUrl) => {
  VIDEO_PLAY_LIST.value = [];
  request.get({
    url: requestUrl
  }).then(res => {
    for (let i = 0; i < res.length; i++) {
      let video_play = {
        index: 0,
        title: "",
        gmtCreate: "",
        fileId: "",
        src: ""
      };
      video_play.index = i + 1;
      video_play.title = res[i].title;
      video_play.gmtCreate = res[i].gmtCreate;
      video_play.fileId = res[i].fileId;
      video_play.src = VIDEO_PREFIX + res[i].filename;
      VIDEO_PLAY_LIST.value.push(video_play);
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
  });
};

// 获取通知数据
const getNoticeData = (requestUrl) => {
  NOTICE_LIST.value = [];
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    noticeInfo.value.total = res.total;
    NOTICE_LIST.value = res.records;
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
  });
};

// 获取通知详情
const getNoticeDetail = (item) => {
  noticeInfo.value.noticeDetail.noticeTitle = item.noticeTitle;
  noticeInfo.value.noticeDetail.content = item.content;
  noticeInfo.value.noticeDetail.updateTime = item.updateTime;
  noticeInfo.value.noticeDetailVisible = true;
};
</script>
<style lang="less" scoped>
.notice-center-card {
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .resouces {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;

    .image-video-viewer {
      width: 24%;
      min-width: 300px;
      height: 240px;
      margin: 5px;
      border: 4px solid var(--td-bg-color-secondarycontainer);
      border-radius: var(--td-radius-medium);

      .tdesign-demo-image-viewer__ui-image {
        width: 100%;
        height: 100%;
        display: inline-flex;
        position: relative;
        justify-content: center;
        align-items: center;
        border-radius: var(--td-radius-small);
        overflow: hidden;

        &--hover {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          background-color: rgba(0, 0, 0, 0.6);
          color: var(--td-text-color-anti);
          line-height: 22px;
          transition: 0.2s;
        }
      }

      &:hover {
        .tdesign-demo-image-viewer__ui-image--hover {
          opacity: 1;
          cursor: pointer;
        }
      }

      .tdesign-demo-image-viewer__ui-image--img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        cursor: pointer;
        position: absolute;
      }

      .muiPlayer {
        width: 100%;
        height: 200px;
      }

      .videoInfo {
        width: 100%;
        height: 35px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        //background: var(--td-bg-color-secondarycontainer);
        //border-radius: 0 0 var(--td-radius-medium) var(--td-radius-medium);
        //border: 1px solid red;

        .video_title {
          font-size: 15px;
          font-weight: bold;
        }

        .video_watchNum {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;
        }
      }
    }

    .video-viewer {
      width: 24%;
      height: 240px;
      margin: 5px;
      border: 4px solid var(--td-bg-color-secondarycontainer);
      border-radius: var(--td-radius-medium);
    }
  }
}
</style>