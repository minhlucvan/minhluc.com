---
template: blog-post
title: " NOSQL có đồng nghĩa với NO Injection?"
slug: /nosql-co-dong-nghia-voi-no-injection
tags:
  - db
  - nosql
  - security
category: Công nghệ
date: 2016-12-06 15:33
description: >
  
  Chắc hẳn chúng ta đã khá quen thuộc với khái niệm **``SQL Injection``** đây là một lỗi hổng phổ biến nhất cũng như nguy hiểm nhất với các trang web trên Internet. "Gần đây" với sự phất triển của những loại database mới như **``graph database``** và **``NoSql``**  đã làm phong phú hơn lựa chọn dataabase của các dự án phàn mềm.
featuredImage: /assets/jsql-injection-1000x571.jpeg
---
Chắc hẳn chúng ta đã khá quen thuộc với khái niệm **``SQL Injection``** đây là một lỗi hổng phổ biến nhất cũng như nguy hiểm nhất với các trang web trên Internet. "Gần đây" với sự phất triển của những loại database mới như **``graph database``** và **``NoSql``**  đã làm phong phú hơn lựa chọn dataabase của các dự án phàn mềm.

<!--more-->

Chắc hẳn chúng ta đã khá quen thuộc với khái niệm **``SQL Injection``** đây là một lỗi hổng phổ biến nhất cũng như nguy hiểm nhất với các trang web trên Internet. "Gần đây" với sự phất triển của những loại database mới như **``graph database``** và **``NoSql``**  đã làm phong phú hơn lựa chọn dataabase của các dự án phàn mềm.

Với những ưu điểm của mình như:

- Mã nguồn mở
- khả năng mở rộng linh hoạt
- Phù hợp với điện toán đám mây và bigData.

các  csld NoSql như ``MongoDb`` hay ``redis`` là những lựa chọn đáng để cân nhắc với những hệ thống lớn, những một khía cạnh có lẽ không được nhắc đến nhất là ở Việ Nam mình đó chính là tính bảo mật của những csld này, cuối tuần rảnh rỗi sinh nông nổi mình quyết định viết một bài để đánh giá tính bảo mật của csld **``NoSQL``**.

Trước khi bắt đầu để tránh gạch đá mình xin làm rõ một vắn để là bản thân CSLD chỉ là:  "một tập hợp thông tin có cấu trúc. Tuy nhiên, thuật ngữ này thường dùng trong công nghệ thông tin và nó thường được hiểu rõ hơn dưới dạng một tập hợp liên kết các dữ liệu, thường đủ lớn để lưu trên một thiết bị lưu trữ như đĩa hay băng. Dữ liệu này được duy trì dưới dạng một tập hợp các tập tin trong hệ điều hành hay được lưu trữ trong các hệ quản trị cơ sở dữ liệu." vậy nên nếu vọi vàng đánh giá csld này an toàn csld kia không an toàn chưa hẳn đã chính xác mà một nhân tố vô cùng quan trọng nữa là hện quản trị CSDL (HQTCSDL)  ta sử dụng cũng như driver mà ta sử dụng để giao tiếp với HQTCSDL, nội bài biết này mình sẽ giới thiệu một bài lỗ hổng thường gặp trong các HQTCSDL  NoSQL., mà cụ thể là **``MongoDb``** HQTCCSDL NoSQL phổ biến nhất hiện nay.

### Cơ Chế Hoạt Động

