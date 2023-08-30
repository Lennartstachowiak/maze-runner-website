import useSWR from "swr";

// Tuple type
type FetchProps = [input: RequestInfo | URL, init?: RequestInit | undefined];

const fetcher = async (args: FetchProps) => {
  const [input, init] = args;
  const res = await fetch(input, init);
  return await res.json();
};

export const useGetMazes = () => {
  const { data, error, isLoading } = useSWR(
    [
      "http://127.0.0.1:5000/v1/get_mazes",
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
          `http://127.0.0.1:5000/v1/get_single_maze?id=${id}`,
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
    const res = await fetch(
      "http://127.0.0.1:5000/v1/get_maze_algorithm_solution",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          algorithmId: algorithmId,
          mazeId: mazeId,
        }),
      }
    );
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
  const { data, error, isLoading } = useSWR(
    [
      "http://127.0.0.1:5000/v1/get_algorithms",
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
  };
};
