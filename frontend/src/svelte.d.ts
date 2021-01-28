declare module '*.svelte' {
  const value: any;
  export = value;
}

declare module '*.ts' {
  const value: any;
  export = value;
}

declare module 'svelte' {
  export { beforeUpdate as default } from 'svelte/internal';
}