export interface permission {
  id : number;
  name: string;
  code: string;
  children: permission[];
}
