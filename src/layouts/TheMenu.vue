<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center">
    <ElTooltip :content="t('menu.colorMode')">
      <CoColorMode class="mx-2" />
    </ElTooltip>
    <ElTooltip :content="t('menu.instructions')">
      <RouterLink to="/instructions" active-class="active">
        <Icon icon="heroicons:command-line" />
      </RouterLink>
    </ElTooltip>
    <ElTooltip :content="t('menu.apiConfig')">
      <RouterLink to="/apiConfig" active-class="active">
        <Icon icon="hugeicons:api" />
      </RouterLink>
    </ElTooltip>
    <ElTooltip :content="t('menu.settings')">
      <RouterLink to="/settings" active-class="active">
        <Icon icon="material-symbols:settings" />
      </RouterLink>
    </ElTooltip>
  </div>
</template>

<style scoped lang="scss">
:deep() a {
  display: inline-flex;
  align-items: center;
  color: var(--el-text-color-secondary);
  margin: 0 0.5rem;
  font-size: 1.5rem;
  line-height: 100%;
  &:hover, &.active {
    color: var(--el-color-primary);
  }
}
</style>
