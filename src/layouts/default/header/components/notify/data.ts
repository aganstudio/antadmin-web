export interface ListItem {
  id: string;
  avatar: string;
  // 通知的标题内容
  title: string;
  // 是否在标题上显示删除线
  titleDelete?: boolean;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
}

export const tabListData: TabItem[] = [
  {
    key: '2',
    name: '通知消息',
    list: [
      // {
      //   id: '000000006',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      //   title: '曲丽丽 评论了你',
      //   description: '描述信息描述信息描述信息',
      //   datetime: '2017-08-07',
      //   type: '2',
      //   clickClose: true,
      // },
      // {
      //   id: '000000007',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      //   title: '朱偏右 回复了你',
      //   description: '这种模板用于提醒谁与你发生了互动',
      //   datetime: '2017-08-07',
      //   type: '2',
      //   clickClose: true,
      // },
      // {
      //   id: '000000008',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      //   title: '标题',
      //   description:
      //     '请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描述最大行数为2，超过2行的描述内容将被省略并且可以通过tooltip查看完整内容',
      //   datetime: '2017-08-07',
      //   type: '2',
      //   clickClose: true,
      // },
    ],
  },
  {
    key: '3',
    name: '待办列表',
    list: [
      // {
      //   id: '000000009',
      //   avatar: '',
      //   title: '任务名称',
      //   description: '任务需要在 2017-01-12 20:00 前启动',
      //   datetime: '',
      //   extra: '未开始',
      //   color: '',
      //   type: '3',
      // },
      // {
      //   id: '000000010',
      //   avatar: '',
      //   title: '第三方紧急代码变更',
      //   description: '冠霖 需在 2017-01-07 前完成代码变更任务',
      //   datetime: '',
      //   extra: '马上到期',
      //   color: 'red',
      //   type: '3',
      // },
      // {
      //   id: '000000011',
      //   avatar: '',
      //   title: '信息安全考试',
      //   description: '指派竹尔于 2017-01-09 前完成更新并发布',
      //   datetime: '',
      //   extra: '已耗时 8 天',
      //   color: 'gold',
      //   type: '3',
      // },
      // {
      //   id: '000000012',
      //   avatar: '',
      //   title: 'ABCD 版本发布',
      //   description: '指派竹尔于 2017-01-09 前完成更新并发布',
      //   datetime: '',
      //   extra: '进行中',
      //   color: 'blue',
      //   type: '3',
      // },
    ],
  },
];
