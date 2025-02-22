interface userType {
    id: number;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id)
    const users = await fetch("http://localhost:3000/users.json");
    const usersData = await users.json();
    const userStory = usersData.find((user: userType) => user.id == id);

    return Response.json(userStory);
}