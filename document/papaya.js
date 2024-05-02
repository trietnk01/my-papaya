/*
 Navicat Premium Data Transfer

 Source Server         : My papaya
 Source Server Type    : MongoDB
 Source Server Version : 60015 (6.0.15)
 Source Host           : localhost:4200
 Source Schema         : papaya

 Target Server Type    : MongoDB
 Target Server Version : 60015 (6.0.15)
 File Encoding         : 65001

 Date: 02/05/2024 17:58:19
*/


// ----------------------------
// Collection structure for category_news
// ----------------------------
db.getCollection("category_news").drop();
db.createCollection("category_news");

// ----------------------------
// Documents of category_news
// ----------------------------
db.getCollection("category_news").insert([ {
    _id: "ceaa79dd-00e0-43bb-924b-70d1433e5912",
    category_name: "Thời sự"
} ]);
db.getCollection("category_news").insert([ {
    _id: "36a9620c-a567-406e-8203-82d2930da58f",
    category_name: "Góc nhìn"
} ]);
db.getCollection("category_news").insert([ {
    _id: "db336990-d148-4fea-bcd2-b9beafd44f4d",
    category_name: "Thế giới"
} ]);
db.getCollection("category_news").insert([ {
    _id: "586ad0ea-04da-494e-a3c6-0fcb65cefa34",
    category_name: "Kinh doanh"
} ]);
db.getCollection("category_news").insert([ {
    _id: "63344c47-c6c4-4c87-b656-620d1c6e2722",
    category_name: "Bất động sản"
} ]);
db.getCollection("category_news").insert([ {
    _id: "fdccb2d1-c072-442c-9e6d-2bba5118b93a",
    category_name: "Khoa học"
} ]);
db.getCollection("category_news").insert([ {
    _id: "ab5a7cce-ced1-4819-ba58-47330ecc75df",
    category_name: "Pháp luật"
} ]);

// ----------------------------
// Collection structure for news
// ----------------------------
db.getCollection("news").drop();
db.createCollection("news");

// ----------------------------
// Documents of news
// ----------------------------
db.getCollection("news").insert([ {
    _id: "ea8d83f7-08de-4e71-b79e-16b06fe5d8bc",
    news_title: "Các ý tưởng tận dụng gầm cầu thang",
    news_intro: "Với đặc trưng là góc tối, nhỏ và không vuông vắn, gầm cầu thang phù hợp bố trí tủ trữ đồ, kệ trang trí, phòng vệ sinh",
    news_content: "<p>Với những ngôi nhà có diện tích không quá lớn, có thể thiết kế gầm cầu thang thành các hệ tủ có khoang rộng. Điều này vừa tối ưu không gian, vừa tăng khả năng lưu trữ đồ dùng, rượu, giầy dép... mà vẫn đảm bảo thẩm mỹ cho công trình.</p><p><br></p><p>Lưu ý, nên lựa chọn kệ, tủ có màu sắc và chất liệu gỗ tương đồng với màu sắc nội thất gỗ trong nhà và gầm cầu thang, vì sẽ khiến cho không gian trở nên liền mạch, hài hòa hơn</p>",
    category_news_id: "63344c47-c6c4-4c87-b656-620d1c6e2722",
    publisher_id: "2b5caaa9-e516-4fb8-b060-cf16c0eba54f",
    news_img: "news-1.jpg"
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: "2b5caaa9-e516-4fb8-b060-cf16c0eba54f",
    username: "hrpapaya",
    password: "$2a$10$PspYayBz1LKXwZXomqRubeq7wTZZvpYG85Pc4U4jd.QzJjqjBU1Ai",
    email: "hrpapaya@dienkim.vn",
    display_name: "HR Papaya",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiMmI1Y2FhYTktZTUxNi00ZmI4LWIwNjAtY2YxNmMwZWJhNTRmIiwidXNlcm5hbWUiOiJocnBhcGF5YSIsImRpc3BsYXlfbmFtZSI6IkhSIFBhcGF5YSIsImVtYWlsIjoiaHJwYXBheWFAZGllbmtpbS52biIsImlhdCI6MTcxNDQxODAzMCwiZXhwIjoxNzE0ODUwMDMwfQ.NNd1uXm8Of2HIGHNxNtIA2RA5jfHzm11Y_jS3R4KzOs"
} ]);
