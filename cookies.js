/**
 * ملف إدارة الكوكيز لموقع SmartAffiliate
 * @version 1.0.0
 * @last-updated 2026-03-14
 */

// ==================== إعدادات الكوكيز الأساسية ====================

const COOKIE_CONFIG = {
    essential: {
        name: 'essential_cookies',
        default: true,
        description: 'الكوكيز الأساسية اللازمة لعمل الموقع',
        duration: 365 // أيام
    },
    analytics: {
        name: 'analytics_cookies',
        default: true,
        description: 'كوكيز تحليل الأداء (Google Analytics)',
        duration: 365
    },
    marketing: {
        name: 'marketing_cookies',
        default: false,
        description: 'كوكيز التسويق والإعلانات',
        duration: 90
    },
    preferences: {
        name: 'preferences_cookies',
        default: true,
        description: 'كوكيز تفضيلات المستخدم',
        duration: 365
    }
};

const COOKIE_CONSENT_NAME = 'cookie_consent';
const COOKIE_CONSENT_VERSION = 'v1';

// ==================== دوال الكوكيز الأساسية ====================

/**
 * تعيين كوكيز
 * @param {string} name - اسم الكوكي
 * @param {string} value - القيمة
 * @param {number} days - مدة الصلاحية بالأيام
 * @param {string} path - المسار (اختياري)
 */
function setCookie(name, value, days, path = '/') {
    try {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        
        // إعدادات الأمان
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        const sameSite = '; SameSite=Lax';
        
        document.cookie = `${name}=${value}; ${expires}; path=${path}${secure}${sameSite}`;
        
        // تسجيل العملية
        logCookieOperation('set', name, value);
        
        return true;
    } catch (error) {
        console.error('❌ خطأ في تعيين الكوكي:', error);
        return false;
    }
}

/**
 * الحصول على قيمة كوكيز
 * @param {string} name - اسم الكوكي
 * @returns {string|null} - قيمة الكوكي أو null
 */
function getCookie(name) {
    try {
        const cookieName = name + "=";
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    } catch (error) {
        console.error('❌ خطأ في قراءة الكوكي:', error);
        return null;
    }
}

/**
 * حذف كوكيز
 * @param {string} name - اسم الكوكي
 * @param {string} path - المسار
 */
function deleteCookie(name, path = '/') {
    try {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
        logCookieOperation('delete', name);
        return true;
    } catch (error) {
        console.error('❌ خطأ في حذف الكوكي:', error);
        return false;
    }
}

/**
 * التحقق من وجود كوكيز
 * @param {string} name - اسم الكوكي
 * @returns {boolean}
 */
function hasCookie(name) {
    return getCookie(name) !== null;
}

// ==================== دوال الموافقة على الكوكيز ====================

/**
 * الحصول على حالة الموافقة
 * @returns {object} - حالة الموافقة
 */
function getConsentStatus() {
    const consent = getCookie(COOKIE_CONSENT_NAME);
    
    if (!consent) {
        return {
            status: 'pending',
            analytics: false,
            marketing: false,
            preferences: true,
            essential: true
        };
    }
    
    try {
        return JSON.parse(consent);
    } catch {
        // إذا كان التنسيق قديماً
        return {
            status: consent,
            analytics: consent === 'accepted',
            marketing: consent === 'accepted',
            preferences: true,
            essential: true
        };
    }
}

/**
 * حفظ تفضيلات الكوكيز
 * @param {object} preferences - تفضيلات المستخدم
 * @returns {boolean}
 */
function saveCookiePreferences(preferences) {
    try {
        const consentData = {
            ...preferences,
            timestamp: new Date().toISOString(),
            version: COOKIE_CONSENT_VERSION
        };
        
        // حفظ في الكوكيز
        setCookie(COOKIE_CONSENT_NAME, JSON.stringify(consentData), 365);
        
        // تطبيق الإعدادات
        applyCookiePreferences(preferences);
        
        // إرسال حدث إلى Google Tag Manager
        if (window.dataLayer && preferences.analytics) {
            window.dataLayer.push({
                'event': 'cookieConsent',
                'consentStatus': preferences.status
            });
        }
        
        // تحديث واجهة المستخدم
        updateCookieUI();
        
        logCookieOperation('save_preferences', preferences);
        
        return true;
    } catch (error) {
        console.error('❌ خطأ في حفظ التفضيلات:', error);
        return false;
    }
}

/**
 * تطبيق تفضيلات الكوكيز
 * @param {object} preferences - تفضيلات المستخدم
 */
