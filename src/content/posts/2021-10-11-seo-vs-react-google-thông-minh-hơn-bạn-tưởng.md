---
template: blog-post
title: " SEO vs. React: Google thông minh hơn bạn tưởng!"
slug: /seo-vs-react-google-thong-minh-hon-ban-tuong
tags:
  - react
  - seo
  - frontend
category: Công nghệ
date: 2016-10-21 16:35
description: Ngày nay các úng dụng web đang dần thay thế dần các website truyền
  thống với một loạt các công nghệ hiên đại để xây dựng ứng dụng web từ
  ajax-based, Backbone, Angular, Ember, React rồi Web-components... Nhưng một
  trong nhưng điểm Nhiều nghười vẫn lo ngại chính là những ứng dụng web không
  thân thiện với SEO, liệu điều đó thực hư ra sao???
featuredImage: /assets/cover.png
---
Ngày nay các úng dụng web đang dần thay thế dần các website truyền thống với một loạt các công nghệ hiên đại để xây dựng ứng dụng web từ ajax-based, Backbone, Angular, Ember,  React rồi Web-components... Nhưng một trong nhưng điểm Nhiều nghười vẫn lo ngại chính là những ứng dụng web không thân thiện với SEO, liệu điều đó thực hư ra sao???

<!--more-->

QUan niệm trong nghề: các crawlers của các máy tìm kiếm sẽ không thể thu thập đầy đủ nội dung của trang hiện thị trên trình duyệt, nó chỉ có thể hiện thị nội dung HTML trong lần đầy duyệt trang những nội dung động được dựng bằng javascript sau đó sẽ bị bỏ qua.

Sẽ ra sao nếu HTML chỉ chứa vài ba meta tag và script tag, máy tìm kiếm sẽ nhìn thất trang của bạn hầu như trống rỗng và xệp hạng tấp cho tranng web của bạn.

Tôi thường thấy những hướng dẫn về SEO thững khuyến cáo tất cả nội dung của bạn phải được dựng từ phía server để máy tìm kiếm dễ dàng thấy đực nọi dụng của trang và xếp hạng cao hơn.

với tôi, lời khuên này có vẻ không thực tế, đây là năm 2016, người dùng mong chờ mội trạng web động và một trải nghiệm mượt mà hơn, và họ không muốn phải chuyển trạng co mỗi cú click chuột.

Vậy quan niệm "client-side rendering không thận thiện với SEO" liệu có còn chính xác?

## Cùng Tìm Hiểu

![](/assets/react-seo-1.gif)

Tôi không phải là một chuyên gia SEO, nhưng tôi quết định tìm hiểu mội chút về lĩnh cực này và đây là những gì tôi tìm thấy.

Đây là một bản [thông báo](https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html) từ Google trên trang blog webmaster của họ từu tháng 10/2015:

{% blockquote %}
Today, as long as you’re not blocking Googlebot from crawling your JavaScript or CSS files, we are generally able to render and understand your web pages like modern browsers. To reflect this improvement, we recently updated our technical Webmaster Guidelines to recommend against disallowing Googlebot from crawling your site’s CSS or JS files.

đại ý là chúng tôi hoàn toàn có thể dựng và hiểu trạng web cảu bạn như những trình duyệt hiệ đại, bao gồm việc thực thi javascript và dựng lại những nội dụng động của trang.
{% endblockquote %}

