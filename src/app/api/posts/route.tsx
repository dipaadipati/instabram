import '../../../../envConfig.ts'

interface postType {
    id: number;
    user_id: number;
    created_at: number;
}

export async function GET() {
    const users = await fetch(process.env.HOST_URL + "/api/users");
    const usersData = await users.json();

    const posts = await fetch(process.env.HOST_URL + "/posts.json");
    let postsData = await posts.json();

    postsData = postsData.map((post: postType) => {
        const user = usersData.find((user: postType) => user.id === post.user_id);
        return { ...post, user };
    });

    postsData = postsData.sort((a: postType, b: postType) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return Response.json(postsData);
}