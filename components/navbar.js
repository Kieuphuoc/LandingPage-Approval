document.addEventListener('DOMContentLoaded', () => {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

  const navbarHtml = `
  <nav class="navbar" id="navbar">
    <div class="container nav-container">
      <a href="${isHomePage ? '#' : 'index.html'}" class="logo">
        <img src="images/logo/econtract_dark_under.png" style="width: 160px;" alt="Arito Logo" class="logo-icon">
      </a>
      <div class="nav-links" id="navLinks">
        <a href="${isHomePage ? '#problem-solution' : 'index.html#problem-solution'}" data-i18n="nav.problemSolution">Vấn đề & Giải pháp</a>
        <a href="${isHomePage ? '#benefits' : 'index.html#benefits'}" data-i18n="nav.benefits">Lợi ích</a>
        <a href="${isHomePage ? '#features' : 'index.html#features'}" data-i18n="nav.features">Tính năng</a>
        <a href="${isHomePage ? '#how-it-works' : 'index.html#how-it-works'}" data-i18n="nav.howItWorks">Quy trình</a>
        <a href="${isHomePage ? '#pricing' : 'index.html#pricing'}" data-i18n="nav.pricing">Bảng giá</a>
        <a href="contact.html" data-i18n="nav.contact">Liên hệ</a>
      </div>
      <div class="nav-buttons">
        <div class="language-switcher">
          <button class="lang-btn" id="langBtn">
            <i class="fas fa-globe"></i>
            <span id="currentLang">VI</span>
          </button>
          <div class="lang-dropdown" id="langDropdown">
            <button class="lang-option" data-lang="vi">
              <span class="lang-flag">🇻🇳</span>
              <span>Tiếng Việt</span>
            </button>
            <button class="lang-option" data-lang="en">
              <span class="lang-flag">🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>
        <a href="contact.html" class="btn btn-primary" data-i18n="nav.freeTrial">Dùng thử miễn phí</a>
      </div>
      <button class="mobile-menu-btn" id="mobileMenuBtn">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
    `;

  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = navbarHtml;
  } else {
    // If no placeholder, prepend to body (fallback for index.html if not updated)
    const existingNav = document.getElementById('navbar');
    if (!existingNav) {
      document.body.insertAdjacentHTML('afterbegin', navbarHtml);
    }
  }
});
