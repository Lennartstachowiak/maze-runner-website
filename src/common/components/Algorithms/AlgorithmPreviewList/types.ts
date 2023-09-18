export interface AlgorithmInterface {
  id: string;
  name: string;
}

export interface AlgorithmBasic {
  selectedAlgorithm: AlgorithmInterface | null;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmInterface | null>>;
}

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface AlgorithmList extends AlgorithmBasic {
  flexWrap: FlexWrap;
}
