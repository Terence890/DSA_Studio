/* Catalog entrypoint shim: forward exports to chunked catalog under ./algorithms/index.js */
export {
  default,
  foundations,
  searching,
  sorting,
  dataStructures,
  graphs,
  dp,
  greedy,
} from "./algorithms/index.js";
