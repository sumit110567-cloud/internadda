/**
 * lib/test-data.ts
 * * High-performance, domain-specific question bank for InternAdda assessments.
 * Designed for low latency by bundling "Very Tough" questions directly in the client-side logic.
 */

export interface Question {
  q: string;
  options: string[];
  correct: number;
}

export interface DomainTest {
  name: string;
  questions: Question[];
}

export const DOMAIN_TESTS: Record<string, DomainTest> = {
  '1': {
    name: "Python Engineering",
    questions: [
      {
        q: "What is the result of 'is' comparison between two small integers (e.g., 256) vs two large integers (e.g., 257) in CPython?",
        options: ["Both True", "Both False", "True for 256, False for 257", "False for 256, True for 257"],
        correct: 2
      },
      {
        q: "In Python's MRO (Method Resolution Order), which algorithm is used to determine the linear search path?",
        options: ["Dijkstra's Algorithm", "C3 Linearization", "DFS with memoization", "BFS"],
        correct: 1
      },
      {
        q: "Which of the following is a mutable attribute of a function object in Python?",
        options: ["__doc__", "__name__", "__defaults__", "All of these"],
        correct: 3
      },
      // ... Add additional 22 very tough Python questions to complete the 25-question set
    ]
  },
  '2': {
    name: "Full-Stack Web Architecture",
    questions: [
      {
        q: "Which Next.js feature allows you to update static content without rebuilding the entire site?",
        options: ["Server-Side Rendering (SSR)", "Incremental Static Regeneration (ISR)", "Dynamic Routing", "Static Site Generation (SSG)"],
        correct: 1
      },
      {
        q: "What is the primary difference between 'useLayoutEffect' and 'useEffect' in React?",
        options: ["Execution timing relative to paint", "Server-side compatibility", "Dependency array syntax", "No difference"],
        correct: 0
      },
      {
        q: "In Next.js, which function is used specifically for Server-Side Rendering (SSR)?",
        options: ["getStaticProps", "getServerSideProps", "getInitialProps", "useEffect"],
        correct: 1
      },
      // ... Add additional 22 very tough Web Dev questions to complete the 25-question set
    ]
  },
  '3': {
    name: "Data Science & Analytics",
    questions: [
      {
        q: "Which technique is used to handle the 'Vanishing Gradient' problem in Deep Learning?",
        options: ["L1 Regularization", "Batch Normalization", "Min-Max Scaling", "Principal Component Analysis"],
        correct: 1
      },
      // ... Add additional 24 very tough Data Science questions
    ]
  }
  // IDs 4 through 9 (Digital Marketing, Full Stack, Finance, AI/ML, Content Strategy) 
  // follow the same structure to ensure a personalized experience for every internship domain.
};
