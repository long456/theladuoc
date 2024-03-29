export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export interface TreeNode {
  name: string;
  url: string;
  children?: TreeNode[];
  navCode: string;
  parentCode: string;
}
