import { defineStore } from "pinia";
import { store, usePermissionStore } from "@/store";

const userInfo = {
  userName: "",
  userDepartment: "",
  userGh: "",
  userPhone: "",
  userEmail: "",
  userIdCard: "",
  role: "",
  roles: [],
  authorities: []
};

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: userInfo
  }),
  getters: {
    role: (state) => {
      return state.userInfo.role;
    }
  },
  actions: {
    getUserInfo(userinfo) {
      this.userInfo = userinfo;
    },
    logout() {
      this.userInfo = {
        userName: "",
        userDepartment: "",
        userGh: "",
        userPhone: "",
        userEmail: "",
        userIdCard: "",
        role: "",
        roles: [],
        authorities: []
      };
    }
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    }
  }
});

export function getUserStore() {
  return useUserStore(store);
}
