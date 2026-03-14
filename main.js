/**
 * main.js - الملف الرئيسي لموقع SmartAffiliate
 * @version 3.0.0
 * @last-updated 2026-03-14
 * 
 * يشمل: نظام الكوكيز، التعليقات، تحسين الأداء، التفاعلات
 */

// ==================== إعدادات الموقع الأساسية ====================

const SITE_CONFIG = {
    name: 'SmartAffiliate',
    url: 'https://smartaffiliate.cm',
    version: '3.0.0',
    language: 'ar',
    direction: 'rtl',
    postsPerPage: 12,
    enableComments: true,
    enableCookies: true,
    enableAnimations: true,
    enableLazyLoading: true,
    enableServiceWorker: false,
    cacheVersion: 'v1',
    debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
};

// ==================== أدوات مساعدة ====================

const Utils = {
    /**
     * تنسيق التاريخ
     */
    formatDate(date, format = 'long') {
        const d = new Date(date);
        const options = format === 'long' 
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : { year: 'numeric', month: 'short', day: 'numeric' };
        return d.toLocaleDateString('ar-EG', options);
    },

    /**
     * إنشاء slug من النص
     */
    createSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    },

    /**
     * اقتصاص النص
     */
    truncate(text, length = 100) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    },

    /**
     * التمرير السلس
     */
    smoothScroll(target, duration = 500) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;

        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    },

    /**
     * نسخ نص إلى الحافظة
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            Notification.show('تم النسخ بنجاح', 'success');
        }).catch(() => {
            Notification.show('فشل النسخ', 'error');
        });
    },

    /**
     * تأخير التنفيذ (debounce)
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * تحديد الجهاز
     */
    getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }
};

// ==================== نظام الإشعارات ====================

