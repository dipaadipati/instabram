export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id
    const users = await fetch("http://localhost:3000/users.json");
    const usersData = await users.json();
    const user = usersData.find((user: any) => user.id == id);

    return Response.json(user);
}