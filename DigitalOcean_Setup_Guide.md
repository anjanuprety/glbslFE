# Quick Setup Guide for DigitalOcean Strapi Integration

## Step 1: Update Your Environment Configuration

### 1.1 Find Your DigitalOcean App URL
1. Go to your DigitalOcean dashboard
2. Navigate to **Apps** section
3. Click on your Strapi app
4. Copy the **Live App** URL (it should look like: `https://your-app-name-12345.ondigitalocean.app`)

### 1.2 Update the .env File
1. Open the `.env` file in your project root
2. Replace the placeholder URL with your actual DigitalOcean URL:
   ```env
   VITE_STRAPI_API_URL=https://your-actual-app-url-here
   ```
   
   **Example:**
   ```env
   VITE_STRAPI_API_URL=https://glbsl-cms-abc123.ondigitalocean.app
   ```

### 1.3 Restart Development Server
After updating the `.env` file:
1. Stop your current dev server (Ctrl+C)
2. Run `npm run dev` again
3. Your frontend will now fetch data from DigitalOcean instead of localhost

## Step 2: Test the Integration

### 2.1 Verify API Connection
1. Open browser developer tools (F12)
2. Go to Network tab
3. Visit any About Us page (e.g., `/about/committee`)
4. Check that API calls are going to your DigitalOcean URL instead of localhost:1337

### 2.2 Test All Sections
Visit these pages to ensure data loads from DigitalOcean:
- `/about/board-of-directors`
- `/about/management-team` 
- `/about/corporate-team` (should show monitoring & supervision unit)
- `/about/committee`
- `/services/loan-services`
- `/services/savings-services`

## Step 3: Troubleshooting

### If Data Doesn't Load:
1. **Check URL**: Ensure your DigitalOcean URL is correct
2. **Check CORS**: Your Strapi should allow requests from your frontend domain
3. **Check API Permissions**: Ensure Public role has `find` and `findOne` permissions
4. **Check Browser Console**: Look for CORS or network errors

### Common Issues:
- **CORS Error**: Add your frontend domain to Strapi security settings
- **404 Errors**: Verify your DigitalOcean app is running and accessible
- **Empty Data**: Check that content is published in Strapi admin panel

## Step 4: Configure CORS (If Needed)

If you get CORS errors:
1. Go to your DigitalOcean Strapi admin panel
2. Navigate to **Settings** → **Security**
3. Add your frontend URLs to allowed origins:
   - `http://localhost:3000` (for development)
   - `http://localhost:3001` (for development)
   - Your production frontend URL (if deployed)

## That's It!

Your frontend should now be connected to your DigitalOcean Strapi instance with Neon database. The monitoring and supervision unit should appear in the corporate team page automatically if you've added people with `personType = "monitoringSupervision"`.
