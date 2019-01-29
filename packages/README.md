# 组件编写

#### Vue 几个方法
- Vue.use({install})
- Vue.component(name,comp)
- Vue.directive(name,dire)
- Vue.mixins(name,mixi)

#### Vue props
- value  
- Object
- 其它基本数据类型
```
{
  props:{
    value: 可供 v-model 进行双向数据绑定
    Object: 修改时要注意 watch 及 Object.assign
    其它: 其它数据类型。。
    xx:{
      type:数据类型首字大写Strin|Number...,多种类型【Number, String】
      default: 默认值
    }
  }
}

当type的类型为Array或者Object的时候default必须是一个函数
```

- 函数绑定
```
$emit 触发
```

- 属性操作
```
如果添加的属性没有赋值，则默认值为true
```

- 类操作
```
<div class='a' :class="[]"></div>
可进行追加类

<div class='a' :class="classes"></div>
可控制追加类

```

- 行内样式操作
```
```

- slot
```
js中 this.$slots.default 
```

- slot-scope 取父组件中 slot 的 props
```
作用域插槽是一种特殊类型的插槽，用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素。 


// componet A
<template>
  <slot a=1 b=2></slot>
</tempate>


// component B
<A>
  <template slot-scope="ll">
    {{ll.a}} - {{ll.b}}
  </template>
<A>
```

- template 嵌套作用：不可渲染元素
```
template不会渲染成元素，用div的话会被渲染成元素。把if,show,for等语句抽取出来放在template上面，把绑定的事件放在temlpate里面的元素上，可以使html结构更加清晰，还可以改善一个标签过长的情况。
```

```
父组件改变props，子组件如果直接使用props，会触发子组件更新
父组件改变props，子组件如果将props放进data中再使用，不会触发子组件更新
父组件改变props，子组件如果将props放进computed中再使用，会触发子组件更新(或this.$forceUpdate())
data，props和computed的变化都会触发组件更新
```