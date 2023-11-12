import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
import { MazeProps } from "../common/types/maze";
import { AlgorithmInterface } from "../common/components/Algorithms/AlgorithmPreviewList/types";

type FetchProps = [input: RequestInfo | URL, init?: RequestInit | undefined];

const fetcher: PublicConfiguration["fetcher"] = async (args: FetchProps) => {
  const [input, init] = args;
  const res = await fetch(input, init);
  if (res.status === 401) {
    throw new Error(res.statusText);
  }
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
    mazes: data as MazeProps[],
    isLoading,
    isError: error,
  };
};

export const useGetMyMazes = () => {
  const { data, error, isLoading, mutate } = useSWR(
    [
      `${API_ENDPOINT}/v1/get_my_mazes`,
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
    mazes: data as MazeProps[],
    isLoading,
    isError: error,
    mutate,
  };
};

export const useGetSingleMaze = (id: string | undefined) => {
  const { data, error, isLoading, mutate } = useSWR(
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

  let maze = data as MazeProps & { structure: string };
  if (maze) {
    const replacedStringStructure = maze.structure.replace(/'/g, '"');
    const structure = JSON.parse(replacedStringStructure);
    maze = { ...maze, structure: structure };
  }
  return {
    maze: maze,
    isLoading,
    isError: error,
    mutate,
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
    algorithmList: data as AlgorithmInterface[],
    isLoading,
    isError: error as boolean,
    mutate,
  };
};

export const useGetSingleAlgorithm = (id: string | undefined) => {
  const { data, error, isLoading, mutate } = useSWR(
    id
      ? [
          `${API_ENDPOINT}/v1/get_single_algorithm?id=${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        ]
      : null,
    fetcher
  );

  const algorithm = data;
  return {
    algorithm: algorithm as AlgorithmInterface,
    isLoading,
    isError: error as boolean,
    mutate,
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

export const renameAlgorithm = async ({
  algorithmId,
  newName,
}: {
  algorithmId: string;
  newName: string;
}) => {
  try {
    await fetch(`${API_ENDPOINT}/v1/rename_algorithm`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        algorithmId: algorithmId,
        newName: newName,
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
      method: "PATCH",
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

export const generateNewMaze = async ({
  mazeName,
  mazeSize,
}: {
  mazeName: string;
  mazeSize: number;
}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/v1/generate_maze`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mazeName: mazeName, mazeSize: mazeSize }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMaze = async (mazeId: string) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/v1/delete_maze`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mazeId: mazeId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
