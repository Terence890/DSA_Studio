/**
 * Sorting step engine utilities for the visualizer.
 *
 * Each algorithm returns an array of step events describing the operations
 * needed to transform the input array into a sorted version. The UI layer can
 * interpret these steps to animate comparisons, swaps, pivot selection, writes,
 * and sorted markers.
 *
 * Step shape:
 * {
 *   type: "compare" | "swap" | "write" | "pivot" | "markSorted",
 *   indices: number[]; // indices involved
 *   values?: number[]; // optional values written/swapped
 *   array?: number[];  // snapshot after the step (for convenience)
 * }
 */

function clone(arr) {
  return arr.slice();
}

function pushStep(steps, type, indices, array, values) {
  steps.push({
    type,
    indices: indices.slice(),
    values: values ? values.slice() : undefined,
    array: array.slice(),
  });
}

/**
 * Bubble Sort (optimized with early exit).
 */
export function bubbleSortSteps(input) {
  const arr = clone(input);
  const steps = [];
  const n = arr.length;
  let swapped = true;

  for (let i = 0; i < n - 1 && swapped; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      pushStep(steps, "compare", [j, j + 1], arr);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        pushStep(steps, "swap", [j, j + 1], arr, [arr[j], arr[j + 1]]);
      }
    }
    pushStep(steps, "markSorted", [n - i - 1], arr);
  }
  // mark remaining as sorted
  for (let k = n - steps.filter((s) => s.type === "markSorted").length - 1; k >= 0; k--) {
    pushStep(steps, "markSorted", [k], arr);
  }
  return steps;
}

/**
 * Insertion Sort.
 */
export function insertionSortSteps(input) {
  const arr = clone(input);
  const steps = [];
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    pushStep(steps, "compare", [j, i], arr);
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      pushStep(steps, "write", [j + 1], arr, [arr[j]]);
      j--;
      if (j >= 0) pushStep(steps, "compare", [j, i], arr);
    }
    arr[j + 1] = key;
    pushStep(steps, "write", [j + 1], arr, [key]);
  }
  for (let i = 0; i < arr.length; i++) {
    pushStep(steps, "markSorted", [i], arr);
  }
  return steps;
}

/**
 * Merge Sort (top-down).
 */
export function mergeSortSteps(input) {
  const arr = clone(input);
  const steps = [];
  const aux = clone(input);

  function merge(lo, mid, hi) {
    for (let k = lo; k <= hi; k++) aux[k] = arr[k];

    let i = lo;
    let j = mid + 1;
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        arr[k] = aux[j++];
      } else if (j > hi) {
        arr[k] = aux[i++];
      } else {
        pushStep(steps, "compare", [i, j], arr);
        if (aux[j] < aux[i]) {
          arr[k] = aux[j++];
        } else {
          arr[k] = aux[i++];
        }
      }
      pushStep(steps, "write", [k], arr, [arr[k]]);
    }
  }

  function sort(lo, hi) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  sort(0, arr.length - 1);
  for (let i = 0; i < arr.length; i++) pushStep(steps, "markSorted", [i], arr);
  return steps;
}

/**
 * Quick Sort (Lomuto partition).
 */
export function quickSortSteps(input) {
  const arr = clone(input);
  const steps = [];

  function partition(lo, hi) {
    const pivotVal = arr[hi];
    pushStep(steps, "pivot", [hi], arr, [pivotVal]);
    let i = lo;
    for (let j = lo; j < hi; j++) {
      pushStep(steps, "compare", [j, hi], arr);
      if (arr[j] <= pivotVal) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        pushStep(steps, "swap", [i, j], arr, [arr[i], arr[j]]);
        i++;
      }
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    pushStep(steps, "swap", [i, hi], arr, [arr[i], arr[hi]]);
    pushStep(steps, "markSorted", [i], arr);
    return i;
  }

  function sort(lo, hi) {
    if (lo >= hi) return;
    const p = partition(lo, hi);
    sort(lo, p - 1);
    sort(p + 1, hi);
  }

  sort(0, arr.length - 1);
  // Mark any remaining as sorted (for segments of size 1)
  for (let k = 0; k < arr.length; k++) pushStep(steps, "markSorted", [k], arr);
  return steps;
}

/**
 * Heap Sort (max-heap).
 */
export function heapSortSteps(input) {
  const arr = clone(input);
  const steps = [];
  const n = arr.length;

  const left = (i) => 2 * i + 1;
  const right = (i) => 2 * i + 2;

  function heapifyDown(i, heapSize) {
    let largest = i;
    const l = left(i);
    const r = right(i);

    if (l < heapSize) {
      pushStep(steps, "compare", [l, largest], arr);
      if (arr[l] > arr[largest]) largest = l;
    }
    if (r < heapSize) {
      pushStep(steps, "compare", [r, largest], arr);
      if (arr[r] > arr[largest]) largest = r;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      pushStep(steps, "swap", [i, largest], arr, [arr[i], arr[largest]]);
      heapifyDown(largest, heapSize);
    }
  }

  function buildMaxHeap() {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapifyDown(i, n);
    }
  }

  buildMaxHeap();

  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    pushStep(steps, "swap", [0, end], arr, [arr[0], arr[end]]);
    pushStep(steps, "markSorted", [end], arr);
    heapifyDown(0, end);
  }
  pushStep(steps, "markSorted", [0], arr);
  return steps;
}

/**
 * Utility: shuffle array (Fisher–Yates).
 */
export function shuffleArray(input) {
  const arr = clone(input);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Helper to get a copy of array from steps end state.
 */
export function applySteps(initial, steps) {
  const arr = clone(initial);
  for (const step of steps) {
    if (step.type === "swap" && step.indices.length === 2) {
      const [i, j] = step.indices;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    } else if (step.type === "write" && step.indices.length === 1 && step.values) {
      arr[step.indices[0]] = step.values[0];
    }
  }
  return arr;
}
