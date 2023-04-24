import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 240,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 80,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    align: 'left',
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '缓存',
    dataIndex: 'keepalive',
    customRender: ({ record }) => {
      return record.keepalive == 1 ? '缓存' : '不缓存';
    },
  },
  {
    title: '显示',
    dataIndex: 'isHide',
    customRender: ({ record }) => {
      return record.isHide == 1 ? '隐藏' : '显示';
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const color = record.status == 1 ? 'green' : 'red';
      const text = record.status == 1 ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 120,
    fixed: 'right',
    customRender: ({ record }) => {
      return record.updateTime.substr(5, 11);
    },
  },
];

const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '权限', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '菜单标识',
    component: 'Input',
    required: true,
  },
  {
    field: 'path',
    label: '路由',
    component: 'Input',
    required: true,
  },
  {
    field: 'pid',
    label: '上级菜单',
    component: 'TreeSelect',
    defaultValue: 0,
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    colProps: { lg: 24, md: 24 },
  },

  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 1,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => isDir(values.type),
  },

  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
    colProps: { lg: 24, md: 24 },
    ifShow: ({ values }) => isButton(values.type),
  },

  {
    field: 'isLink',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'isHide',
    label: '是否隐藏',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
export const tagColorArr = ['red', 'green', 'cyan', 'orange', 'pink'];
