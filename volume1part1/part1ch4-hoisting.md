### 提升

#### 引子
```javascript
// ex1
a = 2;
var a;
console.log( a ); // 2

// ex2
console.log( a ); // undefined
var a = 2;
```

#### JS编译器原理
```javascript
// 上面两端代码实际过程
var a;
a = 2;
console.log( a );

var a;
console.log( a )
a = 2
```
> 这个过程就好像变量和函数声明从它们在代码中出现的位置被“移动”
到了最上面。这个过程就叫作提升 - **只有声明会被提升，赋值和其他逻辑留在原地**

#### 函数提升关键点
> 函数声明会被提升，但是函数表达式却不会被提升。
```javascript
foo(); // 不是 ReferenceError, 而是 TypeError! => undefined() 所以TypeError
var foo = function bar() {
  // ...
};
```
#### 函数|变量提升优先级
> 同级作用域中, 函数会首先被提升，然后才是变量
+   原始代码
```javascript
foo(); // 1
var foo;
function foo() {
  console.log( 1 );
}
foo = function() {
  console.log( 2 );
};
```

+   实际执行
```javascript
function foo() {
  console.log( 1 );
}
foo(); // 1
foo = function() {
  console.log( 2 );
}
```
> var foo 尽管出现在 function foo()... 的声明之前，但它是重复的声明（因此被忽略了），因为函数声明会被提升到普通变量之前。

> 尽管重复的 var 声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的

> 莫要糟糕的重复声明， 莫要再块内部声明函数（非极 端场景下）