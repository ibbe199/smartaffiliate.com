/**
 * seo.js - ملف تحسين محركات البحث لموقع SmartAffiliate
 * @version 2.0.0
 * @last-updated 2026-03-14
 * 
 * يتضمن: تحسين SEO، تتبع الأداء، بيانات منظمة، خرائط مواقع ديناميكية
 */

// ==================== إعدادات SEO الأساسية ====================

const SEO_CONFIG = {
    siteName: 'SmartAffiliate',
    siteUrl: 'https://smartaffiliate.cm',
    defaultLanguage: 'ar',
    defaultLocale: 'ar_SA',
    twitterHandle: '@smartaffiliate',
    facebookAppId: '1234567890', // استبدل بمعرف التطبيق الخاص بك
    googleAnalyticsId: 'G-XXXXXXXXXX', // استبدل بمعرف التحليلات الخاص بك
    googleTagManagerId: 'GTM-P96QVPT3',
    googleSiteVerification: '7X4x5m03NWFNhlGmuoG7DfaHoNLRs5MgFDtW9nHK1co',
    enableStructuredData: true,
    enableSitemap: true,
    enableCanonical: true,
    enableBreadcrumbs: true
};

// ==================== بيانات الموقع الأساسية ====================

const SITE_DATA = {
    title: 'SmartAffiliate - منصة الذكاء الاصطناعي والتسويق الرقمي',
    description: 'منصة عربية متخصصة في الذكاء الاصطناعي والأتمتة والتسويق بالعمولة. أكثر من 50 مقالة حصرية.',
    keywords: 'ذكاء اصطناعي, أتمتة, تسويق بالعمولة, SEO, دراسات حالة, أدوات تسويق',
    author: 'SmartAffiliate Team',
    image: '/images/og-image.jpg'
};

// ==================== بيانات الصفحات ====================

const PAGES = [
    {
        url: '/',
        title: 'الرئيسية - SmartAffiliate',
        description: 'منصة عربية متخصصة في الذكاء الاصطناعي والأتمتة والتسويق الرقمي',
        keywords: 'ذكاء اصطناعي, أتمتة, تسويق رقمي',
        image: '/images/og-image.jpg',
        priority: 1.0,
        changefreq: 'daily',
        sections: ['home']
    },
    {
        url: '/blog.html',
        title: 'المدونة - SmartAffiliate',
        description: 'أحدث المقالات في الذكاء الاصطناعي والأتمتة والتسويق الرقمي',
        keywords: 'مدونة, مقالات, ذكاء اصطناعي',
        image: '/images/blog-og.jpg',
        priority: 0.9,
        changefreq: 'weekly'
    },
    {
        url: '/about.html',
        title: 'من نحن - SmartAffiliate',
        description: 'تعرف على فريق SmartAffiliate ومهمتنا في نشر المعرفة',
        keywords: 'من نحن, فريق, مهمة',
        image: '/images/about-og.jpg',
        priority: 0.5,
        changefreq: 'monthly'
    },
    {
        url: '/contact.html',
        title: 'اتصل بنا - SmartAffiliate',
        description: 'تواصل مع فريق SmartAffiliate للاستفسارات والاقتراحات',
        keywords: 'اتصال, تواصل, استفسار',
        image: '/images/contact-og.jpg',
        priority: 0.5,
        changefreq: 'monthly'
    },
    {
        url: '/privacy.html',
        title: 'سياسة الخصوصية - SmartAffiliate',
        description: 'سياسة الخصوصية لموقع SmartAffiliate',
        keywords: 'خصوصية, سياسة',
        image: '/images/privacy-og.jpg',
        priority: 0.3,
        changefreq: 'yearly'
    },
    {
        url: '/terms.html',
        title: 'شروط الاستخدام - SmartAffiliate',
        description: 'شروط استخدام موقع SmartAffiliate',
        keywords: 'شروط, استخدام',
        image: '/images/terms-og.jpg',
        priority: 0.3,
        changefreq: 'yearly'
    },
    {
        url: '/disclaimer.html',
        title: 'إخلاء المسؤولية - SmartAffiliate',
        description: 'إخلاء مسؤولية موقع SmartAffiliate',
        keywords: 'إخلاء, مسؤولية',
        image: '/images/disclaimer-og.jpg',
        priority: 0.3,
        changefreq: 'yearly'
    },
    {
        url: '/cookies.html',
        title: 'سياسة الكوكيز - SmartAffiliate',
        description: 'سياسة ملفات تعريف الارتباط لموقع SmartAffiliate',
        keywords: 'كوكيز, ملفات تعريف',
        image: '/images/cookies-og.jpg',
        priority: 0.3,
        changefreq: 'yearly'
    }
];

