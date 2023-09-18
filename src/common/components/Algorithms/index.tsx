import { useState } from "react";
import React from "react";
import { AlgorithmListVertical } from "./AlgorithmPreviewList/AlgorithmPreviewBlock";
import { AlgorithmInterface } from "./AlgorithmPreviewList/types";
import Grid from "@mui/material/Grid";
import CodeBlockComponent from "./AlgorithmCodeBlock.tsx";

const code = `def dfs(node, maze, solution, visited):
    (x, y) = node
    # Refactor this part is duplicated
    cell = maze.structure[x][y]
    if type(cell) == dict:
        cell = Cell(**cell)
    if cell.goal:
        solution.append(node)
        return True
    directions = [(0, -1), (-1, 0), (0, 1), (1, 0)]  # W, N, E, S
    for direction, (dx, dy) in zip(['west', 'north', 'east', 'south'], directions):
        next_x, next_y = x + dx, y + dy
        if (0 <= next_x < maze.height and
            0 <= next_y < maze.width and
            not (next_x, next_y) in visited and
                getattr(cell, direction) == 0):
            visited.append((next_x, next_y))
            if dfs((next_x, next_y), maze, solution, visited):
                solution.append(node)
                return True
    return False";`;

const MyAlgorithms = () => {
  const [selectedAlgorithm, setAlgorithm] = useState<AlgorithmInterface | null>(
    null
  );
  return (
    <Grid container>
      <Grid item>
        <AlgorithmListVertical
          title="My Algorithms"
          selectedAlgorithm={selectedAlgorithm}
          setAlgorithm={setAlgorithm}
        />
      </Grid>
      <Grid item>
        <CodeBlockComponent
          initCode={code}
          showLineNumbers={true}
          header={selectedAlgorithm ? selectedAlgorithm?.name : ""}
        />
      </Grid>
    </Grid>
  );
};

export default MyAlgorithms;
