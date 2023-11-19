import React, { useEffect, useRef } from "react";
import _ from "lodash";
import { MazeSolution } from "../../pages/MazePage";
import { Grid } from "@mui/material";

interface Cell {
  north: number;
  south: number;
  east: number;
  west: number;
  start: boolean;
  goal: boolean;
}

type SolutionObject = [number, number];

interface MazeComponentProps {
  mazeStructure: Cell[][];
  mazeSolution: MazeSolution | null;
}

const MazeRender = (props: MazeComponentProps) => {
  const { mazeStructure, mazeSolution } = props;
  const [size, setSize] = React.useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      if (parentRef.current) {
        setSize(parentRef.current.clientWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [parentRef]);

  useEffect(() => {
    const drawMaze = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const RED = "#ff0000";
      const GREEN = "#009000";
      const BLACK = "#000000";
      const LIGHTYELLOW = "#ffff66";
      const LIGHTBLUE = "#ccccff";
      const BLUE = "#0000ff";

      const currentMaze = mazeStructure;
      const currentSolution = mazeSolution?.solution;
      const currentSearchPath = mazeSolution?.visited;
      const windowSize = parentRef.current?.clientWidth || 400;
      const cellSize = windowSize / currentMaze.length;
      const halfCellSize = cellSize / 2;
      const lineThickness = cellSize / 12;
      const doubleLineThickness = lineThickness * 2;
      // const halfLineThickness = lineThickness / 2;

      ctx.clearRect(0, 0, windowSize, windowSize);

      for (let row = 0; row < currentMaze.length; row++) {
        for (let col = 0; col < currentMaze[row].length; col++) {
          const cell = currentMaze[row][col];
          let stepRound = "";
          const isOnPath = currentSolution?.some((step: SolutionObject) =>
            _.isEqual(step, [row, col])
          );

          const isOnSearchPath = currentSearchPath?.some(
            (
              step: SolutionObject,
              index: number,
              steps: Array<SolutionObject>
            ) => {
              const nextStep = steps[index + 1];
              if (_.isEqual(step, [row, col]) && nextStep) {
                stepRound = `${index}`;
                return true;
              }
            }
          );

          // Calculate the position of the cell in the canvas
          const xPosition = col * cellSize;
          const yPosition = row * cellSize;

          const centerX = xPosition + halfCellSize;
          const centerY = yPosition + halfCellSize;

          if (isOnSearchPath) {
            ctx.fillStyle = LIGHTBLUE;
            ctx.fillRect(xPosition, yPosition, cellSize, cellSize);
            if (isOnPath) {
              ctx.fillStyle = LIGHTYELLOW;
              ctx.fillRect(xPosition, yPosition, cellSize, cellSize);
            }
            ctx.font = `${cellSize / 2.5}px serif`;
            ctx.fillStyle = BLUE;
            ctx.fillText(stepRound, centerX - 8, centerY);
          }

          if (cell.start) {
            ctx.fillStyle = RED;
            ctx.fillRect(xPosition, yPosition, cellSize, cellSize);
          }

          if (cell.goal) {
            ctx.fillStyle = GREEN;
            ctx.fillRect(xPosition, yPosition, cellSize, cellSize);
          }

          if (cell.north === 1) {
            const isOnNorthBoundary = row === 0;
            const wallThickness = isOnNorthBoundary
              ? doubleLineThickness
              : lineThickness;
            const length = cellSize;

            // Render northern wall
            ctx.fillStyle = BLACK;
            ctx.fillRect(
              centerX - length / 2,
              yPosition,
              length,
              wallThickness
            );
          }

          if (cell.east === 1) {
            const isOnEastBoundary = col === currentMaze[row].length - 1;
            const wallThickness = isOnEastBoundary
              ? doubleLineThickness
              : lineThickness;
            const length = cellSize;

            // Render eastern wall
            ctx.fillStyle = BLACK;
            ctx.fillRect(
              xPosition + cellSize - wallThickness,
              centerY - length / 2,
              wallThickness,
              length
            );
          }

          if (cell.south === 1) {
            const isOnSouthBoundary = row === currentMaze.length - 1;
            const wallThickness = isOnSouthBoundary
              ? doubleLineThickness
              : lineThickness;
            const length = cellSize;

            // Render southern wall
            ctx.fillStyle = BLACK;
            ctx.fillRect(
              centerX - length / 2,
              yPosition + cellSize - wallThickness,
              length,
              wallThickness
            );
          }

          if (cell.west === 1) {
            const isOnWestBoundary = col === 0;
            const wallThickness = isOnWestBoundary
              ? doubleLineThickness
              : lineThickness;
            const length = cellSize;

            // Render western wall
            ctx.fillStyle = BLACK;
            ctx.fillRect(
              xPosition,
              centerY - length / 2,
              wallThickness,
              length
            );
          }
        }
      }
    };
    drawMaze();
  }, [mazeSolution, size]);

  return (
    <Grid ref={parentRef} width="100%" position="relative">
      <canvas ref={canvasRef} width={size} height={size} />
    </Grid>
  );
};

export default MazeRender;
