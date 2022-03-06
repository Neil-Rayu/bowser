export interface htmlNode {
  id?: number;
  childNodes: number[];
  htmlTag?: HTMLElement;
  tagName: string;
  level?: number;
  isEndTag: boolean;
  isAttr: boolean;
}
