export interface AlgorithmInterface {
  id: string;
  name: string;
  code?: string;
  isWorking?: boolean;
}

export interface AlgorithmState {
  disabled?: boolean;
  selectedAlgorithm: AlgorithmInterface | null;
  setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmInterface | null>>;
}

export interface AlgorithmListInterface extends AlgorithmState {
  title: string;
  algorithmList: AlgorithmInterface[];
  handelAddAlgorithm?: () => Promise<void>;
}

export interface AlgorithmListDirections extends AlgorithmListInterface {
  isVertical: boolean;
}
