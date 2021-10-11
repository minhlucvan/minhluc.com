---
template: blog-post
title: Viết JS theo phong cách hướng module - phần 2
slug: /viet-js-theo-phong-cach-huong-module-phan-2
tags:
  - js
  - designparter
  - code4fun
category: Công nghệ
date: 2016-09-21 06:52
description: Tiếp nối series về java module hóa trong javascript hôm nay chúng
  ta sẽ đề cập đến một đề cũng rất quan trọng đó chính là bundeling. Với nodejs
  hoặc một số framework font-end như Angular 2, React dều recommend viết hướng
  module và chia ra nhiều file khác nhau đến khi build các file sẽ được gộp lại
  một file duy nhất và thực thi, còn với các úng dụng tự xây dựng thì sao?. bài
  viết này sẽ đề cập đến vấn sử dụng browersify và babel để module hóa ứng dụng
  ra từng file và build lại để dược một ứng dụng hoàn chỉnh, like a boss :D.
featuredImage: /assets/module2.jpeg
---
Tiếp nối series về java module hóa trong javascript hôm nay chúng ta sẽ đề cập đến một đề cũng rất quan trọng đó chính là bundeling. Với nodejs hoặc một số framework font-end như Angular 2, React dều recommend viết hướng module và chia ra nhiều file khác nhau đến khi build các file sẽ được gộp lại một file duy nhất và thực thi, còn với các úng dụng tự xây dựng thì sao?. bài viết này sẽ đề cập đến vấn sử dụng browersify và babel để module hóa ứng dụng ra từng file và build lại để dược một ứng dụng hoàn chỉnh, like a boss :D.

## Bundling là gì

Chắc hẳn các bạn cũng không xa lạ gì với thuật ngữ này nữa bundling chính là việc ta chi ứng dụng ra các module một module lưu và một file riêng và require tất các các module cần thiết trong quá trình build.

Bundling thực sự rất có ý nghĩa nhất là với các ứng dụng có scope lớn cũng như team nhiều thành viên hoặc ứng dụng có yêu cầu maintain lâu dài. việc chia ra mỗi module một file chắc chắn sẽ giúp cho quá trình phát triển dễ dàng hơn và hạn chế được nhiều lỗi do các thành viện rọng team gây ra.

## Một số  cách Bundling

### link trực tiếp

Cách đơn gian nhất chính là cứ  viết mỗi module một file rồi link từng file vào trang HTML, cách này nói chung khá là bất tiện mỗi khi thêm một module ta lại phải mở trang HTML thêm thêm sửa sửa vừa dễ nhầm vừa mất thơi gian.

