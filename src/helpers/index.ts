export const createNewUser = async ({userName,email,password}: {userName: string;email: string;password: string;}) => {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    });
    const newUser = await res.json();
    return newUser;
  } catch (err) {
    console.log(err);
  }
};