function applyCookiePreferences(preferences) {
    // الكوكيز الأساسية - دائماً مفعلة
    setCookie('essential_cookies', 'true', 365);
    
    // كوكيز التحليلات
    if (preferences.analytics) {
        setCookie('analytics_cookies', 'true', 365);
        enableAnalytics();
    } else {
        setCookie('analytics_cookies', 'false', 365);
        disableAnalytics();
    }
    
    // كوكيز التسويق
    if (preferences.marketing) {
        setCookie('marketing_cookies', 'true', 90);
        enableMarketing();
    } else {
        setCookie('marketing_cookies', 'false', 90);
        disableMarketing();
    }
    
    // كوكيز التفضيلات
    if (preferences.preferences) {
        setCookie('preferences_cookies', 'true', 365);
    } else {
        setCookie('preferences_cookies', 'false', 365);
    }
}

// ==================== دوال الكوكيز المتخصصة ====================

/**
 * تفعيل كوكيز التحليلات
 */
function enableAnalytics() {
    // Google Analytics
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
    
    // يمكن إضافة كود إضافي لتفعيل التحليلات
    console.log('📊 تم تفعيل كوكيز التحليلات');
}

/**
 * تعطيل كوكيز التحليلات
 */
function disableAnalytics() {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
    
    // حذف كوكيز Google Analytics
    deleteCookie('_ga');
    deleteCookie('_gid');
    deleteCookie('_gat');
    
    console.log('📊 تم تعطيل كوكيز التحليلات');
}

/**
 * تفعيل كوكيز التسويق
 */
function enableMarketing() {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });
    }
    
    console.log('🎯 تم تفعيل كوكيز التسويق');
}

/**
 * تعطيل كوكيز التسويق
 */
function disableMarketing() {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        });
    }
    
    // حذف كوكيز الإعلانات
    deleteCookie('_fbp');
    deleteCookie('_fbc');
    deleteCookie('IDE');
    
    console.log('🎯 تم تعطيل كوكيز التسويق');
}

// ==================== دوال واجهة المستخدم ====================

/**
 * إنشاء إشعار الكوكيز
 */
function createCookieBanner() {
    // التحقق مما إذا كان قد تم اتخاذ قرار بالفعل
    if (getCookie(COOKIE_CONSENT_NAME)) {
        return;
    }
    
    // إنشاء عناصر الإشعار
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent';
    
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-icon">
                <i class="fas fa-cookie-bite"></i>
            </div>
            <h3 class="cookie-title">🍪 نحن نهتم بخصوصيتك</h3>
            <p class="cookie-text">
                نستخدم ملفات تعريف الارتباط (كوكيز) لتحسين تجربتك وتخصيص المحتوى. 
                بإستمرارك في التصفح، فإنك توافق على استخدامنا للكوكيز.
            </p>
            <div class="cookie-buttons">
                <button class="cookie-btn accept" onclick="window.acceptAllCookies()">
                    <i class="fas fa-check-circle"></i> موافق
                </button>
                <button class="cookie-btn settings" onclick="window.openCookieSettings()">
                    <i class="fas fa-cog"></i> إعدادات
                </button>
                <button class="cookie-btn reject" onclick="window.rejectAllCookies()">
                    <i class="fas fa-times-circle"></i> رفض
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // إظهار الإشعار مع تأخير بسيط
    setTimeout(() => {
        banner.classList.add('show');
    }, 1000);
}

/**
 * إنشاء نافذة إعدادات الكوكيز
 */
