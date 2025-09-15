
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# To-Do App – Preliminary Assignment Submission
⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage
**How to install and run your project:**  
✍️  
1. Download or clone this project from GitHub.
   
   git clone https://github.com/Linh55/NAVER-Hackathon-2025.git
   
   cd NAVER-Hackathon-2025
   
2. Run the commands:
   
   npm install
   
   npm run dev
   
3. Open the link in the terminal (usually http://localhost:5173).
   
4. Or just visit the deployed version on Vercel: https://naver-hackathon-2025.vercel.app

## 🔗 Deployed Web URL or APK file
✍️ https://naver-hackathon-2025.vercel.app/


## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- “Unlisted” videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

✍️ [Paste your video link here]


## 💻 Project Introduction

### a. Overview

✍️ My Todo List is a simple and intuitive task management web application designed to help users organize their daily activities efficiently.

### b. Key Features & Function Manual

- Add Task: Users can create new tasks by entering a title and selecting a deadline.

- Task List Management: All tasks are displayed in a structured list with filtering and sorting.

- Filter Tasks: Choose to display all tasks, only completed tasks, or only active tasks.

- Sort Tasks: Tasks can be sorted by criteria such as alphabet, recently added or deadline.

- Update & Delete: Users can edit task details or remove tasks when no longer needed.

- Completion Status: Mark tasks as completed (highlighted with different colors for better visibility).

### c. Unique Features (What’s special about this app?) 

✍️ 
- Simple yet effective UI: Minimalist design that focuses on usability and clarity.

- Deadline Tracking: Built-in date and time picker for precise task scheduling.

### d. Technology Stack and Implementation Methods

✍️ 
- Technology Stack:

  + Frontend Framework: React with TypeScript – building a modular and component-based single-page application (SPA).

  + Styling: Custom CSS (App.css) for layout and theme design.

  + State Management: React Hooks (useState, useEffect) for managing component states and side effects.

  + Storage: Browser LocalStorage to persist tasks across page reloads without requiring a backend.

  + Deployment: Can be deployed on Vercel or Netlify for quick web hosting and demo access.

  + Version Control: Git & GitHub for source code management and collaboration.


- Implementation Methods:
  
  + The app is structured around functional components: StartPage (simple welcome screen); App (main container); TodoItem (represents each

  task with editing, deleting, and completion toggling features)
  
  + Filtering & Sorting:

      Users can filter tasks by all, active, or completed.

      Sorting is available by deadline, createdAt (recently added), or text (alphabetical).

   + Edit & Delete Functions
     
     Delete removes the task permanently.

- UI Flow: Start page → Todo list page → Add/manage tasks → Save state in localStorage.

### e. Service Architecture & Database structure (when used)

✍️ 
- This app only runs on the frontend using React.

- There is no backend; all data is saved in the browser’s localStorage.

- When the user adds, edits, deletes, or marks a task as done, the data is updated in localStorage.

- Each task is saved as an object with the following fields:

## 🧠 Reflection

### a. If you had more time, what would you expand?

✍️ If I had more time, I would improve the layout and colors to make the website look better, and also add new features such as categorizing tasks based on urgency and importance.


### b. If you integrate AI APIs more for your app, what would you do?

✍️ If I integrate AI APIs into my app, I would use them to suggest task priorities, give smart reminders, and maybe even recommend the best schedule based on the user’s deadlines.


## ✅ Checklist
- [ ] Code runs without errors  
- [ ] All required features implemented (add/edit/delete/complete tasks)  
- [ ] All ✍️ sections are filled  

