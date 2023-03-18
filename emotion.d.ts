import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    active?: string;
    canvas?: string;
    star?: string;
    icons?: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      codepen?: string;
      download?: string;
      external?: string;
      externalAlt?: string;
      search?: string;
      email?: string;
      error?: string;
      info?: string;
      close?: string;
    };
  }
}
