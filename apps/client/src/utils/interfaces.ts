export interface IColors {
  [key: string]: { bg: string; text: string; border: string };
}

export interface IFolder {
  _id?: string;
  name: string;
  color: keyof IColors;
  tasks?: ITask[];
}

export interface ITask {
  _id?: string;
  name: string;
  color: keyof IColors;
  state?: boolean;
  folder?: string;
}
