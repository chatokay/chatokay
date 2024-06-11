<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const { locale } = useI18n()

const currentLocale = computed(() => {
  return { 'zh-cn': zhCn, en }[locale.value] || en
})
</script>

<template>
  <ElConfigProvider :locale="currentLocale">
    <RouterView />
    <component :is="d" v-for="d in dialogList" :key="d.name" />
  </ElConfigProvider>
</template>
