import { supabase } from "@/app/lib/supabase";
import ProjectPage from "./projectPage";

// SEO metadata - runs on server
export async function generateMetadata({ params }) {
    const { slug } = await params;

    const { data } = await supabase
        .from("projects")
        .select("project_title, project_overview, thumbnail_url")
        .eq("slug", slug)
        .single();

    return {
        title: data?.project_title,
        description: data?.project_overview,
        alternates: {
            canonical: `https://yourportfolio.com/projects/${slug}`,
        },
        openGraph: {
            title: data?.project_title,
            description: data?.project_overview,
            images: [{ url: data?.thumbnail_url }],
        },
    };
}

// Structured data component
function ProjectStructuredData({ data }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": data?.project_title,
        "description": data?.project_overview,
        "image": data?.thumbnail_url,
        "url": `https://yourportfolio.com/projects/${data?.slug}`,
        "creator": {
            "@type": "Person",
            "name": "Ifeoluwa Oladepo"
        },
        "keywords": data?.stack_tag?.join(", ")
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Page entry point
export default async function Page({ params }) {
    const { slug } = await params;

    const { data } = await supabase
        .from("projects")
        .select("project_title, project_overview, thumbnail_url, slug, stack_tag")
        .eq("slug", slug)
        .single();

    return (
        <>
            <ProjectStructuredData data={data} />
            <ProjectPage />
        </>
    );
}