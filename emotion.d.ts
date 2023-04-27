import '@emotion/react';
import { Number } from '@react-three/fiber';

declare module '@emotion/react' {
  export interface Theme {
    active?: string;
    favicon?: string;
    canvas?: Number;
    gh?: string;
  }
}