function createCookieSettings() {
    const modal = document.createElement('div');
    modal.id = 'cookie-settings-modal';
    modal.className = 'cookie-settings-modal';
    
    const preferences = getConsentStatus();
    
    modal.innerHTML = `
        <div class="cookie-settings-content">
            <div class="settings-header">
                <h3><i class="fas fa-cookie"></i> إعدادات الخصوصية</h3>
                <button class="close-settings" onclick="window.closeCookieSettings()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="cookie-option">
                <div class="cookie-option-header">
                    <h4><i class="fas fa-shield-alt" style="color: #00d2ff;"></i> الكوكيز الأساسية</h4>
                    <label class="toggle-switch">
                        <input type="checkbox" id="essentialCookies" checked disabled>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <p>ضرورية لعمل الموقع بشكل صحيح. لا يمكن تعطيلها.</p>
            </div>
            
            <div class="cookie-option">
                <div class="cookie-option-header">
                    <h4><i class="fas fa-chart-line" style="color: #00d2ff;"></i> كوكيز التحليلات</h4>
                    <label class="toggle-switch">
                        <input type="checkbox" id="analyticsCookies" ${preferences.analytics ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <p>تساعدنا في فهم كيفية تفاعل الزوار مع الموقع لتحسين الأداء.</p>
            </div>
            
            <div class="cookie-option">
                <div class="cookie-option-header">
                    <h4><i class="fas fa-ad" style="color: #00d2ff;"></i> كوكيز التسويق</h4>
                    <label class="toggle-switch">
                        <input type="checkbox" id="marketingCookies" ${preferences.marketing ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <p>تستخدم لتقديم إعلانات مخصصة حسب اهتماماتك.</p>
            </div>
            
            <div class="cookie-option">
                <div class="cookie-option-header">
                    <h4><i class="fas fa-palette" style="color: #00d2ff;"></i> تفضيلات المظهر</h4>
                    <label class="toggle-switch">
                        <input type="checkbox" id="preferencesCookies" ${preferences.preferences ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <p>حفظ تفضيلاتك مثل التصنيفات المفضلة واللغة.</p>
            </div>
            
            <div class="settings-footer">
                <button class="settings-btn save" onclick="window.saveCookieSettings()">
                    <i class="fas fa-save"></i> حفظ الإعدادات
                </button>
                <button class="settings-btn accept-all" onclick="window.acceptAllCookies()">
                    <i class="fas fa-check-circle"></i> قبول الكل
                </button>
                <button class="settings-btn cancel" onclick="window.closeCookieSettings()">
                    <i class="fas fa-times"></i> إلغاء
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

/**
 * تحديث واجهة المستخدم حسب حالة الكوكيز
 */
function updateCookieUI() {
    const consent = getConsentStatus();
    
    // تحديث حالة الأزرار في الصفحة
    document.querySelectorAll('.cookie-status').forEach(el => {
        el.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>حالة الكوكيز: ${consent.status === 'accepted' ? 'مقبولة' : 'مخصصة'}</span>
        `;
    });
}

// ==================== دوال التحكم العامة ====================

/**
 * قبول جميع الكوكيز
 */
window.acceptAllCookies = function() {
    const preferences = {
        status: 'accepted',
        analytics: true,
        marketing: true,
        preferences: true,
        essential: true
    };
    
    saveCookiePreferences(preferences);
    
    // إخفاء الإشعار
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }
    
    // إغلاق نافذة الإعدادات إذا كانت مفتوحة
    closeCookieSettings();
    
    showNotification('✅ تم حفظ تفضيلاتك بنجاح', 'success');
};

/**
 * رفض جميع الكوكيز (ما عدا الأساسية)
 */
window.rejectAllCookies = function() {
    const preferences = {
        status: 'rejected',
        analytics: false,
        marketing: false,
        preferences: false,
        essential: true
    };
    
    saveCookiePreferences(preferences);
    
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }
    
    closeCookieSettings();
    
    showNotification('⚙️ تم حفظ إعداداتك بنجاح', 'info');
};

/**
 * فتح إعدادات الكوكيز
 */
window.openCookieSettings = function() {
    let modal = document.getElementById('cookie-settings-modal');
    
    if (!modal) {
        createCookieSettings();
        modal = document.getElementById('cookie-settings-modal');
    }
    
    modal.style.display = 'flex';
};

/**
 * إغلاق إعدادات الكوكيز
 */
window.closeCookieSettings = function() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
        modal.style.display = 'none';
    }
};

/**
 * حفظ إعدادات الكوكيز المخصصة
 */
window.saveCookieSettings = function() {
    const analytics = document.getElementById('analyticsCookies')?.checked || false;
    const marketing = document.getElementById('marketingCookies')?.checked || false;
    const preferences = document.getElementById('preferencesCookies')?.checked || true;
    
    const settings = {
        status: 'custom',
        analytics: analytics,
        marketing: marketing,
        preferences: preferences,
        essential: true
    };
    
    saveCookiePreferences(settings);
    
    closeCookieSettings();
    
    // إخفاء الإشعار إذا كان موجوداً
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }
    
    showNotification('⚙️ تم حفظ الإعدادات بنجاح', 'success');
};

// ==================== دوال مساعدة ====================

/**
 * تسجيل عمليات الكوكيز
 * @param {string} operation - نوع العملية
 * @param {string} name - اسم الكوكي
 * @param {any} value - القيمة
 */
function logCookieOperation(operation, name, value = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`🍪 [${operation}] ${name}`, value ? `: ${value}` : '');
    }
}

/**
 * عرض إشعار للمستخدم
 * @param {string} message - الرسالة
 * @param {string} type - النوع (success, error, info)
 */
