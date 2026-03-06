// lib/test-data.ts

export type Sector =
  | 'Frontend Development'
  | 'Python & AI/ML'
  | 'Data Science'
  | 'UI/UX Design'
  | 'Digital Marketing'
  | 'Full Stack Development'

export interface Question {
  q: string
  o: [string, string, string, string]
  a: number // index 0-3
}

export interface TestRecord {
  code: string
  name: string
  university: string
  sector: Sector
  duration: number // minutes
  createdAt: string
}

export const SECTORS: Sector[] = [
  'Frontend Development',
  'Python & AI/ML',
  'Data Science',
  'UI/UX Design',
  'Digital Marketing',
  'Full Stack Development',
]

export const QUESTION_BANK: Record<Sector, Question[]> = {
  'Frontend Development': [
    { q: 'Which CSS property controls the stacking order of overlapping elements?', o: ['z-index', 'stack-order', 'layer', 'position'], a: 0 },
    { q: "What does the 'useEffect' hook in React do?", o: ['Handles component state', 'Performs side effects after render', 'Creates new components', 'Manages routing'], a: 1 },
    { q: 'Which HTML tag is used to link an external CSS stylesheet?', o: ['<style>', '<css>', '<link>', '<script>'], a: 2 },
    { q: "In Tailwind CSS, what does 'flex-1' mean?", o: ['flex-direction: row', 'flex-grow: 1, shrink: 1, basis: 0%', 'flex-wrap: wrap', 'flex-flow: column'], a: 1 },
    { q: 'What is the output of: typeof null in JavaScript?', o: ['null', 'undefined', 'object', 'boolean'], a: 2 },
    { q: 'Which Next.js function enables server-side rendering for a page?', o: ['getStaticProps', 'getServerSideProps', 'useEffect', 'fetchData'], a: 1 },
    { q: "What does CSS 'position: sticky' do?", o: ['Fixes element to viewport always', 'Sticks element when scrolled to its threshold', 'Positions relative to parent', 'Removes from flow'], a: 1 },
    { q: 'Which React hook persists a value across renders without causing re-renders?', o: ['useState', 'useContext', 'useRef', 'useMemo'], a: 2 },
    { q: "What is the purpose of the 'key' prop in React lists?", o: ['Styling items', 'Encrypting data', 'Helping React identify changed items', 'Sorting items'], a: 2 },
    { q: "Which CSS unit is relative to the root element's font-size?", o: ['em', 'px', 'rem', 'vh'], a: 2 },
    { q: 'What does the spread operator (...) do in JavaScript?', o: ['Loops over arrays', 'Expands iterables into individual elements', 'Creates new functions', 'Declares variables'], a: 1 },
    { q: 'Which HTML5 element defines self-contained content like an article?', o: ['<section>', '<div>', '<article>', '<aside>'], a: 2 },
  ],
  'Python & AI/ML': [
    { q: 'Which Python library is primarily used for numerical computing?', o: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'], a: 1 },
    { q: "What is a 'tensor' in deep learning?", o: ['A type of neural network', 'A multi-dimensional array', 'A loss function', 'A data cleaning method'], a: 1 },
    { q: 'Which algorithm is best suited for binary classification?', o: ['Linear Regression', 'K-Means', 'Logistic Regression', 'PCA'], a: 2 },
    { q: "What does 'overfitting' mean in machine learning?", o: ['Model is too simple', 'Model performs well on train but poorly on test data', 'Model has low variance', 'Model uses too little data'], a: 1 },
    { q: 'What is the output of list(range(1, 6)) in Python?', o: ['[1,2,3,4,5,6]', '[1,2,3,4,5]', '[0,1,2,3,4,5]', '[2,3,4,5,6]'], a: 1 },
    { q: 'Which Pandas function is used to load a CSV file?', o: ['pd.load_csv()', 'pd.read_csv()', 'pd.import_csv()', 'pd.open_csv()'], a: 1 },
    { q: "What is 'dropout' in neural networks?", o: ['Removing neurons from architecture', 'Randomly ignoring neurons during training to prevent overfitting', 'A loss function', 'An activation function'], a: 1 },
    { q: 'Which Python keyword is used to define a generator function?', o: ['return', 'async', 'yield', 'generate'], a: 2 },
    { q: 'In supervised learning, the training data includes:', o: ['Only input features', 'Only output labels', 'Both input features and output labels', 'Neither'], a: 2 },
    { q: 'Which Python data structure uses key-value pairs?', o: ['List', 'Tuple', 'Set', 'Dictionary'], a: 3 },
    { q: "What does 'hyperparameter tuning' mean in ML?", o: ['Cleaning data', 'Adjusting model settings to improve performance', 'Collecting more training data', 'Deploying the model'], a: 1 },
    { q: 'What is the default sorting order of Python\'s sorted() function?', o: ['Descending', 'Random', 'Ascending', 'Alphabetical only'], a: 2 },
  ],
  'Data Science': [
    { q: 'What does SQL stand for?', o: ['Structured Query Language', 'Simple Query Language', 'Sequential Query Logic', 'Standard Query Language'], a: 0 },
    { q: 'Which chart type is best for showing distribution of a single variable?', o: ['Bar Chart', 'Scatter Plot', 'Histogram', 'Pie Chart'], a: 2 },
    { q: "What is a 'null hypothesis' in statistics?", o: ['The hypothesis that is always true', 'A default assumption that there is no effect', 'The alternative hypothesis', 'A proven fact'], a: 1 },
    { q: 'In Pandas, what does df.describe() return?', o: ['Column names', 'Row count only', 'Statistical summary of numeric columns', 'Data types'], a: 2 },
    { q: 'Which measure of central tendency is most affected by outliers?', o: ['Mode', 'Median', 'Mean', 'Range'], a: 2 },
    { q: "What is 'feature engineering'?", o: ['Building neural networks', 'Creating new input features from raw data', 'Visualizing data', 'Cleaning missing values'], a: 1 },
    { q: 'What does a correlation coefficient of -1 indicate?', o: ['No correlation', 'Perfect positive correlation', 'Perfect negative correlation', 'Weak correlation'], a: 2 },
    { q: 'Which SQL clause filters rows AFTER grouping?', o: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'], a: 2 },
    { q: "What is 'data normalization'?", o: ['Removing duplicates', 'Scaling features to a standard range', 'Splitting datasets', 'Adding more data'], a: 1 },
    { q: 'Which Python library is best known for statistical data visualization?', o: ['NumPy', 'Pandas', 'Seaborn', 'Scikit-learn'], a: 2 },
    { q: 'What does ETL stand for in data engineering?', o: ['Extract, Transform, Load', 'Encode, Train, Label', 'Export, Test, Launch', 'Estimate, Track, Log'], a: 0 },
    { q: "What is a 'p-value' used for in hypothesis testing?", o: ['Measuring variance', 'Measuring the probability of observing results if null hypothesis is true', 'Calculating mean', 'Defining outliers'], a: 1 },
  ],
  'UI/UX Design': [
    { q: 'What does UX stand for?', o: ['User Experience', 'User Extension', 'Unified Experience', 'User Execution'], a: 0 },
    { q: "What is a 'wireframe' in UI/UX design?", o: ['A high-fidelity prototype', 'A low-fidelity structural blueprint', 'A color scheme', 'A final design file'], a: 1 },
    { q: "Which principle states users should not be surprised by interface behavior?", o: ["Fitts' Law", "Hick's Law", 'Principle of Least Surprise', "Miller's Law"], a: 2 },
    { q: "What is the purpose of a 'style guide'?", o: ['To document user research', 'To ensure design consistency across a product', 'To track bugs', 'To write user stories'], a: 1 },
    { q: "In Figma, what are 'components' used for?", o: ['Writing CSS', 'Creating reusable UI elements', 'Storing fonts', 'Exporting code'], a: 1 },
    { q: "What is 'accessibility' in UI/UX?", o: ['Making designs look beautiful', 'Ensuring designs work for users with disabilities', 'Optimizing load speed', 'Creating animations'], a: 1 },
    { q: "What does 'affordance' mean in design?", o: ['Visual hierarchy', 'Properties that suggest how an element should be used', 'Color contrast', 'Animation speed'], a: 1 },
    { q: 'Which research method involves directly observing users in their environment?', o: ['Surveys', 'A/B Testing', 'Contextual Inquiry', 'Card Sorting'], a: 2 },
    { q: 'What is the minimum recommended color contrast ratio for body text (WCAG AA)?', o: ['2:1', '3:1', '4.5:1', '7:1'], a: 2 },
    { q: "What is a 'design system'?", o: ['A project management tool', 'A collection of reusable components, guidelines, and standards', 'A wireframing tool only', 'A user testing method'], a: 1 },
    { q: "What is 'information architecture'?", o: ['Visual design of pages', 'Structural design of content and navigation', 'Database design', 'Coding structure'], a: 1 },
    { q: "What does 'usability testing' involve?", o: ['Testing code performance', 'Observing real users completing tasks on a product', 'A/B testing two designs', 'Checking color accuracy'], a: 1 },
  ],
  'Digital Marketing': [
    { q: 'What does SEO stand for?', o: ['Social Engagement Optimization', 'Search Engine Optimization', 'Site Engagement Overview', 'Search Engagement Operations'], a: 1 },
    { q: 'Which metric measures the percentage of visitors who leave after viewing one page?', o: ['Click-through Rate', 'Conversion Rate', 'Bounce Rate', 'Engagement Rate'], a: 2 },
    { q: "What is a 'buyer persona'?", o: ['A real customer profile', 'A semi-fictional representation of an ideal customer', 'A type of ad format', 'A social media account'], a: 1 },
    { q: 'What does CTA stand for in marketing?', o: ['Content Traffic Analytics', 'Call To Action', 'Click Through Attribution', 'Cost To Acquire'], a: 1 },
    { q: 'What is "organic reach" in social media?', o: ['Paid distribution', 'People who see content without paid promotion', 'Total followers', 'Engagement rate'], a: 1 },
    { q: 'What is A/B testing in digital marketing?', o: ['Testing two different audiences', 'Comparing two content versions to see which performs better', 'Running ads on two platforms', 'Analyzing competitors'], a: 1 },
    { q: 'What does CPM stand for in advertising?', o: ['Cost Per Message', 'Cost Per Mille (thousand impressions)', 'Content Performance Metric', 'Click Performance Measure'], a: 1 },
    { q: 'Which type of content typically generates the most backlinks?', o: ['Product pages', 'Long-form, data-driven articles', 'Short social posts', 'Paid ads'], a: 1 },
    { q: 'What is the primary goal of email marketing?', o: ['Getting followers', 'Driving traffic via social sharing', 'Nurturing leads and retaining customers', 'Improving search rankings'], a: 2 },
    { q: 'What does ROAS stand for?', o: ['Return On Ad Spend', 'Rate Of Audience Scaling', 'Reach Of Ad System', 'Revenue Of Ad Sets'], a: 0 },
    { q: 'What is "content marketing"?', o: ['Paying for ad placements', 'Creating valuable content to attract and retain an audience', 'Cold email outreach', 'Influencer partnerships only'], a: 1 },
    { q: 'Which metric measures the % of email recipients who clicked a link?', o: ['Open Rate', 'Click-Through Rate (CTR)', 'Conversion Rate', 'Bounce Rate'], a: 1 },
  ],
  'Full Stack Development': [
    { q: 'What does REST stand for in API design?', o: ['Real-time State Transfer', 'Representational State Transfer', 'Remote Server Technology', 'Responsive System Test'], a: 1 },
    { q: 'Which HTTP method is used to UPDATE an existing resource?', o: ['GET', 'POST', 'PUT/PATCH', 'DELETE'], a: 2 },
    { q: "What is the purpose of 'middleware' in Express.js?", o: ['To store data', 'Functions with access to req/res in the pipeline', 'To render frontend', 'To manage databases'], a: 1 },
    { q: 'Which database is a NoSQL document store?', o: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'], a: 2 },
    { q: 'What does CORS stand for?', o: ['Cross-Origin Resource Sharing', 'Content Origin Routing System', 'Cross-Object Resource State', 'Component Origin Response System'], a: 0 },
    { q: "In Node.js, what is the 'event loop'?", o: ['A loop that handles UI events', 'A mechanism that handles asynchronous callbacks', 'A database connection pool', 'A routing mechanism'], a: 1 },
    { q: 'What is JWT used for?', o: ['Database queries', 'Styling components', 'Securely transmitting information as a signed token', 'File uploads'], a: 2 },
    { q: 'Which React concept allows passing data to child components?', o: ['State', 'Props', 'Context', 'Refs'], a: 1 },
    { q: "What does 'ORM' stand for in backend development?", o: ['Object Relational Mapping', 'Open Runtime Model', 'Optional Request Method', 'Output Render Manager'], a: 0 },
    { q: "What is 'containerisation' in DevOps?", o: ['Storing files in cloud', 'Packaging apps with dependencies to run consistently anywhere (e.g. Docker)', 'Frontend routing', 'Database sharding'], a: 1 },
    { q: 'What is the purpose of environment variables (.env)?', o: ['Styling configuration', 'Storing sensitive config outside source code', 'Defining routes', 'Managing state'], a: 1 },
    { q: 'Which SQL statement retrieves data from a database?', o: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'], a: 2 },
  ],
}

export function getQuestions(sector: Sector, count = 10): Question[] {
  const pool = [...(QUESTION_BANK[sector] || QUESTION_BANK['Frontend Development'])]
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}

export function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let s = 'IA-'
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)]
  s += '-'
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return s
}

export function getGrade(pct: number): { grade: string; label: string; color: string } {
  if (pct >= 90) return { grade: 'A+', label: 'Outstanding', color: '#059669' }
  if (pct >= 75) return { grade: 'A',  label: 'Excellent',   color: '#4f46e5' }
  if (pct >= 60) return { grade: 'B',  label: 'Good',        color: '#0891b2' }
  if (pct >= 40) return { grade: 'C',  label: 'Average',     color: '#d97706' }
  return              { grade: 'D',  label: 'Needs Work',   color: '#e11d48' }
}

// Backward-compatibility alias — used by any legacy imports
export const DOMAIN_TESTS = QUESTION_BANK
