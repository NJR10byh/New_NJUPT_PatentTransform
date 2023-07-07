import { defineStore } from "pinia";
import { store } from "@/store";

/**
 * @author baoyuhao
 * @date 2023/7/7 16:04:03
 * @description
 * @version 0.1.0
 */
const filesInfo = {
  projectName: "",
  projectCode: "",
  contractInfoId: "",
  accounting: null,
  checklist: null,
  contract: null,
  emptyContract: null,
  invoice: null,
  isCheckListFill: false,
  isInvoiceFill: false,
  otherList: [],
  patentList: [],
  voucherList: []
};

export const useFilesStore = defineStore("notification", {
  state: () => ({
    filesInfo
  }),
  getters: {},
  actions: {
    getFilesInfo(filesInfo) {
      this.filesInfo = filesInfo;
    }
  },
  persist: true
});

export function getFilesStore() {
  return useFilesStore(store);
}