const Notification = {
    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${this.getColor(type)};
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            animation: slideDown 0.3s ease;
            direction: rtl;
        `;

        document.body.appendChild(notification);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    },

    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    },

    getColor(type) {
        const colors = {
            success: 'linear-gradient(45deg, #10b981, #059669)',
            error: 'linear-gradient(45deg, #ef4444, #dc2626)',
            warning: 'linear-gradient(45deg, #f59e0b, #d97706)',
            info: 'linear-gradient(45deg, #3b82f6, #2563eb)'
        };
        return colors[type] || colors.info;
    }
};

// ==================== نظام الكوكيز المتكامل ====================

const CookieManager = {
    config: {
        essential: { name: 'essential_cookies', default: true, duration: 365 },
        analytics: { name: 'analytics_cookies', default: true, duration: 365 },
        marketing: { name: 'marketing_cookies', default: false, duration: 90 },
        preferences: { name: 'preferences_cookies', default: true, duration: 365 }
    },

    /**
     * تعيين كوكيز
     */
    set(name, value, days = 365) {
        try {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            const secure = window.location.protocol === 'https:' ? '; Secure' : '';
            document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${secure}`;
            return true;
        } catch (error) {
            console.error('خطأ في تعيين الكوكيز:', error);
            return false;
        }
    },

    /**
     * الحصول على كوكيز
     */
    get(name) {
        const cookieName = name + "=";
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length);
            }
        }
        return null;
    },

    /**
     * حذف كوكيز
     */
    delete(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },

    /**
     * الحصول على حالة الموافقة
     */
    getConsent() {
        const consent = this.get('cookie_consent');
        if (!consent) return null;
        
        try {
            return JSON.parse(consent);
        } catch {
            return { status: consent };
        }
    },

    /**
     * حفظ تفضيلات الكوكيز
     */
    savePreferences(preferences) {
        const consentData = {
            ...preferences,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        this.set('cookie_consent', JSON.stringify(consentData), 365);
        
        // تطبيق الإعدادات
        Object.keys(this.config).forEach(key => {
            this.set(this.config[key].name, preferences[key] ? 'true' : 'false', this.config[key].duration);
        });
        
        return true;
    },

    /**
     * قبول جميع الكوكيز
     */
    acceptAll() {
        const preferences = {};
        Object.keys(this.config).forEach(key => {
            preferences[key] = true;
        });
        preferences.status = 'accepted';
        this.savePreferences(preferences);
        return preferences;
    },

    /**
     * رفض جميع الكوكيز (ما عدا الأساسية)
     */
    rejectAll() {
        const preferences = {};
        Object.keys(this.config).forEach(key => {
            preferences[key] = key === 'essential';
        });
        preferences.status = 'rejected';
        this.savePreferences(preferences);
        return preferences;
    },

    /**
     * إنشاء إشعار الكوكيز
     */
    createBanner() {
        if (this.get('cookie_consent')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent';
        banner.innerHTML = `
            <div class="cookie-content">
                <i class="fas fa-cookie-bite cookie-icon"></i>
                <h3 class="cookie-title">نحن نهتم بخصوصيتك</h3>
                <p class="cookie-text">
                    نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في التصفح، فإنك توافق على استخدامنا للكوكيز.
                </p>
                <div class="cookie-buttons">
                    <button class="cookie-btn accept" onclick="CookieManager.acceptAllAndHide()">
                        <i class="fas fa-check-circle"></i> قبول الكل
                    </button>
                    <button class="cookie-btn settings" onclick="CookieManager.showSettings()">
                        <i class="fas fa-cog"></i> إعدادات
                    </button>
                    <button class="cookie-btn reject" onclick="CookieManager.rejectAllAndHide()">
                        <i class="fas fa-times-circle"></i> رفض
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        setTimeout(() => banner.classList.add('show'), 500);
    },

    acceptAllAndHide() {
        this.acceptAll();
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }
        Notification.show('تم حفظ تفضيلاتك بنجاح', 'success');
    },

    rejectAllAndHide() {
        this.rejectAll();
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }
        Notification.show('تم حفظ إعداداتك', 'info');
    },

    /**
     * إظهار إعدادات الكوكيز
     */
    showSettings() {
        const consent = this.getConsent() || {};
        
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <div class="settings-header">
                    <h3><i class="fas fa-cookie"></i> إعدادات الخصوصية</h3>
                    <button class="close-settings" onclick="CookieManager.hideSettings()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <h4><i class="fas fa-shield-alt"></i> الكوكيز الأساسية</h4>
                        <label class="toggle-switch">
                            <input type="checkbox" id="essentialCookies" checked disabled>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <p>ضرورية لعمل الموقع بشكل صحيح. لا يمكن تعطيلها.</p>
                </div>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <h4><i class="fas fa-chart-line"></i> كوكيز التحليلات</h4>
                        <label class="toggle-switch">
                            <input type="checkbox" id="analyticsCookies" ${consent.analytics ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <p>تساعدنا في فهم كيفية تفاعل الزوار مع الموقع.</p>
                </div>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <h4><i class="fas fa-ad"></i> كوكيز التسويق</h4>
                        <label class="toggle-switch">
                            <input type="checkbox" id="marketingCookies" ${consent.marketing ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <p>تستخدم لتقديم إعلانات مخصصة.</p>
                </div>
                
                <div class="cookie-option">
                    <div class="cookie-option-header">
                        <h4><i class="fas fa-palette"></i> كوكيز التفضيلات</h4>
                        <label class="toggle-switch">
                            <input type="checkbox" id="preferencesCookies" ${consent.preferences ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <p>تحفظ تفضيلاتك مثل اللغة والتصنيفات المفضلة.</p>
                </div>
                
                <div class="settings-footer">
                    <button class="settings-btn save" onclick="CookieManager.saveSettings()">
                        <i class="fas fa-save"></i> حفظ الإعدادات
                    </button>
                    <button class="settings-btn accept-all" onclick="CookieManager.acceptAllAndHide()">
                        <i class="fas fa-check-circle"></i> قبول الكل
                    </button>
                    <button class="settings-btn cancel" onclick="CookieManager.hideSettings()">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.style.display = 'flex', 100);
    },

    hideSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        }
    },

    saveSettings() {
        const preferences = {
            essential: true,
            analytics: document.getElementById('analyticsCookies').checked,
            marketing: document.getElementById('marketingCookies').checked,
            preferences: document.getElementById('preferencesCookies').checked,
            status: 'custom'
        };
        
        this.savePreferences(preferences);
        this.hideSettings();
        
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }
        
        Notification.show('تم حفظ الإعدادات بنجاح', 'success');
    }
};

// ==================== نظام التعليقات ====================

const CommentSystem = {
    comments: JSON.parse(localStorage.getItem('smartaffiliate_comments')) || {},

    /**
     * إضافة تعليق
     */
    add(articleId, name, text) {
        if (!this.comments[articleId]) {
            this.comments[articleId] = [];
        }
        
        const comment = {
            id: Date.now(),
            name: name.trim() || 'زائر',
            text: text.trim(),
            date: new Date().toISOString(),
            likes: 0,
            reports: 0
        };
        
        this.comments[articleId].push(comment);
        this.save();
        return comment;
    },

    /**
     * حذف تعليق
     */
    delete(articleId, commentId) {
        if (this.comments[articleId]) {
            this.comments[articleId] = this.comments[articleId].filter(c => c.id !== commentId);
            this.save();
            return true;
        }
        return false;
    },

    /**
     * إعجاب بتعليق
     */
    like(articleId, commentId) {
        if (this.comments[articleId]) {
            const comment = this.comments[articleId].find(c => c.id === commentId);
            if (comment) {
                comment.likes++;
                this.save();
                return comment.likes;
            }
        }
        return null;
    },

    /**
     * الإبلاغ عن تعليق
     */
    report(articleId, commentId) {
        if (this.comments[articleId]) {
            const comment = this.comments[articleId].find(c => c.id === commentId);
            if (comment) {
                comment.reports++;
                this.save();
                
                if (comment.reports >= 3) {
                    this.delete(articleId, commentId);
                    Notification.show('تم حذف التعليق بسبب البلاغات المتكررة', 'warning');
                }
                
                return true;
            }
        }
        return false;
    },

    /**
     * الحصول على تعليقات مقالة
     */
    getByArticle(articleId) {
        return (this.comments[articleId] || []).sort((a, b) => b.id - a.id);
    },

    /**
     * حفظ التعليقات
     */
    save() {
        localStorage.setItem('smartaffiliate_comments', JSON.stringify(this.comments));
    },

    /**
     * عرض التعليقات
     */
    render(articleId) {
        const comments = this.getByArticle(articleId);
        
        let html = `
            <div class="comments-section" id="comments-${articleId}">
                <h3 class="comments-title">
                    <i class="fas fa-comments"></i>
                    التعليقات (${comments.length})
                </h3>
                
                <div class="comment-form">
                    <h4>أضف تعليقك</h4>
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> الاسم</label>
                        <input type="text" id="comment-name-${articleId}" placeholder="اكتب اسمك" maxlength="50">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-comment"></i> التعليق</label>
                        <textarea id="comment-text-${articleId}" placeholder="اكتب تعليقك هنا..." maxlength="500"></textarea>
                    </div>
                    <button class="submit-btn" onclick="CommentSystem.submit(${articleId})">
                        <i class="fas fa-paper-plane"></i> إرسال التعليق
                    </button>
                </div>
                
                <div class="comments-list">
        `;
        
        if (comments.length === 0) {
            html += `
                <div class="no-comments">
                    <i class="fas fa-comment-slash"></i>
                    <p>لا توجد تعليقات بعد. كن أول من يعلق!</p>
                </div>
            `;
        } else {
            comments.forEach(comment => {
                html += `
                    <div class="comment-item" id="comment-${comment.id}">
                        <div class="comment-header">
                            <div class="comment-author">
                                <i class="fas fa-user-circle"></i>
                                <h4>${this.escapeHtml(comment.name)}</h4>
                            </div>
                            <span class="comment-date">
                                <i class="far fa-clock"></i> ${Utils.formatDate(comment.date, 'short')}
                            </span>
                        </div>
                        <div class="comment-text">
                            ${this.escapeHtml(comment.text).replace(/\n/g, '<br>')}
                        </div>
                        <div class="comment-actions">
                            <button onclick="CommentSystem.likeHandler(${articleId}, ${comment.id})">
                                <i class="fas fa-heart"></i> إعجاب (${comment.likes})
                            </button>
                            <button onclick="CommentSystem.reportHandler(${articleId}, ${comment.id})">
                                <i class="fas fa-flag"></i> إبلاغ
                            </button>
                        </div>
                    </div>
                `;
            });
        }
        
        html += `
                </div>
            </div>
        `;
        
        return html;
    },

    /**
     * إرسال تعليق
     */
    submit(articleId) {
        const nameInput = document.getElementById(`comment-name-${articleId}`);
        const textInput = document.getElementById(`comment-text-${articleId}`);
        
        if (!textInput.value.trim()) {
            Notification.show('الرجاء كتابة التعليق', 'warning');
            return;
        }
        
        const comment = this.add(articleId, nameInput.value, textInput.value);
        
        if (comment) {
            Notification.show('تم إضافة تعليقك بنجاح', 'success');
            textInput.value = '';
            
            // تحديث عرض التعليقات
            const commentsSection = document.getElementById(`comments-${articleId}`);
            if (commentsSection) {
                commentsSection.outerHTML = this.render(articleId);
            }
        }
    },

    likeHandler(articleId, commentId) {
        const likes = this.like(articleId, commentId);
        if (likes) {
            Notification.show('تم تسجيل إعجابك', 'success');
            
            // تحديث العدد
            const comment = document.getElementById(`comment-${commentId}`);
            if (comment) {
                const btn = comment.querySelector('button:first-child');
                btn.innerHTML = `<i class="fas fa-heart"></i> إعجاب (${likes})`;
            }
        }
    },

    reportHandler(articleId, commentId) {
        if (this.report(articleId, commentId)) {
            Notification.show('تم الإبلاغ عن التعليق', 'info');
        }
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// ==================== نظام التحميل البطيء (Lazy Loading) ====================

const LazyLoader = {
    init() {
        if (!SITE_CONFIG.enableLazyLoading) return;
        
        const images = document.querySelectorAll('img[data-src]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => observer.observe(img));
    },

    addLazyAttributes() {
        document.querySelectorAll('img:not([loading])').forEach(img => {
            if (!img.src.includes('data:image')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
};

// ==================== نظام البحث ====================

const SearchSystem = {
    articles: [],

    init(articles) {
        this.articles = articles;
        this.createSearchBox();
    },

    createSearchBox() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <i class="fas fa-search search-icon"></i>
                <input type="text" class="search-input" placeholder="ابحث عن مقالات..." id="globalSearch">
                <div class="search-results" id="searchResults"></div>
            </div>
        `;
        
        const header = document.querySelector('.glass-header .nav-container');
        if (header) {
            header.appendChild(searchContainer);
            
            const input = document.getElementById('globalSearch');
            input.addEventListener('input', Utils.debounce(() => this.search(input.value), 300));
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-box')) {
                    document.getElementById('searchResults').classList.remove('show');
                }
            });
        }
    },

    search(query) {
        const results = document.getElementById('searchResults');
        
        if (!query || query.length < 2) {
            results.classList.remove('show');
            return;
        }
        
        const matches = this.articles.filter(article => 
            article.title.includes(query) || 
            article.excerpt.includes(query) ||
            article.categoryName.includes(query)
        ).slice(0, 5);
        
        if (matches.length === 0) {
            results.innerHTML = '<div class="search-no-results">لا توجد نتائج</div>';
        } else {
            results.innerHTML = matches.map(article => `
                <a href="${article.url}" class="search-result-item">
                    <i class="fas ${article.icon}"></i>
                    <div>
                        <h4>${article.title}</h4>
                        <span>${article.categoryName}</span>
                    </div>
                </a>
            `).join('');
        }
        
        results.classList.add('show');
    }
};

