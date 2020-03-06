// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    mode: "Development",
    production: false,
    isDebugMode: true,
    gateway_url: "https://dev.paper.id:8080",
    main_api_url: "https://dev.paper.id:8080/api/v1/invoicer/",
    inventory_api_url: "https://dev.paper.id:8080/api/v1/inventory/",
    accounting_api_url: "https://dev.paper.id:8080/api/v1/accounting/",
    auth_url: "https://dev.paper.id:8080/oauth/access_token",
    dashboard_api_url: "https://dev.paper.id:8080/api/v1/invoicer/",
    finance_api_url: "https://dev.paper.id:8080/api/v1/finance/",
    paywall_api_url: "https://dev.paper.id:8080/api/v1/",
    assets_api_url: "https://dev.paper.id:9090/api/v1/",
    current_main_api_url: "https://dev.paper.id:9090/api/v1/",
    xendit_key: "NYuFK7l31+arkMJuL7YaHDGWZ9Cr8oJ7kSLh/R1h/2XT/b2kCAZ3",
    mail_api_url: "https://dev.paper.id:8902/api/",
    new_gateway_url: "https://dev.paper.id:7000/api/v1/",
    zendesk_url: "https://papersupport.zendesk.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
