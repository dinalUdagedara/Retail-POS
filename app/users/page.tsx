type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

// example of fetching data from  third party api
export default async function Users() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>Hello</p>
        </div>
      ))}
    </div>
  );
}
