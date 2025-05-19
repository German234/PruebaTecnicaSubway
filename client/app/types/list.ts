export interface List {
  id: string;
  name: string;
  total_sold: string;
  createdAt: Date;
}

export interface CreateList {
  name: string;
  total_sold: number;
}
