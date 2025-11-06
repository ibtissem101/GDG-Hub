# API Routes Documentation

This document outlines all the API endpoints available in the GDG Hackathon Hub platform. All endpoints are currently mocked using MSW (Mock Service Worker) for development purposes and are ready for backend integration.

## Base URL
All API routes are prefixed with `/api`

---

## 📁 Projects Endpoints

### GET `/api/projects`
Get all projects with optional filters

**Query Parameters:**
- `userId` (optional) - Filter by user ID
- `status` (optional) - Filter by status: 'draft', 'submitted', 'under_review', 'reviewed'
- `category` (optional) - Filter by category

**Response:**
```json
[
  {
    "id": 1,
    "userId": "user-1",
    "hackathonId": "gdg-fall-2025",
    "name": "AI Chatbot Assistant",
    "description": "...",
    "problemStatement": "...",
    "solution": "...",
    "codeRepositoryUrl": "https://github.com/...",
    "demoUrl": "https://...",
    "videoUrl": "https://...",
    "presentationUrl": "https://...",
    "technologies": ["React", "Node.js", "TensorFlow"],
    "category": "AI/ML",
    "status": "submitted",
    "isPublic": true,
    "submittedAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T10:30:00Z",
    "createdAt": "2025-01-10T08:00:00Z"
  }
]
```

---

### GET `/api/projects/:id`
Get a single project by ID

**Parameters:**
- `id` - Project ID

**Response:**
```json
{
  "id": 1,
  "userId": "user-1",
  "name": "AI Chatbot Assistant",
  ...
}
```

**Error Response (404):**
```json
{
  "error": "Project not found"
}
```

---

### POST `/api/projects`
Create a new project

**Request Body:**
```json
{
  "userId": "user-1",
  "hackathonId": "gdg-fall-2025",
  "name": "Project Name",
  "description": "Project description",
  "problemStatement": "Problem being solved",
  "solution": "Solution approach",
  "codeRepositoryUrl": "https://github.com/...",
  "demoUrl": "https://...",
  "videoUrl": "https://...",
  "presentationUrl": "https://...",
  "technologies": ["React", "Node.js"],
  "category": "Web",
  "status": "draft",
  "isPublic": true
}
```

**Response (201):**
Returns the created project object

---

### PUT `/api/projects/:id`
Update an existing project

**Parameters:**
- `id` - Project ID

**Request Body:**
Same as POST, but all fields are optional

**Response:**
Returns the updated project object

---

### DELETE `/api/projects/:id`
Delete a project

**Parameters:**
- `id` - Project ID

**Response:**
```json
{
  "message": "Project deleted"
}
```

---

## 👥 Team Members Endpoints

### GET `/api/projects/:id/team`
Get all team members for a project

**Parameters:**
- `id` - Project ID

**Response:**
```json
[
  {
    "id": 1,
    "projectId": 1,
    "userId": "user-1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "Full-stack Developer",
    "isLeader": true,
    "createdAt": "2025-01-10T08:00:00Z",
    "updatedAt": "2025-01-10T08:00:00Z"
  }
]
```

---

### POST `/api/projects/:id/team`
Add a team member to a project

**Parameters:**
- `id` - Project ID

**Request Body:**
```json
{
  "userId": "user-2",
  "name": "Bob Smith",
  "email": "bob@example.com",
  "role": "Backend Developer",
  "isLeader": false
}
```

**Response (201):**
Returns the created team member object

---

### DELETE `/api/team-members/:id`
Remove a team member

**Parameters:**
- `id` - Team member ID

**Response:**
```json
{
  "message": "Team member removed"
}
```

---

## 👨‍⚖️ Judges Endpoints

### GET `/api/judges`
Get all judges

**Query Parameters:**
- `isActive` (optional) - Filter by active status: 'true' or 'false'

**Response:**
```json
[
  {
    "id": 1,
    "userId": "judge-1",
    "name": "Dr. Sarah Lee",
    "email": "sarah.lee@gdg.dev",
    "bio": "AI/ML expert with 10 years experience",
    "expertise": ["AI/ML", "Data Science"],
    "isActive": true,
    "createdAt": "2025-01-05T00:00:00Z",
    "updatedAt": "2025-01-05T00:00:00Z"
  }
]
```

---

### GET `/api/judges/:id`
Get a single judge by ID

**Parameters:**
- `id` - Judge ID

---

### POST `/api/judges`
Create a new judge profile

**Request Body:**
```json
{
  "userId": "judge-3",
  "name": "John Doe",
  "email": "john@gdg.dev",
  "bio": "Software architect",
  "expertise": ["Web Development", "Cloud"],
  "isActive": true
}
```

**Response (201):**
Returns the created judge object

---

### PUT `/api/judges/:id`
Update a judge profile

**Parameters:**
- `id` - Judge ID

