<script lang="ts" setup>
const { t } = useI18n()
const colorMode = useColorMode({
  attribute: 'class',
})

const icons = ['material-symbols:desktop-windows-outline-rounded', 'heroicons:sun-20-solid', 'heroicons:moon-20-solid']

const list = computed(() => {
  return [
    { label: t('colorMode.system'), value: 'auto', icon: icons[0] },
    { label: t('colorMode.light'), value: 'light', icon: icons[1] },
    { label: t('colorMode.dark'), value: 'dark', icon: icons[2] },
  ] as const
})

const currentItem = list.value.find(el => el.value === colorMode.value)
const currentIcon = ref(currentItem?.icon || list.value[0].icon)

function onSelect(cmd: string) {
  const item = list.value.find(el => el.value === cmd)!
  currentIcon.value = item.icon
  colorMode.value = item.value
}
</script>

<template>
  <ElDropdown trigger="click" @command="onSelect">
    <Icon :icon="currentIcon" class="text-6 text-secondary cursor-pointer hover:text-primary" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in list" :key="item.value" :command="item.value">
          <Icon :icon="item.icon" class="text-4" />
          <span class="ml-2">{{ item.label }}</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
