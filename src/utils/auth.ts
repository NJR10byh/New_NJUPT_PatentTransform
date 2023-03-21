/**
 * @author baoyuhao
 * @date 2022/12/17 15:31:04
 * @description
 * @version 0.1.0
 */
import { getPermissionStore, getUserStore } from "@/store";

export const checkAuth = () => {
  const userStore = getUserStore();
  const permissionStore = getPermissionStore();
  const { role } = userStore;
  console.log("已登录权限："+role);
  if (role) {
    permissionStore.initRoutes(role);
    return true;
  } else {
    return false;
  }
};