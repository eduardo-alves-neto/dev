export type IItem = {
    id: string;
    content: string;
    title: string;
    column_id: string;
  }
  
 export type IColumns = {
    title: string;
    id: string;
    items: IItem[];
  }
  