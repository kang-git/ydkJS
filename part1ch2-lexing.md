### 词法作用域

> 词法作用域意味着作用域是由书写代码时函数声明的位置来决定的。编译的词法分析阶段
基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对它
们进行查找

### 欺骗词法

#### eval
```javascript
function foo(str, a) {
eval( str ); // 欺骗！
console.log( a, b );
}
var b = 2;
foo( "var b = 3;", 1 ); // 1, 3

// 严格模式 eval有自己的词法作用域
function foo(str) {
"use strict";
eval( str );
console.log( a ); // ReferenceError: a is not defined
}
foo( "var a = 2" )
```

> JavaScript 中 还 有 其 他 一 些 功 能 效 果 和 eval(..) 很 相 似。setTimeout(..) 和
setInterval(..) 的第一个参数可以是字符串，字符串的内容可以被解释为一段动态生成的
函数代码。这些功能已经过时且并不被提倡。不要使用它们！

> new Function(..) 函数的行为也很类似，最后一个参数可以接受代码字符串，并将其转
化为动态生成的函数（前面的参数是这个新生成的函数的形参）。这种构建函数的语法比
eval(..) 略微安全一些，但也要尽量避免使用。

#### with
```javascript
var obj = {
a: 1,
b: 2,
c: 3
};
// 单调乏味的重复 "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;
// 简单的快捷方式
with (obj) {
a = 3;
b = 4;
c = 5;
}

function foo(obj) {
with (obj) {
a = 2;
}
}
var o1 = {
a: 3
};
var o2 = {
b: 3
};
foo( o1 );
console.log( o1.a ); // 2
foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2——不好，a 被泄漏到全局作用域上了！

```