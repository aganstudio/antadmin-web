import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    align: 'left',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      const color = record.status == 1 ? 'green' : 'red';
      const text = record.status == 1 ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
    fixed: 'right',
    customRender: ({ record }) => {
      return record.createTime.substr(5, 11);
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'pid',
    label: '上级部门',
    component: 'TreeSelect',
    defaultValue: 0,
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'deptId',
        value: 'deptId',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 1,
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
