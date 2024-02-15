export interface IColumns {
  title: string;
  id: string;
  items: IItem[];
}

export type IItem = {
    id: string;
    content: string;
    title: string;
    column_id: string;
  }
  
