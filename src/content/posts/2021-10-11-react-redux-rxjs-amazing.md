---
template: blog-post
title: React + Redux + Rxjs = AMAZING!
slug: /react-redux-rxjs-amazing
tags:
  - react
  - redux
  - rxjs
  - frontend
category: Công nghệ
date: 2016-10-21 14:55
description: Với các ứng dụng front-end nói chung và ứng dụng dơn trang nói
  riêng
  [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) hay
  [MVP](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) xem
  ra không đủ để quản lý trạng thái nhất là các ứng dụng có trạng thái phúc tạp
  hôm nào rảnh mình sẽ viết một bài về MVC - client-side , còn hôm nay chúng ta
  sẽ đề cập đến React. Một trong những điều mình thấy thú vị nhất với React
  chính là hệ sinh thái xung quanh nó với số lượng và chất lượng ngày càng tăng
  lên, có lẽ bởi vì React đã gãi đúng chỗ ngứa của các dev nên nhận được sự ủng
  hộ và đóng góp rất lớn của cộng đồng mà nguồn mở trên toàn thế giới. Bài viết
  này sẽ giới thiệu một bộ combo rất mạnh mẽ với các font-end developer đó là
  React + Redux + ReactiveX.
featuredImage: /assets/cover.jpeg
---

## Mở đầu

Dã làm ứng dụng javascript nhất ứng dụng front-end thì sẽ không thể tránh khỏi các tác vụ bất đồng bộ như đợi input người dùng, ajax, animation.. tuy React + Redux rất tuyệt vời nhưng có vẻ vẫn chưa đủ để xứ lý các tác vụ bất đồng bộ một cách đồng bộ, để lấp vào khoảng trống này rất nhiều dev front-end đã chọn [ReactiveX](http://reactivex.io/) cụ thể là [redux-rx](https://github.com/acdlite/redux-rx), không biết thư viện này có điểm gì hấp đẫn nhỉ?.

Đầu tiên có lẽ ta sẻ tỉm hiểu một chút vể [ReactiveX](http://reactivex.io/),  ReactiveX là một thự viện đa nền tảng cung cấp một loạt tiện ích cho phép lập trình viên dẽ dàng hơn trọng việc xủ lý các tác vụ bất đồng bộ phức tạp mà vẫ đảm bảo code sạch, dễ quả lý các trạng thái và nắm toàn quền điều khiển luồng dữ liệu đạng xử lý.

{% blockquote http://reactivex.io %}
ReactiveX is a combination of the best ideas from
the **Observer** pattern, the **Iterator** pattern, and **functional programming**
{% endblockquote %}

Một cách ngắn gọn mà nói thì những gì Jquery làm với DOM rxjs làm tương tự với data, với một loạt các toán tử xử lý các luồng dữ liệu một cách đơn giản và chủ động.

## redux-observable

[redux-observable](https://github.com/redux-observable/redux-observable) là một công cụ giúp tích hợp những tính năng tuyệt vời của reactiveX với redux nói một cách đơn giản thì ta sẽ có thể dispatch một observable.

cái đó thì có lợi gì? thực sự là nhiều cái lợi hơn bạn nghĩ dấy, ví dụ như:
- có thể sử dụng các toán tử của rxjs thao tác trên tập dữ liệu.
- cho phép hủy action một cách dễ dàng.
- xử lý lỗi dễ dàng và triệt để.
- thao tác dễ dàng với các tác vụ bất đồng bộ (tất nhiên rồi)
- và còn nhiều nữa,

tính năng đầu tiên là ta có thể dispatch một observable:

```javascript
//ta có thể dispatch một observable

const test = () => 
  Observable.of({ type: ‘TEST’, data: ‘hello world’ });
dispatch(test);

//hoặc một promise 

const test = () => 
  Promise.resolve({ type: ‘TEST’, data: ‘hello world’ });
dispatch(test);

//thậm chí là một array

const manyActions = () => [{ type: 'TEST1' }, { type: 'TEST2' }];
dispatch(manyActions); 
``` 
hàm dispatch sẽ trả lại một đối tượng obsever có nghĩa là ta có thể cancel trực tiếp action trong tương lai.

```javascript
const startTicking = () => 
  Observable.interval(1000)
    .map((i) => ({ type: 'TICK', i });
const sub = dispatch(startTicking);

// hủy action một cách trực tiếp
sub.unsubscribe();

```

một cách nữa để hủy action là dùng hàm takeUntil, tức là acion sẽ vẫn tiếp tục tực hiện cho đến khi nhận đực một action thông báo ngừng lại.
```javascript
const startTicking = (actions, store) => 
  Observable.interval(1000)
    .map((i) => ({ type: 'TICK', i }))
    .takeUntil(actions.ofType('STOP_TICK'));
dispatch(startTicking);

// ta sẽ ngừng TICK sau 1 giây
setTimeOut(() => dispatch({ type: 'STOP_TICK' }), 1000);
```
Thú vị đúng không nào! đây mới là bắt đầu thôi, middware mới là cái mình muốn nhắc đến. chắc hẳn mọi ngừời cũng không còn xa lạ với redux middware  nữa, middware là nơi chuyển tiếp action từ action creator đến reducers.

khi đã có một observable, với middleware ta có thể làm rất nhiều thứ hhay ho, 

đây là ví dụ hoàn chỉnh việc sử dụng middware:
{% raw %}
<a class="jsbin-embed" href="http://jsbin.com/jexomi/12/embed?js,output">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.40.2"></script>
{% endraw %}

với epicMiddleware mọi tác vụ bất đồng bộ trở nên dễ dàng hơn rất nhiều, ta có thể làm tuần tự  hoặc một song song một nhóm action mà vẫn dễ dàng quản lý được thạng thái của ứng dụng. quá tuyệt vời.

@minhlv