**Request Body:**
Same as POST, but all fields are optional

---

## 📝 Evaluations Endpoints

### GET `/api/evaluations`
Get all evaluations with optional filters

**Query Parameters:**
- `projectId` (optional) - Filter by project ID
- `judgeId` (optional) - Filter by judge ID

**Response:**
```json
[
  {
    "id": 1,
    "projectId": 3,
    "judgeId": 1,
    "innovationScore": 9,
    "technicalScore": 8,
    "designScore": 9,
    "impactScore": 9,
    "presentationScore": 8,
    "totalScore": 43,
    "feedback": "Excellent project with great potential.",
    "strengths": "Strong technical implementation",
    "improvements": "Could improve documentation",
    "isFinalized": true,
    "createdAt": "2025-01-17T10:00:00Z",
    "updatedAt": "2025-01-17T15:30:00Z"
  }
]
```

---

### GET `/api/evaluations/:id`
Get a single evaluation by ID

**Parameters:**
- `id` - Evaluation ID

---

### POST `/api/evaluations`
Create/submit a new evaluation

**Request Body:**
```json
{
  "projectId": 1,
  "judgeId": 1,
  "innovationScore": 9,
  "technicalScore": 8,
  "designScore": 9,
  "impactScore": 8,
  "presentationScore": 9,
  "feedback": "Great project overall",
  "strengths": "Excellent UI/UX",
  "improvements": "Add more tests",
  "isFinalized": false
}
```

**Note:** All scores should be between 0-10. Total score is automatically calculated.

**Response (201):**
Returns the created evaluation object

**Error Response (400):**
```json
{
  "error": "Evaluation already exists for this judge and project"
}
```

---

### PUT `/api/evaluations/:id`
Update an existing evaluation

**Parameters:**
- `id` - Evaluation ID

**Request Body:**
Same as POST, but all fields are optional

---

## 👤 User Roles Endpoints

### GET `/api/users/:userId/role`
Get user role

**Parameters:**
- `userId` - User ID

**Response:**
```json
{
  "id": 1,
  "userId": "user-1",
  "role": "participant",
  "createdAt": "2025-01-05T00:00:00Z",
  "updatedAt": "2025-01-05T00:00:00Z"
}
```

**Roles:**
- `participant` - Can submit projects
- `judge` - Can evaluate projects
- `organizer` - Can manage hackathon
- `admin` - Full access

---

### POST `/api/users/roles`
Create a user role

**Request Body:**
```json
{
  "userId": "user-5",
  "role": "participant"
}
```

---

### PUT `/api/users/:userId/role`
Update user role

**Parameters:**
- `userId` - User ID

**Request Body:**
```json
{
  "role": "judge"
}
```

---

## 🏆 Leaderboard Endpoint

### GET `/api/leaderboard`
Get the leaderboard with project rankings based on average evaluation scores

**Response:**
```json
[
  {
    "rank": 1,
    "projectId": 3,
    "projectName": "Healthcare Analytics Dashboard",
    "team": "Eve Adams",
    "category": "Cloud",
    "averageScore": 43.0,
    "evaluationCount": 1
  },
  {
    "rank": 2,
    "projectId": 1,
    "projectName": "AI Chatbot Assistant",
    "team": "Alice Johnson",
    "category": "AI/ML",
    "averageScore": 38.5,
    "evaluationCount": 2
  }
]
```

**Note:** Only projects with finalized evaluations appear on the leaderboard.

---

## 📊 Organizer Stats Endpoint

### GET `/api/organizer/stats`
Get hackathon statistics for organizers

**Response:**
```json
{
  "totalProjects": 3,
  "submittedProjects": 2,
  "draftProjects": 1,
  "reviewedProjects": 1,
  "totalParticipants": 3,
  "totalTeams": 3,
  "totalJudges": 2,
  "totalEvaluations": 1,
  "finalizedEvaluations": 1
}
```

---

## 🔄 Integration Notes

### MSW Setup
All these endpoints are currently mocked using MSW (Mock Service Worker). The mock handlers are in `src/mocks/handlers.ts`.

### Database Schema
The database schema is defined in `src/models/Schema.ts` using Drizzle ORM.

### Next Steps for Backend Integration
1. Replace MSW handlers with actual Next.js API routes in `src/app/api/`
2. Use Drizzle ORM to query the PostgreSQL database
3. Add authentication middleware to protect endpoints
4. Add input validation using Zod or similar
5. Add rate limiting and error handling
6. Update the MSW handlers to match any API changes

### Authentication
Most endpoints will require authentication. Add user ID from session/JWT token to identify the current user.

### Error Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Project status flow: `draft` → `submitted` → `under_review` → `reviewed`
- Evaluation scores are 0-10, total score is the sum of all 5 criteria (max 50)
- Only finalized evaluations count toward the leaderboard
- Team members can be registered users or guests (userId can be null)
