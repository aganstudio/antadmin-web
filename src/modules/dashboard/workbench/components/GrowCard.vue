<template>
  <div class="md:flex mb-2">
    <template v-for="(item, index) in state.statisticItems" :key="item.title">
      <Card size="small" :loading="loading" :title="item.title" class="md:w-1/4 w-full !md:mt-0">
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo :startVal="0" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo :startVal="0" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { CountTo } from '/@/components/CountTo/index';
  import Icon from '/@/components/Icon/Icon.vue';
  import { Tag, Card } from 'ant-design-vue';
  import { getWorkbenchStatistic } from '../../api';
  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const state = reactive({
    statisticItems: [] as any,
  });

  getWorkbenchStatistic().then((rs) => {
    state.statisticItems = { ...rs };
  });
</script>
