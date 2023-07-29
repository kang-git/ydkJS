### 作用域闭包
> 内层函数持有对外层函数作用域的引用， 这个引用称作闭包

#### 循环和闭包
```javascript
for (var i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
```
> settimeout 异步执行，并且在每轮迭代中timer中引用的i 其实是封闭在一个共享的作用域中的，只有一个实际的i，settimeout开始执行的时候同步代码已经将i变成了6

> 如何输入满足预期的定时1～5
+ 使用IIFE
> 在迭代内使用 IIFE 会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。

```javascript
for (var i = 1; i <= 5; i++) {
  (function() {
    let j = i
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}
```

+ 块作用域拦截
```javascript
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

+ for 循环头部的 let 声明
> 在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量, 与var的作用完全不同
```javascript
for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
}
```

#### 模块
> 模块有两个主要特征：（1）为创建内部作用域而调用了一个包装函数；（2）包装函数的返回值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。