import { getRoleList, doneAdminStatus } from '../api';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '部门',
    dataIndex: 'deptName',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          doneAdminStatus({ id: record.id, status: newStatus })
            .then((res) => {
              record.status = newStatus;
              createMessage.success(res.message);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    width: 120,
    customRender: ({ record }) => {
      return record.lastLoginTime.substr(5, 11);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户账号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    ifShow: true,
  },
  {
    label: '角色',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      labelField: 'roleName',
      valueField: 'roleId',
    },
    required: true,
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
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
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
