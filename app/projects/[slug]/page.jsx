export default async function ProjectPage({ params }) {
    const { slug } = await params;

    return (
        <div>
            {slug}
        </div>
    );
}