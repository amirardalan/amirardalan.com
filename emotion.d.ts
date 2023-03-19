import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    active?: string;
    favicon?: string;
    canvas?: string;
    gh?: string;
    icons?: {
      [key: string]: string;
    };
  }
}
