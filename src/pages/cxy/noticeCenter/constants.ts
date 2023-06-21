/**
 * @author baoyuhao
 * @date 2023/3/21 23:00:16
 * @description
 * @version 0.1.0
 */
export const VIDEO_MANAGE_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "视频名称",
    align: "center",
    colKey: "title",
    width: 120,
    ellipsis: true
  },
  {
    title: "最后更新日期",
    align: "center",
    colKey: "gmtCreate",
    width: 100,
    ellipsis: true
  },
  {
    fixed: "right",
    colKey: "settings",
    width: 50,
    title: "操作"
  }
];

export const NOTICE_MANAGE_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "通知标题",
    align: "left",
    colKey: "noticeTitle",
    width: 200,
    ellipsis: true
  },
  {
    title: "发布人",
    align: "center",
    colKey: "publishUser",
    width: 50,
    ellipsis: true
  },
  {
    title: "创建时间",
    align: "center",
    colKey: "createTime",
    width: 100,
    ellipsis: true
  },
  {
    title: "最后更新时间",
    align: "center",
    colKey: "updateTime",
    width: 100,
    ellipsis: true
  },
  {
    fixed: "right",
    colKey: "settings",
    width: 100,
    title: "操作",
    stopPropagation: true
  }
];