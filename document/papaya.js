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

 Date: 22/04/2024 02:25:07
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
    _id: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    categoryName: "Thời sự",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    categoryName: "Kinh doanh",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "4502589f-1034-4abc-be8e-658c0f540374",
    categoryName: "Bất động sản",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "de743f5f-100e-4354-97d8-bae00cb0fa43",
    categoryName: "Khoa học",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "7a770c46-b083-48e4-b5e3-863a18fd5bd4",
    categoryName: "Giải trí",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "397f18c7-5089-4cb8-88e5-bda149dd5d69",
    categoryName: "Thể thao",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "dd1c7c72-ece1-4187-947a-2f1886782a13",
    categoryName: "Pháp luật",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "52ec8f97-0513-4b8d-abfd-79d91ede5dab",
    categoryName: "Giáo dục",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "4e1671f3-bca4-4054-8a0c-7dbadec7e5a9",
    categoryName: "Sức khoẻ",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "97dc7e5c-c725-4e59-90d4-de85269e49a9",
    categoryName: "Đời sống",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "86061df0-7e3a-4865-9d93-ebfa57ea7929",
    categoryName: "Du lịch",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "c5e9fbc0-362a-4bac-ade1-85ba2f910f03",
    categoryName: "Số hoá",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "62af3966-d01f-4e26-878a-7b39ca1a6131",
    categoryName: "Xe",
    __v: NumberInt("0")
} ]);
db.getCollection("category_news").insert([ {
    _id: "1f79ec23-f6b5-4f78-be0a-57f3696a0130",
    categoryName: "Thư giãn"
} ]);
db.getCollection("category_news").insert([ {
    _id: "5aede9a0-8fb1-4a0a-809b-88b4be04302b",
    categoryName: "Tâm sự"
} ]);
db.getCollection("category_news").insert([ {
    _id: "dd735645-28df-4d89-8697-d2e37f7c46fc",
    categoryName: "Công nghệ"
} ]);
db.getCollection("category_news").insert([ {
    _id: "e4f086b7-45a8-4c68-8bcc-517fe042c9fe",
    categoryName: "Nhịp sống trẻ"
} ]);
db.getCollection("category_news").insert([ {
    _id: "d92f90ee-5f20-4f7f-99a0-b1dd09c669d3",
    categoryName: "Nhịp sống trẻ"
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
    _id: "232b2d8e-3ba0-4114-8a99-1a322e93c966",
    newsTitle: "Thủ tướng dâng hương giỗ Tổ Hùng Vương",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "31a9663e-d749-42de-a204-58d6c2eb00eb",
    newsTitle: "Dàn trực thăng huấn luyện bay kéo cờ dịp 70 năm chiến thắng Điện Biên Phủ",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "1692a932-cc22-4dd3-aee4-f741cc8478ba",
    newsTitle: "Bụi mù mịt trên quốc lộ 14D qua Quảng Nam",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "5ed770c6-cffc-4e6c-8c0b-7cf3db299b68",
    newsTitle: "Thủ tướng động viên công nhân trên công trường ngày giỗ Tổ",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "48c4f69c-855d-4997-b7f6-73a0bba4d0f9",
    newsTitle: "Hơn 1.200 tỷ đồng xây cầu ở cửa ngõ TP Vũng Tàu",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "13ee5310-e218-4d25-95b8-54443591772d",
    newsTitle: "Hàng nghìn người đội mưa xem pháo hoa ở Phú Thọ",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "a28d64db-4969-48b5-9c3f-758d35502a1a",
    newsTitle: "Hai nữ sinh tử vong khi chụp ảnh dưới đập",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "1424793e-a4cd-447a-b39c-911a94081216",
    newsTitle: "Cục An ninh mạng: Lao động nên cẩn trọng với app cho vay",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "2d024fb1-70d3-4665-aaa3-13e9a6e015db",
    newsTitle: "Long An công bố xâm nhập mặn khẩn cấp",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "ccae0fb1-a17a-47d1-8303-7bbcb112f913",
    newsTitle: "Nam sinh nhảy xuống hồ cứu người",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "5ccbc1f7-35e1-4eaf-9bc3-b13e1b9dd9a9",
    newsTitle: "Phá dỡ hàng loạt nhà đổ nghiêng, sạt lở sát sông Cầu",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "dff16f42-0a37-4554-b4d7-37be51d4c3f2",
    newsTitle: "Đấu thầu có giúp vàng miếng rẻ hơn?",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "cbf8ac05-f7d6-4d72-ab43-cd957118dd7b",
    newsTitle: "Vì sao giá USD thế giới liên tục tăng cao?",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "b0a2ff79-bfe3-49b0-9060-5ee7f1539ec3",
    newsTitle: "EVN lo giá điện tăng nếu cam kết bao tiêu điện khí",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "c7762ab1-5838-4db2-8a75-f84e5c124a75",
    newsTitle: "Một cá nhân bị phạt gần 600 triệu đồng vì thao túng cổ phiếu",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "a1fcee24-0b96-4fee-8f8c-2f3708fecbff",
    newsTitle: "Lợi nhuận chủ chuỗi nghỉ dưỡng Flamingo giảm gần một nửa",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "08445def-0619-41e8-bc93-4507a9e96cce",
    newsTitle: "Eximbank nhận giải Sao Khuê 2024",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "ac9c2c1e-46a6-4760-8701-22f29b31570f",
    newsTitle: "SHB trả cổ tức 16%",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "e85fc3ac-a3ef-44b8-b904-a7564cc0df6b",
    newsTitle: "LPBank không chia cổ tức tiền mặt ba năm tới",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "f2b832fc-7d21-4935-850e-8bf73c9250c3",
    newsTitle: "Gần 2,9 tỷ USD kiều hối chảy về TP HCM",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "50fd6c86-2119-46bb-981f-01c9eaed6e91",
    newsTitle: "Cua lột nhập khẩu giá rẻ bằng nửa hàng Việt",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "3a0a559e-1146-448e-8635-edf2b144496b",
    newsTitle: "VN-Index mất mốc 1.200 điểm",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "68bfc1ff-e0ec-4670-8867-70cae7665464",
    newsTitle: "Giá xăng RON 95 vượt 25.000 đồng một lít",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "11b1d764-0809-4eb8-8298-58f9e1654c77",
    newsTitle: "Giá USD ngân hàng tiếp tục phá đỉnh",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "86eb5c70-0837-4bf1-aa01-2c9aa7019d00",
    newsTitle: "Vì sao ngành điện muốn áp giá hai thành phần?",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "e30c6693-652e-4725-8fa8-816857d63c8a",
    newsTitle: "LPBank thông qua kế hoạch đổi tên ngân hàng",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "2ee3f80d-6109-49d5-add4-fc75e56e2cef",
    newsTitle: "PNJ giải bài toán tăng trưởng 12% thế nào",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "c0384f7b-7cd2-4484-b70c-f9e7b509fb3b",
    newsTitle: "J&T Express hút khách tại sự kiện của TikTok Shop",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "645d7f89-f9c7-4c42-a1a8-554edfee0207",
    newsTitle: "Đơn hàng xuất khẩu thực phẩm tăng trở lại",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "9dc9d958-8570-4ef5-8c91-4cea9a10c9d0",
    newsTitle: "Dragon Capital: Đầu tư chứng khoán vẫn hấp dẫn",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "43ecf0e8-b265-4087-9138-f8cea87b083b",
    newsTitle: "Có thể mua điện tái tạo trực tiếp không qua EVN",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "6e3a370d-450a-469e-b6dc-27119bd3dff4",
    newsTitle: "Chứng khoán cải thiện ở cuối phiên",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "9361dbe8-193f-4820-a8ae-83bcb127cad9",
    newsTitle: "Giá USD ngân hàng lên kịch trần",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "6b9b5423-bcfc-40da-a2e3-f9fdc85c44db",
    newsTitle: "Bà Cao Thị Ngọc Dung: Nhiều lúc PNJ không có vàng để bán",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "ddf61571-1874-4721-84f6-d608a26c22d5",
    newsTitle: "Kinh tế Trung Quốc tăng trưởng vượt dự báo",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "30fbe6f2-890d-457a-baf6-c8ca00675cfa",
    newsTitle: "Nhiều tiệm vàng tại TP HCM đóng cửa né đợt kiểm tra",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "c3d79328-1424-44b8-b340-28752046f198",
    newsTitle: "Giữ đề xuất điện mặt trời mái nhà dùng thừa được bán 0 đồng",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "03da142a-24fe-430a-bc82-f8ed9ac8d487",
    newsTitle: "Vì sao chứng khoán rơi 60 điểm?",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "3efd4dee-712f-4e3c-8508-8e3011ce900f",
    newsTitle: "Đề nghị Bộ Tài chính hỗ trợ thông quan nhập khẩu vàng",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "a7f6587a-cbf2-4d3e-9a7a-979cd135add3",
    newsTitle: "Cổ phiếu công ty của Trump lao dốc",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "3df6a121-6773-47c1-b722-c67165c813df",
    newsTitle: "Tesla sắp giảm hơn 10% nhân sự",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "91c0f20c-776a-4d7b-a7fa-726ab138ebc7",
    newsTitle: "Ngành thiết bị điện mặt trời châu Âu lâm nguy",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "95f2e883-0152-4060-960e-38c19fa3585e",
    newsTitle: "Dragon Capital: Cần đầu tư dài hạn khi thị trường nhiều biến động",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "72a63277-c3f8-469b-8d0e-629ee0e3b919",
    newsTitle: "PNJ đặt mục tiêu tăng doanh thu 12% năm nay",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "d1276e63-79e4-4842-9b38-510879027d57",
    newsTitle: "Dragon Capital nêu kịch bản đầu tư trong bối cảnh kinh tế phục hồi",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "29fe9146-d804-41a5-9541-d739fd81b58f",
    newsTitle: "Giải pháp số cho 'nỗi đau' trong vận hành của doanh nghiệp",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "2c7e9945-078e-49cb-8d4b-629751703a0c",
    newsTitle: "VinShop giành giải thưởng cao nhất Sao Khuê 2024",
    categoryNewsId: "c35019e7-f5d3-4a9c-b311-d764a394783a",
    __v: NumberInt("0"),
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "8545442b-5d2e-4891-b461-f57f437effdf",
    newsTitle: "Hà Nội duyệt quy hoạch khu đô thị Sóc Sơn gần 630 ha",
    categoryNewsId: "4502589f-1034-4abc-be8e-658c0f540374",
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "7e15bd25-07c0-4fbc-bd26-269cf12fa3da",
    newsTitle: "Cao tốc Dầu Giây - Phan Thiết nguy cơ không có đơn vị vận hành",
    categoryNewsId: "852a1303-a14a-48f4-8c5d-811f9dc14730",
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
} ]);
db.getCollection("news").insert([ {
    _id: "1938dd03-6fba-4bac-ab93-205af72e171c",
    newsTitle: "Chủ đầu tư Gem Sky World lãi hơn tỷ đồng mỗi ngày",
    categoryNewsId: "4502589f-1034-4abc-be8e-658c0f540374",
    publisherId: "9aff4a4f-3161-42ca-8ff2-3290037c8af2"
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
    _id: "9aff4a4f-3161-42ca-8ff2-3290037c8af2",
    username: "tranthithusuong",
    password: "$2a$10$Z3WGJEuNYEf7QI1EmLhbx.6f74VS8.zGDNri9Llw7hUC.Cd0HMi8C",
    email: "tranthithusuong@dienkim.vn",
    displayName: "Trần Thị Thu Sương",
    __v: NumberInt("0"),
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiOWFmZjRhNGYtMzE2MS00MmNhLThmZjItMzI5MDAzN2M4YWYyIiwidXNlcm5hbWUiOiJ0cmFudGhpdGh1c3VvbmciLCJkaXNwbGF5TmFtZSI6IlRy4bqnbiBUaOG7iyBUaHUgU8awxqFuZyIsImVtYWlsIjoidHJhbnRoaXRodXN1b25nQGRpZW5raW0udm4iLCJpYXQiOjE3MTM3MTgwNDQsImV4cCI6MTcxNDE1MDA0NH0.HNVIfx_KQiPaFIMFr9YVWsrtyXOfjL7NTYX6N535ME4"
} ]);
db.getCollection("users").insert([ {
    _id: "ed0f9420-4711-46e7-b7da-2f6688df3a1b",
    username: "nguyenthithuha",
    password: "$2a$10$bx.GmuGRBnilP9ChF2JRUeqBebl8gXqKee1aG5O0stEe/RgNXi7ca",
    email: "nguyenthithuha@dienkim.vn",
    displayName: "Nguyễn Thị Thu Hà",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: "feed0497-5601-4a38-a6ae-1379751bdb8d",
    username: "nguyenkimtuyen",
    password: "$2a$10$sOWgCzXufUEJhCmWojA8TehZlmCeHHsYJBku3HrdSbNa0J2xlw05u",
    email: "nguyenkimtuyen@dienkim.vn",
    displayName: "Nguyễn Kim Tuyến"
} ]);
db.getCollection("users").insert([ {
    _id: "8866afa4-6dbc-472b-bb07-e7760fd9efbe",
    username: "lethithuhuyen",
    password: "$2a$10$yqDPU.ujzEEhkDBcJFYN4OWxqKzJ2JrhaiIx2yYblay1i6JW7FUeu",
    email: "lethithuhuyen@dienkim.vn",
    displayName: "Lê Thị Thu Huyền"
} ]);
db.getCollection("users").insert([ {
    _id: "54c81869-acd4-427e-9bff-ae3c8fcc571d",
    username: "leminhtuan",
    password: "$2a$10$8HhlxqiDP3ogHNHHi8mJ4uk7b/GYsUuc.Vd9UnR0cjiIYbKnZUpAe",
    email: "leminhtuan@dienkim.vn",
    displayName: "Lê Minh Tuấn"
} ]);
db.getCollection("users").insert([ {
    _id: "7fedb054-5543-4c41-919e-89d700ffa57f",
    username: "dothiminhha",
    password: "$2a$10$4ptW9vMM/TvRiZX.Ej7rAeOcza3T.FBoT35kegPnjMSi0HFVBVVue",
    email: "dothiminha@dienkim.vn",
    displayName: "Đỗ Thị Minh Hà"
} ]);
