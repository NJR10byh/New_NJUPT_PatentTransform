import { request } from "@/utils/request";
import type { ProjectListResult, PurchaseListResult } from "@/api/model/detailModel";

const Api = {
  PurchaseList: "/get-purchase-dataCenter",
  ProjectList: "/get-project-dataCenter"
};

export function getPurchaseList() {
  return request.get<PurchaseListResult>({
    url: Api.PurchaseList
  });
}

export function getProjectList() {
  return request.get<ProjectListResult>({
    url: Api.ProjectList
  });
}
