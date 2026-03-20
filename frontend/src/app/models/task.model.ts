export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'OPEN' | 'COMPLETED';
  createdAt?: string;
}
