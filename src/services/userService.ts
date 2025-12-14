const base_url = "https://jsonplaceholder.typicode.com";

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${base_url}/users`);
    // console.log(res);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err: any) {
    console.log(err.message);
  }
};
