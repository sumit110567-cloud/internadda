// app/courses/course-data.ts
// Drop this file at: app/courses/course-data.ts

export type LessonType = 'reading' | 'exercise' | 'quiz' | 'video'

export interface Lesson {
  id: string
  title: string
  duration: string
  type: LessonType
  content: string       // rich text (markdown-ish, rendered by ContentRenderer)
  codeExample?: string  // shown in "Try it yourself" panel
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Course {
  id: number
  title: string
  category: string
  instructor: string
  instructorTitle: string
  rating: number
  reviews: number
  students: number
  duration: string
  price: string
  description: string
  longDescription: string
  topics: string[]
  level: string
  image: string
  accentColor: string   // tailwind color name: indigo | violet | rose | amber | emerald | sky
  modules: Module[]
}

/* ─── Full course content ─────────────────────────────────────────────────── */

export const courses: Course[] = [

  /* ══ 1. Full Stack Development ══════════════════════════════════════════ */
  {
    id: 1,
    title: 'Full Stack Development Masterclass',
    category: 'Development',
    instructor: 'Rajesh Kumar',
    instructorTitle: 'Senior Engineer · Google',
    rating: 4.8, reviews: 245, students: 1240,
    duration: '12 weeks', price: 'FREE',
    description: 'Master frontend and backend development with React, Node.js, and databases.',
    longDescription: 'A comprehensive, project-driven journey from zero to a production-ready full stack developer. You will build real-world applications, understand system design, and learn to ship code that scales.',
    topics: ['React', 'Node.js', 'MongoDB'],
    level: 'Intermediate',
    image: '/course1.jpg',
    accentColor: 'indigo',
    modules: [
      {
        id: 'm1',
        title: 'HTML & CSS Foundations',
        description: 'The building blocks of every webpage.',
        lessons: [
          {
            id: 'l1-1', title: 'How the Web Works', duration: '12 min', type: 'reading',
            content: `## How the Web Works

When you type a URL into your browser, a fascinating chain of events begins.

### The Request-Response Cycle

Every webpage you see is the result of your browser sending an **HTTP request** to a server, which then returns an **HTTP response** containing HTML, CSS, and JavaScript.

\`\`\`
Browser  →  DNS Lookup  →  Server IP
                              ↓
Browser  ←  HTML/CSS/JS  ←  HTTP Response
\`\`\`

### Key Concepts You Will Use Daily

| Term | What it means |
|---|---|
| **DNS** | Translates domain names (google.com) into IP addresses |
| **HTTP/HTTPS** | The protocol browsers and servers use to talk |
| **HTML** | The structure of a page |
| **CSS** | The visual styling |
| **JavaScript** | The interactivity and logic |

### Client vs Server

> **Client** = your browser. It *requests* resources and renders them visually.
> **Server** = a computer somewhere that *responds* with data.

### Try It Now

Open DevTools (F12 in any browser) → go to the **Network** tab → reload the page. Every row is a separate HTTP request your browser made. Notice how HTML loads first, then CSS, then images.`,
          },
          {
            id: 'l1-2', title: 'HTML Document Structure', duration: '18 min', type: 'reading',
            content: `## HTML Document Structure

Every HTML page follows a consistent structure that browsers understand and parse.

### The Boilerplate

Every HTML file you create should start with this skeleton:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Page Title</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- Your visible content goes here -->
    <h1>Hello, World!</h1>
    <p>This is a paragraph of text.</p>
    <script src="app.js"></script>
  </body>
</html>
\`\`\`

### Semantic HTML Tags

Using the right element for the right job improves **accessibility**, **SEO**, and **maintainability**.

| Element | Purpose |
|---|---|
| \`<header>\` | Page or section header |
| \`<nav>\` | Navigation links |
| \`<main>\` | Primary unique content |
| \`<article>\` | Self-contained content (blog post, card) |
| \`<section>\` | Thematic grouping |
| \`<aside>\` | Sidebar / supplementary content |
| \`<footer>\` | Page or section footer |

### Why Semantics Matter

Screen readers use these tags to describe the page to visually impaired users. Search engines use them to understand what content is most important. Your future self uses them to understand the page at a glance.`,
            codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>InternAdda — Job Board</title>
</head>
<body>

  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/internships">Internships</a>
      <a href="/courses">Courses</a>
    </nav>
  </header>

  <main>
    <h1>Find Your Dream Internship</h1>
    <section id="featured">
      <h2>Featured Roles</h2>
      <article class="job-card">
        <h3>Python Developer Intern</h3>
        <p>Arjuna AI · Remote · ₹5,000/mo</p>
      </article>
    </section>
  </main>

  <footer>
    <p>© 2024 InternAdda. All rights reserved.</p>
  </footer>

</body>
</html>`,
          },
          {
            id: 'l1-3', title: 'CSS Box Model & Flexbox', duration: '22 min', type: 'reading',
            content: `## CSS Box Model & Flexbox

Before you can lay out a page, you need to understand how every HTML element occupies space.

### The Box Model

Every element is a rectangular box made of four layers:

\`\`\`
┌──────────────────────────────┐  ← Margin (transparent space outside)
│  ┌────────────────────────┐  │
│  │  Border                │  │
│  │  ┌──────────────────┐  │  │
│  │  │  Padding         │  │  │
│  │  │  ┌────────────┐  │  │  │
│  │  │  │  Content   │  │  │  │
│  │  │  └────────────┘  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
\`\`\`

### Box-Sizing: border-box

By default, \`width\` only sets the *content* width — padding and border add to it. Fix this globally:

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box; /* width now includes padding + border */
}
\`\`\`

### Flexbox — the Layout Workhorse

Flexbox solves row/column alignment with minimal code.

\`\`\`css
.container {
  display: flex;
  flex-direction: row;      /* or column */
  justify-content: center;  /* main axis */
  align-items: center;      /* cross axis */
  gap: 16px;
  flex-wrap: wrap;          /* allow wrapping on small screens */
}
\`\`\`

### Common Flexbox Patterns

| Goal | CSS |
|---|---|
| Center everything | \`justify-content:center; align-items:center\` |
| Space between | \`justify-content:space-between\` |
| Push last item right | \`margin-left:auto\` on that item |
| Equal columns | \`flex:1\` on each child |`,
            codeExample: `/* Navigation bar with logo left, links right */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
}

/* Card grid — 3 columns on desktop, 1 on mobile */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 280px;   /* grow, shrink, min-width */
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
}`,
          },
        ],
      },
      {
        id: 'm2',
        title: 'JavaScript Essentials',
        description: 'The programming language of the web.',
        lessons: [
          {
            id: 'l2-1', title: 'Variables, Types & Functions', duration: '20 min', type: 'reading',
            content: `## JavaScript: Variables, Types & Functions

JavaScript runs in every browser and powers 98% of websites. Let's start from the ground up.

### Declaring Variables

Use \`const\` by default. Use \`let\` only when you need to reassign.

\`\`\`javascript
const name = 'InternAdda'   // string — never reassigned
const year = 2024            // number
const isActive = true        // boolean

let count = 0
count = count + 1            // ✓ let can be reassigned
\`\`\`

### All JavaScript Data Types

| Type | Example | Notes |
|---|---|---|
| String | \`'Hello'\` | Text in quotes |
| Number | \`42\`, \`3.14\` | Integers and decimals |
| Boolean | \`true\` / \`false\` | Yes/No values |
| Array | \`[1, 2, 3]\` | Ordered list |
| Object | \`{ name: 'Raj' }\` | Key-value pairs |
| null | \`null\` | Intentionally empty |
| undefined | \`undefined\` | Not yet assigned |

### Functions — Three Ways to Write Them

\`\`\`javascript
// 1. Function declaration (hoisted — can call before definition)
function greet(name) {
  return \`Hello, \${name}!\`
}

// 2. Function expression (not hoisted)
const greet = function(name) {
  return \`Hello, \${name}!\`
}

// 3. Arrow function (modern, concise — use this)
const greet = (name) => \`Hello, \${name}!\`

// Calling it
console.log(greet('Priya'))  // → Hello, Priya!
\`\`\`

### Array Methods You Will Use Every Day

\`\`\`javascript
const students = ['Rahul', 'Priya', 'Aryan', 'Sneha']

// map — transform every item
const greetings = students.map(name => \`Hi, \${name}!\`)

// filter — keep items matching condition
const shortNames = students.filter(name => name.length <= 5)

// find — first match
const rahul = students.find(name => name === 'Rahul')

// includes — boolean check
students.includes('Priya')  // → true
\`\`\``,
            codeExample: `// Real example: filtering internship listings
const internships = [
  { title: 'Python Dev', stipend: 8000, location: 'Remote' },
  { title: 'UI Designer', stipend: 5000, location: 'Delhi' },
  { title: 'Data Analyst', stipend: 7000, location: 'Remote' },
]

// Get all remote internships above ₹6,000
const highPayRemote = internships.filter(
  job => job.location === 'Remote' && job.stipend > 6000
)

console.log(highPayRemote)
// [{ title: 'Python Dev', stipend: 8000, location: 'Remote' },
//  { title: 'Data Analyst', stipend: 7000, location: 'Remote' }]`,
          },
          {
            id: 'l2-2', title: 'DOM Manipulation', duration: '25 min', type: 'exercise',
            content: `## DOM Manipulation

The DOM (Document Object Model) is a live tree representation of your HTML that JavaScript can read and modify in real time.

### Selecting Elements

\`\`\`javascript
// By ID — returns single element
const title = document.getElementById('main-title')

// By CSS selector — returns first match
const card = document.querySelector('.card')
const btn = document.querySelector('#enroll-btn')

// By CSS selector — returns all matches (NodeList)
const allCards = document.querySelectorAll('.card')
\`\`\`

### Reading & Writing Content

\`\`\`javascript
// Read text
console.log(title.textContent)

// Write text (safe — no HTML injection risk)
title.textContent = 'New Heading'

// Write HTML (use carefully)
card.innerHTML = '<strong>Updated!</strong>'

// Read/write attributes
const link = document.querySelector('a')
link.getAttribute('href')           // read
link.setAttribute('href', '/new')   // write
\`\`\`

### Changing Styles & Classes

\`\`\`javascript
// Direct style (avoid for complex changes)
card.style.backgroundColor = '#4f46e5'
card.style.borderRadius = '16px'

// Classes (preferred — keeps styling in CSS)
card.classList.add('active')
card.classList.remove('hidden')
card.classList.toggle('expanded')
card.classList.contains('active')   // → boolean
\`\`\`

### Handling Events

\`\`\`javascript
const button = document.querySelector('#enroll-btn')

button.addEventListener('click', (event) => {
  event.preventDefault()            // stop default behaviour
  console.log('Enrolled!')
  button.textContent = 'Enrolled ✓'
  button.disabled = true
})

// Common events: click, submit, input, change, keydown, mouseover
\`\`\``,
            codeExample: `// Build a live search filter
const input = document.querySelector('#search')
const cards = document.querySelectorAll('.internship-card')

input.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase()

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase()
    const visible = title.includes(term)
    card.style.display = visible ? 'block' : 'none'
  })
})`,
          },
        ],
      },
      {
        id: 'm3',
        title: 'React Fundamentals',
        description: 'Build modern UIs with components and state.',
        lessons: [
          {
            id: 'l3-1', title: 'Components & Props', duration: '28 min', type: 'reading',
            content: `## React: Components & Props

React breaks UIs into reusable, composable **components** — each one a small, focused piece of the interface.

### Your First Component

A React component is a JavaScript function that returns JSX (HTML-like syntax):

\`\`\`jsx
function WelcomeCard({ name, role }) {
  return (
    <div className="card">
      <h2>Welcome, {name}!</h2>
      <p>Role: {role}</p>
    </div>
  )
}

// Using it in another component:
<WelcomeCard name="Priya" role="Intern" />
<WelcomeCard name="Rahul" role="Student" />
\`\`\`

### Props Are Read-Only

Props flow **downward** from parent to child. Never mutate them inside the component.

\`\`\`jsx
function Badge({ label, color }) {
  return (
    <span style={{ background: color }} className="badge">
      {label}
    </span>
  )
}
\`\`\`

### Component Composition

Build complex UIs from simple pieces:

\`\`\`jsx
function InternshipCard({ title, company, stipend, isRemote }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{company}</p>
      <div className="meta">
        <strong>{stipend}</strong>
        {isRemote && <Badge label="Remote" color="#dcfce7" />}
      </div>
    </article>
  )
}
\`\`\`

### Lists — Rendering Arrays

\`\`\`jsx
const jobs = [
  { id: 1, title: 'Python Dev', company: 'Arjuna AI' },
  { id: 2, title: 'UI Designer', company: 'Larex' },
]

function JobList() {
  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>           {/* key is required! */}
          {job.title} at {job.company}
        </li>
      ))}
    </ul>
  )
}
\`\`\``,
            codeExample: `// Reusable stat card component
function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
    }}>
      <div style={{
        width: 40, height: 40,
        background: color + '15',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 20, fontWeight: 700, color }}>{value}</p>
        <p style={{ fontSize: 12, color: '#9ca3af' }}>{label}</p>
      </div>
    </div>
  )
}

// Usage
<StatCard icon="🏢" label="Companies" value="200+" color="#4f46e5" />
<StatCard icon="👥" label="Students"  value="7,200+" color="#7c3aed" />`,
          },
          {
            id: 'l3-2', title: 'State & useState Hook', duration: '30 min', type: 'exercise',
            content: `## State & the useState Hook

State is data that changes over time and causes the component to re-render with the new value.

### Basic useState

\`\`\`jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)   // [value, setter]

  return (
    <div>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
\`\`\`

### The Golden Rules of State

> 1. **Never** mutate state directly — always use the setter function.
> 2. State updates are **asynchronous** — the new value is available on the next render.
> 3. Each component instance has its **own independent state**.

### Controlled Inputs

\`\`\`jsx
function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <input
      type="text"
      value={query}                                // controlled value
      onChange={(e) => setQuery(e.target.value)}  // update on every keystroke
      placeholder="Search internships…"
    />
  )
}
\`\`\`

### Object State — Spread to Update

\`\`\`jsx
const [form, setForm] = useState({ name: '', email: '' })

// ❌ Wrong — mutates state directly
form.name = 'Priya'

// ✓ Correct — spread existing, override changed field
setForm({ ...form, name: 'Priya' })
\`\`\``,
            codeExample: `// Toggle button with state
function EnrollButton({ courseTitle }) {
  const [enrolled, setEnrolled] = useState(false)

  const handleClick = () => {
    setEnrolled(true)
    // In real app: call API here
    console.log(\`Enrolled in \${courseTitle}\`)
  }

  return (
    <button
      onClick={handleClick}
      disabled={enrolled}
      style={{
        background: enrolled ? '#10b981' : '#4f46e5',
        color: 'white',
        padding: '10px 24px',
        borderRadius: 12,
        border: 'none',
        cursor: enrolled ? 'default' : 'pointer',
        fontWeight: 600,
      }}
    >
      {enrolled ? '✓ Enrolled' : 'Enroll Now'}
    </button>
  )
}`,
          },
        ],
      },
      {
        id: 'm4',
        title: 'Node.js & REST APIs',
        description: 'Build server-side applications and APIs.',
        lessons: [
          {
            id: 'l4-1', title: 'What is Node.js?', duration: '15 min', type: 'reading',
            content: `## What is Node.js?

Node.js lets you run JavaScript on the **server** — outside the browser — using the V8 engine (the same one Chrome uses).

### Why Node.js?

| Feature | Benefit |
|---|---|
| JavaScript everywhere | Use one language for frontend and backend |
| Non-blocking I/O | Handles thousands of concurrent requests efficiently |
| npm ecosystem | 2 million+ packages available |
| Fast startup | Great for APIs and microservices |

### Your First Server

\`\`\`javascript
// server.js
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
\`\`\`

Run it: \`node server.js\`

### Express.js — the Standard Framework

\`\`\`javascript
const express = require('express')
const app = express()

app.use(express.json())  // parse JSON bodies

// GET endpoint
app.get('/api/internships', (req, res) => {
  res.json([
    { id: 1, title: 'Python Dev', company: 'Arjuna AI' },
    { id: 2, title: 'UI Designer', company: 'Larex' },
  ])
})

// POST endpoint
app.post('/api/apply', (req, res) => {
  const { userId, jobId } = req.body
  // save to database...
  res.json({ success: true, message: 'Application submitted!' })
})

app.listen(3000, () => console.log('API ready on :3000'))
\`\`\``,
          },
        ],
      },
    ],
  },

  /* ══ 2. Data Science ════════════════════════════════════════════════════ */
  {
    id: 2,
    title: 'Data Science with Python',
    category: 'Data Science',
    instructor: 'Priya Sharma',
    instructorTitle: 'Data Scientist · Microsoft',
    rating: 4.9, reviews: 189, students: 856,
    duration: '10 weeks', price: 'FREE',
    description: 'Learn data analysis, visualization, and machine learning from scratch.',
    longDescription: 'From raw data to actionable insights. Master the complete data science pipeline — wrangling, analysis, visualization, and machine learning — using Python.',
    topics: ['Python', 'Pandas', 'Statistics'],
    level: 'Beginner',
    image: '/course2.jpg',
    accentColor: 'violet',
    modules: [
      {
        id: 'm1', title: 'Python for Data Science',
        description: 'Set up your environment and learn data science Python.',
        lessons: [
          {
            id: 'l1-1', title: 'Setup & Python Basics', duration: '15 min', type: 'reading',
            content: `## Python Setup & Basics for Data Science

Python is the industry standard for data science. Let's get your environment ready and cover the essentials.

### Installation

\`\`\`bash
# Option 1: Anaconda (recommended — includes all data science libraries)
# Download from: https://www.anaconda.com/download

# Option 2: pip install individually
pip install numpy pandas matplotlib seaborn scikit-learn jupyter
\`\`\`

### Start Jupyter Notebook

\`\`\`bash
jupyter notebook
# Opens in your browser at http://localhost:8888
\`\`\`

### Python Data Structures

\`\`\`python
# Lists — ordered, mutable
scores = [85, 92, 78, 95, 88]
scores.append(91)
scores[0]          # → 85 (zero-indexed)
scores[-1]         # → 91 (last item)

# Dictionaries — key-value pairs
student = {
    'name': 'Rahul',
    'score': 92,
    'city': 'Delhi',
    'enrolled': True,
}
student['name']    # → 'Rahul'
student.keys()     # → dict_keys(['name', 'score', ...])

# Tuples — immutable (use for fixed data)
delhi_coords = (28.6139, 77.2090)
\`\`\`

### Comprehensions — Pythonic Loops

\`\`\`python
scores = [85, 92, 78, 95, 88]

# List comprehension
grades = ['A' if s >= 90 else 'B' if s >= 80 else 'C' for s in scores]
# → ['B', 'A', 'C', 'A', 'B']

# Filter
high = [s for s in scores if s >= 90]
# → [92, 95]
\`\`\``,
            codeExample: `import numpy as np

scores = np.array([85, 92, 78, 95, 88, 76, 91, 83])

print(f"Count : {len(scores)}")
print(f"Mean  : {scores.mean():.1f}")
print(f"Median: {np.median(scores):.1f}")
print(f"Std   : {scores.std():.1f}")
print(f"Max   : {scores.max()}")
print(f"Min   : {scores.min()}")

# Output:
# Count : 8
# Mean  : 86.0
# Median: 87.5
# Std   : 6.2
# Max   : 95
# Min   : 76`,
          },
          {
            id: 'l1-2', title: 'Pandas DataFrames', duration: '28 min', type: 'reading',
            content: `## Pandas DataFrames

A DataFrame is a 2-dimensional labelled table — think of it as a super-powered Excel spreadsheet in Python.

### Creating DataFrames

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'name'  : ['Rahul', 'Priya', 'Aryan', 'Sneha'],
    'score' : [85, 92, 78, 95],
    'city'  : ['Delhi', 'Mumbai', 'Bangalore', 'Pune'],
    'grade' : ['B', 'A', 'C', 'A'],
})

print(df)
#     name  score       city grade
# 0  Rahul     85      Delhi     B
# 1  Priya     92     Mumbai     A
# 2  Aryan     78  Bangalore     C
# 3  Sneha     95       Pune     A
\`\`\`

### Essential Operations

\`\`\`python
# Select one column → Series
df['score']

# Select multiple columns → DataFrame
df[['name', 'score']]

# Filter rows by condition
df[df['score'] >= 90]

# Filter with multiple conditions
df[(df['score'] >= 85) & (df['city'] == 'Delhi')]

# Add a computed column
df['passed'] = df['score'] >= 80

# Sort by column
df.sort_values('score', ascending=False)
\`\`\`

### Summary Statistics

\`\`\`python
df.describe()
#        score
# count   4.00
# mean   87.50
# std     7.50
# min    78.00
# 25%    83.25
# 50%    88.50
# 75%    92.75
# max    95.00

df['score'].value_counts()
df.groupby('city')['score'].mean()
\`\`\`

### Handling Missing Data

\`\`\`python
df.isnull().sum()          # count nulls per column
df.dropna()                # remove rows with any null
df.fillna(df['score'].mean())  # fill nulls with mean
\`\`\``,
          },
        ],
      },
      {
        id: 'm2', title: 'Data Visualization',
        description: 'Turn raw numbers into clear, compelling charts.',
        lessons: [
          {
            id: 'l2-1', title: 'Charts with Matplotlib & Seaborn', duration: '30 min', type: 'reading',
            content: `## Data Visualization with Matplotlib & Seaborn

A great visualization communicates the insight immediately. Use **Matplotlib** for fine-grained control and **Seaborn** for beautiful statistical charts.

### Line Chart — Trends Over Time

\`\`\`python
import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
applicants = [120, 145, 178, 210, 265, 310]

fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(months, applicants,
        marker='o', color='#4f46e5',
        linewidth=2.5, markersize=7,
        markerfacecolor='white', markeredgewidth=2)

ax.fill_between(months, applicants, alpha=0.08, color='#4f46e5')
ax.set_title('InternAdda Monthly Applicants', fontsize=14, fontweight='bold')
ax.set_ylabel('Applicants')
ax.grid(axis='y', alpha=0.3)
ax.spines[['top', 'right']].set_visible(False)
plt.tight_layout()
plt.show()
\`\`\`

### Bar Chart — Category Comparison

\`\`\`python
categories  = ['Development', 'Design', 'Marketing', 'Data', 'Business']
internships = [45, 28, 20, 32, 15]
colors      = ['#4f46e5', '#7c3aed', '#f59e0b', '#10b981', '#3b82f6']

fig, ax = plt.subplots(figsize=(9, 5))
bars = ax.bar(categories, internships, color=colors, width=0.55, edgecolor='white')

# Add value labels on bars
for bar, val in zip(bars, internships):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
            str(val), ha='center', va='bottom', fontweight='bold', fontsize=11)

ax.set_title('Open Internships by Category', fontsize=14, fontweight='bold')
ax.set_ylabel('Openings')
ax.spines[['top', 'right', 'left']].set_visible(False)
plt.tight_layout()
plt.show()
\`\`\`

### Seaborn — Statistical Plots in One Line

\`\`\`python
import seaborn as sns

# Correlation heatmap
sns.heatmap(df.corr(numeric_only=True),
            annot=True, fmt='.2f',
            cmap='coolwarm', center=0,
            square=True, linewidths=0.5)
plt.title('Feature Correlation Matrix')

# Distribution plot
sns.histplot(df['score'], kde=True, color='#4f46e5', bins=10)

# Box plot by category
sns.boxplot(data=df, x='city', y='score', palette='Set2')
\`\`\``,
          },
        ],
      },
    ],
  },

  /* ══ 3. UI/UX Design ════════════════════════════════════════════════════ */
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    instructor: 'Ananya Patel',
    instructorTitle: 'Product Designer · Figma',
    rating: 4.7, reviews: 167, students: 923,
    duration: '8 weeks', price: 'FREE',
    description: 'Create beautiful and functional user interfaces and experiences.',
    longDescription: 'From user research to high-fidelity prototypes, this course gives you a complete design toolkit — covering principles, typography, colour theory, and Figma.',
    topics: ['Figma', 'Prototyping', 'User Testing'],
    level: 'Beginner',
    image: '/course3.jpg',
    accentColor: 'rose',
    modules: [
      {
        id: 'm1', title: 'Design Principles',
        description: 'The foundational rules that separate good from bad design.',
        lessons: [
          {
            id: 'l1-1', title: 'The 4 Core Principles of Design', duration: '14 min', type: 'reading',
            content: `## The 4 Core Principles of Design

Great design follows reproducible principles. Master these and your work will instantly look more professional.

### 1. Contrast

Contrast creates **visual hierarchy** and directs attention to what matters most.

\`\`\`
✓ Large bold heading  +  small regular body
✓ Dark text on light background  (minimum 4.5:1 ratio for WCAG AA)
✓ Primary button (solid fill)  vs  secondary button (outline)
\`\`\`

> **Rule:** If two elements are similar but not identical, make them *very* different. Timid differences look like mistakes.

### 2. Repetition

Repetition creates **consistency** — the hallmark of professional design.

- Same heading font throughout
- Same button border-radius throughout
- Same spacing scale (multiples of 4px or 8px)
- Same icon style (all outline, or all filled — never mixed)

### 3. Alignment

Nothing should be placed arbitrarily. Every element should have a **visual connection** to another.

| Pattern | When to use |
|---|---|
| Left-align | Body text, lists, labels |
| Centre-align | Hero headings, short callouts |
| Right-align | Numbers in tables, timestamps |
| Grid-align | Cards, columns, everything else |

### 4. Proximity

Related items should be **close together**. Unrelated items should be **clearly separated**.

A label should be closer to its input field than to the next input. A card's title should be closer to its subtitle than to the card below it.

### The Squint Test

Squint at your design until it blurs. The visual hierarchy should still be obvious — the most important thing should still be the most visually dominant.`,
          },
          {
            id: 'l1-2', title: 'Typography in UI', duration: '20 min', type: 'reading',
            content: `## Typography in UI Design

Typography is the voice of your product. Get it wrong and even beautiful visuals won't save it.

### Type Scale — Use a System

Never pick sizes randomly. Use a harmonic scale (multiply by ~1.25):

| Role | Size | Weight | Line Height |
|---|---|---|---|
| Hero heading | 48–64px | 700 | 1.08 |
| Page heading (H1) | 36–40px | 700 | 1.1 |
| Section heading (H2) | 24–28px | 600 | 1.2 |
| Card title (H3) | 18–20px | 600 | 1.3 |
| Body | 16px | 400 | 1.6 |
| Caption / label | 12–13px | 500 | 1.4 |

### Font Pairing

A strong pairing uses **contrast in personality**, not just weight:

\`\`\`
Trustworthy + Modern:  Merriweather (headings) + DM Sans (body)
Clean + Technical:     DM Mono (headings) + Inter (body)
Editorial + Elegant:   Playfair Display (headings) + Lora (body)
\`\`\`

### Colour for Text

\`\`\`
#111827  →  Primary text (headings)        — contrast: 16:1
#374151  →  Secondary text (subheadings)   — contrast: 10:1
#6b7280  →  Tertiary text (captions)       — contrast: 5.4:1
#9ca3af  →  Disabled / placeholder text   — contrast: 2.9:1  ← decorative only
\`\`\`

> ⚠️ For normal body text, always ensure at least **4.5:1** contrast ratio against the background (WCAG AA standard).

### Kerning & Letter-spacing

\`\`\`css
/* Headings — slightly tighter */
h1 { letter-spacing: -0.02em; }

/* Body — default */
p { letter-spacing: 0; }

/* Labels / all-caps — wider */
.label { letter-spacing: 0.08em; text-transform: uppercase; }
\`\`\``,
          },
        ],
      },
    ],
  },

