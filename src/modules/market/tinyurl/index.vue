<template>
  <PageWrapper title="短链接服务" class="bg-light-400 h-full">
    <template #headerContent> 缩短推广活动链接的长度, 便于转发和推广! </template>
    <div class="pt-4">
      <div class="container w-6/12 mx-auto bg-transparent">
        <a-input-search
          v-model:value="state.originalUrl"
          placeholder="请输入 http:// 或 https:// 开头的网址"
          enter-button="生成短链接"
          size="large"
          @search="handleCreateUrl"
        />
        <div class="mt-8 border-2 border-red-500 rounded p-4 bg-white">
          <h3 class="text-2xl">
            生成结果: <b>{{ state.createMessage }}</b>
          </h3>
          <div class="flex justify-center">
            <a-input placeholder="请输入" v-model:value="state.tinyUrl" readonly="readonly" />
            <a-button type="primary" @click="handleCopy"> 点击复制 </a-button>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { reactive, toRaw, unref } from 'vue';
  import { doTinyurlAdd } from '../api';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { clipboardRef, copiedRef } = useCopyToClipboard();
  const { createMessage } = useMessage();

  const state = reactive({
    originalUrl: '',
    tinyUrl: '',
    createMessage: '',
  });

  const handleCreateUrl = () => {
    const url = toRaw(state.originalUrl);
    if (!url) {
      createMessage.error('请输入网址');
      return;
    }
    doTinyurlAdd({ url }).then((result) => {
      if (result.code > 0) {
        createMessage.error(result.message);
        return;
      }
      createMessage.success(result.message);
      state.createMessage = '成功';
      state.tinyUrl = result.data.tinyurl;
    });
  };
  const handleCopy = () => {
    const value = toRaw(state.tinyUrl);
    if (!value) {
      return;
    }
    clipboardRef.value = value;
    if (unref(copiedRef)) {
      createMessage.success('复制成功');
    }
  };
</script>
