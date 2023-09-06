<!--
  * @author baoyuhao
  * @date 2023/4/25 17:41:32
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="annual-fee-expiration-card">
    <t-table
      class="tableStyle"
      :data="annualFeeExpirationTable.tableData"
      :columns="ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS"
      row-key="index"
      hover
      stripe
      :expand-icon="false"
      :expand-on-row-click="true"
      :loading="annualFeeExpirationTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      size="small"
    >
      <template #expandedRow="slotProps">
        <t-row class="content">
          <t-col class="contract" :span="4">
            <div class="contract-title">
              成员名单
            </div>
            <div class="contract-detail">
              {{ slotProps.row.cymd }}
            </div>
          </t-col>
          <t-col class="contract" :span="4">
            <div class="contract-title">
              成员工号
            </div>
            <div class="contract-detail">
              {{ slotProps.row.cygh }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              专利第一作者姓名
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zldyzzxm }}
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              专利第一作者工号
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zldyzzgh }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              归属单位
            </div>
            <div class="contract-detail">
              {{ slotProps.row.gsdw }}
            </div>
          </t-col>
          <t-col class="contract" :span="1">
            <div class="contract-title">
              专利代理人
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zldlr }}
            </div>
          </t-col>
          <t-col class="contract" :span="1">
            <div class="contract-title">
              转让价格
            </div>
            <div class="contract-detail">
              <t-tag theme="primary" variant="light">
                {{ isEmpty(slotProps.row.priceIntention) ? "暂无" : slotProps.row.priceIntention + " 万元" }}
              </t-tag>
            </div>
          </t-col>
          <t-col class="contract" :span="1">
            <div class="contract-title">
              许可价格
            </div>
            <div class="contract-detail">
              <t-tag theme="primary" variant="light">
                {{ isEmpty(slotProps.row.licencePriceIntention) ? "暂无" : slotProps.row.licencePriceIntention + " 万元"
                }}
              </t-tag>
            </div>
          </t-col>
          <t-col class="contract" :span="1">
            <div class="contract-title">
              开放许可价格
            </div>
            <div class="contract-detail">
              <t-tag theme="primary" variant="light">
                {{ isEmpty(slotProps.row.openLicencePriceIntention) ? "暂无" : slotProps.row.openLicencePriceIntention +
                " 万元"
                }}
              </t-tag>
            </div>
          </t-col>
          <t-col class="contract" :span="2">
            <div class="contract-title">
              最后更新时间
            </div>
            <div class="contract-detail">
              {{ slotProps.row.zhgxsj }}
            </div>
          </t-col>
        </t-row>
      </template>
      <template #annualFeePaymentDate="slotProps">
        <t-tag theme="warning" variant="light-outline">
          {{ slotProps.row.annualFeePaymentDate }}
        </t-tag>
      </template>
      <template #smsReminderDate="slotProps">
        <div style="display: flex;justify-content:center;align-items: center;">
          {{ slotProps.row.smsReminderDate }}
          <t-link theme="warning" style="margin-left: 3px" @click="editReminderDate(slotProps.row)">
            <t-icon name="edit"></t-icon>
          </t-link>
        </div>
      </template>
    </t-table>
  </t-card>

  <t-dialog
    width="300px"
    v-model:visible="editReminderDateDialog.visible"
    :header="editReminderDateDialog.title"
    attach="body"
    @confirm="editReminderDateConfirm"
  >
    <template #body>
      <t-date-picker v-model="editReminderDateDialog.editReminderDateForm.reminderDate" />
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS, BASE_URL } from "./constants";
import { isEmpty } from "@/utils/validate";


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
const annualFeeExpirationTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20
  }
});

const editReminderDateDialog = reactive({
  visible: false,
  title: "修改提醒日期",
  editReminderDateForm: {
    wid: "",
    reminderDate: ""
  }
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取表格数据
  getTableData(BASE_URL.getRequireAnnualFeePatentPageByGh);
});

/**
 * 操作钩子
 */

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl: string) => {
  annualFeeExpirationTable.value.tableData = [];
  annualFeeExpirationTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    annualFeeExpirationTable.value.tableData = res;
    annualFeeExpirationTable.value.pagination.total = res.total;
    for (let i = 0; i < annualFeeExpirationTable.value.tableData.length; i++) {
      annualFeeExpirationTable.value.tableData[i].index = i + 1;
    }
  }).catch(err => {
    MessagePlugin.closeAll();
    MessagePlugin.error(err.message);
  }).finally(() => {
    annualFeeExpirationTable.value.tableLoading = false;
  });
};

const editReminderDate = (row: any) => {
  editReminderDateDialog.editReminderDateForm.wid = row.wid;
  editReminderDateDialog.editReminderDateForm.reminderDate = row.smsReminderDate;
  editReminderDateDialog.visible = true;
};

// 确认编辑提醒日期
const editReminderDateConfirm = () => {
  request.post({
    url: BASE_URL.updateAnnualFeeReminderDate,
    data: editReminderDateDialog.editReminderDateForm
  }).then(res => {
    console.log(res);
    MessagePlugin.closeAll();
    MessagePlugin.success("修改成功");
  }).catch(err => {
    MessagePlugin.closeAll();
    MessagePlugin.error(err.message);
  }).finally(() => {
    editReminderDateDialog.visible = false;
    getTableData(BASE_URL.getRequireAnnualFeePatentPageByGh);
  });
};
</script>

<style lang="less" scoped>
.annual-fee-expiration-card {
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
    }
  }

  .tableStyle {
    width: 100%;
    margin-top: 10px;

    .content {
      width: 100%;
      margin-top: -20px;

      .contract {
        height: 80px;

        &-title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 24px;
          margin: 20px 0 6px;
          font-size: 14px;
          color: var(--td-text-color-placeholder);
        }

        &-detail {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 40px;
          font-size: 14px;
          color: var(--td-text-color-secondary);
        }
      }

      .contract:last-child {
        margin-bottom: 0;
      }
    }

    .settingBtns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: auto;
    }
  }

}
</style>