### 基本

> this被自动定义在所有函数的作用域中

> this起隐式传递上下文对象的作用

> 代码使用模式便复杂的时候，显式传递上下文对象会让代码变得越来越混乱，使用this则不会这样

#### 误解1：this指向函数自身 ❌

> **如果要在函数内部自引用**

> 使用具名函数（表达式）

> 使用 arguments.callee 来引用当前正在运行的函数对象。这是唯一一种可以从匿名函数对象内部引用自身的方法。然而，更好的方式是避免使用匿名函数，至少在需要自引用时使用具名函数（表达式）。arguments.callee 已经被弃用，不应该再使用它

> 强制this指向 call，apply， bind

#### 误解2：this指向函数的作用域 ❌

```js
function foo() {
    var a = 2;
    this.bar();  // 实际上此处的this指向window， foo是被window调用的， window并非foo的函数作用域
}
function bar() {
    console.log( this.a ); // window上也灭有一个 a， 所以会报引用错误
}
foo(); // ReferenceError: a is not defined
```

### this到底是什么 - 函数被调用时的绑定，

### 问？绑定了什么，见下节

>   :exclamation:this 是在运行时进行绑定的，并不是在编写时绑定\
>
>   :exclamation:this只取决于函数的调用方式
>
>   :exclamation:当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包 含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this 就是记录的 其中一个属性，会在函数执行的过程中用到。





