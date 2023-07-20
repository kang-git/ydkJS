### 函数作用域

#### 基本概念
> 函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。这种设计方案是非常有用的，能充分利用JavaScript 变量可以根据需要改变值类型的“动态”特性

> 函数作用域会把变量和函数包裹在一个函数的作用域中，然后用这个作用域来“隐藏”它们

> 在软件设计中，应该最小限度地暴露必要内容，而将其他内容都“隐藏”起来，比如某个模块或对象的 API 设计

#### 解决作用域内命名冲突的方法
+ xxxxxxxxxx33 1var obj = {2a: 1,3b: 2,4c: 35};6// 单调乏味的重复 "obj"7obj.a = 2;8obj.b = 3;9obj.c = 4;10// 简单的快捷方式11with (obj) {12a = 3;13b = 4;14c = 5;15}16​17function foo(obj) {18with (obj) {19a = 2;20}21}22var o1 = {23a: 324};25var o2 = {26b: 327};28foo( o1 );29console.log( o1.a ); // 230foo( o2 );31console.log( o2.a ); // undefined32console.log( a ); // 2——不好，a 被泄漏到全局作用域上了！33​javascript
+ 模块管理机制

> 函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在何处

#### 匿名和具名函数

#### 立即执行函数表达式 IIFE
```javascript
// 具名
(function(){ ... })()
(function(){ ... }())

// 匿名
(function IIFE(){})()
(function IIFE(){}())
```

#### 具名IIFE倒置代码执行顺序
```javascript
var a = 2;

(function IIFE( def ) {
def( window );
})(function def( global ) {
var a = 3;
console.log( a ); // 3
console.log( global.a ); // 2
});
```
> 上面代码中function def(global){...} 被当作参数传进IIFE, 然后再IIFE内部被调用执行了



### 块作用域

#### 基本信息
> 块作用域是一个用来对之前的最小授权原则进行扩展的工具，将代码从在函数中隐藏信息扩展为在块中隐藏信息

#### 会创建块作用域的机制
+ for循环
+ with
+ try/catch
```javascript
// try/catch的catch分句会创建一个块作用域
try {
undefined(); // 执行一个非法操作来强制制造一个异常
}
catch (err) {
console.log( err ); // 能够正常执行！
}
console.log( err ); // ReferenceError: err not found
```
+ let
> let 关键字可以将变量绑定到所在的任意作用域中（通常是 { .. } 内部）。换句话说let 为其声明的变量隐式地了所在的块作用域
+ const
> const，同样可以用来创建块作用域变量，但其值是固定的（常量）

> 块作用域通常会结合 提升 做一些理论扩展
> 块作用域也和闭包的机制有很大联系


```javascript
function process(data) {
    // 在这里做点有趣的事情
}
var someReallyBigData = { .. };
process( someReallyBigData );
var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt) {
    console.log("button clicked");
}, /*capturingPhase=*/false );

//   |    |
//  \|/  \|/ 
// 使用块作用域显示地声明变量能够带来明确的垃圾回收效果
//   |    |
//  \|/  \|/

function process(data) {
// 在这里做点有趣的事情
}
// 在这个块中定义的内容可以销毁了！
{
let someReallyBigData = { .. };
process( someReallyBigData );
}
// 在这个未知 someReallyBigData 一定被回收了
var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt){
console.log("button clicked");
}, /*capturingPhase=*/false );

```