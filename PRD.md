# 📘 DSA Studio – Product Requirements Document (PRD)

## 1. Product Overview

**DSA Studio** is a modern, interactive web application designed to help learners master **Data Structures & Algorithms (DSA)** from **beginner to advanced** levels. The platform combines **theory, visualizations, code examples, Big-O analysis, and interactive practice** using a clean, polished UI built with **React + Vite + Tailwind CSS + shadcn/ui**.

The goal is to make DSA **intuitive, visual, and interview-focused**.

---

## 2. Goals & Objectives

### Primary Goals

* Teach **all DSA topics** step-by-step (Beginner → Advanced)
* Explain **Big-O notation clearly with visual intuition**
* Provide **interactive algorithm visualizations**
* Help users **prepare for coding interviews**

### Success Metrics

* Users can explain time & space complexity confidently
* Users can implement algorithms without memorization
* Completion of all topic modules

---

## 3. Target Users

* Beginners learning DSA from scratch
* College students preparing for placements
* Interview candidates (FAANG / Product companies)
* Self-taught developers

---

## 4. Tech Stack

### Frontend

* **React + Vite**
* **Tailwind CSS**
* **shadcn/ui** (Cards, Tabs, Accordion, Dialog, Tooltip)
* **Framer Motion / React Spring** (animations)

### State Management

* Zustand / Context API

### Code Execution (Future)

* Web Workers
* Monaco Editor

---

## 5. Core Features

### 5.1 Learning Modules

Each topic includes:

* Concept explanation
* Visual animation
* Pseudocode
* Code (JS / Java / C++)
* Big-O analysis
* Common interview questions

### 5.2 Algorithm Visualizer

* Step-by-step animation
* Play / Pause / Speed control
* Highlighted operations
* Comparison counter

### 5.3 Big-O Playground

* Input size slider
* Real-time graph (O(1), O(log n), O(n), O(n log n), O(n²))
* Operation counter

### 5.4 Practice Mode

* Problem statements
* Code editor
* Test cases
* Hint system

---

## 6. Complete DSA Curriculum (Beginner → Advanced)

### 6.1 Foundations

* What is DSA?
* Why DSA matters
* RAM model
* Time vs Space tradeoff

### 6.2 Big-O Notation (Core Focus)

* O(1), O(n), O(n²), O(log n), O(n log n)
* Best, Average, Worst case
* Amortized analysis
* Space complexity
* Visual growth comparison

### 6.3 Mathematics for DSA

* Logarithms
* Modulo arithmetic
* GCD / LCM
* Prime numbers
* Sieve of Eratosthenes

### 6.4 Arrays

* Static vs Dynamic arrays
* Operations
* Prefix sum
* Sliding window
* Kadane’s Algorithm

### 6.5 Strings

* String manipulation
* Frequency counting
* Anagram problems
* Palindrome checking
* Pattern matching (Naive, KMP)

### 6.6 Recursion & Backtracking

* Recursion basics
* Call stack visualization
* Subsets
* Permutations
* N-Queens
* Sudoku solver

### 6.7 Searching Algorithms

* Linear search
* Binary search
* Variants of binary search
* Lower / Upper bound

### 6.8 Sorting Algorithms

* Bubble Sort
* Selection Sort
* Insertion Sort
* Merge Sort
* Quick Sort
* Heap Sort
* Counting Sort
* Radix Sort

### 6.9 Linked List

* Singly Linked List
* Doubly Linked List
* Circular Linked List
* Reverse list
* Detect cycle (Floyd)

### 6.10 Stack & Queue

* Stack operations
* Queue & Deque
* Monotonic stack
* Infix → Postfix
* LRU Cache

### 6.11 Hashing

* Hash tables
* Collision handling
* HashMap problems
* Frequency patterns

### 6.12 Trees

* Binary Tree
* Binary Search Tree
* Tree traversals (DFS, BFS)
* Height & diameter
* Lowest Common Ancestor

### 6.13 Heaps & Priority Queue

* Min Heap / Max Heap
* Heapify
* Top K problems
* Heap Sort

### 6.14 Graphs

* Graph representation
* BFS / DFS
* Cycle detection
* Shortest path (Dijkstra, Bellman-Ford)
* MST (Prim, Kruskal)
* Topological sort

### 6.15 Dynamic Programming

* Memoization vs Tabulation
* 1D DP
* 2D DP
* Knapsack
* LIS
* Matrix DP

### 6.16 Greedy Algorithms

* Activity selection
* Huffman coding
* Coin change

### 6.17 Advanced Topics

* Trie
* Segment Tree
* Fenwick Tree
* Union-Find
* Bit Manipulation

---

## 7. UI / UX Requirements

### Design Principles

* Minimal & modern
* Dark mode friendly
* Clean spacing & alignment

### Components (shadcn/ui)

* Sidebar navigation
* Progress tracker
* Accordion for theory
* Tabs (Theory | Visualize | Code | Big-O)
* Dialog for hints

---

## 8. Page Structure

### Dashboard

* Learning progress
* Continue learning
* Topic roadmap

### Topic Page

* Explanation card
* Visualization panel
* Code panel
* Complexity panel

---

## 9. Performance Requirements

* Smooth animations (60fps)
* Lazy loading modules
* No blocking UI

---

## 10. Future Enhancements

* User authentication
* Save progress
* LeetCode sync
* Interview mode
* Mobile support

---

## 11. Non-Goals

* Competitive programming focus
* Backend-heavy system (initial phase)

---

## 12. MVP Scope

* Big-O Visualizer
* Sorting Visualizer
* Array + Stack + Queue modules
* Clean UI

---

## 13. Summary

**DSA Studio** is a complete, modern DSA learning platform with strong visual intuition, structured curriculum, and interview readiness — built using **React + shadcn/ui**.

🚀 This PRD is designed to scale from a **personal learning project** to a **portfolio-grade product**.