Rồi đến khi thay dổi tên module hay đường dẫn thì câu chuyện kinh dị lại tiếp tục, dev lại phải hì hục sửa sửa xóa xóa :(.

Còn chưa kể cách này thực sự không tốt khi xét đến hiệu năng, số lượng module càng lớn thì số request mà trang thực hiện cũng tăng tho dẫn đến tóc độ load trang sé trở nên rất sờ lâu.

### sử dụng require.js

[Requirejs](http://requirejs.org/) là một công cụ  JavaScript file and module loader chạy trên trình duyệt khi sử dụng ta chi cần một chút config về đường dẫn đến các module khi ta require module nào nó sẽ tự động load module đó vào trình duyệt. Nghe có có vẻ mọi thứ đề hoàn hảo chỉ trừ một hạn chế nó là hiệu năng vẫn chưa tốt nếu ta chia các module quá nhỏ.

### sử dụng webpack

Và rồi Nodejs ra đời với [commonjs](<>) (một version của requirejs chạy trên node) và [systemjs](https://github.com/systemjs/systemjs) một module loader khác hỗ trợ ES6, đàu tiền các công cụ module loader này tạo ra để phục cụ ứng dụng Nodejs server side nhưng về bạn chất ứng dụng backend hay front end viết bằng js là hoàn taonf giống nhau và hoàn oàn có thể dùng các module loader này đề build ứng dụng front-end giống như làm với back-end vậy.

Như mình đã giới thiệu ở một bài viết trước đây webpack là  một cộng cụ build tuyệt vời cho front end app hôm nay a sẽ sử dụng webpack kết hợp với mọt công cụ là babelfy để chuyển cú pháp ES6 về ES5.

## Ví dụ

Bỏ qua mớ lý thuyết xuông đi, hôm nay mình sẽ làm 1 ví dụ chỉ mang tính minh họa thôi ạ, vì nghĩ mãi mà không ra cái gì hay ho cả :D.

Mình sẽ làm 1 ứng dụng gồm hiện thị ra màn hình 3 vận thể 1 quả bóng, một khối hộp và một chú cún, 3 vật thể này sẽ được gắn ngẫu nhiên 3 hành động blink (nhấp nháy ), bounce (nảy) và spin (xoay). cơ bản là thế điều quan trọng là mỗi một class ta sẽ viết trên 1 file.

### Chuẩn bị

* Đầu tiên ta phải có nodejs và npm, tất nhiên rồi :)
* Tiếp theo là cài wpebpack:

```shell
npm i -g ưebpack
```

\-tạo thư mục `demo` và khởi tạo npm project trong thư mục này.

Cài babel-loader và babel-presents-es2015  để dịch ES6

```shell
npm install --save-dev  babel-loader babel-preset-es2015
```

### OK, Let's go

tiếp theo tạo các file và thư mục của project như sau:

* xxx/demo
  		- package.json
  		- webpack.config.js
  		- node_modules (binary root)
  		- src
  			- app.js
  			- behavior
  				- action.js
  				- blink.js
  				- spin.js
  			- body
  				- body.js
  				- circle.js
  				- square.js
  				- dog.js
  		- dest
  			- dog.png
  			- index.html

Webpack sử dụng file `webpack.config.js` để chứa các tùy chọn build, để đơn giản hóa ta sẽ rút gọn hết mức có thể, `webpack.config.js` sẽ trông như sau:

```javascript
var path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dest'),
        filename: 'main.js'
    },
    module: {
        loaders: [
               {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
```

File này chỉ ddơn giản là bảo webpack dịch file `src/app.js` ra file 
`dest/main.js` và dùng babel để chuyển es2015 sang es5 thôi.

tiếp theo ta phải có file `index.html` để trình duyệt còn chạy vào, file này sexchuwas 1 caí khung rỗng và load file main.js vào.

```HTML
   <!doctype html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>webpack ES6 demo</title>
        <style>
            #container{
                position: relative;
                width: 700px;
                height: 300px;
                border: solid 10px black;
            }
            #author{
                position: absolute;
                bottom: 5px;
                right: 5px;
                font-size: 11px;
            }

            #author a{
                text-decoration: none;
                color: blue;
            }
        </style>
    </head>
    <body>
        <div id="container">
            <div id="author">
                 	<a href="http://minhlv.ga/">&copy; http://minhlv.ga</a>
                <br>
                all rights reserved
                </div>
        </div>
    <script src="main.js"></script>
    </body>
    </html>
```

he, suýt nữa quên công việc chính :D. Về phần javajcript file chính của ta là `app.js` file này sẽ import  các module khác  và tạo thành ứng dụng hoàn chỉnh.

`src/app.js`

```javascript
import Circle from "./body/circle.js";
import Dog from "./body/dog.js";
import Square from "./body/square.js"

import Blink from "./behavior/blink.js";
import Spin from "./behavior/spin.js";
import Bounce from "./behavior/bounce.js";

class App{
    constructor(){
        this.actions = [Blink, Spin, Bounce];
        this.bodies = [];
        this.render();
    }

    render(){
        this.container = document.getElementById("container");
        var body1 = new Circle(80, 150, 20);
        var body2 = new Dog(180, 150);
        var body3 = new Square(400, 150);
        this.addBody(body1);
        this.addBody(body2);
        this.addBody(body3);
        this.addAnimate();
    }

    addAnimate(){
        this.bodies.forEach((body) => {
            var action = this.getRandomAction();
            body.setBehavior(action);
        });

       // setTimeout(this.addAnimate.bind(this), 1000*60);
    }

    getRandomAction(){
        var num = Math.floor(Math.random()*(this.actions.length));
        var action = new this.actions[num];
        this.actions.splice(num, 1);
        return action;
    }

    addBody(body){
        this.container.appendChild(body.getShape());
        this.bodies.push(body);
    }
}

window.app = new App();
```

`src/body/body.js`

```javascript
class Body{
    constructor(x, y){
        if(typeof x === 'number' || typeof y === 'number'){
            this.x = x;
            this.y = y;
        }
    }
    
    defaultStyle(){
        this.shape.setAttribute('class', 'body');
        this.shape.style.position = 'absolute';
        this.shape.style.top = '0';
        this.shape.style.left = '0';
        this.shape.style.bacgroundColor = '#000';
        this.shape.style.color = '#fff';
        this.moveTo(this.x, this.y);
    }

    render(){
        this.shape =  document.createElement("div");
        return this.shape;
    }

    show(){
        this.shape.style.visibility = "";
    }

    hide(){
        this.shape.style.visibility = "hidden";
    }

    getShape(){
        return this.shape;
    }
    moveTo(x, y){
        if(typeof x !== 'number'  || typeof y !== 'number') return;
        this.shape.style.top = y+'px';
        this.shape.style.left = x+'px';
    }
    setBehavior(behavior){
        this.behavior = behavior;
        behavior.setBody(this);
    }

    addTo(container){
        if(! container || typeof container.appendChild !== 'function') return;
        container.appendChild(this.getShape());
    }
}

export default Body;
```

`src/circle.js`

```javascript
import Body from "./body.js";

class Cicle extends Body{
    constructor(x, y, r){
        super(x, y);
       if(!r) r = 20;
       this.radius = r;
       this.render();
       this.defaultStyle();
    }

    render(){
        this.shape  = document.createElement("div");
        this.shape.style.width = 2*this.radius + 'px';
        this.shape.style.height = 2*this.radius + 'px';
        this.shape.style.borderRadius = '50%'; 
        
        return this.shape;
    }

    defaultStyle(){
        super.defaultStyle();
        this.shape.style.backgroundColor = "red";
    }
}

export default Cicle;
```

`src/square.js`

```javascript
import Body from "./body.js";

class Square extends Body{
    constructor(x, y, l){
        super(x, y);
       if(!l){
           l = 40;
       }
       this.length = l;
       this.render();
       this.defaultStyle();
    }

    render(){
        this.shape  = document.createElement("div");
        this.shape.style.width = this.length + 'px';
        this.shape.style.height = this.length + 'px';
        
        return this.shape;
    }

    defaultStyle(){
        super.defaultStyle();
        this.shape.style.backgroundColor = "green";
    }
}

export default Square;
```

`src/dog/js`

```javascript
import Body from './body.js';

class Dog extends Body{
    constructor(x, y){
        super(x, y);
        this.render();
        this.defaultStyle();
    }

    render(){
        super.render();
    }

    defaultStyle(){
        super.defaultStyle();
        this.shape.style.backgroundImage = 'url("dog.png")';
        this.shape.style.backgroundSize = "100% 100%";
        this.shape.style.width = '150px';
        this.shape.style.height = '80px';
    }

}

export default Dog;
```

`src/behavior/action.js`

```javascript
class Action {
    constructor(speed){
        if(!speed) speed = 20;
        this.loopTime = speed;
    }

    setBody(body){
        this.body = body;
        this.init();
        this.animate();
    }

    init(){

    }

    animate(){

    }
}

export default Action;
```

`src/behavior/blink.js`

```javascript
import Action from './action.js';

class Blink extends Action{
    constructor(speed){
        if(!speed) speed = 1000;
        super(speed);
    }

    init(){
        this.lastTime = - this.loopTime;
        this.state = -1;
    }
    
    animate(){
        window.setTimeout(this.nextFrane.bind(this), this.loopTime);
    }

    nextFrane(){
        if(this.state === 1){
            this.body.show();
        } else {
            this.body.hide();
        }
        this.state = - this.state;
        this.animate();
    }
}
export default Blink;
```

`src/behavior/spin.js`

```javascript
import Action from './action.js';

class Spin extends Action{
    constructor(speed){
        if(!speed) speed = 3;
        super(speed);
    }

    init(){
        this.angle = 0;
        this.lastTime = null;
    }
    
    animate(){
        window.requestAnimationFrame(this.nextFrane.bind(this));
    }

    nextFrane(time){
        if(this.lastTime && time - this.lastTime < this.loopTime/24)  return;
        this.lastTime = time;
        if(this.angle >= 360){
            this.angle = 0;
        } else {
            this.angle += 15;
        }
        this.body.shape.style.transform = "rotate("+ this.angle + 'deg)';
        this.animate();
    }
}
export default Spin;
```

`src/behavior/bounce.js`

```javascript
import Action from './action.js';

class Bounce extends Action{
    constructor(speed){
        if(!speed) speed = 2000;
        super(speed);
    }

    init(){
        this.lastTime = null;
        this.state = -1;
    }
    
    animate(){
        window.setTimeout(this.nextFrane.bind(this), 50);
        window.setInterval(this.nextFrane.bind(this), this.loopTime + 50);
    }

    nextFrane(){
        this.up();
        setTimeout(this.down.bind(this), this.loopTime/2);
    }

    up(){ 

        this.body.shape.style.transition = "all ease-out 1s";
        this.body.moveTo(this.body.x,  this.body.y - 100);
    }

    down(){

        this.body.shape.style.transition = "all ease-in 1s";
        this.body.moveTo(this.body.x,  this.body.y + 100);
    }
}
export default Bounce;
```

Phuzzz, dài quá!
Cuối cùng bạn chạy 

```shell
webpack
```

Và bùm!!! bất ngờ chưa? ứng dụng của bạn đã được build ra một file duy nhất `dest/main.js` bạn hãy mở  file index.html trình duyệt và tận hưởng thành quả thôi.

### Thành quả

Sau một thời gian code miệt mài cuối cùng ta sẽ có thành quả sau:

<iframe src="https://htmlpreview.github.io/?https://github.com/minhlucvan/demo-js-module/blob/main/dest/index.html" width="100%" height="350" />

bạn có thể tải mã nguồn tại [đây](https://github.com/minhlucvan/demo-js-module).

## Lời kết

Có lẽ bài này code hơi dài nhỉ, cái mình muốn show ở đây là cách chúng ta tạo ra app chứ không phải kết quả, mấy cái hiệu ứng nhảm shit này bất cứ ai phẩy tay cái cũng ra được. bạn sẽ thấy cách này tốt khi bạn bắt đầu xây dựng những sản phẩm thực sự, rồi càn maintain nhiều refactor thường xuyên mà nhân sự lại thay đổi liên tục.

Cảm ơn các bạn đã theo dõi bài viết. xin hẹn gặp lại ở bài viết sau.

@Minhlv.