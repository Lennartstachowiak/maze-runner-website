import { KeyedMutator } from "swr";

export interface UserProps {
  email: string;
  id: string;
}

export interface AuthPropsInterface {
  user: UserProps | null;
  mutate: KeyedMutator<unknown>;
}

export interface TextButtonInterface {
  text: string;
  handleClick: () => void;
  isDiabled?: boolean;
}
