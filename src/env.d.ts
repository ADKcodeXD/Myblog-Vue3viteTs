/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare interface ApiResult<T> {
  data: T;
  msg: string;
  success: string;
  code: number;
}

declare interface ListInfoResult<T> {
  results: Array<T>;
  length: number;
  pages: number;
}
