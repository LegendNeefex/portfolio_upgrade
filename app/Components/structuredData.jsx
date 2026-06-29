export default function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ifeoluwa Oladepo",
        "alternateName": "Neefex",
        "jobTitle": "Full-Stack Developer & UI/UX Designer",
        "url": "https://yourportfolio.com",
        "image": "https://yourportfolio.com/Image/Pic.png",
        "email": "mhedheyghold12@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lagos",
            "addressCountry": "Nigeria"
        },
        "sameAs": [
            "https://github.com/LegendNeefex",
            "https://linkedin.com/in/neefex"
        ],
        "knowsAbout": [
            "React.js", "Next.js", "Node.js",
            "PostgreSQL", "UI/UX Design", "Figma"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Neefex Portfolio",
        "url": "https://yourportfolio.com",
        "description": "Portfolio of Ifeoluwa Oladepo, Full-Stack Developer and UI/UX Designer",
        "author": { "@type": "Person", "name": "Ifeoluwa Oladepo" }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}