  /* ══ 4. Digital Marketing ════════════════════════════════════════════════ */
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    category: 'Marketing',
    instructor: 'Vikas Mehta',
    instructorTitle: 'Growth Lead · Razorpay',
    rating: 4.6, reviews: 198, students: 1450,
    duration: '6 weeks', price: 'FREE',
    description: 'Master SEO, social media, and content marketing strategies.',
    longDescription: 'Learn how India\'s top startups acquire and retain customers online. Practical, data-driven marketing skills you can apply immediately.',
    topics: ['SEO', 'Social Media', 'Ads'],
    level: 'Intermediate',
    image: '/course4.jpg',
    accentColor: 'amber',
    modules: [
      {
        id: 'm1', title: 'SEO Fundamentals',
        description: 'Get found on Google without paying for ads.',
        lessons: [
          {
            id: 'l1-1', title: 'How Search Engines Work', duration: '16 min', type: 'reading',
            content: `## How Search Engines Work

Before optimising anything, you need to understand what you are optimising *for*.

### The Three Phases of Search

**1. Crawling**
Googlebot follows links across the web, discovering pages. Make sure your site has no broken internal links and is not blocking bots in \`robots.txt\`.

**2. Indexing**
Discovered pages are analysed and stored in Google's index. Pages with thin content, duplicate content, or \`noindex\` tags may be excluded.

**3. Ranking**
When a user searches, Google ranks ~200+ factors to decide which pages to show and in what order.

### Top Ranking Factors

| Factor | Importance | What to do |
|---|---|---|
| Content relevance | ⭐⭐⭐⭐⭐ | Answer the search intent completely |
| Backlinks (authority) | ⭐⭐⭐⭐⭐ | Earn links from reputable sites |
| Core Web Vitals (speed) | ⭐⭐⭐⭐ | Score 90+ on PageSpeed Insights |
| Mobile friendliness | ⭐⭐⭐⭐ | Responsive design is mandatory |
| HTTPS | ⭐⭐⭐ | Non-negotiable for any modern site |

### Search Intent — The Most Important Concept

Every query has an **intent**. Match it or you will not rank.

\`\`\`
"internship in Delhi"     → Navigational / Transactional (show listings)
"how to write a resume"   → Informational (write a guide)
"InternAdda login"        → Navigational (take them to login page)
"best internship site"    → Commercial investigation (comparison content)
\`\`\`

### On-Page SEO Checklist

\`\`\`
✅  Target keyword in <title> tag (front-loaded)
✅  Target keyword in first 100 words of content
✅  Descriptive <meta description> (150–160 characters)
✅  One <h1> per page, includes keyword
✅  Alt text on all images (describe what's in the image)
✅  Internal links to 2–3 related pages
✅  URL slug is short and readable: /internships-in-delhi not /p?id=123
\`\`\``,
          },
        ],
      },
    ],
  },

  /* ══ 5. Mobile App Dev ════════════════════════════════════════════════════ */
  {
    id: 5,
    title: 'Mobile App Development',
    category: 'Development',
    instructor: 'Aditya Singh',
    instructorTitle: 'iOS Engineer · Swiggy',
    rating: 4.7, reviews: 156, students: 687,
    duration: '10 weeks', price: 'FREE',
    description: 'Build iOS and Android apps with React Native and JavaScript.',
    longDescription: 'One codebase, two platforms. Learn React Native from scratch and ship your first app to the App Store and Google Play.',
    topics: ['React Native', 'APIs', 'Deployment'],
    level: 'Intermediate',
    image: '/course5.jpg',
    accentColor: 'emerald',
    modules: [
      {
        id: 'm1', title: 'React Native Basics',
        description: 'Build cross-platform apps with JavaScript.',
        lessons: [
          {
            id: 'l1-1', title: 'React Native vs React', duration: '12 min', type: 'reading',
            content: `## React Native vs React (Web)

React Native lets you build **truly native** mobile apps using the React paradigm you already know.

### The Key Difference

In React, you render HTML elements. In React Native, you render **native mobile components** that map to real iOS and Android UI elements.

| Concept | React Web | React Native |
|---|---|---|
| Container | \`<div>\` | \`<View>\` |
| Text | \`<p>\`, \`<h1>\` | \`<Text>\` |
| Image | \`<img>\` | \`<Image>\` |
| Input | \`<input>\` | \`<TextInput>\` |
| Scrolling | CSS \`overflow\` | \`<ScrollView>\` |
| Touchable | \`<button>\` | \`<TouchableOpacity>\` |
| Styles | CSS files | \`StyleSheet.create({})\` |

### Your First Screen

\`\`\`jsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>InternAdda</Text>
      <Text style={styles.subtitle}>Find Your Dream Internship</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Browse Internships</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container : { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f8ff' },
  title     : { fontSize: 28, fontWeight: '700', color: '#1a1063', marginBottom: 8 },
  subtitle  : { fontSize: 16, color: '#6b7280', marginBottom: 32 },
  button    : { backgroundColor: '#4f46e5', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
})
\`\`\``,
          },
        ],
      },
    ],
  },

  /* ══ 6. Business Analytics ════════════════════════════════════════════════ */
  {
    id: 6,
    title: 'Business Analytics Essentials',
    category: 'Business',
    instructor: 'Deepak Verma',
    instructorTitle: 'Analytics Manager · Deloitte',
    rating: 4.5, reviews: 142, students: 534,
    duration: '8 weeks', price: 'FREE',
    description: 'Learn to use data for strategic business decisions.',
    longDescription: 'Translate numbers into strategy. This course teaches you to use Excel, SQL, and visualisation tools to drive real business outcomes that stakeholders can act on.',
    topics: ['Excel', 'SQL', 'Visualization'],
    level: 'Beginner',
    image: '/course6.jpg',
    accentColor: 'sky',
    modules: [
      {
        id: 'm1', title: 'Excel for Analytics',
        description: 'Become fluent in the world\'s most used analytics tool.',
        lessons: [
          {
            id: 'l1-1', title: 'Essential Excel Functions', duration: '18 min', type: 'reading',
            content: `## Essential Excel Functions for Analytics

Excel is used by 750 million people worldwide. Mastering it makes you immediately useful in any business.

### Lookup Functions

\`\`\`excel
=VLOOKUP(A2, Companies!A:C, 2, FALSE)
  ↑ look up A2  ↑ in this range  ↑ return column 2  ↑ exact match

=XLOOKUP(A2, B:B, C:C, "Not found")
  ↑ modern replacement for VLOOKUP, searches any direction

=INDEX(C:C, MATCH(A2, B:B, 0))
  ↑ most flexible lookup — use when VLOOKUP won't work
\`\`\`

### Statistical Functions

\`\`\`excel
=AVERAGE(B2:B100)            → arithmetic mean
=MEDIAN(B2:B100)             → middle value (better than mean for skewed data)
=STDEV(B2:B100)              → standard deviation
=PERCENTILE(B2:B100, 0.75)  → 75th percentile

=COUNTIF(A:A, "Delhi")       → count cells matching condition
=COUNTIFS(A:A, "Delhi", B:B, ">80")  → multiple conditions

=SUMIF(A:A, "Delhi", C:C)   → sum where column A = "Delhi"
=AVERAGEIF(A:A, "Delhi", B:B)
\`\`\`

### Pivot Tables — Instant Summaries

| Step | Action |
|---|---|
| 1 | Click anywhere in your data |
| 2 | Insert → PivotTable |
| 3 | Drag a field to **Rows** (e.g. City) |
| 4 | Drag a field to **Values** (e.g. Sum of Revenue) |
| 5 | Drag a field to **Filters** (e.g. Year) |

That's it. Excel builds the entire summary automatically.

### Best Practices

\`\`\`
✅  Use named ranges for clarity: =SUM(Revenue) not =SUM(C2:C500)
✅  Never hard-code numbers — reference cells
✅  Freeze top row (View → Freeze Panes) for large datasets
✅  Use tables (Ctrl+T) — they auto-expand with new data
✅  Add data validation to prevent input errors
\`\`\``,
          },
        ],
      },
    ],
  },
]
