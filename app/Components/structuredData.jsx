export default function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ifeoluwa Oladepo",
        "alternateName": "Neefex",
        "jobTitle": "Full-Stack Developer & UI/UX Designer",
        "url": "https://neefex.vercel.app",
        "image": "https://neefex.vercel.app/Image/Pic.png",
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
            "PostgreSQL", "UI/UX Design", "Figma", "Adobe Photoshop", "Front End Developer",
            "Graphics Designer","Canva","Express.js", "Server Configuration"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Neefex Portfolio",
        "url": "https://neefex.vercel.app",
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