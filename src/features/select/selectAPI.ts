export interface Option {
  isInStock: boolean;
  price: string;
  size: string;
  stock: string;
  info: string;
}

// export function fetchOptions(options = DATA) {
//   return new Promise<{ data: Array<Option> }>((resolve) =>
//     setTimeout(() => resolve({ data: options }), 500)
//   );
// }
