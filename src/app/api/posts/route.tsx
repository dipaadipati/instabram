export async function GET(request: Request) {
    const users = await fetch("http://localhost:3000/api/users");
    const usersData = await users.json();

    const posts = await fetch("http://localhost:3000/posts.json");
    let postsData = await posts.json();

    postsData = postsData.map((post: any) => {
        const user = usersData.find((user: any) => user.id === post.user_id);
        return { ...post, user };
    });

    postsData = postsData.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return Response.json(postsData);
}