// ==================== نظام المشاركة الاجتماعية ====================

const SocialShare = {
    share(platform, url = window.location.href, title = document.title) {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
        };
        
        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'noopener,noreferrer');
        }
    },

    createButtons() {
        const container = document.createElement('div');
        container.className = 'share-buttons';
        container.innerHTML = `
            <button class="share-btn facebook" onclick="SocialShare.share('facebook')">
                <i class="fab fa-facebook-f"></i>
            </button>
            <button class="share-btn twitter" onclick="SocialShare.share('twitter')">
                <i class="fa-brands fa-x-twitter"></i>
            </button>
            <button class="share-btn linkedin" onclick="SocialShare.share('linkedin')">
                <i class="fab fa-linkedin-in"></i>
            </button>
            <button class="share-btn whatsapp" onclick="SocialShare.share('whatsapp')">
                <i class="fab fa-whatsapp"></i>
            </button>
            <button class="share-btn telegram" onclick="SocialShare.share('telegram')">
                <i class="fab fa-telegram-plane"></i>
            </button>
        `;
        
        return container;
    }
};

// ==================== نظام تحسين الأداء ====================

const PerformanceOptimizer = {
    init() {
        this.preloadCriticalAssets();
        this.deferNonCritical();
        this.setupCache();
    },

    preloadCriticalAssets() {
        const assets = [
            '/css/style.css',
            '/js/main.js',
            '/images/logo.svg'
        ];
        
        assets.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = href.endsWith('.css') ? 'style' : href.endsWith('.js') ? 'script' : 'image';
            link.href = href;
            document.head.appendChild(link);
        });
    },

    deferNonCritical() {
        const deferred = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
        ];
        
        deferred.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = () => { link.media = 'all'; };
            document.head.appendChild(link);
        });
    },

    setupCache() {
        if ('caches' in window) {
            caches.open(`smartaffiliate-${SITE_CONFIG.cacheVersion}`).then(cache => {
                cache.addAll([
                    '/',
                    '/css/style.css',
                    '/js/main.js',
                    '/images/logo.svg'
                ]);
            });
        }
    }
};