Ngay trên trang [MongoDB Developer FAQ](https://www.mongodb.com/blog/post/securing-mongodb-part-4-environmental-control-and-database-management) có nói: 


> "... with MongoDB we are not building queries from strings, so traditional SQL injection attacks are not a problem."

tức là MongoDb có thể tránh được tất cả các loại SQL injection truyển thống, thay vào đó các hacker lại sự dụng một ký thuật đặc thù cho NoSql đó là **``NoSQL Injection``**.![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/8wv4as2wkw_Untitled.png)

cũng như **``SQL injection``** để có thể thực hiện **``NoSQL Injection``** hacker cũng phải truy vấn lên server, dựa vào request từ client server sẽ truy vấn đến Database và nhận lại kết quả từ database để trả cho client. Nhiệm vụ của hacker là phải làm sao để hiểu sai request dẫn đến thực hiện một câu truy vấn không mong muốn đến database cuối cùng  hacker sẽ lấy được thông tin mong mốn hoặc ngiêm trọng hơn là tthay đổi thậm chí là xóa  dự liệu trong csdl.


điểm khác của **``NoSQL Injection``** so với **``SQL Injection``** truyển thống là: 

- câu truy vấn cho khối dữ liệu không cấu trúc.
- các HQTCSDL rất đa dạng và khác biệ nhau khá nhiều trong cachs tổ chức dữ liệu cũng như truy vấn.
-  cho phép truy cập trực tiếp client-database thông qua RESTfull API.

### Các Loại Tấn Công

có 3 loại tấn công **``NoSQL Injection`` chủ yêu là:

- Login bypass for MongoDB on PHP and NodeJS
- String concatenation
- Escaping flaws of drivers

#### 1.  LOGIN BYPASS

đây là loại tấn công rất nguy hiểm vì hacker có thể bỏ qua quy trình đăng nhập và giành quên một cách không mất khó khăn.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/oweob0dteu_Bypass-Login-sql-injection.png)

giả sử ta có một đoạn login sử dụng NodeJs - express.js - mongodb  như sau:

```javascript 
// NodeJS with Express.js
db.collection('users').find({
"user": req.query.user,
"password": req.query.password
});
```

ở đây ta sử dụng luôn tham số trong request của client để thuwchj hiện câu truy vấn đên database. với dự đoán than số mà người dùng gửi lên sẽ dạng như này:

`` ✔ https://example.org/login?user=patrick&password=1234``
trong trường hợp này nếu ông hacker vui tính nào đó gửi lên một request dang như này thì chuyện gì sẽ sảy ra:
``	⚡ https://example.org/login?user=patrick&password[%24ne]= ``

khi đó câu query của chúng ta sẽ như thế này

```javascript
// NodeJS with Express.js
db.collection('users').find({
"user": "patrick",
"password": {"&ne": ""}
});
```

serlector ``&ne`` (not equals) sẽ tìm những bản gì khong bằng giá trị "" tức là trường password sẽ luôn luôn true, hacker đã by pass thanh công.

### 2. String Concat

Tương tự như **``SQL Injection``** vấn đề nối chuỗi (string concat) vẫn là một vấn đề, nếu dev code cẩu thả thì hacker có thể lợi dụng để injectect những đoạn ký tự đặc biệt làm câu query bị thực thui sai mục địch.

vẫn là chức năng đăng nhập trên làn này ta chọn một cách cài đặt khác như sau:

```javascript
// nodejs example
var string query = “{ username: ‘“ + user + “’, password: ‘” + password + “’ }”

```
một đoạn có trông có vẻ ngây thơ vô tội nhỉ? nhưng với hacker thì đây đúng là một cơ hội vàng. 

``⚡ https://example.org/login?username=admin’, $or: [ {}, { ‘a’:’a&password=’ } ], $comment:’hacked’``

với request trên câu query của chúng ta sẽ biến thành thế này:

```javascript

{ username: ‘tolkien’ , $or: [ {}, { ‘a’: ‘a’, password: ‘’ } ], $comment: ‘hacked’ }

```

OMG, một lần nữa chúng ta đã bypass được login với biểu thức toán tử ``$or : [true, false ]`` sex trar laij keets quar true :D

Ngoài ra còn khá nhiều kỹ thuật tấn công khác nếu hứng thú anh em có thể hỏi bác gut gồ nhé.

MinhLucVan 09-07-2017