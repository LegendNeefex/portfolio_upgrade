export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            }
        ],
        sitemap: "https://neefex.vercel.app/sitemap.xml",
        host: "https://neefex.vercel.app",
    };
}