// ==================== نظام الصفحات ====================

const PageManager = {
    currentPage: null,

    init() {
        this.currentPage = window.location.pathname;
        this.setupEventListeners();
    },

    setupEventListeners() {
        // روابط التنقل السلس
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                if (target && target !== '#') {
                    Utils.smoothScroll(target);
                }
            });
        });

        // زر العودة للأعلى
        const scrollTop = document.createElement('button');
        scrollTop.id = 'scrollTop';
        scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        document.body.appendChild(scrollTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });
    },

    loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.getElementById('main-content');
                
                if (content) {
                    document.getElementById('main-content').innerHTML = content.innerHTML;
                    document.title = doc.title;
                    window.history.pushState({}, '', url);
                    
                    // تحديث الرابط النشط
                    this.updateActiveLink(url);
                }
            })
            .catch(() => {
                window.location.href = url;
            });
    },

    updateActiveLink(url) {
        document.querySelectorAll('.nav-container a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === url) {
                link.classList.add('active');
            }
        });
    }
};

// ==================== التهيئة الرئيسية ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log(`🚀 SmartAffiliate v${SITE_CONFIG.version} - تم التحميل`);

    // إضافة تأثيرات CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translate(-50%, -100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        
        .cookie-consent,
        .cookie-settings-modal,
        #scrollTop {
            direction: rtl;
        }
        
        #scrollTop {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, #00d2ff, #9d50bb);
            color: #050816;
            border: none;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            z-index: 99;
            box-shadow: 0 5px 20px rgba(0,210,255,0.3);
        }
        
        #scrollTop.visible {
            opacity: 1;
        }
        
        #scrollTop:hover {
            transform: translateY(-5px);
        }
        
        .search-container {
            position: relative;
            margin-right: 1rem;
        }
        
        .search-box {
            position: relative;
        }
        
        .search-input {
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            border-radius: 30px;
            border: 1px solid rgba(0,210,255,0.3);
            background: rgba(255,255,255,0.1);
            color: #fff;
            width: 200px;
            transition: 0.3s;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #00d2ff;
            width: 250px;
        }
        
        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #00d2ff;
        }
        
        .search-results {
            position: absolute;
            top: 100%;
            right: 0;
            width: 300px;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid #00d2ff;
            border-radius: 15px;
            margin-top: 10px;
            padding: 10px;
            display: none;
            z-index: 1000;
        }
        
        .search-results.show {
            display: block;
        }
        
        .search-result-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            color: #fff;
            text-decoration: none;
            border-radius: 10px;
            transition: 0.3s;
        }
        
        .search-result-item:hover {
            background: rgba(0,210,255,0.1);
        }
        
        .search-result-item i {
            color: #00d2ff;
            font-size: 1.2rem;
        }
        
        .search-result-item h4 {
            font-size: 0.9rem;
            margin-bottom: 2px;
        }
        
        .search-result-item span {
            font-size: 0.7rem;
            color: #b0b3c5;
        }
        
        .search-no-results {
            text-align: center;
            color: #b0b3c5;
            padding: 20px;
        }
        
        @media (max-width: 768px) {
            .search-input {
                width: 150px;
            }
            
            .search-input:focus {
                width: 180px;
            }
            
            .search-results {
                width: 280px;
                left: 0;
                right: auto;
            }
        }
    `;
    document.head.appendChild(style);

    // تهيئة الأنظمة
    if (SITE_CONFIG.enableCookies) {
        CookieManager.createBanner();
    }
    
    LazyLoader.init();
    LazyLoader.addLazyAttributes();
    PerformanceOptimizer.init();
    PageManager.init();

    // إتاحة الأنظمة للاستخدام العام
    window.Utils = Utils;
    window.Notification = Notification;
    window.CookieManager = CookieManager;
    window.CommentSystem = CommentSystem;
    window.SocialShare = SocialShare;
    window.SearchSystem = SearchSystem;
});

// التحميل الكامل
window.addEventListener('load', () => {
    console.log('✅ تم تحميل جميع الموارد');
    
    // إزالة شاشة التحميل إذا وجدت
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// للاستخدام في وحدات ES6 (اختياري)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        Notification,
        CookieManager,
        CommentSystem,
        SocialShare,
        SearchSystem,
        PageManager,
        PerformanceOptimizer
    };
}
