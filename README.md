# Blue Hope Website

A responsive website for Blue Hope featuring financial reports and investor information.

## Features

- Responsive design
- Investor relations page with PDF reports
- PDF viewing and downloading functionality
- Secure file storage using Supabase

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=http://localhost:3000
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Start the backend server:
   ```bash
   npm run server
   ```

## Production Build

1. Create a production build:
   ```bash
   npm run build
   ```

2. Test the production build locally:
   ```bash
   npm run start:prod
   ```

## Deployment

The application is configured for deployment on Netlify. The deployment process is automated through the `netlify.toml` configuration file.

### Manual Deployment Steps

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Set the build command to `npm run build`
   - Set the publish directory to `build`
   - Add the required environment variables in the Netlify dashboard

## Project Structure

- `server.js` - Express server and API endpoints
- `public/` - Static files (HTML, CSS, client-side JavaScript)
- `css/` - Stylesheets
- `js/` - Client-side JavaScript files

## API Endpoints

- `GET /api/results` - Fetch financial results
- `GET /view-pdf` - View PDF reports
- `GET /api/download-report` - Download PDF reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. 