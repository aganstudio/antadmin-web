<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record.roleId),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRolePage, doneRoleDelete } from '../api';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  import { columns, searchFormSchema } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, deleteTableDataRecord, updateTableDataRecord }] = useTable({
    title: '角色列表',
    api: getRolePage,
    columns,
    rowKey: 'roleId',
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  //删除
  function handleDelete(roleId: number) {
    doneRoleDelete({ roleIds: [roleId] }).then((res) => {
      if (res.code > 0) {
        createMessage.error(res.message);
        return;
      }
      createMessage.success(res.message);
      deleteTableDataRecord(roleId);
    });
  }

  // 添加和更新
  function handleSuccess(record) {
    console.log(record);
    if (record.rowId > 0) {
      updateTableDataRecord(record.rowId, record);
    } else {
      reload();
    }
  }
</script>
