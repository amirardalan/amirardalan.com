// Declaring Prism nightOwl theme missing from @types/react-syntax-highlighter

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
  export { default as nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl';
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl' {
  const style: any;
  export default style;
}