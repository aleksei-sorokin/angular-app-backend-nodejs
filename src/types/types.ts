export interface IUser {
  id: number;
  email: string;
  name: string;
  job_title: string;
  tech_stack?: string[];
  createdAt: Date;
}

export interface IProgram {
  id: number;
  title: string;
  description: string;
}

export interface IMessagesIA {
  author: string;
  message: string;
}
