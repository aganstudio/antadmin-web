<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'type'">
          <Tag :color="tagColorArr[record.type]" style="margin: 0 2px">{{ record.typeText }}</Tag>
        </template>
        <template v-else-if="column.key === 'action'">
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
                  confirm: handleDelete.bind(null, record.id),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, toRaw } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuList, doneMenuDelete } from '../api';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { Tag } from 'ant-design-vue';
  import { columns, searchFormSchema, tagColorArr } from './menu.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, expandAll, updateTableDataRecord, deleteTableDataRecord }] =
    useTable({
      title: '菜单列表',
      api: getMenuList,
      columns,
      rowKey: 'id',
      formConfig: {
        labelWidth: 90,
        schemas: searchFormSchema,
      },
      isTreeTable: true,
      pagination: false,
      striped: false,
      useSearchForm: true,
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
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    let recordNew = toRaw(record);
    console.log(recordNew);
    delete recordNew.children;
    openDrawer(true, {
      record: recordNew,
      isUpdate: true,
    });
  }

  //删除
  function handleDelete(menuId: number) {
    // TODO custom api
    doneMenuDelete({ menuId }).then((res) => {
      if (res.code > 0) {
        createMessage.error(res.message);
        return;
      }
      createMessage.success(res.message);
      deleteTableDataRecord(menuId);
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

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
