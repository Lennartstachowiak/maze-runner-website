import useSWR from "swr";

// Tuple type
type FetchProps = [input: RequestInfo | URL, init?: RequestInit | undefined];

const fetcher = async (args: FetchProps) => {
  const [input, init] = args;
  const res = await fetch(input, init);
  return await res.json();
};

const API_ENDPOINT = process.env.API_ENDPOINT;

const useHandleAuth = () => {
  const { data, error, isLoading } = useSWR(
    [
      `${API_ENDPOINT}/v1/@me`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    ],
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

const handleLogin = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.status !== 200) {
      throw res.status;
    }
    window.location.href = "/";
  } catch (error) {
    if (error === 401) {
      alert("Invalid credentials");
    }
  }
};
const handleRegister = async (
  email: string,
  password: string,
  repeatedPassword: string
) => {
  if (password !== repeatedPassword) {
    alert("Password doesn't match");
    return;
  }
  try {
    const res = await fetch(`${API_ENDPOINT}/v1/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.status !== 200) {
      throw res.status;
    }
  } catch (error) {
    if (error === 401) {
      alert("Invalid credentials");
    }
  }
};

const handleLogout = async () => {
  await fetch(`${API_ENDPOINT}/v1/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location.href = "/";
};

export { useHandleAuth, handleLogin, handleRegister, handleLogout };
