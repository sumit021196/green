# Blue Hope Website

A responsive website for Blue Hope with investor relations functionality, built using Express.js and Supabase.

## Features

- Responsive design
- Investor relations page with PDF reports
- PDF viewing and downloading functionality
- Secure file storage using Supabase

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Supabase account and project

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blue-hope-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

4. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

- `server.js` - Express server and API endpoints
- `public/` - Static files (HTML, CSS, client-side JavaScript)
- `css/` - Stylesheets
- `js/` - Client-side JavaScript files

## API Endpoints

- `GET /api/results` - Get financial results
- `GET /api/list-files` - List PDF files in storage
- `GET /view-pdf` - View PDF in browser
- `GET /api/download-report` - Download PDF file
- `POST /api/upload` - Upload new PDF file

## Technologies Used

- Express.js
- Supabase
- HTML5/CSS3
- JavaScript (ES6+)
- Node.js 