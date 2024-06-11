<script lang="ts" setup>
import TheMenu from '~/layouts/TheMenu.vue'

const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <ElContainer>
    <ElMain>
      <aside class="fixed inset-0 w-[var(--co-aside-width)] flex justify-end bg-[var(--el-bg-color-page)]">
        <div class="h-full w-[var(--co-aside-content-width)] overflow-y-auto px-2">
          <div class="flex items-center border-bottom py-3">
            <CoLogo size="2.5rem" />
            <div class="flex-grow-1">
              <div class="text-xs ml-2 font-mono">
                {{ appName }}
              </div>
              <div class="flex justify-end">
                <TheMenu class="" />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main class="layout-main">
        <RouterView />
      </main>
    </ElMain>
  </ElContainer>
</template>