Còn đây la một [bài viết](http://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157) từ Search Engine Land từ tháng 5/2015.

{% blockquote %}
We ran a series of tests that verified Google is able to execute and index JavaScript with a multitude of implementations. We also confirmed Google is able to render the entire page and read the DOM, thereby indexing dynamically generated content.

SEO signals in the DOM (page titles, meta descriptions, canonical tags, meta robots tags, etc.) are respected. Content dynamically inserted in the DOM is also crawlable and indexable. Furthermore, in certain cases, the DOM signals may even take precedence over contradictory statements in HTML source code. This will need more work, but was the case for several of our tests.

đại ý: chúng tôi đã thực hiện mội số thử nghệm và xác nhận rằng Google có thể thực thi javascript. Nội dưng đâộng đực tự động thêm vào DOM cũng được crawler thu nhậ đầy đủ , trong nhieeuf trường hợp, mặc dù tính năng này vãn chưa hoàn thiệ nhưng ố cũng đã vượt qua được rất nhiều test case khác nhau.
{% endblockquote %}

## Preactjs.com Test

Gần đây tôi có một tweet than thở về SEO, tôi đang trong quá trình chuyển sang [Preact](http://www.preactjs.com/), mội thưu viện nhẹ thay thế cho React của Facebook. tôi đã nhận được một trả lời từ [ Jason Miller](https://twitter.com/_developit) mội trong những dev phát triển Preact:

![](/assets/react-seo-3.png)

Bên cạnh nghiệ cứu của Search Engine Land tooi vừa mới trích dấn bên trên Jason  có dẫn mội link tìm kiếm của Google cho trang chủ của Preact.

![](/assets/react-seo-4.png)

đây là một trạng client-side rendering tuuwcs hà hầu hết nội dưng đề đựowcj javascript thêm vào từ phía trình duyệt web, code HTML từ sever sẽ trông như sau:

```html
<!DOCTYPE html><html><head>
<meta charset="utf-8">
<title>Preact: Fast 3kb React alternative with the same ES6 API. Components &amp; Virtual DOM.</title>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no">
<meta name="theme-color" content="#673AB8">
<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/png" href="/assets/app-icon-192.png" sizes="192x192">
<script>(function(url){window['_boostrap_'+url]=fetch(url);})('/content'+location.pathname.replace(/^\/(repl)?\/?$/, '/index')+'.md');</script>
<link rel="shortcut icon" href="/favicon.ico">
<link href="/style.6bae35e4ff9d687cb418.css" rel="stylesheet">
</head><body>
<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-6031694-20', 'auto');ga('send', 'pageview');</script>
<script type="text/javascript" src="/bundle.a0afd09fd48712ed0f26.js"></script>
</body></html>
```

Nếu như Googlebot không thể đọc được HTL sinh từ Preact kết quả tìm kiếm sẽ hầu như không có gì ngoài vài meta tags.

Và đây là kết quả tìm kiếm cho `site:preactjs.com`:

![](3.png)

Một bài [viết khác](http://andrewhfarmer.com/react-seo/) của [Andrew Farmer](https://twitter.com/ahfarmer) từu tháng 3/2016 cảnh báo về việc thiếu công nghệ support javascript từ những crawler khác Google:

{% blockquote %}
In my research I couldn’t find any evidence that Yahoo, Bing, or Baidu support JavaScript in their crawlers. If SEO on these search engines is important to you, you’ll need to use server-side rendering, which I’ll discuss in a future article.
{% endblockquote %}

Dưới đây là những kết quả tìm kiếm cho preact từ những máy tìm kiếm khác nhau.

## ✅ Bing

![](/assets/react-seo-6.5.png)

## ✅ Yahoo

![](/assets/react-seo-6.png)

## ✅ Duck Duck Go

![](/assets/react-seo-7.png)

## ⚠️ Baidu

máy tìm kiếm số một của trung quôc xem ra vẫn chưa đi kip với với các máy tìm kiếm khác, khi mà chỉ hiển thị được kết quả một cách hết sức khiêm tốn.

![](7.png)


## Kết Luận

QUa những test trên xem ra hầu hết các máy tìm kiếm đều có thể thực thi được javascript một cách khá đầy đủ trừ Baidu (hàng trung quốc mà :) ).

bài viết này không phải để lên án server-side redering mà chỉ muốn xóa bỏ định kiến về client-side rendering với SEO. nếu có bất cứ đóng góp nào các bạn cứ coment bên dưới bài viết nhé.

bản tiếng anh: <https://medium.freecodecamp.com/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9#.xcvaq4wnf>

@minhlv