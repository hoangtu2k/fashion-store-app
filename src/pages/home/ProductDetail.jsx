import { useState } from "react";
import "@style/productDetail.css";

export default function ProductDetail() {
  const productData = {
    id: 1,
    code: '3ATSB6853',
    name: "Áo Thun Nam Basic",
    price: 199000,
    description: "Áo thun cotton 100% mềm mại, thoáng mát, form unisex.",
    mainImage: "https://cdn.hstatic.net/products/200000642007/50sap_3atsb6853_1_7343bbd0f0dc4c3185a3117584a3df45_b5ee171de0d1435592fc14e7cebdb099_master.jpg",
    subImages: [
      "https://cdn.hstatic.net/products/200000642007/50sap_3atsb6853_3_f35b12b87e4c41839ffede89f94a9ed0_39915d524da34ab8b7d15ea44b0e2789_master.jpg",
      "https://cdn.hstatic.net/products/200000642007/50sap_3atsb6853_1_7343bbd0f0dc4c3185a3117584a3df45_b5ee171de0d1435592fc14e7cebdb099_master.jpg",
    ],
    colors: ["Trắng", "Đen", "Xanh Navy"],
    sizes: ["S", "M", "L", "XL"],
    highlights: [
      "Thiết kế phom rộng hiện đại, dễ mặc",
      "Logo in hiệu ứng metallic tạo điểm nhấn ấn tượng",
      "Tay áo thêu biểu tượng tinh tế",
      "Chất vải mềm mại, co giãn nhẹ, thấm hút tốt",
      "Phù hợp phối cùng quần jeans, jogger hoặc quần short"
    ],
    details: {
      "Thương hiệu": "MLB",
      "Xuất xứ thương hiệu": "Hàn Quốc",
      "Giới tính": "Unisex",
      "Kiểu dáng": "Áo thun",
      "Màu sắc": "Black, Pattern Sand, White",
      "Chất liệu": "Cotton 65%, Polyester 35%",
      "Hoạ tiết": "In chữ",
      "Thích hợp mặc": "Đi chơi, đi làm...",
      "Xu hướng": "Sử dụng được tất cả các mùa trong năm"
    }
  };

  const [mainImage, setMainImage] = useState(productData.mainImage);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);

  return (
    <div className="product-detail">
      {/* Ảnh sản phẩm */}
      <div className="image-section">
        <div className="thumbnail-list">
          {[productData.mainImage, ...productData.subImages].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`thumbnail small ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <img className="main-image small" src={mainImage} alt={productData.name} />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="info-section">
        <h1>{productData.name}</h1>
        <p>Style Code: {productData.code}</p>
        <p className="price">{productData.price.toLocaleString()}₫</p>

        {/* Chọn màu */}
        <div className="product-options">
          <label>Màu sắc:</label>
          <div className="option-list">
            {productData.colors.map((color) => (
              <button
                key={color}
                className={`option-btn ${selectedColor === color ? "active" : ""}`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Chọn kích thước */}
        <div className="product-options">
          <label>Kích thước:</label>
          <div className="option-list">
            {productData.sizes.map((size) => (
              <button
                key={size}
                className={`option-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="add-to-cart">Thêm vào giỏ hàng</button>

        {/* Mô tả chi tiết */}
        <div className="product-description">
          <h2>Đặc điểm nổi bật</h2>
          <ul>
            {productData.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2>Thông tin sản phẩm</h2>
          <ul>
            {Object.entries(productData.details).map(([key, value], idx) => (
              <li key={idx}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
