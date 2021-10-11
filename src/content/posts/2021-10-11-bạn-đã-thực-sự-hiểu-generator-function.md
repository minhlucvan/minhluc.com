---
template: blog-post
title: Bạn đã thực sự hiểu generator function?
slug: /ban-da-thuc-su-hieu-generator-function
tags:
  - js
  - code4fun
category: Công nghệ
date: 2016-11-18 09:01
description: "Hello anh em, hình như blog chưa có bài viết nào về
  [#ES6](/tags/es6) cả hôm nay mình sẽ quết định viết về **generator function**
  vì thành thật mà nói mình cũng chưa thực sự hiểu thằng này lắm :3, tiện đây
  mình sẽ giới thiệu một số ứng dụng cũng như tiềm năng của tính năng này trong
  các tác vu thực tế. "
featuredImage: /assets/javascript-generator-funtion.png
---
Hello anh em, hình như blog chưa có bài viết nào về [#ES6](/tags/es6) cả hôm nay mình sẽ quết định viết về **generator function** vì thành thật mà nói mình cũng chưa thực sự hiểu thằng này lắm :3, tiện đây mình sẽ giới thiệu một số ứng dụng cũng như tiềm năng của tính năng này trong các tác vu thực tế. 

<!--more-->

{% image "javascript-generator-funtion.png" "javascript generator function" %}

## cái nhìn đầu tiên 

Một trong những tính năng mình thấy tú vị nhất trong **ES6 -  ECMAScript 2015** chính là **generator function**, khi lướt qua các tính năng của ES6 và bắt gặp tính năng này suy nghĩ đầu tiên trong đầu mình chính là...

> cái WTF gì thế, bác [Allen Wirfs-Brock](http://www.wirfs-brock.com/allen/about) đúng là rảnh rỗi, tại sao lại sáng tạo ra cái thứ này trong khi callback với promisse là làm async tốt rồi, iteritor thì for với while là được, cái máy phát điện này chả phải là đồ bỏ đi hay sao. trong khi tình hình tình hình giang hồ đang loạn tiễn phân tâm như nhế này bớt học được cái gì thi hay cái đó :'‑(

hôm nay dạo qua một vòng google thấy cái thứ bỏ đi này cũng lợi hại ra phết. để tìm hiểu tại sao lại có cái này mình sẽ đi từ nề tảng của nó, **iterator**.

## Iterator
**Iterator** chính là thứ mà ai cũng dùng nhưng không phải ai cũng biết đến nó (đừng tin nó lừa đấy >:( ), cũng giống trong các ngôn ngữ khác **iterator** là một đối tượng dùng để truy cập vào một dãy các phần tử, mỗi lần nó sẽ trả lại phầ tử tiếp theo trong dãy và giữ  được tứ tự duyệt mỗi lần nó được gọi đến. **javascript iterator** là một đói tượng cung cấp phương thức ``next()`` trả lại một đối tượng gồm hai thuộc tính là ``done`` kiểm tra xem dãy đã duyệt hết chưa và ``value`` gía trị phần tử tiếp theo trong dãy.

```javascript
function makeIterator(array){
    var nextIndex = 0;
    
    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    }
}

```

Một khi đã được khởi tạo chúng ta có thể gọi ``next`` để duyệt qua thằng tiếp theo.

```javascript

var it = makeIterator(['one', 'tưo',]);
console.log(it.next().value); // 'one'
console.log(it.next().value); // 'two'
console.log(it.next().done);  // true

```

Thấy quen quen chưa nào? chuẩn cơm mẹ nấu rối, đây chính chính là cha đẻ của ``function *`` chứ gì nữa B-).

![](200w.gif)

## Generator

**Iterator** là một pattern thực sự hữu dụng nhưng khá lắt léo trong cài đặt và không dễ dàng để maintain được các trạng tái của nó, đến đây mới thấy đúng là **JS** đang thiếu một cú pháp chuẩn cho pattrens này nể khai thác hết tiềm năng của nó, và... à,  vâng xin trân trọng giới thiệu **Generator function** còn được biết đến với biệt danh ``function *`` hay ``yield function``:

 ```javascript

function* idMaker(){
  var index = 0;
  while(true)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

```
có thể hiểu **generator** là một loại function tạo ra **iterator**, một function được gọi là **generator** nếu bên trong có chứa một hay nhiểu biểu thức ``yield`` và được khai báo bằng từ khóa ``function *``: 

```javascript

var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

for(let value of myIterable){ 
    console.log(value); 
}

//hay

[...myIterable] // [1, 2, 3]

```
{% pullquote "full tip" %}
nếu trong ``function *`` có nhiều giá trị ``yield`` thì mỗi lần gọi ``next()`` biểu thức ``yield`` tiếp theo sẽ được thực hiện, giống như là hàm bị đóng băng lại chờ lần gọi ``next`` tiếp theo vậy. sử dụng cái này mà tràn lan thì có thể dẫn đến khó debug và quản lý state, hãy thử tưởng tượng trong hàm của bạn có vài lệnh **lặp**, vài lệnh **rẽ nhanh** và vài cái ``yield`` thì...  
{% endpullquote %}

![](vut.gif)

## Built-in iterables
Còn nhớ ở trên mình nói là bạn dùng **iterator** rồi không 8-), không đúng đâu nhé, bạn không chỉ dùng rồi mà còn dùng nó hăng ngày nữa. các đối tượng trong javavascript như ``String``, ``Array``, ``TypedArray``, ``Map`` và ``Set`` đều có built-in iterables để duyệt các phần tử, bởi vì ``prototype`` của các đối tượng này đều có  phương thức ``Symbol.iterator``.

### các biểu thức với iterables
một vài biểu thức thao tác với **iterator** bao gồm vòng lặp **for-of**, **spread operator**, **yield**, và **destructuring assignment**.

```javascript

for(let value of ["a", "b", "c"]){
    console.log(value)
}
// "a"
// "b"
// "c"

[..."abc"] // ["a", "b", "c"]

function* gen(){
  yield* ["a", "b", "c"]
}

gen().next() // { value:"a", done:false }

[a, b, c] = new Set(["a", "b", "c"])
a // "a"

```

###  yield*

cũng như ``function *`` nói chung là thằng nào cứ có thêm cai **"*"** là như cầm cờ trong tay rồi cờ đến tay ai người đó phất thôi :D. biểu thức ``yield`` nhận vào một ``iterator`` khác hoặc một mảng khi chạy đến nó sẽ lần lượt chạy qua các giá trị của ``yield*`` rồi mới tới các ``yield`` tiếp theo.

```javascript

function* fn1(i){
	yield i + 10;
	yield i + 20;
	yield i + 30;
}

function* fn2(){
	var i = 1;	
	yield i;
	yield* fn1(i);
	yield i +1;

}

var gen = fn2();

[...gen] //[1, 11, 21, 31, 2]

```

nói nôm na thì nó có vẻ giống với callback :D.

## Kết Luận
À thôi để thay cho lời kết mình xin đưa ra một số ứng dụng thực tế của thằng này nhé:

### 1Async / Await
bạn đã nghe đến  async/await chưa, nếu chưa thì hãy tập làm quên đi vì tính năng này sẽ được đưa vào ES7 đấy, và tin mình đi, nó thực sự đáng đồng tiền bát gạo đấy:

code của bạn từ thế này

```javascript

const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => resolve('future value'), 500);
});

const promiseFunc = () => new Promise((resolve) => {
  fetchSomething().then(result => {
    resolve(result + ' 2');
  });
});

promiseFunc().then(res => console.log(res));

```

sẽ biến thành thế này: 

```javascript


const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => resolve('future value'), 500);
});

async function asyncFunction() {
  const result = await fetchSomething(); // returns promise

  // waits for promise and uses promise result
  return result + ' 2';
}

asyncFunction().then(result => console.log(result));

```

### một chút tương tác

một trong những điểm thú vị của **generator**  là hàm next có thể nhận lại một đối số để quết định nên làm gì tiếp theo, bạn sẽ thích ví dụ này cho mà xem <3 :

```javascript

function* crossBridge() {
  const reply = yield 'What is your favorite color?';
  console.log(reply);
  if (reply !== 'yellow') return 'Wrong!'
  return 'You may pass.';
}

{
  const iter = crossBridge();
  const q = iter.next().value; // Iterator yields question
  console.log(q);
  const a = iter.next('blue').value; // Pass reply back into generator
  console.log(a);
}

// What is your favorite color?
// blue
// Wrong!


{
  const iter = crossBridge();
  const q = iter.next().value;
  console.log(q);
  const a = iter.next('yellow').value;
  console.log(a);
}

// What is your favorite color?
// yellow
// You may pass.

```

### Generator + Promise

một sự kết hợp hoàn hảo, có lẽ nào 2 thứ này sinh ra để giành co nhau:

```javascript


const isPromise = (obj) => typeof obj !== 'undefined' &&
  typeof obj.then === 'function';

const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setImmediate(() => next(iter, callback, val));
    });
  } else {
    setImmediate(() => next(iter, callback, value));
  }
};

const gensync = (fn) =>
    (...args) => new Promise(resolve => {
  next(fn(...args), val => resolve(val));
});



/* How to use gensync() */

const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => resolve('future value'), 500);
});

const asyncFunc = gensync(function* () {
  const result = yield fetchSomething(); // returns promise

  // waits for promise and uses promise result
  yield result + ' 2';
});

// Call the async function and pass params.
asyncFunc('param1', 'param2', 'param3')
  .then(val => console.log(val)); // 'future value 2'

```

### Observables và còn nhiều nữa......

**@minhlv with <3**