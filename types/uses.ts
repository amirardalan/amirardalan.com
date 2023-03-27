export interface UsesTypes {
  software: { content: string };
  tools: { content: string };
  stack: { content: string };
  heading: string;
  devices: { content: string };
  meta: {
    title: string;
    description: string;
  };
  content: {
    title: string;
    description: string;
    uses: string[];
    heading: string;
    devices: { content: string }[];
    stack: { content: string }[];
    tools: { content: string }[];
    software: { content: string }[];
  };
}
