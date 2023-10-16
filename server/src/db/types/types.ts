type NotFunction<T> = T extends Function ? never : T;

export type SelectPopulate<T extends string> = {
  [key in T]?: any;
};
