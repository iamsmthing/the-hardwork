interface FetchType {
  url: string;
  method: string;
  body: object;
  json: boolean;
}

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: FetchType) => {
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
    url: "/api/register",
    // url: "https://thehardwork.tech/api/register",
    method: "POST",
    body: user,
    json: true,
  });
};

export const signin = async (user: any) => {
  console.log("Sign");
  return fetcher({
    url: "/api/signin",
    // url: "https://thehardwork.tech/api/signin",
    method: "POST",
    body: user,
    json: true,
  });
};

export const createNewProject = async (name: string) => {
  return fetcher({
    url: "/api/project",
    // url: "https://thehardwork.tech/api/project",
    method: "POST",
    body: { name },
    json: true,
  });
};

export const createNewTask = async (
  name: string,
  projectId: string,
  description: string
) => {
  return fetcher({
    url: "/api/project/task",
    // url: "https://thehardwork.tech/api/project/task",
    method: "POST",
    body: { name, projectId, description },
    json: true,
  });
};

export const getProjects = async (name: string) => {
  return fetcher({
    url: "/api/getprojects",
    // url: "https://thehardwork.tech/api/project",
    method: "GET",
    body: {},
    json: true,
  });
};

export const getTasks = async (name: string) => {
  return fetcher({
    url: "/api/tasks/gettasks",
    // url: "https://thehardwork.tech/api/project",
    method: "GET",
    body: {},
    json: true,
  });
};
