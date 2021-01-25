declare module '*.svelte' {
  export { SvelteComponentDev, beforeUpdate } from 'svelte/internal';
  export const version: string;
}

declare module '*.ts' {
  const value: any;
  export = value;
}
