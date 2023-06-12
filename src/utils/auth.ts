/**
 * @author baoyuhao
 * @date 2022/12/17 15:31:04
 * @description
 * @version 0.1.0
 */
import { getPermissionStore, getUserStore, usePermissionStore, useSettingStore, useUserStore } from "@/store";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { ref } from "vue";
import router from "@/router";
import STYLE_CONFIG from "@/config/style";
import { chargeTheme } from "@/utils/date";
import { isNotEmpty } from "@/utils/validate";

const userStore = useUserStore();
const permissionStore = usePermissionStore();
const userInfo = ref({
  userName: "",
  userDepartment: "",
  userGh: "",
  userPhone: "",
  userEmail: "",
  userIdCard: "",
  role: "",
  roles: [],
  authorities: []
});
const settingStore = useSettingStore();

const initStyleConfig = () => {
  const styleConfig = STYLE_CONFIG;
  for (const key in styleConfig) {
    if (Object.prototype.hasOwnProperty.call(styleConfig, key)) {
      styleConfig[key] = settingStore[key];
    }
  }

  return styleConfig;
};

const formData = ref({ ...initStyleConfig() });


const getUserContactInfoUrl = ref("/user/getUserContactInfo");


export const checkAuth = () => {
  const userStore = getUserStore();
  const permissionStore = getPermissionStore();
  const { role } = userStore;
  console.log("已登录权限：" + role);
  if (isNotEmpty(role)) {
    permissionStore.initRoutes(role);
    return true;
  } else {
    return false;
  }
};

/**
 * 用户个人信息进入缓存
 * @param info
 */
export const userInfoToCache = async (info) => {
  userInfo.value.userName = info.userName;
  userInfo.value.userDepartment = info.userDepartment;
  userInfo.value.userGh = info.userGh;
  userInfo.value.role = info.role;
  userInfo.value.roles = info.roles;
  userInfo.value.authorities = info.authorities;
  await permissionStore.initRoutes(info.role);
  await request.get({
    url: getUserContactInfoUrl.value
  }).then(res => {
    console.log(res);
    userInfo.value.userPhone = res.userPhone;
    userInfo.value.userEmail = res.userEmail;
    userInfo.value.userIdCard = res.userIdCard;
    userStore.getUserInfo(userInfo.value);
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
  });
  /* 处理主题 */
  formData.value.mode = chargeTheme(); // 根据当前系统时间切换主题模式（light、dark）

  await MessagePlugin.success("欢迎您，" + info.userName);

  /* 分权限处理 默认跳转页 */
  switch (userInfo.value.role) {
    case "superadmin":
      formData.value.brandTheme = "default";
      settingStore.updateConfig(formData.value);
      await router.push("/contractManage/contract");
      break;
    case  "admin":
      formData.value.brandTheme = "pink";
      settingStore.updateConfig(formData.value);
      await router.push("/contractManage/contract");
      break;
    case "teacher":
      formData.value.brandTheme = "purple";
      settingStore.updateConfig(formData.value);
      await router.push("/patent/all");
      break;
    case "fzr":
      formData.value.brandTheme = "yellow";
      settingStore.updateConfig(formData.value);
      await router.push("/waitApproval/cxyChargePerson");
      break;
    case "academy":
      formData.value.brandTheme = "yellow";
      settingStore.updateConfig(formData.value);
      await router.push("/userCenter/userInfo");
      break;
    case "finance":
      formData.value.brandTheme = "yellow";
      settingStore.updateConfig(formData.value);
      await router.push("/userCenter/userInfo");
      break;
  }
};

/**
 * 获取权限名称
 * @param role
 */
export const getRoleName = (role) => {
  let roleName = "";
  switch (role) {
    case "root":
      roleName = "root";
      break;
    case "superadmin":
      roleName = "产学研超级管理员";
      break;
    case  "admin":
      roleName = "产学研管理员";
      break;
    case "teacher":
      roleName = "教师";
      break;
    case "fzr":
      roleName = "产学研负责人";
      break;
    case "academy":
      roleName = "学院";
      break;
    case "finance":
      roleName = "财务处";
      break;
  }
  return roleName;
};

