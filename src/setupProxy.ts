const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app: { use: (arg0: any) => void }) {
    app.use(
        createProxyMiddleware('/api',
            {
                target: "https://localhost:44392",
                // target: "https://120.76.97.191:44392",
                // target: "https://120.76.97.191:5005",
                changeOrigin:true,
                pathRewrite: {
                    "^/api": ""
                }
                , "secure":false  //如果访问的是https类的链接，就需要设置为true
            }),

    );
    // app.use(
    //     createProxyMiddleware('/api_prd',
    //         {
    //             target: "https://localhost:44392",
    //             changeOrigin:true,
    //             pathRewrite: {
    //                 "^/api_prd": ""
    //             }
    //             , "secure":false  //如果访问的是https类的链接，就需要设置为true
    //         }),
    //
    // );
}

export {};