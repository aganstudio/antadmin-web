<template>
  <div class="m-2">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
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
                  confirm: handleDelete.bind(null, record.deptId),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeptList, doneDeptDelete } from '../api';
  import { useModal } from '/@/components/Modal';
  import DeptModal from './DeptModal.vue';
  import { columns } from './dept.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    title: '部门列表',
    api: getDeptList,
    rowKey: 'deptId',
    columns,
    pagination: false,
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  //删除
  function handleDelete(deptId: number) {
    // TODO custom api
    doneDeptDelete({ deptId }).then((res) => {
      if (res.code > 0) {
        createMessage.error(res.message);
        return;
      }
      createMessage.success(res.message);
      deleteTableDataRecord(deptId);
    });
  }

  // 添加和更新
  function handleSuccess(record) {
    // console.log(record);
    if (record.rowId > 0) {
      updateTableDataRecord(record.rowId, record);
    } else {
      reload();
    }
  }
</script>
