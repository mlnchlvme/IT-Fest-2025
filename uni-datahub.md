# 🎓 AI University DataHub — Frontend Documentation

AI-powered platform for browsing, comparing, and analyzing universities, study programs, admission details, and international mobility.  
Built for fast exploration and smart recommendations using an integrated AI assistant.

---

## 🚀 Features

* 🔎 University catalog with filtering \& search
* 🧾 Detailed university pages (programs, partners, mobility)
* 🎓 Program explorer with sorting \& filters
* ⚖️ Comparison tools (universities \& programs)
* 🤖 Built-in AI assistant for recommendations
* 📊 Local JSON dataset (universities, programs, partners)

---

## 🏗️ Tech Stack

* **Vue 3 (Composition API)**
* **Vite**
* **Pinia** (state management)
* **Vue Router 4**
* **TailwindCSS**
* **Local JSON as data source**
* **LLM API (OpenAI / Groq / Gemini)**

---

## 📦 Project Structure

```
src/
├── assets/
│     └── icons/, images/
│
├── components/
│     ├── ui/
│     │     ├── Navbar.vue
│     │     ├── Footer.vue
│     │     ├── SearchBar.vue
│     │     ├── Spinner.vue
│     │     └── AIAssistant.vue
│     │
│     ├── universities/
│     │     ├── UniversityCard.vue
│     │     └── PartnerCard.vue
│     │
│     ├── programs/
│     │     └── ProgramCard.vue
│     │
│     └── compare/
│           └── CompareTable.vue
│
├── data/
│     ├── universities.json
│     ├── programs.json
│     └── partners.json
│
├── pages/
│     ├── Home.vue
│     ├── Universities.vue
│     ├── UniversityDetails.vue
│     ├── Programs.vue
│     ├── ProgramDetails.vue
│     ├── CompareUniversities.vue
│     ├── ComparePrograms.vue
│     └── NotFound.vue
│
├── stores/
│     ├── useUniversityStore.js
│     ├── useProgramStore.js
│     └── useCompareStore.js
│
├── composables/
│     ├── useAIAssistant.js
│     ├── useSearch.js
│     └── useCompare.js
│
├── router/
│     └── index.js
│
├── utils/
│     ├── formatters.js
│     └── filters.js
│
├── App.vue
└── main.js
```

---

## 🔧 Installation

```bash
git clone <repo-url>
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables (AI Assistant)

Create `.env`:

```
VITE\_AI\_API\_KEY=your\_key\_here
VITE\_AI\_API\_URL=https://api.openai.com/v1/chat/completions
```

---

## 🧭 Routes

```
/
/universities
/universities/:id
/programs
/programs/:id
/compare/universities
/compare/programs
/:pathMatch(.\*)\*  ->  NotFound
```

---

## 📁 Data Structure

### universities.json

```json
{
  "id": 1,
  "name": "Kazakh National University",
  "city": "Almaty",
  "rating": 92,
  "partners": \["University of Seoul", "NUS"],
  "mobility": \["Erasmus+", "Mevlana"],
  "programs": \[101, 102]
}
```

### programs.json

```json
{
  "id": 101,
  "university\_id": 1,
  "name": "Computer Science",
  "duration": 4,
  "language": "English",
  "price": 900000,
  "mobility": \["Erasmus+"]
}
```

---

## 🧩 Core Stores (Pinia)

### useUniversityStore.js

* Load universities
* Filter and search
* Get single university

### useProgramStore.js

* Load programs
* Filter by field, language, price

### useCompareStore.js

* Add/Remove universities
* Add/Remove programs
* Provide comparison arrays

---

## 🤖 AI Assistant

Located in `useAIAssistant.js`

Provides:

* sendMessage()
* context injection (dataset)
* formatted LLM responses

Prompt example:

```js
"Recommend universities based on the dataset and user input."
```

---

## 📊 Comparison Engine

`CompareTable.vue` dynamically builds columns \& rows for either:

* Universities
* Programs

Based on:

* price
* duration
* rating
* mobility
* partners count

---

## 📌 Future Improvements

* Backend API instead of local JSON
* Automated dataset ingestion
* Ranking system
* Interactive mobility world map
* User accounts (saved comparisons)

---

## 🏁 License

MIT

