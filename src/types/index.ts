export interface Memo {
  id: number;
  content: string;
  timestamp: string;
}

export interface Reply extends Memo {
  parentId: number;
}