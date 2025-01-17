declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
