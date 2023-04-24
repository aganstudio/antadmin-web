<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="更改密码" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { doneAdminPassword } from '../api';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup() {
      const rowId = ref('');
      const [registerForm, { validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: [
          {
            field: 'password',
            label: '新密码',
            component: 'Input',
            required: true,
          },
        ],
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        // resetFields();
        setModalProps({ confirmLoading: false });
        rowId.value = data.adminId;
      });

      const { createMessage } = useMessage();
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          doneAdminPassword({ ...values, id: rowId.value }).then((res) => {
            if (res.code > 0) {
              createMessage.error(res.message);
              return;
            }
            setTimeout(() => {
              closeModal();
            }, 2000);
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
