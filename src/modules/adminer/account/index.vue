<template>
  <div class="flex">
    <DeptTree class="w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:eye-invisible-filled',
                tooltip: '更改密码',
                onClick: handlePassword.bind(null, record.id),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record.id),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <PasswordModal @register="registerPasswordModal" />
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList, doneAdminDelete } from '../api';
  import DeptTree from './DeptTree.vue';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';
  import PasswordModal from './PasswordModal.vue';
  import { columns, searchFormSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerPasswordModal, { openModal: openPasswordModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    title: '账号列表',
    api: getAccountList,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 90,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    console.log(record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  //删除
  function handleDelete(id: number) {
    doneAdminDelete({ adminIds: [id] }).then((res) => {
      if (res.code > 0) {
        createMessage.error(res.message);
        return;
      }
      createMessage.success(res.message);
      deleteTableDataRecord(id);
    });
  }
  // 修改密码
  function handlePassword(adminId: number) {
    openPasswordModal(true, {
      adminId,
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

  function handleSelect(deptId = '') {
    searchInfo.deptId = deptId;
    reload();
  }

  function handleView(record: Recordable) {
    console.log(record);
  }
</script>
