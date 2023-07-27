<template>
  <t-card class="approvalForm-detail-card">
    <t-space direction="vertical" class="table" :size="0">
      <t-row>
        <t-col :span="12" style="font-size: 28px;font-weight: bold;height: 50px;">
          <div>南京邮电大学科技成果转化审批表（许可和转让）</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>成果名称</div>
        </t-col>
        <t-col :span="10">
          <div>{{ patentInfo.zlmc }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>所有权人</div>
        </t-col>
        <t-col :span="10">
          <div>{{ patentInfo.zlqr }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>成果完成人</div>
        </t-col>
        <t-col :span="10">
          <div>{{ patentInfo.cymd }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>专利第一作者</div>
        </t-col>
        <t-col :span="4">
          <div>{{ patentInfo.zldyzzxm }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>负责人</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.fzyName }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>负责人所在单位</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.fzyDepartment }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>转化方式</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.contractType }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.contractType!='专利权转让'">
        <t-col :span="2" class="props">
          <div>许可年限</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.contractValidateBegin }} 至 {{ approvalFormInfo.contractValidateEnd }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>受让方单位</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.paName }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>受让方联系人</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.paContactPerson }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>联系电话</div>
        </t-col>
        <t-col :span="4">
          <t-tooltip :content="approvalFormInfo.paContactPhone">
            <div>{{ phone_number(approvalFormInfo.paContactPhone) }}</div>
          </t-tooltip>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>受让方法定代表人</div>
        </t-col>
        <t-col :span="2">
          <div>{{ approvalFormInfo.paRepresentative }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>纳税人识别号</div>
        </t-col>
        <t-col :span="2">
          <div>{{ approvalFormInfo.taxpayerCode }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>受让方邮编</div>
        </t-col>
        <t-col :span="2">
          <div>{{ approvalFormInfo.paPostalCode }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>受让方注册地址</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.paAddress }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>受让方通讯地址</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.paMailingAddress }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>受让方邮箱</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.paContactEmail }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>受让方领域</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.paField }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>行政区划</div>
        </t-col>
        <t-col :span="4">
          <div>{{ }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>是否有服务方</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.hasAgency }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.hasAgency=='有'">
        <t-col :span="2" class="props">
          <div>服务方名称</div>
        </t-col>
        <t-col :span="2">
          <div>{{ approvalFormInfo.pcName }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>服务方联系人</div>
        </t-col>
        <t-col :span="2">
          <div>{{ approvalFormInfo.pcContactPerson }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>服务方联系电话</div>
        </t-col>
        <t-col :span="2">
          <div>{{ approvalFormInfo.pcContactPhone }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.hasAgency=='有'">
        <t-col :span="2" class="props">
          <div>服务方法定代表人</div>
        </t-col>
        <t-col :span="2">
          <div>{{ approvalFormInfo.pcRepresentative }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>服务方邮箱</div>
        </t-col>
        <t-col :span="6">
          <div>{{ approvalFormInfo.pcContactEmail }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.hasAgency=='有'">
        <t-col :span="2" class="props">
          <div>服务方住所地</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.pcAddress }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.hasAgency=='有'">
        <t-col :span="2" class="props">
          <div>服务方通讯地址</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.pcMailingAddress }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.hasAgency=='有'">
        <t-col :span="2" class="props">
          <div>开户银行</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.pcBankName }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>银行账号</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.pcBankAccount }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.hasAgency=='有'">
        <t-col :span="2" class="props">
          <div>纳税人识别号</div>
        </t-col>
        <t-col :span="3">
          <div>{{ approvalFormInfo.pcTaxpayerCode }}</div>
        </t-col>
        <t-col :span="3" class="props">
          <div>是否存在关联关系说明</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.associationRelationship }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>定价方式</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.pricingMethod }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.pricingMethod == '评估作价'">
        <t-col :span="2" class="props">
          <div>评估公司</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.evaluationCompany }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>评估价格（万元）</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.evaluationPrice }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>价格（万元）</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.patentPrice }}</div>
        </t-col>
        <t-col :span="2" class="props">
          <div>收益分配方式</div>
        </t-col>
        <t-col :span="4">
          <div>{{ approvalFormInfo.drawMoneyMethod }}</div>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="2" class="props">
          <div>收益分配</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.distributionResult }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.drawMoneyMethod == '现金奖励'">
        <t-col :span="2" class="props">
          <div>专利证书编号</div>
        </t-col>
        <t-col :span="10">
          <div>{{ approvalFormInfo.certificateNumber }}</div>
        </t-col>
      </t-row>
      <t-row v-if="approvalFormInfo.drawMoneyMethod === '现金奖励'">
        <t-col :span="12" style="font-size: 25px;font-weight: bold;height: 50px;">
          <div>现金奖励人员信息</div>
        </t-col>
      </t-row>
      <t-row style="width: 100%;height: auto;" v-if="approvalFormInfo.drawMoneyMethod === '现金奖励'">
        <t-col :span="12" style="width:auto;height: 100%;padding: 2px;">
          <div>
            <t-table
              style="box-sizing: border-box;"
              :data="cashRewardTable.tableData"
              :columns="CASH_REWARD_TABLE_COLUMNS"
              row-key="id"
              hover
              borderd
              stripe
              :loading="cashRewardTable.tableLoading"
              size="small"
            >
              <template #recipientGh="slotProps">
                <t-tag theme="primary" variant="light-outline">
                  {{ slotProps.row.recipientGh }}
                </t-tag>
              </template>
            </t-table>
          </div>
        </t-col>
      </t-row>
      <t-row class="lastRow">
        <t-col :span="12">
          <div>
            <p class="props">成果完成人意见：</p>
            <br />
            <p>
              团队负责人承诺，该专利转换<b><i>已经经全体发明人同意</i></b>，
              确认该项成果相关信息属实。该项成果转化对我校已签署的合同不会带来任何法律纠纷，对本研究组以后的技术研发、成果申报和推广应用不会产生任何不良影响。如存在关联关系，承诺与关联方的交易符合国家法律法规和学校各项管理规定，保证不从事不公正的关联交易，不损害国家和学校利益。
            </p>
          </div>
        </t-col>
      </t-row>
    </t-space>
  </t-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BASE_URL, CASH_REWARD_TABLE_COLUMNS } from "./constants";
