/**
 * @author baoyuhao
 * @date 2022/12/17 15:31:04
 * @description
 * @version 0.1.0
 */
import { getPermissionStore, getUserStore, usePermissionStore, useUserStore } from "@/store";
import { isEmpty } from "@/utils/validate";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { ref } from "vue";
import router from "@/router";

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
const getUserContactInfoUrl = ref("/user/getUserContactInfo");


export const checkAuth = () => {
  const userStore = getUserStore();
  const permissionStore = getPermissionStore();
  const { role } = userStore;
  console.log("已登录权限：" + role);
  if (!isEmpty(role)) {
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
  await MessagePlugin.success("欢迎您，" + info.userName);
  switch (userInfo.value.role) {
    case "superadmin":
      await router.push("/contractManage/contract");
      break;
    case  "admin":
      await router.push("/contractManage/contract");
      break;
    case "teacher":
      await router.push("/userCenter/info");
      break;
    case "fzr":
      await router.push("/waitApproval/cxyChargePerson");
      break;
    case "academy":
      await router.push("/userCenter/info");
      break;
    case "finance":
      await router.push("/userCenter/info");
      break;
  }
};