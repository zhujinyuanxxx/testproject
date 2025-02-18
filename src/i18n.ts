import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhCNCommon from "./locales/zh-CN/common.json";
import zhCNUser from "./locales/zh-CN/user.json";
import enUSCommon from "./locales/en-US/common.json";
import enUSUser from "./locales/en-US/user.json";

i18n
    // 初始化 react-i18next
    .use(initReactI18next)
    .init({
        //  支持的命名空间
        ns: ["common", "user"],
        //  翻译资源
        resources: {
            "zh-CN": {
                common: zhCNCommon,
                user: zhCNUser,
            },
            "en-US": {
                common: enUSCommon,
                user: enUSUser,
            },
        },
        //  默认语言
        lng: "zh-CN",
    });