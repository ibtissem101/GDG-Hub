# MSW (Mock Service Worker) Setup

MSW is now configured and will automatically start in development mode.

## ✅ What's Configured

1. **MSWProvider** - Wraps the entire app and initializes MSW
2. **Mock Handlers** - All API endpoints are mocked (see `src/mocks/handlers.ts`)
3. **Service Worker** - `public/mockServiceWorker.js` intercepts API calls
4. **Test Page** - Visit `/test-msw` to verify MSW is working

## 🧪 Testing MSW

### Method 1: Visit the Test Page
```
http://localhost:3000/test-msw
```
This page will:
- Make API calls to test endpoints
- Display results visually
- Show console logs

### Method 2: Open Browser Console
1. Start your dev server: `npm run dev`
2. Open your browser
3. Open DevTools Console (F12)
4. Look for these messages:

```
🎭 MSW (Mock Service Worker) is running
🎭 [MSW] Browser mocking enabled
🎭 [MSW] Available endpoints:
  - GET /api/projects
  - GET /api/leaderboard
  - GET /api/organizer/stats
  ...
```

### Method 3: Check Network Tab
1. Open DevTools → Network tab
2. Navigate to any page that makes API calls
3. Look for requests to `/api/*`
4. MSW will intercept these requests (you might see "[MSW]" in the console)

## 📡 Using MSW in Your Components

Just use `fetch` normally - MSW will intercept the calls:

```typescript
// In any component
const response = await fetch('/api/projects');
const projects = await response.json();
console.log(projects); // Mock data from MSW!
```

## 🔧 Available Endpoints

See `API_ROUTES.md` for the complete list of endpoints.

Quick examples:
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/organizer/stats` - Get stats
- `GET /api/evaluations` - Get evaluations
- `GET /api/judges` - Get judges

## 🐛 Troubleshooting

### "MSW is not working"
1. Check browser console for MSW initialization message
2. Make sure you're in development mode (`npm run dev`)
3. Clear browser cache and reload
4. Check if `public/mockServiceWorker.js` exists

### "Service Worker registration failed"
1. Make sure you're accessing via `localhost` (not `127.0.0.1`)
2. Service Workers require HTTPS or localhost
3. Check browser console for detailed error

### "API calls are not being intercepted"
1. Wait 1-2 seconds after page load for MSW to initialize
2. Check Network tab - look for MSW console logs
3. Verify the endpoint exists in `src/mocks/handlers.ts`

### "Can't see console logs"
1. Make sure DevTools Console is open
2. Check Console filter settings (should show all logs)
3. MSW logs start with 🎭

## 🔄 Modifying Mock Data

Edit `src/mocks/handlers.ts` to:
- Add new endpoints
- Modify mock data
- Change response behavior
- Add delays or errors for testing

Example:
```typescript
http.get('/api/projects', () => {
  // Add delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return mock data
  return HttpResponse.json(projectsStore);
}),
```

## 📝 Notes

- MSW only runs in **development mode**
- In production, it's automatically disabled
- Mock data is stored in-memory (resets on page reload)
- Service worker caches are automatically managed
- No backend needed - everything is mocked!

## 🚀 Next Steps

1. Visit `/test-msw` to verify setup
2. Use the mock API in your dashboard pages
3. When ready for real backend:
   - Create Next.js API routes in `src/app/api/`
   - Frontend code stays the same!
   - No changes needed to components
