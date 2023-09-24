export const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = async (user: any) => {
  console.log("user:", user);
  return fetcher({
    // url: "http://localhost:3000/api/register",
    url: "https://thehardwork.tech/register",
    method: "POST",
    body: user,
  });
};

export const signin = async (user: any) => {
  console.log("Sign");
  return fetcher({
    url: "https://thehardwork.tech/signin",
    method: "POST",
    body: user,
  });
};

export const createNewProject = async (name: string) => {
  return fetcher({
    url: "https://thehardwork.tech/api/project",
    method: "POST",
    body: { name },
  });
};

export const createNewTask = async (
  name: string,
  projectId: string,
  description: string
) => {
  return fetcher({
    url: "https://thehardwork.tech/api/project/task",
    method: "POST",
    body: { name, projectId, description },
  });
};
