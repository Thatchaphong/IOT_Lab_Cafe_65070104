export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  story: string;
  detail: string;
  catagory: string;
  is_published: boolean;
}

export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: boolean;
}

export interface Menu {
  id: number;
  name: string;
  quantity: number;
  note: string;
  price: number;
  detail: string;
}

export interface Order {
  id: number;
  name: string;
  quantity: number;
  note: string;
  price: number;
}
