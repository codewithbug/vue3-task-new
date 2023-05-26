export interface Task {
    id: number;
    title: string;
    description : string;
    status: 'Opened' | 'In progress' | 'Done' | 'Closed';
  }