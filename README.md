# SomebodyFixIT
<p align="center">
  <img src="https://github.com/R-o-n-a-k/R-o-n-a-k/blob/68a96453e41fb48ad8143c4442881fe54d90e84e/assets/SomebodyFixIt.png?raw=true" alt="SomebodyFixIt" width="100%" />
</p>

## 🚀 About Project

**SomebodyFixIt** is a modern, full-stack platform built with React and **Supabase (PostgreSQL)** that empowers users to post problems and crowdsource solutions in real time. Featuring image uploads, link embedding, voting-based comment pinning, and a responsive UI with dark mode, it’s designed for fast, collaborative troubleshooting. The app uses Supabase’s realtime database and auth system to ensure seamless user experiences and **CRUD operations** making it both developer-friendly and user-centric.

## 🌐 Technologies Used

- ⚛️ **Frontend:** React, JavaScript
- ⚡ **Backend:** Supabase (PostgreSQL + Auth + Realtime DB + Storage)
- 📦 **NPM Libraries:** UUID, React-Toast, etc.
- 🎨 **Styling:** CSS
- ☁️ **Hosting & Deployment:** Netlify


## ✨ Features

- 🔐 User Authentication
- 📸 Image uploading & embedded links
- ❤️ Likes & Upvotes for realtime like and upvote functionality with live UI sync                    |
- 💬 Live comment system with **auto-pinning of top-voted answers**
- 📌 Auto-Pinning: **Top-upvoted comment gets pinned** live as votes change
- 🌓 Light/Dark theme toggle
- 📁 Modular structure for easy scaling
- 🧭 Dynamic routing
- 📱 Responsive design

## 📁 Project Structure

<pre>
SomebodyFixIt/
├── src/
│   ├── pages/           # Pages: Home, LoginRegister, MyProfile, NotFound
│   ├── components/      # Reusable UI elements (Navbar, Card, Loader, etc.)
│   ├── assets/          # Images, logos, icons
│   ├── utils/           # Helper functions
│   ├── client.js        # Supabase configuration
│   ├── App.css
│   ├── main.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
</pre>

## ⚡ Supabase Setup

1. **Go to [supabase](https://supabase.com) and create a free project.**

2. **Set up the following:**
   Database Tables:
   - auth: uuid, Display Name, Email, Phone, created_at
   - problems: id, description, image,user_name, user_id, created_at
   - comments: id, post_id, content, user_id, upvotes, created_at, user_name
   - comments-upvote: id, comment_id, user_id
   - likes: id, user_id, post_id
   - user-profile: id, uuid,bio, phone,profile-picture
     
   Storage:
   - Create a public bucket for post images and profile pic

3. **Install Supabase:**

```
npm install @supabase/supabase-js
```

4. **Connect to your project:**

```
// client.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseAnonKey = 'YOUR_PUBLIC_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 🤝 Contributing

To run this project locally:

1. **Clone the repository:**
```
git clone https://github.com/R-o-n-a-k/SomebodyFixIt.git

cd SomebodyFixIt
```

2. **Install dependencies:**

```
npm install
```

3. **Run the development server:**

```
npm run dev
```

4. Open localhost link to view it in the browser.


