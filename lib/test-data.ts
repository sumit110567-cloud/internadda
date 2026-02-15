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
    name: "Frontend Development Intern",
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
      {
        q: "What will be the output of: ' '.join(list('hello'))?",
        options: ["'hello'", "'h e l l o'", "Error", "None"],
        correct: 1
      },
      {
        q: "Which method is used to apply a function to each element of a DataFrame in Pandas?",
        options: ["map()", "apply()", "applymap()", "transform()"],
        correct: 2
      },
      {
        q: "In Django, what is the purpose of the 'select_related' method?",
        options: ["To prefetch many-to-many relationships", "To follow foreign key relationships and reduce queries", "To limit the number of records returned", "To order the queryset"],
        correct: 1
      },
      {
        q: "What does the 'nonlocal' keyword do in Python?",
        options: ["Declares a variable as global", "Allows modifying a variable in an enclosing scope", "Creates a new local variable", "Prevents variable modification"],
        correct: 1
      },
      {
        q: "Which of the following is true about Python's GIL?",
        options: ["It allows multiple threads to run in parallel on multiple cores", "It prevents deadlocks", "It allows only one thread to execute at a time in CPython", "It is a feature of all Python implementations"],
        correct: 2
      },
      {
        q: "What is the output of: {1,2,3} & {2,3,4}?",
        options: ["{1,2,3,4}", "{2,3}", "Error", "None"],
        correct: 1
      },
      {
        q: "In Django, what is the difference between 'null=True' and 'blank=True'?",
        options: ["They are identical", "null for database NULL, blank for form validation", "null for form, blank for database", "Both affect database schema"],
        correct: 1
      },
      {
        q: "Which Python library is used for building asynchronous web applications?",
        options: ["Flask", "Django", "FastAPI", "Tornado"],
        correct: 2
      },
      {
        q: "What is the output of: 'abcdef'[::2]?",
        options: ["'ace'", "'bdf'", "'abcdef'", "'fedcba'"],
        correct: 0
      },
      {
        q: "In Pandas, what does the 'inplace=True' parameter do?",
        options: ["Returns a new DataFrame", "Modifies the original DataFrame", "Creates a view", "Raises an error if used"],
        correct: 1
      },
      {
        q: "Which Django middleware is responsible for handling sessions?",
        options: ["SessionMiddleware", "AuthenticationMiddleware", "CsrfViewMiddleware", "MessageMiddleware"],
        correct: 0
      },
      {
        q: "What is a closure in Python?",
        options: ["A function that has access to variables in its enclosing scope even after the outer function has returned", "A function that is defined inside another function", "A function that returns another function", "All of the above"],
        correct: 3
      },
      {
        q: "What is the output of: isinstance(3, int) and isinstance(True, int)?",
        options: ["True True", "True False", "False True", "True True (both are ints)"],
        correct: 3
      },
      {
        q: "In PostgreSQL, what is the difference between 'VARCHAR' and 'TEXT'?",
        options: ["VARCHAR has length limit, TEXT unlimited", "TEXT is faster", "VARCHAR is deprecated", "No difference"],
        correct: 0
      },
      {
        q: "What does the 'defer()' method do in Django queryset?",
        options: ["Defers loading of specified fields until accessed", "Delays the query execution", "Defers the request to a later time", "None of the above"],
        correct: 0
      },
      {
        q: "Which Python module provides support for generating random numbers?",
        options: ["random", "math", "os", "sys"],
        correct: 0
      },
      {
        q: "What is the output of: list(map(lambda x: x**2, range(3)))?",
        options: ["[0, 1, 4]", "[1, 4, 9]", "[0, 1, 4, 9]", "Error"],
        correct: 0
      },
      {
        q: "In Django, what is the purpose of 'related_name' in ForeignKey?",
        options: ["To specify the name of the reverse relation", "To set the database column name", "To define a custom manager", "To add a constraint"],
        correct: 0
      },
      {
        q: "What is a generator in Python?",
        options: ["A function that yields values one at a time", "A list comprehension", "A type of iterator", "Both A and C"],
        correct: 3
      },
      {
        q: "Which SQL command is used to add a new column to an existing table?",
        options: ["ALTER TABLE ADD COLUMN", "UPDATE TABLE ADD", "MODIFY TABLE", "INSERT COLUMN"],
        correct: 0
      },
      {
        q: "In Pandas, how to handle missing data by replacing with a specific value?",
        options: ["dropna()", "fillna()", "replace()", "interpolate()"],
        correct: 1
      },
      {
        q: "What is the output of: bool('False')?",
        options: ["False", "True", "Error", "None"],
        correct: 1
      }
    ]
  },
  '2': {
    name: "Python Developer Intern",
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
      {
        q: "What is the purpose of React.memo?",
        options: ["To memoize component output based on props", "To memoize expensive calculations", "To prevent re-renders of child components", "Both A and C"],
        correct: 3
      },
      {
        q: "In Tailwind CSS, how do you apply responsive styles for medium screens?",
        options: ["md:prefix", "sm:prefix", "lg:prefix", "responsive:prefix"],
        correct: 0
      },
      {
        q: "What does the 'useCallback' hook do?",
        options: ["Returns a memoized callback", "Returns a memoized value", "Triggers a side effect", "None"],
        correct: 0
      },
      {
        q: "In Next.js, what is the difference between 'next/link' and 'next/router'?",
        options: ["Link is for client-side navigation, Router for programmatic", "They are the same", "Link is for external links", "Router is only for server-side"],
        correct: 0
      },
      {
        q: "Which React lifecycle method is equivalent to useEffect with empty dependency array?",
        options: ["componentDidMount", "componentDidUpdate", "componentWillUnmount", "shouldComponentUpdate"],
        correct: 0
      },
      {
        q: "In Tailwind, how do you create a custom utility class?",
        options: ["Using @apply in CSS", "Using custom classes in HTML", "Using the theme() function", "All of the above"],
        correct: 0
      },
      {
        q: "What is the purpose of 'getStaticPaths' in Next.js?",
        options: ["To define dynamic routes for static generation", "To fetch data at request time", "To handle API routes", "To create server-side redirects"],
        correct: 0
      },
      {
        q: "In React, what is a higher-order component?",
        options: ["A function that takes a component and returns a new component", "A component that renders children", "A component that uses hooks", "A class component"],
        correct: 0
      },
      {
        q: "Which Tailwind class is used to center an element horizontally with flex?",
        options: ["justify-center", "items-center", "text-center", "mx-auto"],
        correct: 0
      },
      {
        q: "What is the difference between 'useState' and 'useReducer'?",
        options: ["useState is for simple state, useReducer for complex state logic", "useState returns array, useReducer returns object", "They are interchangeable", "useReducer is deprecated"],
        correct: 0
      },
      {
        q: "In Next.js, how to enable API routes?",
        options: ["Create files in pages/api", "Use next/api in pages", "Install next-routes package", "Configure in next.config.js"],
        correct: 0
      },
      {
        q: "What is the purpose of 'key' prop in React lists?",
        options: ["To uniquely identify elements for efficient updates", "To set CSS keys", "For accessibility", "To prevent re-renders"],
        correct: 0
      },
      {
        q: "In Tailwind, how do you apply a style conditionally based on dark mode?",
        options: ["dark: prefix", "theme-dark: prefix", "dark-mode: prefix", "useDark hook"],
        correct: 0
      },
      {
        q: "What is the output of: console.log(typeof typeof 1)?",
        options: ["number", "string", "undefined", "object"],
        correct: 1
      },
      {
        q: "Which React hook is used to handle side effects?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 0
      },
      {
        q: "In Next.js, what is the purpose of 'next/head'?",
        options: ["To modify the <head> of the page", "To include scripts", "To set page title", "All of the above"],
        correct: 3
      },
      {
        q: "What does the 'useRef' hook return?",
        options: ["A mutable object with .current property", "A reference to a DOM element", "A state value", "A function"],
        correct: 0
      },
      {
        q: "In Tailwind, how to create a grid with 3 columns?",
        options: ["grid grid-cols-3", "grid columns-3", "flex flex-cols-3", "grid-cols:3"],
        correct: 0
      },
      {
        q: "What is the difference between 'client-side rendering' and 'server-side rendering'?",
        options: ["CSR renders in browser, SSR renders on server", "CSR is faster, SSR is slower", "CSR is for static sites", "No difference"],
        correct: 0
      },
      {
        q: "In React, what is a fragment?",
        options: ["A way to group elements without adding extra nodes", "A component that breaks", "A piece of JSX", "A hook"],
        correct: 0
      },
      {
        q: "Which Next.js function is used to fetch data at build time?",
        options: ["getStaticProps", "getServerSideProps", "getInitialProps", "getData"],
        correct: 0
      },
      {
        q: "What is the purpose of 'dangerouslySetInnerHTML' in React?",
        options: ["To set HTML directly from code", "To prevent XSS", "To render raw HTML", "Both A and C"],
        correct: 3
      }
    ]
  },
  '3': {
    name: "UI/UX Design Intern",
    questions: [
      {
        q: "Which technique is used to handle the 'Vanishing Gradient' problem in Deep Learning?",
        options: ["L1 Regularization", "Batch Normalization", "Min-Max Scaling", "Principal Component Analysis"],
        correct: 1
      },
      {
        q: "In Figma, what is the purpose of 'Auto Layout'?",
        options: ["To automatically arrange layers based on constraints", "To create responsive designs", "To add padding and spacing", "All of the above"],
        correct: 3
      },
      {
        q: "What is the difference between 'constraints' and 'auto layout' in Figma?",
        options: ["Constraints are for resizing, auto layout for spacing", "They are the same", "Constraints are for frames, auto layout for groups", "None"],
        correct: 0
      },
      {
        q: "In Adobe XD, what is a 'repeat grid'?",
        options: ["A tool to duplicate elements in a grid pattern", "A way to create animations", "A component state", "A plugin"],
        correct: 0
      },
      {
        q: "Which prototyping tool allows for micro-interactions with triggers and actions?",
        options: ["Figma", "Adobe XD", "Sketch", "InVision"],
        correct: 1
      },
      {
        q: "What is the 'Fitts's Law' in UX?",
        options: ["Time to acquire a target is a function of distance and size", "Users spend most time on above-the-fold content", "People scan in F-shaped pattern", "Cognitive load affects decision making"],
        correct: 0
      },
      {
        q: "In Figma, how do you create a component variant?",
        options: ["Right-click and select 'Add variant'", "Use the component panel", "Duplicate and detach", "Create multiple components"],
        correct: 0
      },
      {
        q: "What is the purpose of 'user personas' in design?",
        options: ["To represent target user groups", "To create fictional characters", "To guide design decisions", "All of the above"],
        correct: 3
      },
      {
        q: "In Adobe XD, what is 'stack'?",
        options: ["A type of repeat grid", "A way to group elements with spacing", "A plugin", "A component state"],
        correct: 1
      },
      {
        q: "Which UX principle states that users should not have to remember information from one part of the interface to another?",
        options: ["Recognition over recall", "Consistency", "Feedback", "Affordance"],
        correct: 0
      },
      {
        q: "In Figma, what is the difference between 'frame' and 'group'?",
        options: ["Frames can have constraints and layout grids, groups cannot", "Groups are for vector objects, frames for images", "They are the same", "Frames are for prototyping, groups for design"],
        correct: 0
      },
      {
        q: "What is 'heuristic evaluation'?",
        options: ["Usability inspection method based on established principles", "User testing with prototypes", "A/B testing", "Analytics review"],
        correct: 0
      },
      {
        q: "In prototyping, what is a 'flow'?",
        options: ["The path a user takes through the interface", "An animation", "A sequence of screens", "A user journey map"],
        correct: 0
      },
      {
        q: "Which tool is best for creating high-fidelity interactive prototypes?",
        options: ["Figma", "Adobe XD", "Sketch + InVision", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'cognitive load' in UX?",
        options: ["The amount of mental effort required to use an interface", "The time to load a page", "The number of features", "The complexity of code"],
        correct: 0
      },
      {
        q: "In Figma, how do you share a prototype with developers?",
        options: ["Generate a shareable link with inspect mode", "Export as PDF", "Send the file", "Take screenshots"],
        correct: 0
      },
      {
        q: "What is the purpose of 'wireframes'?",
        options: ["To outline structure and layout without visual design", "To test colors", "To finalize design", "To code"],
        correct: 0
      },
      {
        q: "In Adobe XD, what is 'responsive resize'?",
        options: ["Automatically adjusts elements when artboard resizes", "A plugin for mobile", "A constraint setting", "None"],
        correct: 0
      },
      {
        q: "Which UX law states that the time to find something is proportional to the number of items?",
        options: ["Hick's Law", "Fitts's Law", "Miller's Law", "Jakob's Law"],
        correct: 0
      },
      {
        q: "In Figma, what is 'boolean operations'?",
        options: ["Union, subtract, intersect, exclude", "Logical operators", "Constraints", "Auto layout"],
        correct: 0
      },
      {
        q: "What is 'information architecture'?",
        options: ["The structural design of information", "The visual design", "The coding structure", "The database design"],
        correct: 0
      },
      {
        q: "In prototyping, what is a 'trigger'?",
        options: ["An event that initiates an action", "A button", "A gesture", "All of the above"],
        correct: 3
      },
      {
        q: "Which of the following is a key principle of Material Design?",
        options: ["Motion provides meaning", "Bold colors", "Grid-based layouts", "All of the above"],
        correct: 3
      },
      {
        q: "In Figma, how do you create a design system?",
        options: ["Using components and styles", "Using pages", "Using plugins", "Using frames"],
        correct: 0
      },
      {
        q: "What is 'accessibility' in UX?",
        options: ["Designing for users with disabilities", "Making designs available", "Color contrast", "Screen reader support"],
        correct: 0
      }
    ]
  },
  '4': {
    name: "Data Science Intern",
    questions: [
      {
        q: "In Pandas, what is the difference between 'loc' and 'iloc'?",
        options: ["loc uses labels, iloc uses integer positions", "loc is for rows, iloc for columns", "They are the same", "iloc is faster"],
        correct: 0
      },
      {
        q: "What is the purpose of the 'groupby' function in Pandas?",
        options: ["To split data into groups based on criteria", "To aggregate data", "To combine data", "To filter data"],
        correct: 0
      },
      {
        q: "Which SQL clause is used to filter groups after grouping?",
        options: ["WHERE", "HAVING", "FILTER", "GROUP FILTER"],
        correct: 1
      },
      {
        q: "What is the output of: pd.Series([1,2,3]).apply(lambda x: x**2)?",
        options: ["[1,4,9]", "Series([1,4,9])", "DataFrame", "Error"],
        correct: 1
      },
      {
        q: "In Python, what is the difference between 'deep copy' and 'shallow copy'?",
        options: ["Deep copy copies nested objects, shallow doesn't", "Shallow copy is faster", "They are the same", "Deep copy is only for lists"],
        correct: 0
      },
      {
        q: "Which Pandas function is used to read a CSV file?",
        options: ["read_csv()", "load_csv()", "import_csv()", "open_csv()"],
        correct: 0
      },
      {
        q: "In SQL, what is a 'self join'?",
        options: ["Joining a table with itself", "Joining two tables", "Joining with a view", "None"],
        correct: 0
      },
      {
        q: "What is the purpose of 'train_test_split' in scikit-learn?",
        options: ["To split data into training and testing sets", "To split features", "To cross-validate", "To normalize"],
        correct: 0
      },
      {
        q: "Which Python library is used for numerical computing?",
        options: ["NumPy", "Pandas", "Matplotlib", "SciPy"],
        correct: 0
      },
      {
        q: "In SQL, what is the difference between 'INNER JOIN' and 'LEFT JOIN'?",
        options: ["INNER returns matching rows, LEFT returns all from left table", "LEFT is faster", "They are the same", "INNER is default"],
        correct: 0
      },
      {
        q: "What is a 'DataFrame' in Pandas?",
        options: ["2D labeled data structure", "A series", "A list", "An array"],
        correct: 0
      },
      {
        q: "Which function is used to handle missing values in Pandas?",
        options: ["dropna()", "fillna()", "interpolate()", "All of the above"],
        correct: 3
      },
      {
        q: "In Python, what is a lambda function?",
        options: ["An anonymous function", "A named function", "A recursive function", "A built-in function"],
        correct: 0
      },
      {
        q: "What is the purpose of 'normalization' in data preprocessing?",
        options: ["To scale features to a range", "To remove outliers", "To handle missing values", "To encode categorical data"],
        correct: 0
      },
      {
        q: "Which SQL aggregate function calculates the average?",
        options: ["AVG()", "SUM()", "COUNT()", "MEAN()"],
        correct: 0
      },
      {
        q: "In Pandas, how to select a single column?",
        options: ["df['col']", "df.col", "df[['col']]", "All of the above"],
        correct: 3
      },
      {
        q: "What is the output of: np.array([1,2,3]) * 2?",
        options: ["[2,4,6]", "Error", "[1,2,3,1,2,3]", "None"],
        correct: 0
      },
      {
        q: "In SQL, which keyword is used to sort results?",
        options: ["ORDER BY", "SORT BY", "GROUP BY", "ARRANGE BY"],
        correct: 0
      },
      {
        q: "What is a 'pivot table' in Pandas?",
        options: ["A way to summarize data", "A table that pivots", "A transpose", "None"],
        correct: 0
      },
      {
        q: "Which Python library is used for data visualization?",
        options: ["Matplotlib", "Seaborn", "Plotly", "All of the above"],
        correct: 3
      },
      {
        q: "In SQL, what is a 'primary key'?",
        options: ["Unique identifier for a row", "A foreign key", "An index", "A constraint"],
        correct: 0
      },
      {
        q: "What is the purpose of 'drop_duplicates()' in Pandas?",
        options: ["To remove duplicate rows", "To remove duplicate columns", "To find duplicates", "None"],
        correct: 0
      },
      {
        q: "Which function in Python returns the length of an object?",
        options: ["len()", "size()", "count()", "length()"],
        correct: 0
      },
      {
        q: "In SQL, what is a 'view'?",
        options: ["A virtual table based on a query", "A physical table", "A backup", "A stored procedure"],
        correct: 0
      },
      {
        q: "What is the output of: pd.cut([1,2,3,4], bins=2)?",
        options: ["Categorical intervals", "Binned values", "Error", "None"],
        correct: 0
      }
    ]
  },
  '5': {
    name: "Digital Marketing Intern",
    questions: [
      {
        q: "What is the primary goal of SEO?",
        options: ["Increase organic traffic", "Increase paid traffic", "Improve brand awareness", "All of the above"],
        correct: 0
      },
      {
        q: "Which of the following is a black-hat SEO technique?",
        options: ["Keyword stuffing", "Quality backlinks", "Mobile optimization", "Meta descriptions"],
        correct: 0
      },
      {
        q: "What is the purpose of a meta description?",
        options: ["To summarize page content in search results", "To improve ranking", "To hide keywords", "To load faster"],
        correct: 0
      },
      {
        q: "Which social media platform is best for B2B content?",
        options: ["LinkedIn", "Instagram", "TikTok", "Facebook"],
        correct: 0
      },
      {
        q: "What is a 'call to action' (CTA)?",
        options: ["A prompt for user to take action", "A button", "A link", "A headline"],
        correct: 0
      },
      {
        q: "Which metric measures the percentage of visitors who leave after viewing only one page?",
        options: ["Bounce rate", "Exit rate", "Click-through rate", "Conversion rate"],
        correct: 0
      },
      {
        q: "What is the purpose of A/B testing?",
        options: ["To compare two versions of a page", "To test audience", "To measure ROI", "To optimize ads"],
        correct: 0
      },
      {
        q: "In Google Ads, what is 'Quality Score'?",
        options: ["A metric for ad relevance and landing page experience", "A score for keyword quality", "A bid adjustment", "None"],
        correct: 0
      },
      {
        q: "Which content type is most effective for engagement on Instagram?",
        options: ["Stories", "Reels", "Posts", "IGTV"],
        correct: 1
      },
      {
        q: "What is 'SEO' an acronym for?",
        options: ["Search Engine Optimization", "Search Engine Organizer", "Social Engagement Optimization", "None"],
        correct: 0
      },
      {
        q: "What is the ideal length for a blog post for SEO?",
        options: ["1000-2000 words", "300-500 words", "5000+ words", "No ideal length"],
        correct: 3
      },
      {
        q: "Which tool is used for keyword research?",
        options: ["Google Keyword Planner", "Google Analytics", "Google Search Console", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'inbound marketing'?",
        options: ["Attracting customers through content", "Outbound ads", "Email marketing", "Social media ads"],
        correct: 0
      },
      {
        q: "Which metric measures how many times an ad is clicked?",
        options: ["Clicks", "Impressions", "CTR", "Conversions"],
        correct: 0
      },
      {
        q: "What is the purpose of 'backlinks' in SEO?",
        options: ["To increase domain authority", "To drive direct traffic", "To improve user experience", "All of the above"],
        correct: 0
      },
      {
        q: "Which social media platform has the highest user engagement?",
        options: ["Facebook", "Instagram", "Twitter", "LinkedIn"],
        correct: 1
      },
      {
        q: "What is 'PPC'?",
        options: ["Pay Per Click", "Pay Per Conversion", "Pay Per Impression", "None"],
        correct: 0
      },
      {
        q: "What is a 'landing page'?",
        options: ["A page designed for conversions", "The homepage", "A blog post", "A contact page"],
        correct: 0
      },
      {
        q: "Which Google Analytics report shows where users came from?",
        options: ["Acquisition", "Behavior", "Conversions", "Audience"],
        correct: 0
      },
      {
        q: "What is 'content marketing'?",
        options: ["Creating valuable content to attract audience", "Advertising", "SEO", "Social media"],
        correct: 0
      },
      {
        q: "Which of the following is a key ranking factor for Google?",
        options: ["Mobile-friendliness", "Page speed", "Content quality", "All of the above"],
        correct: 3
      },
      {
        q: "What is the purpose of 'alt text' in images?",
        options: ["For accessibility and SEO", "To describe image", "To load faster", "None"],
        correct: 0
      },
      {
        q: "Which email marketing metric measures the percentage of recipients who clicked a link?",
        options: ["Click-through rate", "Open rate", "Bounce rate", "Conversion rate"],
        correct: 0
      },
      {
        q: "What is 'remarketing'?",
        options: ["Targeting users who previously visited", "Targeting new users", "Email marketing", "Social media ads"],
        correct: 0
      },
      {
        q: "Which tool is used to track website performance?",
        options: ["Google Analytics", "Google Search Console", "Both", "None"],
        correct: 2
      }
    ]
  },
  '6': {
    name: "Full Stack Intern",
    questions: [
      {
        q: "What is the purpose of 'express.json()' middleware in Node.js?",
        options: ["To parse JSON request bodies", "To send JSON responses", "To log JSON", "None"],
        correct: 0
      },
      {
        q: "In MongoDB, what is the difference between 'find()' and 'findOne()'?",
        options: ["find returns a cursor, findOne returns a document", "find returns array, findOne returns object", "They are same", "find is faster"],
        correct: 0
      },
      {
        q: "Which React hook is used for side effects?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 0
      },
      {
        q: "In Node.js, what is the purpose of 'process.env'?",
        options: ["To access environment variables", "To set environment variables", "To get process ID", "None"],
        correct: 0
      },
      {
        q: "Which MongoDB method is used to update a document?",
        options: ["updateOne()", "updateMany()", "replaceOne()", "All of the above"],
        correct: 3
      },
      {
        q: "What is a 'RESTful API'?",
        options: ["API following REST architectural constraints", "API using HTTP methods", "API with JSON", "All of the above"],
        correct: 0
      },
      {
        q: "In React, what is the purpose of 'useState'?",
        options: ["To add state to functional components", "To manage side effects", "To create context", "To ref"],
        correct: 0
      },
      {
        q: "Which Node.js module is used to create a server?",
        options: ["http", "fs", "path", "url"],
        correct: 0
      },
      {
        q: "In MongoDB, what is an 'index'?",
        options: ["Data structure to improve query speed", "A collection", "A document", "A field"],
        correct: 0
      },
      {
        q: "What is the difference between 'PUT' and 'PATCH' HTTP methods?",
        options: ["PUT replaces entire resource, PATCH partial update", "PUT is update, PATCH is delete", "Same", "PUT is for create"],
        correct: 0
      },
      {
        q: "In Express, how to handle route parameters?",
        options: ["req.params", "req.query", "req.body", "req.headers"],
        correct: 0
      },
      {
        q: "Which MongoDB operator is used for logical AND?",
        options: ["$and", "$or", "$nor", "$not"],
        correct: 0
      },
      {
        q: "In React, what is a 'controlled component'?",
        options: ["Form element controlled by React state", "Component with state", "Component without state", "None"],
        correct: 0
      },
      {
        q: "What is 'npm'?",
        options: ["Node Package Manager", "Node Project Manager", "New Package Manager", "None"],
        correct: 0
      },
      {
        q: "In MongoDB, what is 'aggregation'?",
        options: ["Pipeline for data processing", "Grouping data", "Joining collections", "All of the above"],
        correct: 0
      },
      {
        q: "Which HTTP status code means 'Not Found'?",
        options: ["404", "500", "200", "403"],
        correct: 0
      },
      {
        q: "In Node.js, what is a 'middleware'?",
        options: ["Function that has access to request and response", "A library", "A module", "A route"],
        correct: 0
      },
      {
        q: "In React, what is 'props drilling'?",
        options: ["Passing props through multiple levels", "Drilling holes in components", "Prop validation", "None"],
        correct: 0
      },
      {
        q: "Which MongoDB method is used to delete a document?",
        options: ["deleteOne()", "remove()", "drop()", "All"],
        correct: 0
      },
      {
        q: "What is 'CORS'?",
        options: ["Cross-Origin Resource Sharing", "Cross-Origin Request Security", "Cross-Origin Resource Security", "None"],
        correct: 0
      },
      {
        q: "In Express, how to serve static files?",
        options: ["express.static()", "express.json()", "express.urlencoded()", "express.Router()"],
        correct: 0
      },
      {
        q: "What is 'JWT'?",
        options: ["JSON Web Token", "JavaScript Web Token", "Java Web Token", "None"],
        correct: 0
      },
      {
        q: "In MongoDB, what is 'sharding'?",
        options: ["Distributing data across multiple machines", "Replication", "Indexing", "Backup"],
        correct: 0
      },
      {
        q: "Which React hook is used to create a reference?",
        options: ["useRef", "useState", "useEffect", "useContext"],
        correct: 0
      },
      {
        q: "What is 'WebSocket'?",
        options: ["Protocol for full-duplex communication", "HTTP protocol", "API", "None"],
        correct: 0
      }
    ]
  },
  '7': {
    name: "Finance & Accounts Intern",
    questions: [
      {
        q: "In Tally, what is the purpose of 'Voucher Entry'?",
        options: ["To record financial transactions", "To create reports", "To manage inventory", "To generate invoices"],
        correct: 0
      },
      {
        q: "Which Excel function is used to calculate the net present value?",
        options: ["NPV()", "PV()", "FV()", "IRR()"],
        correct: 0
      },
      {
        q: "What is 'GST'?",
        options: ["Goods and Services Tax", "General Sales Tax", "Government Sales Tax", "None"],
        correct: 0
      },
      {
        q: "In Tally, what is a 'ledger'?",
        options: ["Account head for transactions", "A report", "A voucher", "A group"],
        correct: 0
      },
      {
        q: "Which Excel function is used to look up a value in a table?",
        options: ["VLOOKUP", "HLOOKUP", "INDEX-MATCH", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'depreciation'?",
        options: ["Reduction in value of asset over time", "Increase in value", "Expense", "None"],
        correct: 0
      },
      {
        q: "In Tally, how to create a company?",
        options: ["Company Info > Create Company", "File > New", "Accounts > New", "Settings > New"],
        correct: 0
      },
      {
        q: "Which Excel feature is used to create what-if analysis?",
        options: ["Data Tables", "Scenario Manager", "Goal Seek", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'income tax'?",
        options: ["Tax on income", "Tax on goods", "Tax on property", "None"],
        correct: 0
      },
      {
        q: "In Tally, what is 'stock item'?",
        options: ["Inventory item", "Ledger", "Voucher", "Report"],
        correct: 0
      },
      {
        q: "Which Excel function calculates the internal rate of return?",
        options: ["IRR()", "NPV()", "PV()", "FV()"],
        correct: 0
      },
      {
        q: "What is 'TDS'?",
        options: ["Tax Deducted at Source", "Tax Deposit Scheme", "Total Deduction System", "None"],
        correct: 0
      },
      {
        q: "In Tally, what is the difference between 'sales' and 'purchase' vouchers?",
        options: ["Sales for selling, purchase for buying", "Both same", "Sales for credit, purchase for cash", "None"],
        correct: 0
      },
      {
        q: "Which Excel function is used to count cells with numbers?",
        options: ["COUNT()", "COUNTA()", "COUNTIF()", "COUNTBLANK()"],
        correct: 0
      },
      {
        q: "What is 'balance sheet'?",
        options: ["Financial statement showing assets, liabilities, equity", "Income statement", "Cash flow", "None"],
        correct: 0
      },
      {
        q: "In Tally, how to generate a profit and loss report?",
        options: ["Display > Profit & Loss", "Reports > P&L", "Accounts > P&L", "Gateway > P&L"],
        correct: 0
      },
      {
        q: "Which Excel function calculates the loan payment?",
        options: ["PMT()", "PPMT()", "IPMT()", "All"],
        correct: 0
      },
      {
        q: "What is 'audit'?",
        options: ["Examination of financial records", "Tax calculation", "Budgeting", "None"],
        correct: 0
      },
      {
        q: "In Tally, what is 'VAT'?",
        options: ["Value Added Tax", "Virtual Accounting Tool", "Voucher Adjustment Tool", "None"],
        correct: 0
      },
      {
        q: "Which Excel function returns the current date?",
        options: ["TODAY()", "NOW()", "DATE()", "CURRENT()"],
        correct: 0
      },
      {
        q: "What is 'working capital'?",
        options: ["Current assets minus current liabilities", "Total assets", "Total liabilities", "Profit"],
        correct: 0
      },
      {
        q: "In Tally, what is 'cost center'?",
        options: ["For tracking expenses by department", "A ledger", "A voucher", "A report"],
        correct: 0
      },
      {
        q: "Which Excel function calculates the standard deviation?",
        options: ["STDEV()", "VAR()", "AVG()", "MEDIAN()"],
        correct: 0
      },
      {
        q: "What is 'gross profit'?",
        options: ["Revenue minus cost of goods sold", "Revenue minus all expenses", "Net income", "None"],
        correct: 0
      },
      {
        q: "In Tally, how to configure GST?",
        options: ["F11: Features > Statutory & Taxation", "F12: Configure", "Company Info > GST", "Accounts > GST"],
        correct: 0
      }
    ]
  },
  '8': {
    name: "AI/ML Research Intern",
    questions: [
      {
        q: "In PyTorch, what is the purpose of 'torch.nn.Module'?",
        options: ["Base class for all neural network modules", "Loss function", "Optimizer", "Dataset"],
        correct: 0
      },
      {
        q: "Which NLTK function is used for tokenization?",
        options: ["word_tokenize()", "sent_tokenize()", "Both", "None"],
        correct: 2
      },
      {
        q: "What is a 'transformer' in NLP?",
        options: ["Model architecture using self-attention", "A type of RNN", "A type of CNN", "None"],
        correct: 0
      },
      {
        q: "In PyTorch, how to move a tensor to GPU?",
        options: [".cuda()", ".to('cuda')", "Both", "None"],
        correct: 2
      },
      {
        q: "Which NLTK corpus contains movie reviews?",
        options: ["movie_reviews", "reviews", "nltk.corpus.movie_reviews", "Both A and C"],
        correct: 3
      },
      {
        q: "What is 'self-attention'?",
        options: ["Attention mechanism where queries, keys, values come from same input", "Attention to self", "Recurrent attention", "None"],
        correct: 0
      },
      {
        q: "In PyTorch, what is 'autograd'?",
        options: ["Automatic differentiation package", "Automatic gradient", "Autoencoder", "None"],
        correct: 0
      },
      {
        q: "Which NLTK function is used for stemming?",
        options: ["PorterStemmer()", "SnowballStemmer()", "LancasterStemmer()", "All"],
        correct: 3
      },
      {
        q: "What is 'BERT'?",
        options: ["Bidirectional Encoder Representations from Transformers", "A transformer model", "Pre-trained NLP model", "All"],
        correct: 3
      },
      {
        q: "In PyTorch, what is a 'DataLoader'?",
        options: ["Utility to load data in batches", "Dataset class", "Sampler", "None"],
        correct: 0
      },
      {
        q: "Which NLTK function is used for lemmatization?",
        options: ["WordNetLemmatizer()", "Lemmatizer()", "Stemmer()", "None"],
        correct: 0
      },
      {
        q: "What is 'GPT'?",
        options: ["Generative Pre-trained Transformer", "Generative Pretraining", "General Purpose Transformer", "None"],
        correct: 0
      },
      {
        q: "In PyTorch, how to define a custom loss function?",
        options: ["By subclassing nn.Module", "By defining a function", "Using built-in losses", "All"],
        correct: 1
      },
      {
        q: "Which NLTK function is used for part-of-speech tagging?",
        options: ["pos_tag()", "tag_pos()", "nltk.pos_tag()", "Both A and C"],
        correct: 3
      },
      {
        q: "What is 'transfer learning'?",
        options: ["Using pre-trained model on new task", "Learning from multiple tasks", "Transferring data", "None"],
        correct: 0
      },
      {
        q: "In PyTorch, what is 'torch.optim'?",
        options: ["Package with optimization algorithms", "Loss functions", "Data utilities", "None"],
        correct: 0
      },
      {
        q: "Which NLTK corpus is used for stopwords?",
        options: ["stopwords", "corpus.stopwords", "nltk.corpus.stopwords", "All"],
        correct: 2
      },
      {
        q: "What is 'attention mechanism'?",
        options: ["Technique to focus on relevant parts of input", "A type of layer", "A loss function", "None"],
        correct: 0
      },
      {
        q: "In PyTorch, what is 'nn.Linear'?",
        options: ["Fully connected layer", "Convolutional layer", "Recurrent layer", "Activation"],
        correct: 0
      },
      {
        q: "Which NLTK function is used for named entity recognition?",
        options: ["ne_chunk()", "ner()", "named_entity()", "None"],
        correct: 0
      },
      {
        q: "What is 'fine-tuning'?",
        options: ["Adjusting pre-trained model on new data", "Training from scratch", "Hyperparameter tuning", "None"],
        correct: 0
      },
      {
        q: "In PyTorch, what is 'torch.nn.functional'?",
        options: ["Contains functions for loss, activation, etc.", "Contains modules", "Contains optimizers", "None"],
        correct: 0
      },
      {
        q: "Which transformer model is used for text generation?",
        options: ["GPT", "BERT", "RoBERTa", "All"],
        correct: 0
      },
      {
        q: "In NLTK, how to download a corpus?",
        options: ["nltk.download()", "nltk.get()", "nltk.load()", "None"],
        correct: 0
      },
      {
        q: "What is 'backpropagation'?",
        options: ["Algorithm to compute gradients", "Forward pass", "Optimization", "None"],
        correct: 0
      }
    ]
  },
  '9': {
    name: "Content Strategy Intern",
    questions: [
      {
        q: "What is the purpose of a content strategy?",
        options: ["To plan, create, and manage content", "To write blogs", "To design websites", "To market products"],
        correct: 0
      },
      {
        q: "Which of the following is a key element of editing?",
        options: ["Grammar check", "Style consistency", "Clarity", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'content calendar'?",
        options: ["Schedule for content publication", "A calendar of events", "A planning tool", "Both A and C"],
        correct: 3
      },
      {
        q: "Which writing style is best for web content?",
        options: ["Concise and scannable", "Long paragraphs", "Formal language", "Passive voice"],
        correct: 0
      },
      {
        q: "What is 'SEO writing'?",
        options: ["Writing optimized for search engines", "Writing for social media", "Writing ads", "None"],
        correct: 0
      },
      {
        q: "What is the purpose of a 'style guide'?",
        options: ["To maintain consistency in writing", "To design logos", "To code", "To plan"],
        correct: 0
      },
      {
        q: "Which of the following is a content type?",
        options: ["Blog post", "Video", "Infographic", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'content repurposing'?",
        options: ["Using existing content in new formats", "Copying content", "Deleting content", "None"],
        correct: 0
      },
      {
        q: "What is the ideal length for a social media post?",
        options: ["Short and engaging", "Long and detailed", "Depends on platform", "None"],
        correct: 2
      },
      {
        q: "Which tool is used for content planning?",
        options: ["Trello", "Asana", "Google Calendar", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'audience persona'?",
        options: ["Fictional representation of target audience", "A real person", "A demographic", "None"],
        correct: 0
      },
      {
        q: "What is the purpose of 'headline'?",
        options: ["To grab attention", "To summarize content", "To improve SEO", "All of the above"],
        correct: 3
      },
      {
        q: "Which editing technique checks for factual accuracy?",
        options: ["Fact-checking", "Proofreading", "Copy editing", "Structural editing"],
        correct: 0
      },
      {
        q: "What is 'content marketing'?",
        options: ["Creating valuable content to attract customers", "Advertising", "Social media", "Email"],
        correct: 0
      },
      {
        q: "What is a 'call to action' (CTA)?",
        options: ["Prompt for user to take action", "A button", "A link", "All"],
        correct: 3
      },
      {
        q: "Which metric measures content engagement?",
        options: ["Time on page", "Shares", "Comments", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'brand voice'?",
        options: ["Personality of brand in communication", "Tone of voice", "Logo", "None"],
        correct: 0
      },
      {
        q: "What is the purpose of 'keywords' in content?",
        options: ["For SEO", "To summarize", "To highlight", "None"],
        correct: 0
      },
      {
        q: "Which of the following is a content distribution channel?",
        options: ["Social media", "Email", "Website", "All of the above"],
        correct: 3
      },
      {
        q: "What is 'user-generated content'?",
        options: ["Content created by users", "Content created by brand", "Paid content", "None"],
        correct: 0
      },
      {
        q: "What is the purpose of 'editing'?",
        options: ["To improve clarity and quality", "To add more content", "To delete content", "To format"],
        correct: 0
      },
      {
        q: "Which writing technique uses storytelling?",
        options: ["Narrative", "Descriptive", "Expository", "Persuasive"],
        correct: 0
      },
      {
        q: "What is 'content audit'?",
        options: ["Review of existing content", "Content creation", "Content deletion", "None"],
        correct: 0
      },
      {
        q: "What is the role of 'headings' in content?",
        options: ["To structure content", "To improve readability", "For SEO", "All of the above"],
        correct: 3
      },
      {
        q: "Which tool is used for grammar checking?",
        options: ["Grammarly", "Hemingway", "ProWritingAid", "All of the above"],
        correct: 3
      }
    ]
  }
};
