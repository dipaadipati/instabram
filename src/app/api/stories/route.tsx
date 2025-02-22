import '../../../../envConfig.ts'

interface userType {
    stories: [index: number];
}

export async function GET() {
    const users = await fetch(process.env.HOST_URL + "/users.json");
    const usersData = await users.json();
    const usersWithStories = usersData.filter((user: userType) => user.stories.length > 0);

    return Response.json(usersWithStories);
}