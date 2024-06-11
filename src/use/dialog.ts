import type { Component, DefineComponent } from 'vue'
import type { DialogProps } from 'element-plus'

type IBaseProps = InstanceType<DefineComponent>['$props']
type IConstructor = abstract new (...args: any) => any

/** Extends ElDialog's attributes. https://element-plus.org/zh-CN/component/dialog.html#attributes */
interface IOptions<T extends IConstructor = DefineComponent> extends Partial<Omit<DialogProps, 'modelValue' | 'title'>> {
  title: string | VNode
  /** the component to be rendered inside the dialog */
  component: T
  /** the props to be passed to the component */
  props?: Omit<InstanceType<T>['$props'], keyof IBaseProps>
  /** the padding of the dialog */
  padding?: string
  style?: Record<string, string>
  customClass?: string
}

let count = 0
const prefix = '__dialog_'
const list = shallowRef<Component[]>([])
/** expose the list of dialogs */
export const dialogList = shallowReadonly(list)

function createDialog<T extends IConstructor = DefineComponent>(options: IOptions<T>) {
  const name = `${prefix}${++count}`
  return defineComponent({
    name,
    setup() {
      return () => {
        return h(
          ElDialog,
          {
            style: {
              '--el-dialog-padding-primary': options.padding || '15px',
              ...options.style,
            },
            class: [options.customClass, 'custom-dialog'],
            appendToBody: true,
            draggable: true,
            alignCenter: true,
            ...omit(options, ['component', 'props', 'title', 'padding', 'style', 'customClass']),
            modelValue: true,
            onClosed: () => {
              closeDialog(name)
            },
          },
          {
            default: () => h(options.component as unknown as DefineComponent, options.props),
            header: () => options.title,
          },
        )
      }
    },
  })
}

function closeDialog(name: string) {
  list.value = list.value.filter(item => item.name !== name)
  triggerRef(list)
}

export function useDialog<T extends IConstructor = DefineComponent>(options: IOptions<T>) {
  const component = createDialog(options)
  list.value.push(component)
  triggerRef(list)
}

/**
 * Close the dialog in Children component.
 * @returns close dialog function
 * @example
 * ```html
 * <template>
 * <ElButton \@click="onClose"></ElButton>
 * </template>
 * <script setup>
 * import { useCloseDialog } from '@/use/index';
 * const onClose = useCloseDialog();
 * </script>
 * ```
 */
export function useCloseDialog() {
  const currentInstance = getCurrentInstance()?.proxy
  return () => {
    if (currentInstance) {
      let dialogComponent = currentInstance.$parent
      while (dialogComponent) {
        const name = dialogComponent.$options.name
        if (name && name.startsWith(prefix)) {
          closeDialog(name)
          return
        }
        dialogComponent = dialogComponent.$parent
      }
    }
  }
}
