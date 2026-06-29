export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            }
        ],
        sitemap: "https://yourportfolio.com/sitemap.xml",
        host: "https://yourportfolio.com",
    };
}