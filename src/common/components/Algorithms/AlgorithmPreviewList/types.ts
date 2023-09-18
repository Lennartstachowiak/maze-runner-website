export interface AlgorithmInterface {
  id: string;
  name: string;
}

export interface AlgorithmState {
  selectedAlgorithm: AlgorithmInterface | null;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmInterface | null>>;
}

export interface AlgorithmListInterface extends AlgorithmState {
  title: string;
}

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface AlgorithmListDirections extends AlgorithmListInterface {
  flexWrap: FlexWrap;
}
