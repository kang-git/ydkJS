### 调用位置

> 调用位置就是函数在代码中被调用的 位置（而不是声明的位置）
>
> :heavy_heart_exclamation: 最重要的是要分析调用栈  -- 调用栈可以想象成一个函数调用链
>
> 借助js调试工具分析调用位置

### 绑定规则

#### 1.默认规则 - 独立函数调用
```javascript
function foo() {
    console.log( this.a );
}
var a = 2;
foo(); // 2

// foo全局调用， this默认绑定到全局对象 如果时严格模式，那么就绑定到undefined
```

> :grey_exclamation: 通常来说你不应该在代码中混合使用 strict mode 和 non-strict mode。整个 程序要么严格要么非严格。然而，有时候你可能会用到第三方库，其严格程 度和你的代码有所不同，因此一定要注意这类兼容性细节

#### 2.隐式绑定 - 是否有上下文对象
```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2

// foo的调用上下文对象时 obj
```

>   当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引 用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象
>
>   :heavy_heart_exclamation:对象属性引用链中只有最顶层或者说最后一层会影响调用位置

#### 3.隐式丢失 - 函数别名 - 传入回调

```js
// 函数别名
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名！ 这时bar是引用了obj.foo, 但是此时bar() 是不带任何修饰符的调用，                       // this绑定使用默认规则
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global" 

// 传入回调 回调函数会丢失this绑定
function foo() {
    console.log( this.a );
}
function doFoo(fn) {
    // fn 其实引用的是 foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"
```

#### 4.显示绑定 - 手动指向 call apply  以及 bind

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a:2
};
foo.call(obj); // 2
foo.apply(obj); // 2
const bar = foo.bind(obj)
bar() // 2
```

>   你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对 象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者 new Number(..)）。这通常被称为“装箱”
>
>   :heavy_heart_exclamation:原始值包装类型
>
>   :heavy_heart_exclamation:bind(..) 会返回一个硬编码的新函数，它会把参数设置为 this 的上下文并调用原始函数。

>   一些js第三方库及js语言和宿主环境内置的一些函数，提供了可选参数context， 作用同bind， 将函数内部的this指向 调用时的实参指向

#### 5.new绑定

>   js中的构造函数实际上是new操作符调用的普通函数，通常约定 构造函数首字母大写，但是技术本质上其和普通函数没有区别

>   包括内置对象函数（比如 Number(..)，详情请查看第 3 章）在内的所有函数都可 以用 new 来调用，这种函数调用被称为构造函数调用
>
>   :heavy_heart_exclamation: 实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

##### new fn_name()   - 构造调用的流程

1.   创建（或者说构造）一个全新的对象。 
2.   这个新对象会被执行 [[ 原型 ]] 连接。 
3.   这个新对象会绑定到函数调用的 this。 
4.   如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

### 优先级

>   总而言之，this绑定主要有三种方式  及额外的一种特定方式
>
>   +   隐式绑定 -> 函数调用位置的上下文对象 | 被某个对象拥有或包含
>   +   显示绑定 -> call apply  bind(硬绑定)
>   +   new 绑定  
> 
>      +   API调用上下文 - > context


1.   显示绑定 > 隐式绑定
2.   new绑定 > 隐式绑定
3.   new绑定 > 显示绑定

:heavy_heart_exclamation: new绑定 > 显示绑定 > 隐式绑定

### 例外





### this词法



### summary

>   1.   由 new 调用？绑定到新创建的对象。 
>   2.   由 call 或者 apply（或者 bind）调用？绑定到指定的对象。
>   3.   由上下文对象调用？绑定到那个上下文对象。 
>   4.   默认：在严格模式下绑定到 undefined，否则绑定到全局对象

>   ES6中的箭头函数会继承外层函数调用的this绑定