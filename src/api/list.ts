import { request } from "@/utils/request";
import type { formListResult } from "@/api/model/formModel";

const Api = {
  FormList: "/getFormList",
  FormDetail: "/getFormById"
};

export function getFormList() {
  return request.post<formListResult>({
    url: Api.FormList
  });
}

export function getFormById() {
  return request.post<formListResult>({
    url: Api.FormDetail
  });
}
