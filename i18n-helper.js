/**
 * Auto-add data-i18n Helper Script
 * Chạy script này trong browser console để tự động thêm data-i18n attributes
 * cho các elements còn thiếu
 */

// Mapping của các sections và selectors
const i18nMappings = {
    // Benefits Section
    benefits: {
        badge: '.benefits .section-badge',
        title: '.benefits .section-title',
        desc: '.benefits .section-desc',
        items: '.benefits .benefit-card'
    },

    // Features Section
    features: {
        badge: '.features .section-badge',
        title: '.features .section-title',
        desc: '.features .section-desc',
        items: '.features .feature-item'
    },

    // Pricing Section
    pricing: {
        badge: '.pricing .section-badge',
        title: '.pricing .section-title',
        desc: '.pricing .section-desc',
        plans: '.pricing .pricing-card'
    }
};

/**
 * Hàm tự động thêm data-i18n attributes
 */
function autoAddI18nAttributes() {
    console.log('🚀 Starting auto-add data-i18n attributes...');

    // Benefits Section
    const benefitCards = document.querySelectorAll('.benefits .benefit-card');
    benefitCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');

        if (title && !title.hasAttribute('data-i18n')) {
            title.setAttribute('data-i18n', `benefits.items[${index}].title`);
            console.log(`✅ Added to benefit title ${index}`);
        }

        if (desc && !desc.hasAttribute('data-i18n')) {
            desc.setAttribute('data-i18n', `benefits.items[${index}].desc`);
            console.log(`✅ Added to benefit desc ${index}`);
        }
    });

    // Features Section
    const featureItems = document.querySelectorAll('.features .feature-item');
    featureItems.forEach((item, index) => {
        const title = item.querySelector('h4');
        const desc = item.querySelector('p');

        if (title && !title.hasAttribute('data-i18n')) {
            title.setAttribute('data-i18n', `features.items[${index}].title`);
            console.log(`✅ Added to feature title ${index}`);
        }

        if (desc && !desc.hasAttribute('data-i18n')) {
            desc.setAttribute('data-i18n', `features.items[${index}].desc`);
            console.log(`✅ Added to feature desc ${index}`);
        }
    });

    // Pricing Section
    const pricingCards = document.querySelectorAll('.pricing .pricing-card');
    pricingCards.forEach((card, index) => {
        const name = card.querySelector('.pricing-header h3');
        const price = card.querySelector('.price-amount');
        const cta = card.querySelector('.btn');

        if (name && !name.hasAttribute('data-i18n')) {
            name.setAttribute('data-i18n', `pricing.plans[${index}].name`);
            console.log(`✅ Added to pricing name ${index}`);
        }

        if (price && !price.hasAttribute('data-i18n')) {
            price.setAttribute('data-i18n', `pricing.plans[${index}].price`);
            console.log(`✅ Added to pricing price ${index}`);
        }

        if (cta && !cta.hasAttribute('data-i18n')) {
            cta.setAttribute('data-i18n', `pricing.plans[${index}].cta`);
            console.log(`✅ Added to pricing CTA ${index}`);
        }
    });

    console.log('✨ Done! Now copy the HTML and paste it back to your file.');
    console.log('📋 Use: document.documentElement.outerHTML to get the full HTML');
}

/**
 * Export HTML với data-i18n attributes
 */
function exportHTMLWithI18n() {
    const html = document.documentElement.outerHTML;

    // Create a download link
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index_with_i18n.html';
    a.click();
    URL.revokeObjectURL(url);

    console.log('✅ HTML file downloaded!');
}

/**
 * Hiển thị các elements chưa có data-i18n
 */
function findMissingI18n() {
    const selectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'button', 'a.btn',
        '.section-badge', '.section-title', '.section-desc'
    ];

    const missing = [];

    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Skip if already has data-i18n
            if (el.hasAttribute('data-i18n')) return;

            // Skip if empty or only whitespace
            const text = el.textContent.trim();
            if (!text || text.length === 0) return;

            // Skip if only contains numbers or symbols
            if (/^[\d\s\W]+$/.test(text)) return;

            // Skip company name
            if (text.includes('Arito Approval')) return;

            missing.push({
                tag: el.tagName,
                class: el.className,
                text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
                element: el
            });
        });
    });

    console.table(missing);
    console.log(`📊 Found ${missing.length} elements without data-i18n`);

    return missing;
}

// Chạy các hàm này trong console:
console.log(`
🌐 Language Helper Script Loaded!

Available commands:
1. autoAddI18nAttributes()  - Tự động thêm data-i18n cho các sections
2. findMissingI18n()        - Tìm các elements chưa có data-i18n
3. exportHTMLWithI18n()     - Export HTML file với data-i18n

Example usage:
> autoAddI18nAttributes()
> findMissingI18n()
> exportHTMLWithI18n()
`);