function showNotification(message, type = 'info') {
    // التحقق من وجود الإشعارات مسبقاً
    const existing = document.querySelector('.cookie-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'cookie-notification';
    
    const colors = {
        success: 'linear-gradient(45deg, #10b981, #059669)',
        error: 'linear-gradient(45deg, #ef4444, #dc2626)',
        info: 'linear-gradient(45deg, #3b82f6, #2563eb)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10001;
        font-weight: 600;
        animation: slideDown 0.3s ease;
        border: 1px solid rgba(255,255,255,0.2);
        direction: rtl;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== التهيئة ====================

/**
 * تهيئة نظام الكوكيز
 */
function initCookieSystem() {
    // إضافة تأثيرات CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                transform: translate(-50%, -100%);
                opacity: 0;
            }
            to {
                transform: translate(-50%, 0);
                opacity: 1;
            }
        }
        
        .cookie-consent {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            max-width: 400px;
            margin: 0 auto;
            background: rgba(20, 30, 45, 0.95);
            backdrop-filter: blur(20px);
            border: 2px solid #00d2ff;
            border-radius: 30px;
            padding: 25px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            transform: translateY(200%);
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            direction: rtl;
        }
        
        .cookie-consent.show {
            transform: translateY(0);
        }
        
        .cookie-content {
            text-align: center;
        }
        
        .cookie-icon {
            font-size: 3rem;
            color: #00d2ff;
            margin-bottom: 15px;
            animation: cookieWiggle 2s infinite;
        }
        
        @keyframes cookieWiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(10deg); }
            75% { transform: rotate(-10deg); }
        }
        
        .cookie-title {
            color: #00d2ff;
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        
        .cookie-text {
            color: #b0b3c5;
            margin-bottom: 20px;
            font-size: 0.95rem;
        }
        
        .cookie-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .cookie-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .cookie-btn.accept {
            background: linear-gradient(45deg, #00d2ff, #9d50bb);
            color: #050816;
        }
        
        .cookie-btn.settings {
            background: rgba(255,255,255,0.1);
            color: #fff;
            border: 1px solid #00d2ff;
        }
        
        .cookie-btn.reject {
            background: rgba(255,255,255,0.05);
            color: #b0b3c5;
            border: 1px solid #444;
        }
        
        .cookie-btn:hover {
            transform: translateY(-3px);
        }
        
        .cookie-settings-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            backdrop-filter: blur(10px);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .cookie-settings-content {
            background: rgba(20, 30, 45, 0.95);
            border: 2px solid #00d2ff;
            border-radius: 40px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(0,210,255,0.3);
        }
        
        .settings-header h3 {
            color: #00d2ff;
            font-size: 1.5rem;
        }
        
        .close-settings {
            background: none;
            border: none;
            color: #b0b3c5;
            font-size: 2rem;
            cursor: pointer;
            transition: 0.3s;
        }
        
        .close-settings:hover {
            color: #ef4444;
            transform: rotate(90deg);
        }
        
        .cookie-option {
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
        }
        
        .cookie-option-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 26px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #444;
            transition: .3s;
            border-radius: 26px;
        }
        
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .3s;
            border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
            background: linear-gradient(45deg, #00d2ff, #9d50bb);
        }
        
        input:checked + .toggle-slider:before {
            transform: translateX(26px);
        }
        
        .settings-footer {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid rgba(0,210,255,0.3);
        }
        
        .settings-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
        }
        
        .settings-btn.save {
            background: linear-gradient(45deg, #00d2ff, #9d50bb);
            color: #050816;
        }
        
        .settings-btn.accept-all {
            background: #10b981;
            color: white;
        }
        
        .settings-btn.cancel {
            background: transparent;
            color: #fff;
            border: 1px solid #00d2ff;
        }
        
        .settings-btn:hover {
            transform: translateY(-3px);
        }
    `;
    
    document.head.appendChild(style);
    
    // التحقق من الحالة
    const consent = getCookie(COOKIE_CONSENT_NAME);
    
    if (!consent) {
        // إنشاء إشعار الكوكيز
        createCookieBanner();
    } else {
        // تطبيق الإعدادات المحفوظة
        const preferences = getConsentStatus();
        applyCookiePreferences(preferences);
    }
}

// ==================== تصدير الدوال للاستخدام العام ====================

// دوال للاستخدام المباشر من HTML
window.getCookie = getCookie;
window.setCookie = setCookie;
window.deleteCookie = deleteCookie;
window.hasCookie = hasCookie;
window.getConsentStatus = getConsentStatus;

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initCookieSystem);

// تصدير للاستخدام في وحدات ES6 (اختياري)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setCookie,
        getCookie,
        deleteCookie,
        hasCookie,
        getConsentStatus,
        saveCookiePreferences,
        acceptAllCookies,
        rejectAllCookies,
        openCookieSettings,
        closeCookieSettings
    };
}