// ==================== بيانات المقالات ====================

const ARTICLES = [
    {
        id: 1,
        url: '/article1.html',
        title: 'مستقبل الذكاء الاصطناعي في التسويق الرقمي 2026',
        description: 'تحليل شامل وعميق لكيفية تغيير الذكاء الاصطناعي لقواعد اللعبة في عالم التسويق الرقمي.',
        keywords: 'ذكاء اصطناعي, تسويق رقمي, مستقبل',
        date: '2026-03-15',
        modified: '2026-03-15',
        author: 'SmartAffiliate Team',
        category: 'ai',
        image: '/images/articles/ai-article.jpg',
        priority: 0.8,
        changefreq: 'monthly'
    },
    {
        id: 2,
        url: '/article2.html',
        title: 'عصر الوكيل الذكي (Agentic AI): كيف ستغير الوكلاء الرقميون الأعمال',
        description: 'تعرف على الوكلاء الرقميين المستقلين الذين يخططون وينفذون المهام نيابة عنك.',
        keywords: 'وكيل ذكي, أتمتة, ذكاء اصطناعي',
        date: '2026-03-12',
        modified: '2026-03-12',
        author: 'SmartAffiliate Team',
        category: 'ai',
        image: '/images/articles/ai-article2.jpg',
        priority: 0.8,
        changefreq: 'monthly'
    }
    // ... أضف باقي المقالات هنا
];

// ==================== نظام Meta Tags ====================

class MetaTagsManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
    }

    /**
     * الحصول على الصفحة الحالية
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = PAGES.find(p => p.url === path) || PAGES.find(p => p.url === '/');
        return page || PAGES[0];
    }

    /**
     * تحديث عنوان الصفحة
     */
    updateTitle() {
        document.title = this.currentPage.title;
    }

    /**
     * تحديث وصف الصفحة
     */
    updateDescription() {
        let description = this.currentPage.description;
        
        // إذا كانت الصفحة مقالة، نضيف معلومات إضافية
        if (this.currentPage.url.includes('article')) {
            const article = this.getCurrentArticle();
            if (article) {
                description = article.description;
            }
        }
        
        this.updateMetaTag('description', description);
    }

    /**
     * تحديث الكلمات المفتاحية
     */
    updateKeywords() {
        let keywords = this.currentPage.keywords;
        
        if (this.currentPage.url.includes('article')) {
            const article = this.getCurrentArticle();
            if (article) {
                keywords = article.keywords;
            }
        }
        
        this.updateMetaTag('keywords', keywords);
    }

    /**
     * تحديث Meta Tag معين
     */
    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        
        meta.content = content;
    }

    /**
     * الحصول على المقالة الحالية
     */
    getCurrentArticle() {
        const path = window.location.pathname;
        const articleId = parseInt(path.match(/article(\d+)/)?.[1]);
        return ARTICLES.find(a => a.id === articleId);
    }

    /**
     * تطبيق جميع التحديثات
     */
    applyAll() {
        this.updateTitle();
        this.updateDescription();
        this.updateKeywords();
    }
}

// ==================== نظام Open Graph ====================

class OpenGraphManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.currentArticle = this.getCurrentArticle();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return PAGES.find(p => p.url === path) || PAGES[0];
    }

    getCurrentArticle() {
        const path = window.location.pathname;
        const articleId = parseInt(path.match(/article(\d+)/)?.[1]);
        return ARTICLES.find(a => a.id === articleId);
    }

    /**
     * تحديث Open Graph tags
     */
    updateOpenGraph() {
        let data = this.currentArticle || this.currentPage;
        
        const ogTags = {
            'og:title': data.title,
            'og:description': data.description,
            'og:type': this.currentArticle ? 'article' : 'website',
            'og:url': window.location.href,
            'og:image': data.image || SITE_DATA.image,
            'og:site_name': SEO_CONFIG.siteName,
            'og:locale': SEO_CONFIG.defaultLocale
        };
        
        // إضافة تاريخ المقالة إذا كانت موجودة
        if (this.currentArticle) {
            ogTags['article:published_time'] = this.currentArticle.date;
            ogTags['article:modified_time'] = this.currentArticle.modified;
            ogTags['article:section'] = this.currentArticle.category;
        }
        
        // تحديث أو إضافة كل tag
        Object.entries(ogTags).forEach(([property, content]) => {
            if (content) {
                let meta = document.querySelector(`meta[property="${property}"]`);
                if (!meta) {
                    meta = document.createElement('meta');
                    meta.setAttribute('property', property);
                    document.head.appendChild(meta);
                }
                meta.content = content;
            }
        });
    }

    /**
     * تحديث Twitter Card
     */
    updateTwitterCard() {
        let data = this.currentArticle || this.currentPage;
        
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': data.title,
            'twitter:description': data.description,
            'twitter:image': data.image || SITE_DATA.image,
            'twitter:site': SEO_CONFIG.twitterHandle
        };
        
        Object.entries(twitterTags).forEach(([name, content]) => {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = name;
                document.head.appendChild(meta);
            }
            meta.content = content;
        });
    }

    applyAll() {
        this.updateOpenGraph();
        this.updateTwitterCard();
    }
}

// ==================== نظام البيانات المنظمة (Schema.org) ====================

class StructuredDataManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.currentArticle = this.getCurrentArticle();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return PAGES.find(p => p.url === path) || PAGES[0];
    }

    getCurrentArticle() {
        const path = window.location.pathname;
        const articleId = parseInt(path.match(/article(\d+)/)?.[1]);
        return ARTICLES.find(a => a.id === articleId);
    }

    /**
     * إنشاء بيانات منظمة للموقع
     */
    createWebsiteSchema() {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': SEO_CONFIG.siteName,
            'url': SEO_CONFIG.siteUrl,
            'description': SITE_DATA.description,
            'potentialAction': {
                '@type': 'SearchAction',
                'target': `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
            }
        };
    }

    /**
     * إنشاء بيانات منظمة للمقالة
     */
    createArticleSchema() {
        if (!this.currentArticle) return null;
        
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': this.currentArticle.title,
            'description': this.currentArticle.description,
            'image': this.currentArticle.image,
            'datePublished': this.currentArticle.date,
            'dateModified': this.currentArticle.modified,
            'author': {
                '@type': 'Organization',
                'name': this.currentArticle.author,
                'url': SEO_CONFIG.siteUrl
            },
            'publisher': {
                '@type': 'Organization',
                'name': SEO_CONFIG.siteName,
                'logo': {
                    '@type': 'ImageObject',
                    'url': `${SEO_CONFIG.siteUrl}/images/logo.svg`
                }
            },
            'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': window.location.href
            }
        };
    }

    /**
     * إنشاء بيانات منظمة للتصفح (Breadcrumbs)
     */
    createBreadcrumbSchema() {
        const path = window.location.pathname.split('/').filter(p => p);
        let items = [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'الرئيسية',
                'item': SEO_CONFIG.siteUrl
            }
        ];
        
        if (path.length > 0) {
            if (path[0].includes('article')) {
                items.push({
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'المقالات',
                    'item': `${SEO_CONFIG.siteUrl}/blog.html`
                });
                
                if (this.currentArticle) {
                    items.push({
                        '@type': 'ListItem',
                        'position': 3,
                        'name': this.currentArticle.title,
                        'item': window.location.href
                    });
                }
            } else {
                const page = PAGES.find(p => p.url === '/' + path[0]);
                if (page) {
                    items.push({
                        '@type': 'ListItem',
                        'position': 2,
                        'name': page.title.split('-')[0].trim(),
                        'item': window.location.href
                    });
                }
            }
        }
        
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': items
        };
    }

    /**
     * تطبيق جميع البيانات المنظمة
     */
    applyAll() {
        const schemas = [
            this.createWebsiteSchema(),
            this.createArticleSchema(),
            this.createBreadcrumbSchema()
        ].filter(s => s !== null);
        
        // إزالة أي schema قديم
        const oldScripts = document.querySelectorAll('script[type="application/ld+json"]');
        oldScripts.forEach(script => script.remove());
        
        // إضافة الـ schema الجديد
        schemas.forEach(schema => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema, null, 2);
            document.head.appendChild(script);
        });
    }
}

// ==================== نظام الروابط الأساسية (Canonical) ====================

class CanonicalManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return PAGES.find(p => p.url === path) || { url: path };
    }

    /**
     * تحديث الرابط الأساسي
     */
    updateCanonical() {
        const url = window.location.href.split('?')[0].split('#')[0];
        let link = document.querySelector('link[rel="canonical"]');
        
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        
        link.href = url;
    }
}

// ==================== نظام تحليل الأداء ====================

class PerformanceAnalytics {
    constructor() {
        this.metrics = {};
    }

    /**
     * قياس أداء الصفحة
     */
    measurePerformance() {
        if (window.performance && window.performance.timing) {
            const timing = performance.timing;
            
            this.metrics = {
                pageLoadTime: timing.loadEventEnd - timing.navigationStart,
                domReadyTime: timing.domComplete - timing.domLoading,
                firstPaint: performance.getEntriesByType('paint')
                    .find(entry => entry.name === 'first-paint')?.startTime || 0,
                firstContentfulPaint: performance.getEntriesByType('paint')
                    .find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
            };
            
            console.log('📊 مقاييس الأداء:', this.metrics);
            
            // إرسال البيانات إلى Google Analytics إذا كان مفعلاً
            if (typeof gtag !== 'undefined' && this.metrics.pageLoadTime) {
                gtag('event', 'timing_complete', {
                    name: 'load',
                    value: this.metrics.pageLoadTime,
                    event_category: 'Performance'
                });
            }
        }
    }

    /**
     * مراقبة التغييرات في SEO
     */
    monitorSEOChanges() {
        // التحقق من وجود Meta Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc || !metaDesc.content) {
            console.warn('⚠️ الصفحة تفتقر إلى Meta Description');
        }
        
        // التحقق من وجود Title
        if (!document.title || document.title.length < 10) {
            console.warn('⚠️ عنوان الصفحة قصير جداً');
        }
        
        // التحقق من وجود H1
        const h1 = document.querySelector('h1');
        if (!h1) {
            console.warn('⚠️ الصفحة تفتقر إلى H1');
        }
        
        // التحقق من الصور
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.alt) {
                console.warn(`⚠️ الصورة ${index + 1} تفتقر إلى Alt text`);
            }
        });
    }
}

// ==================== نظام إنشاء Sitemap ديناميكي ====================

class SitemapGenerator {
    constructor() {
        this.baseUrl = SEO_CONFIG.siteUrl;
    }

    /**
     * إنشاء Sitemap XML
     */
    generateSitemap() {
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        // إضافة الصفحات
        PAGES.forEach(page => {
            sitemap += this.createUrlEntry(page);
        });
        
        // إضافة المقالات
        ARTICLES.forEach(article => {
            sitemap += this.createUrlEntry(article);
        });
        
        sitemap += '</urlset>';
        
        return sitemap;
    }

    /**
     * إنشاء إدخال URL في الـ Sitemap
     */
    createUrlEntry(item) {
        let entry = '  <url>\n';
        entry += `    <loc>${this.baseUrl}${item.url}</loc>\n`;
        entry += `    <lastmod>${item.modified || item.date || new Date().toISOString().split('T')[0]}</lastmod>\n`;
        entry += `    <changefreq>${item.changefreq || 'monthly'}</changefreq>\n`;
        entry += `    <priority>${item.priority || 0.5}</priority>\n`;
        entry += '  </url>\n';
        
        return entry;
    }

    /**
     * حفظ Sitemap (في وضع التطوير)
     */
    saveSitemap() {
        const sitemap = this.generateSitemap();
        console.log('🗺️ Sitemap generated:', sitemap.substring(0, 200) + '...');
        return sitemap;
    }
}

// ==================== نظام كشف الأخطاء ====================

class SEODebugger {
    constructor() {
        this.errors = [];
        this.warnings = [];
    }

    /**
     * فحص الصفحة
     */
    auditPage() {
        this.errors = [];
        this.warnings = [];
        
        // فحص العنوان
        this.checkTitle();
        
        // فحص الوصف
        this.checkDescription();
        
        // فحص الروابط
        this.checkLinks();
        
        // فحص الصور
        this.checkImages();
        
        // فحص البيانات المنظمة
        this.checkStructuredData();
        
        // عرض النتائج
        this.displayResults();
    }

    checkTitle() {
        const title = document.title;
        if (!title) {
            this.errors.push('⚠️ العنوان مفقود');
        } else if (title.length < 10) {
            this.warnings.push('⚠️ العنوان قصير جداً (أقل من 10 أحرف)');
        } else if (title.length > 60) {
            this.warnings.push('⚠️ العنوان طويل جداً (أكثر من 60 حرفاً)');
        } else {
            console.log('✅ العنوان مناسب:', title.length, 'حرف');
        }
    }

    checkDescription() {
        const desc = document.querySelector('meta[name="description"]');
        if (!desc || !desc.content) {
            this.errors.push('⚠️ Meta Description مفقود');
        } else if (desc.content.length < 50) {
            this.warnings.push('⚠️ Meta Description قصير جداً (أقل من 50 حرف)');
        } else if (desc.content.length > 160) {
            this.warnings.push('⚠️ Meta Description طويل جداً (أكثر من 160 حرف)');
        }
    }

    checkLinks() {
        const links = document.querySelectorAll('a[href]');
        let brokenLinks = 0;
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' || href === '' || href.startsWith('javascript:')) {
                brokenLinks++;
            }
        });
        
        if (brokenLinks > 0) {
            this.warnings.push(`⚠️ يوجد ${brokenLinks} رابط معطل أو غير صحيح`);
        }
    }

    checkImages() {
        const images = document.querySelectorAll('img');
        let missingAlt = 0;
        
        images.forEach(img => {
            if (!img.alt) {
                missingAlt++;
            }
        });
        
        if (missingAlt > 0) {
            this.warnings.push(`⚠️ ${missingAlt} صورة تفتقر إلى Alt text`);
        }
    }

    checkStructuredData() {
        const schemas = document.querySelectorAll('script[type="application/ld+json"]');
        if (schemas.length === 0) {
            this.warnings.push('⚠️ لا توجد بيانات منظمة Schema.org');
        } else {
            schemas.forEach((schema, index) => {
                try {
                    JSON.parse(schema.textContent);
                    console.log(`✅ Schema ${index + 1} صالح`);
                } catch (e) {
                    this.errors.push(`⚠️ Schema ${index + 1} غير صالح`);
                }
            });
        }
    }

    displayResults() {
        console.group('🔍 تقرير SEO للموقع');
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('✅ لا توجد مشاكل! الموقع محسن بالكامل');
        } else {
            if (this.errors.length > 0) {
                console.group('❌ أخطاء يجب إصلاحها:');
                this.errors.forEach(error => console.log(error));
                console.groupEnd();
            }
            
            if (this.warnings.length > 0) {
                console.group('⚠️ تحذيرات (اختياري):');
                this.warnings.forEach(warning => console.log(warning));
                console.groupEnd();
            }
        }
        
        console.groupEnd();
        
        return {
            errors: this.errors,
            warnings: this.warnings
        };
    }
}

// ==================== التهيئة الرئيسية ====================

class SEOInitializer {
    constructor() {
        this.metaManager = new MetaTagsManager();
        this.ogManager = new OpenGraphManager();
        this.schemaManager = new StructuredDataManager();
        this.canonicalManager = new CanonicalManager();
        this.performance = new PerformanceAnalytics();
        this.debugger = new SEODebugger();
        this.sitemapGen = new SitemapGenerator();
    }

    /**
     * تهيئة جميع أنظمة SEO
     */
    init() {
        console.log('🚀 بدء تهيئة أنظمة SEO...');
        
        // تحديث Meta Tags
        this.metaManager.applyAll();
        
        // تحديث Open Graph
        this.ogManager.applyAll();
        
        // تحديث البيانات المنظمة
        if (SEO_CONFIG.enableStructuredData) {
            this.schemaManager.applyAll();
        }
        
        // تحديث الرابط الأساسي
        if (SEO_CONFIG.enableCanonical) {
            this.canonicalManager.updateCanonical();
        }
        
        // قياس الأداء
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.performance.measurePerformance();
                this.performance.monitorSEOChanges();
            }, 1000);
        });
        
        console.log('✅ تم تهيئة أنظمة SEO بنجاح');
        
        // في وضع التطوير فقط
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            setTimeout(() => {
                this.debugger.auditPage();
            }, 2000);
        }
    }

    /**
     * تصدير Sitemap
     */
    exportSitemap() {
        return this.sitemapGen.generateSitemap();
    }
}

// ==================== دوال مساعدة ====================

/**
 * إضافة كلمات مفتاحية ديناميكية للمقالات
 */
function addArticleKeywords(keywords) {
    let meta = document.querySelector('meta[name="keywords"]');
    if (meta) {
        meta.content += ', ' + keywords;
    }
}

/**
 * تحديث عنوان الصفحة ديناميكياً
 */
function updatePageTitle(newTitle) {
    document.title = newTitle;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', newTitle);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', newTitle);
}

/**
 * التحقق من الروابط الداخلية
 */
function checkInternalLinks() {
    const links = document.querySelectorAll('a[href^="/"]');
    const results = [];
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        const exists = PAGES.some(p => p.url === href) || ARTICLES.some(a => a.url === href);
        
        results.push({
            href: href,
            text: link.textContent.trim(),
            exists: exists
        });
        
        if (!exists) {
            console.warn(`⚠️ رابط معطل محتمل: ${href}`);
        }
    });
    
    return results;
}

// ==================== التصدير والاستخدام ====================

// تهيئة SEO عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const seo = new SEOInitializer();
    seo.init();
    
    // إتاحة الوصول العام للدوال المساعدة
    window.SEO = {
        checkLinks: checkInternalLinks,
        updateTitle: updatePageTitle,
        addKeywords: addArticleKeywords,
        audit: () => new SEODebugger().auditPage(),
        generateSitemap: () => new SitemapGenerator().generateSitemap()
    };
});

// للاستخدام في وحدات ES6 (اختياري)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEOInitializer,
        MetaTagsManager,
        OpenGraphManager,
        StructuredDataManager,
        SitemapGenerator,
        SEODebugger,
        checkInternalLinks,
        updatePageTitle
    };
}
