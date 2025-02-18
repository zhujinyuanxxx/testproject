import React from 'react';
import { useTranslation } from 'react-i18next'; // 导入 useTranslation 钩子

function LanguageSwitcher() {
    const { t, i18n } = useTranslation(); // 获取翻译函数和当前语言

    const changeLanguage = (e:any) => {
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <div>
            <label>{t('切换语言：')}</label>
            <select onChange={changeLanguage}>
                <option value="cn">{t('简体中文')}</option>
                <option value="hk">{t('繁体中文')}</option>
                <option value="en">{t('English')}</option>
            </select>
        </div>
    );
}

export default LanguageSwitcher;
