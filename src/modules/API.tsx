import useSWR from "swr";

// Tuple type
type FetchProps = [input: RequestInfo | URL, init?: RequestInit | undefined];

const fetcher = async (args: FetchProps) => {
  const [input, init] = args;
  const res = await fetch(input, init);
  return await res.json();
};

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const useGetMazes = () => {
  const { data, error, isLoading } = useSWR(
    [
      `${API_ENDPOINT}/v1/get_mazes`,
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
    mazes: data,
    isLoading,
    isError: error,
  };
};

export const useGetSingleMaze = (id: string | undefined) => {
  const { data, error, isLoading } = useSWR(
    id
      ? [
          `${API_ENDPOINT}/v1/get_single_maze?id=${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        ]
      : null,
    fetcher
  );

  let maze = data;
  if (data) {
    const replacedStringStructure = data.structure.replace(/'/g, '"');
    const structure = JSON.parse(replacedStringStructure);
    maze = { ...maze, structure: structure };
  }
  return {
    maze: maze,
    isLoading,
    isError: error,
  };
};

export const getMazeAlgorithmSolution = async ({
  algorithmId,
  mazeId,
}: {
  algorithmId: string;
  mazeId: string;
}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/v1/get_maze_algorithm_solution`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        algorithmId: algorithmId,
        mazeId: mazeId,
      }),
    });
    if (res.status !== 200) {
      throw res.status;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const useGetAlgorithms = () => {
  const { data, error, isLoading, mutate } = useSWR(
    [
      `${API_ENDPOINT}/v1/get_algorithms`,
      {
        method: "GET",
        credentials: "include",
        header: {
          "Content-Type": "application/json",
        },
      },
    ],
    fetcher
  );

  return {
    algorithmList: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  };
};

export const addNewAlgorithm = async () => {
  try {
    await fetch(`${API_ENDPOINT}/v1/add_new_algorithm`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAlgorithm = async ({
  algorithmId,
}: {
  algorithmId: string;
}) => {
  try {
    await fetch(`${API_ENDPOINT}/v1/delete_algorithm`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        algorithmId: algorithmId,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const saveAlgorithmChanges = async ({
  algorithmId,
  newCode,
}: {
  algorithmId: string;
  newCode: string;
}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/v1/save_algorithm_changes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        algorithmId: algorithmId,
        newCode: newCode,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
