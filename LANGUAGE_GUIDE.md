# Hướng Dẫn Sử Dụng Hệ Thống Đa Ngôn Ngữ

## Tổng Quan

Landing page Arito Approval hiện đã hỗ trợ **2 ngôn ngữ**:
- 🇻🇳 **Tiếng Việt** (vi) - Mặc định
- 🇬🇧 **English** (en)

## Cách Sử Dụng

### Cho Người Dùng

1. **Chuyển đổi ngôn ngữ:**
   - Nhấp vào nút **🌐 VI** ở góc trên bên phải của navbar
   - Chọn ngôn ngữ mong muốn từ dropdown menu
   - Trang web sẽ tự động cập nhật sang ngôn ngữ đã chọn

2. **Lưu trữ ngôn ngữ:**
   - Ngôn ngữ được chọn sẽ được lưu trong `localStorage`
   - Khi quay lại trang, ngôn ngữ trước đó sẽ được tự động áp dụng

### Cho Developer

#### 1. Cấu Trúc File

```
Approval/
├── index.html          # HTML chính với data-i18n attributes
├── translations.js     # File chứa tất cả bản dịch
├── script.js          # Logic chuyển đổi ngôn ngữ
└── style.css          # CSS cho language switcher
```

#### 2. Thêm Nội Dung Cần Dịch

**Bước 1:** Thêm bản dịch vào `translations.js`

```javascript
const translations = {
  vi: {
    section: {
      title: "Tiêu đề tiếng Việt",
      description: "Mô tả tiếng Việt"
    }
  },
  en: {
    section: {
      title: "English Title",
      description: "English Description"
    }
  }
};
```

**Bước 2:** Thêm attribute `data-i18n` vào HTML

```html
<h2 data-i18n="section.title">Tiêu đề tiếng Việt</h2>
<p data-i18n="section.description">Mô tả tiếng Việt</p>
```

#### 3. Cấu Trúc Dữ Liệu Dịch

Sử dụng **dot notation** để truy cập các giá trị lồng nhau:

```javascript
// translations.js
{
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu"
    },
    hero: {
      title: "Tiêu đề chính",
      subtitle: "Phụ đề"
    }
  }
}

// HTML
<a data-i18n="nav.home">Trang chủ</a>
<h1 data-i18n="hero.title">Tiêu đề chính</h1>
```

#### 4. Hỗ Trợ HTML trong Bản Dịch

Nếu bản dịch chứa HTML (ví dụ: `<span>`, `<strong>`), nó sẽ được render đúng:

```javascript
{
  vi: {
    hero: {
      title: "Quản lý <span class='gradient-text'>hợp đồng</span>"
    }
  }
}
```

#### 5. Thêm Ngôn Ngữ Mới

**Bước 1:** Thêm ngôn ngữ vào `translations.js`

```javascript
const translations = {
  vi: { /* ... */ },
  en: { /* ... */ },
  ja: {  // Tiếng Nhật
    nav: {
      home: "ホーム",
      // ...
    }
  }
};
```

**Bước 2:** Thêm option vào dropdown trong `index.html`

```html
<div class="lang-dropdown" id="langDropdown">
  <button class="lang-option" data-lang="vi">
    <span class="lang-flag">🇻🇳</span>
    <span>Tiếng Việt</span>
  </button>
  <button class="lang-option" data-lang="en">
    <span class="lang-flag">🇬🇧</span>
    <span>English</span>
  </button>
  <button class="lang-option" data-lang="ja">
    <span class="lang-flag">🇯🇵</span>
    <span>日本語</span>
  </button>
</div>
```

## API JavaScript

### Hàm Chính

```javascript
// Lấy ngôn ngữ hiện tại
const currentLang = localStorage.getItem('language') || 'vi';

// Thay đổi ngôn ngữ programmatically
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updateTranslations(lang);
}
```

### Events

Hệ thống tự động cập nhật khi:
- Trang được load lần đầu
- Người dùng chọn ngôn ngữ từ dropdown
- Ngôn ngữ được thay đổi programmatically

## Checklist Khi Thêm Nội Dung Mới

- [ ] Thêm bản dịch tiếng Việt vào `translations.js`
- [ ] Thêm bản dịch tiếng Anh vào `translations.js`
- [ ] Thêm `data-i18n` attribute vào HTML element
- [ ] Kiểm tra key path đúng (ví dụ: `nav.home`)
- [ ] Test chuyển đổi ngôn ngữ trên browser
- [ ] Kiểm tra responsive trên mobile

## Lưu Ý Quan Trọng

1. **Không dịch:**
   - Tên công ty: "Arito Approval"
   - Logo và hình ảnh
   - Số liệu thống kê (500+, 50,000+, etc.)

2. **Cần dịch:**
   - Tất cả text content
   - Button labels
   - Navigation links
   - Form placeholders
   - Error messages

3. **HTML trong bản dịch:**
   - Sử dụng cẩn thận
   - Đảm bảo HTML tags đóng đúng
   - Tránh XSS vulnerabilities

## Troubleshooting

### Vấn đề: Ngôn ngữ không thay đổi

**Giải pháp:**
1. Kiểm tra console log có lỗi không
2. Verify `data-i18n` attribute đúng format
3. Kiểm tra key path tồn tại trong `translations.js`
4. Clear localStorage và thử lại

### Vấn đề: Một số text không được dịch

**Giải pháp:**
1. Kiểm tra element có `data-i18n` attribute chưa
2. Verify translation key tồn tại cho cả 2 ngôn ngữ
3. Kiểm tra typo trong key path

### Vấn đề: HTML bị escape

**Giải pháp:**
- Hệ thống tự động detect HTML tags
- Nếu vẫn bị escape, kiểm tra logic trong `updateTranslations()`

## Performance

- **Lazy Loading:** Chỉ load bản dịch cần thiết
- **Caching:** Ngôn ngữ được cache trong localStorage
- **Minimal DOM Updates:** Chỉ update elements có `data-i18n`

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## Tương Lai

Có thể mở rộng:
- [ ] Thêm ngôn ngữ Nhật, Hàn, Trung
- [ ] Auto-detect ngôn ngữ từ browser
- [ ] RTL support cho Arabic, Hebrew
- [ ] Translation management system
- [ ] A/B testing cho các bản dịch khác nhau
