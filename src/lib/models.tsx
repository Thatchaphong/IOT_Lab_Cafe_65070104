export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  story: string;
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
