# PollMaster

> A full-stack, secure, real-time polling platform with a modern glassmorphism UI.

![Status](https://img.shields.io/badge/Status-Live-success)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Deployment](https://img.shields.io/badge/AWS-EC2-orange)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)

## Live Demo
**[http://3.108.221.59:5173/]** 

---

## About
PollMaster is a production-ready voting application designed to demonstrate full-stack engineering capabilities. It allows users to create polls, vote in real-time, and manage content via a secure dashboard.

Unlike standard tutorials, this project ensures the user experience matches the engineering quality. It handles high-concurrency voting using **Optimistic UI updates** for a zero-latency feel.

## Tech Stack

### **Frontend**
* **React (Vite):** Client-side rendering for maximum performance.
* **CSS3 & Glassmorphism:** Custom translucent UI components with backdrop-filters.
* **Parallax Animation:** Pure CSS background animation for depth.
* **Context API:** Global state management for Authentication.
* **Axios:** Secure API communication with interceptors.

### **Backend**
* **Node.js & Express:** Robust REST API architecture.
* **MongoDB Atlas:** Cloud-hosted NoSQL database.
* **Mongoose:** Strict schema validation and data modeling.
* **JWT:** Stateless authentication with secure HTTP headers.

### **DevOps & Infrastructure**
* **Docker:** Full containerization of Client and Server services.
* **Docker Compose:** Orchestration for multi-container local development.
* **AWS EC2:** Deployed on an Ubuntu Linux server.
* **CI/CD:** Manual deployment pipeline via SSH and Git.

---

## Key Features

### Modern UX/UI
* **Glassmorphism:** Translucent cards and headers using `backdrop-filter: blur()`.
* **Dynamic Background:** A 3-layer parallax star field that moves infinitely.
* **Responsive Design:** Fully mobile-optimized layout.

### Engineering
* **Optimistic UI:** Votes update instantly on the screen before the server confirms, eliminating network lag for the user.
* **Race Condition Handling:** MongoDB atomic operators (`$inc`) to ensure vote counts remain accurate under load.

### Security
* **RBAC (Role-Based Access Control):**
    * Only the **Creator** can delete their poll.
    * The **Admin** (superuser) has global moderation rights.
* **JWT Auth:** Secure, stateless session management.
* **Password Hashing:** Industry-standard **bcrypt** implementation.
* **Duplicate Vote Prevention:** Logic to track user IDs per poll to enforce "One Person, One Vote".

---
