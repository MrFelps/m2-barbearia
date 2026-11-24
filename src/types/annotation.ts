export interface AnnotationItem {
  id: string;
  number: number;
  author: string;
  comment: string;
  isBox: boolean;
  x: number;
  y: number;
  width?: number;
  height?: number;
  tab?: string;
  tabName?: string;
  createdAt: string;
  resolved?: boolean;
}

export interface AnnotationProject {
  project: string;
  exportDate: string;
  totalComments: number;
  author: string;
  annotations: AnnotationItem[];
}
