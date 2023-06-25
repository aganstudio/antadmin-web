<template>
  <Card title="通知动态" v-bind="$attrs">
    <List item-layout="horizontal" :data-source="state.noticeItems">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta>
            <template #description>
              {{ item.createTime }}
            </template>
            <template #title> {{ item.name }}: <span v-html="item.content"> </span> </template>
            <template #avatar>
              <Icon icon="dynamic-avatar-4|svg" :size="30" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </Card>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Card, List } from 'ant-design-vue';
  import { getWorkbenchNotice } from '../../api';
  import Icon from '/@/components/Icon/Icon.vue';
  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const state = reactive({
    noticeItems: [] as any,
  });

  getWorkbenchNotice().then((rs) => {
    if (rs.length > 0) {
      state.noticeItems = rs;
    }
  });
</script>