import { setObjToUrlParams } from "@/utils/request/utils";
import { useRoute } from "vue-router";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { ID_card, phone_number } from "@/utils/antianaphylaxis";

const route = useRoute();
/**
 * data
 */
// 审批表涉及专利信息
const patentInfo = ref({});
// 审批表信息
const approvalFormInfo = ref({});

/**
 * 表格相关
 */
/* 现金奖励表 */
const cashRewardTable = ref({
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
  let obj = {
    wid: route.query.wid
  };
  let getPatentInfoRequestUrl = setObjToUrlParams(BASE_URL.getPatentInfoByWid, obj);
  let getApprovalFormInfoRequestUrl = setObjToUrlParams(BASE_URL.getTransferApplicationFormByWID, obj);
  // 获取审批表涉及专利数据
  getPatentInfo(getPatentInfoRequestUrl);
  // 获取审批表数据
  getApprovalFormInfo(getApprovalFormInfoRequestUrl);
});

/**
 * 业务相关
 */
// 获取审批表涉及专利数据
const getPatentInfo = (requestUrl: string) => {
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    patentInfo.value = res;
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
  });
};
// 获取审批表数据
const getApprovalFormInfo = (requestUrl: string) => {
  cashRewardTable.value.tableLoading = true;
  cashRewardTable.value.tableData = [];
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    approvalFormInfo.value = res;
    cashRewardTable.value.tableData = res.distributionList;
    for (let i = 0; i < cashRewardTable.value.tableData.length; i++) {
      cashRewardTable.value.tableData[i].index = i + 1;
      cashRewardTable.value.tableData[i].idCard = ID_card(cashRewardTable.value.tableData[i].idCard);
      cashRewardTable.value.tableData[i].amount += " 万元";
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    cashRewardTable.value.tableLoading = false;
  });
};
</script>

<style scoped lang="less">
.approvalForm-detail-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .table {
    width: 1000px;
    border: 1px solid #888;


    .t-row {
      border-bottom: 1px solid #888;

      .t-col {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        height: 40px;
        border-right: 1px solid #888;

        &:last-child {
          border: 0;
        }
      }

      .props {
        font-weight: bold;
      }

    }

    .lastRow {
      border-bottom: 0;
      padding: 20px;

      .t-col {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: auto;
        font-size: 18px;
      }
    }
  }
}
</style>