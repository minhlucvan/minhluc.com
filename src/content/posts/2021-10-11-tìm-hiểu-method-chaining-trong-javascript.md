---
template: blog-post
title: tìm hiểu Method Chaining trong Javascript
slug: /tim-hieu-ve-method-chaning-trong-javascript
tags:
  - js
  - code4fun
category: Công nghệ
date: 2016-06-21 00:13
description: Method chaining là một trong những patterm quen thuộc với những
  Javascript Programer. Bài viết mình sẽ gới thiệu Method Chainning là gì, cách
  cài đặt và những trường hợp thích hợp sử dụng patterm này. he, bắt đẩu thôi!
featuredImage: /assets/js_chaining.jpeg
---
## Method Chainning là cái gì?

Method chaining is a technique that can be used to simplify code in scenarios that involve calling multiple functions on the same object consecutively. This is an example of how you can use method chaining when using jQuery.

cũng không có gì cao siêu ở đây cả, Method Chainning là một kỹ thuật trong Javascript dùng để gọi một loạt các hàm của một đối tượng trong một câu lệnh duy nhất. dưới đây là mộ ví dụ đơn giản về cách sử dụng của Method Chainning trong Jquery.



```javascript

/** Example of method chaining in jQuery */


//////////////////////////
// WITHOUT METHOD CHAINING

var $div = $('#my-div');         // assign to var

$div.css('background', 'blue');  // set BG
$div.height(100);                // set height
$div.fadeIn(200);                // show element


///////////////////////
// WITH METHOD CHAINING

$('#my-div').css('background', 'blue').height(100).fadeIn(200);

// often broken to multiple lines:
$('#my-div')
  .css('background', 'blue')
  .height(100)
  .fadeIn(200);

  ```

As you can see, using method chaining can tidy up code quite a bit, however some developers dislike the visual style of method chaining and choose not to use it.

qua ví dự trên ta có thể thấy, sử dụng Method Chainning đã làm code ta ngắn đi khá nhiều, tuy nhiên nhiều lập rình viên không thích phong cách "chuỗi" của Method Chainning và không có thiện cam với nó.

## Bản chất của Method Chainning

để dễ hình dung ta sẽ tạo một class ``Kitten`` với cài đặt như sau.

```Javascript
// define the class
var Kitten = function() {
  this.name = 'Garfield';
  this.color = 'brown';
  this.gender = 'male';
};

Kitten.prototype.setName = function(name) {
  this.name = name;
};

Kitten.prototype.setColor = function(color) {
  this.color = color;
};

Kitten.prototype.setGender = function(gender) {
  this.gender = gender;
};

Kitten.prototype.save = function() {
  console.log(
    'saving ' + this.name + ', the ' +
    this.color + ' ' + this.gender + ' kitten...'
  );

  // save to database here...
};

```


giờ hãy tạo một thực thể của ``kitten`` và sử dụng nó.

```Javascript
var bob = new Kitten();

bob.setName('Bob');
bob.setColor('black');
bob.setGender('male');

bob.save();

// OUTPUT:
// > saving Bob, the black male kitten...
```

bạn có thấy có một sự lặp tại ở đây không, bản thân mình thích cách code đơn giản hơn và Method Chainning chính là giải pháp. 

```Javascript
var bob = new Kitten();

bob.setName('Bob').setColor('black');

// ERROR:
// > Uncaught TypeError: Cannot call method 'setColor' of undefined
```
code lỗi rồi :p ! tất nhiên, để sử dụng được nó ta phải cài đặt lại class ``kitten`` .

## Cài đặt Method Chainning

lớp ``kitten`` đưọc cài đặy lại như sau;

```Javascript
// define the class
var Kitten = function() {
  this.name = 'Garfield';
  this.color = 'brown';
  this.gender = 'male';
};

Kitten.prototype.setName = function(name) {
  this.name = name;
  return this;
};

Kitten.prototype.setColor = function(color) {
  this.color = color;
  return this;
};

Kitten.prototype.setGender = function(gender) {
  this.gender = gender;
  return this;
};

Kitten.prototype.save = function() {
  console.log(
    'saving ' + this.name + ', the ' +
    this.color + ' ' + this.gender + ' kitten...'
  );

  // save to database here...

  return this;
};

```
mấu chốt của vấn đề là mỗi phương thức đều trả lại tham chiếu đến chính nó qua cú pháp ``return this;``, như vậy ta có thể gọi một chuỗi các hàm của đối tượng đó.

```Javascript
///////////////////
// WITHOUT CHAINING

var bob = new Kitten();

bob.setName('Bob');
bob.setColor('black');
bob.setGender('male');

bob.save();

// OUTPUT:
// > saving Bob, the black male kitten...


///////////////////
// WITH CHAINING

new Kitten()
  .setName('Bob')
  .setColor('black')
  .setGender('male')
  .save();

// OUTPUT:
// > saving Bob, the black male kitten...
```
<3 