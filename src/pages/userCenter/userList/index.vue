<!--
  * @author baoyuhao
  * @date 2023/4/24 14:15:50
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="user-list-card">
    <t-row justify="end" class="cardTop">
      <div class="cardTitle">
        <t-button>
          <template #icon>
            <t-icon name="user-add"></t-icon>
          </template>
          添加管理员
        </t-button>
        <t-button>
          <template #icon>
            <t-icon name="fork"></t-icon>
          </template>
          注册游客管理员
        </t-button>
        <t-button>
          <template #icon>
            <t-icon name="usergroup-add"></t-icon>
          </template>
          创建学院账号
        </t-button>
      </div>
    </t-row>
    <t-table
      class="tableStyle"
      :data="userListTable.tableData"
      :columns="USER_LIST_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="userListTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      size="small"
    >
      <template #userGh="slotProps">
        <t-tag theme="primary" variant="light">
          {{ slotProps.row.userGh }}
        </t-tag>
      </template>

      <template #settings="slotProps">
        <t-button theme="danger">
          <template #roles="slotProps">
            <t-tag theme="success" variant="light-outline" v-for="item in slotProps.row.roles"
                   style="margin-right: 6px">
              {{ getRoleName(item) }}
            </t-tag>
          </template>
          <template #icon>
            <t-icon name="delete"></t-icon>
          </template>
        </t-button>
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
import { MessagePlugin } from "tdesign-vue-next";
import { BASE_URL, USER_LIST_TABLE_COLUMNS } from "./constants";
import { getRoleName } from "../../../utils/auth";


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

/**
 * 表格相关
 */
const userListTable = ref({
  tableLoading: false,// 表格加载
  tableData: []// 表格数据
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取表格数据
  getTableData(BASE_URL.getAdminList);
});

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  userListTable.value.tableData = [];
  userListTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    userListTable.value.tableData = res;
    for (let i = 0; i < userListTable.value.tableData.length; i++) {
      userListTable.value.tableData[i].index = i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    userListTable.value.tableLoading = false;
  });
};

// 搜索数据
const searchData = () => {
  getTableData(BASE_URL.getAdminList);
};
</script>

<style lang="less" scoped>
.user-list-card {
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
        width: 200px;
        margin-right: 10px;
      }

      .rangeInputStyle {
        width: 260px;
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