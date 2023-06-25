<template>
  <Card title="待办列表" v-bind="$attrs">
    <CardGrid v-for="item in state.groupItems" :key="item.title" class="!md:w-1/4 !w-full">
      <span class="flex">
        <Icon :icon="item.icon" :color="item.color" size="30" />
        <span class="ml-4">{{ item.title }}</span>
      </span>
      <div class="flex mt-2 h-10 text-2xl">{{ item.value }}</div>
      <div class="flex justify-between text-secondary">
        <span>{{ item.group }}</span>
        <span>
          <a-button size="small" @click="router.push(item.route)">点击查看</a-button>
        </span>
      </div>
    </CardGrid>
    <CardGrid class="w-full" v-if="state.groupItems.length == 0"> 待办列表为空 </CardGrid>
  </Card>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Card, CardGrid } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { getWorkbenchProject } from '../../api';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const state = reactive({
    groupItems: [] as any,
  });

  getWorkbenchProject().then((rs) => {
    if (rs.length > 0) {
      state.groupItems = rs;
    }
  });
</script>
