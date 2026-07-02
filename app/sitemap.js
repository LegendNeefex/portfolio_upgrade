import { supabase } from "@/app/lib/supabase";

export default async function sitemap() {
    const { data } = await supabase
        .from("projects")
        .select("slug, created_at");
        
    if (error){
        console.error("Error fetching projects for sitemap:", error);
        return [];
    }

    const projects = data?.map((project) => ({
        url: `https://neefex.vercel.app/projects/${project.slug}`,
        lastModified: new Date(project.created_at),
        changeFrequency: "monthly",
        priority: 0.8,
    })) || [];

    return [
        {
            url: "https://neefex.vercel.app",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        ...projects,
    ];
}