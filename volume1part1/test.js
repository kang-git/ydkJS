// function bar(fn){
//     fn()
// }
// function foo() {
//   var a = 2;
//   function baz() {
//     console.log(a); // 2
//   }
//   bar(baz);
// }

// foo()

// for (var i = 1; i <= 5; i++) {
//   setTimeout(function timer() {
//     console.log(i);
//   }, i * 1000);
// }

// for (var i = 1; i <= 5; i++) {
//   (function(j) {
//     setTimeout(function timer() {
//       console.log(j);
//     }, j * 1000);
//   })(i);
// }

// for (var i = 1; i <= 5; i++) {
//   (function() {
//     let j = i;
//     setTimeout(function timer() {
//       console.log(j);
//     }, j * 1000);
//   })();
// }

for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
