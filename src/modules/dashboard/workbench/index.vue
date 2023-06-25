<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <GrowCard :loading="loading" class="enter-y" />
    <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-2 enter-y">
        <ProjectCard :loading="loading" class="enter-y" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <DynamicInfo :loading="loading" class="enter-y" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ProjectCard from './components/ProjectCard.vue';
  import DynamicInfo from './components/DynamicInfo.vue';
  import GrowCard from './components/GrowCard.vue';
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
