export interface Styles {
  'footer': string;
  'root': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
