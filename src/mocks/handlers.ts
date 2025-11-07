import { http, HttpResponse } from "msw";

// In-memory data store (simulates database)
const projectsStore = [
  {
    id: 1,
    userId: "user-1",
    hackathonId: "gdg-fall-2025",
    name: "AI Chatbot Assistant",
    description:
      "An intelligent chatbot powered by machine learning to assist users with common queries.",
    problemStatement:
      "Users struggle to find quick answers to common questions",
    solution: "AI-powered chatbot with natural language processing",
    codeRepositoryUrl: "https://github.com/team-alpha/ai-chatbot",
    demoUrl: "https://ai-chatbot-demo.vercel.app",
    videoUrl: "https://youtube.com/watch?v=demo1",
    presentationUrl: "https://slides.google.com/presentation1",
    technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
    category: "AI/ML",
    status: "submitted",
    isPublic: true,
    submittedAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
    createdAt: "2025-01-10T08:00:00Z",
  },
  {
    id: 2,
    userId: "user-2",
    hackathonId: "gdg-fall-2025",
    name: "Community Event Platform",
    description: "A platform to organize and manage community tech events.",
    problemStatement: "Hard to coordinate events and track attendees",
    solution: "Centralized event management with RSVP tracking",
    codeRepositoryUrl: "https://github.com/team-beta/event-platform",
    demoUrl: "https://event-platform-demo.vercel.app",
    videoUrl: null,
    presentationUrl: null,
    technologies: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    category: "Web",
    status: "submitted",
    isPublic: true,
    submittedAt: "2025-01-15T14:20:00Z",
    updatedAt: "2025-01-15T14:20:00Z",
    createdAt: "2025-01-12T10:00:00Z",
  },
  {
    id: 3,
    userId: "user-3",
    hackathonId: "gdg-fall-2025",
    name: "Healthcare Analytics Dashboard",
    description: "Real-time analytics dashboard for healthcare data.",
    problemStatement: "Healthcare providers lack real-time insights",
    solution: "Cloud-based analytics dashboard with AI predictions",
    codeRepositoryUrl: "https://github.com/team-gamma/healthcare-dashboard",
    demoUrl: "https://healthcare-demo.vercel.app",
    videoUrl: "https://youtube.com/watch?v=demo3",
    presentationUrl: "https://slides.google.com/presentation3",
    technologies: ["Vue.js", "Python", "Google Cloud", "BigQuery"],
    category: "Cloud",
    status: "reviewed",
    isPublic: true,
    submittedAt: "2025-01-15T16:45:00Z",
    updatedAt: "2025-01-18T09:00:00Z",
    createdAt: "2025-01-11T14:00:00Z",
  },
];

const teamMembersStore = [
  {
    id: 1,
    projectId: 1,
    userId: "user-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Full-stack Developer",
    isLeader: true,
    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-01-10T08:00:00Z",
  },
  {
    id: 2,
    projectId: 1,
    userId: null,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "ML Engineer",
    isLeader: false,
    createdAt: "2025-01-10T08:05:00Z",
    updatedAt: "2025-01-10T08:05:00Z",
  },
  {
    id: 3,
    projectId: 2,
    userId: "user-2",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Frontend Developer",
    isLeader: true,
    createdAt: "2025-01-12T10:00:00Z",
    updatedAt: "2025-01-12T10:00:00Z",
  },
  {
    id: 4,
    projectId: 2,
    userId: null,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Backend Developer",
    isLeader: false,
    createdAt: "2025-01-12T10:05:00Z",
    updatedAt: "2025-01-12T10:05:00Z",
  },
  {
    id: 5,
    projectId: 3,
    userId: "user-3",
    name: "Eve Adams",
    email: "eve@example.com",
    role: "Data Scientist",
    isLeader: true,
    createdAt: "2025-01-11T14:00:00Z",
    updatedAt: "2025-01-11T14:00:00Z",
  },
];

const judgesStore = [
  {
    id: 1,
    userId: "judge-1",
    name: "Dr. Sarah Lee",
    email: "sarah.lee@gdg.dev",
    bio: "AI/ML expert with 10 years experience",
    expertise: ["AI/ML", "Data Science"],
    isActive: true,
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 2,
    userId: "judge-2",
    name: "Mark Wilson",
    email: "mark.wilson@gdg.dev",
    bio: "Full-stack developer and cloud architect",
    expertise: ["Web Development", "Cloud"],
    isActive: true,
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
];

const evaluationsStore = [
  {
    id: 1,
    projectId: 3,
    judgeId: 1,
    innovationScore: 9,
    technicalScore: 8,
    designScore: 9,
    impactScore: 9,
    presentationScore: 8,
    totalScore: 43,
    feedback:
      "Excellent project with great potential. The AI integration is impressive.",
    strengths: "Strong technical implementation and user experience",
    improvements: "Could improve documentation and add more test coverage",
    isFinalized: true,
    createdAt: "2025-01-17T10:00:00Z",
    updatedAt: "2025-01-17T15:30:00Z",
  },
];

const userRolesStore = [
  {
    id: 1,
    userId: "user-1",
    role: "participant",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 2,
    userId: "user-2",
    role: "participant",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 3,
    userId: "user-3",
    role: "participant",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 4,
    userId: "judge-1",
    role: "judge",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 5,
    userId: "judge-2",
    role: "judge",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 6,
    userId: "organizer-1",
    role: "organizer",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 7,
    userId: "admin-1",
    role: "admin",
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
];

// API handlers
export const handlers = [
  // ============================================
  // PROJECTS ENDPOINTS
  // ============================================

  // GET all projects (with optional filters)
  http.get("/api/projects", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const status = url.searchParams.get("status");
    const category = url.searchParams.get("category");

    let filtered = [...projectsStore];

    if (userId) {
      filtered = filtered.filter((p) => p.userId === userId);
    }
    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    return HttpResponse.json(filtered);
  }),

  // GET single project by ID
  http.get("/api/projects/:id", ({ params }) => {
    const project = projectsStore.find((p) => p.id === Number(params.id));
    if (!project) {
      return HttpResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return HttpResponse.json(project);
  }),

  // POST create new project
  http.post("/api/projects", async ({ request }) => {
    const body = (await request.json()) as any;
    const newProject = {
      id: projectsStore.length + 1,
      userId: body.userId || "user-1",
      hackathonId: body.hackathonId || "gdg-fall-2025",
      name: body.name,
      description: body.description,
      problemStatement: body.problemStatement || null,
      solution: body.solution || null,
      codeRepositoryUrl: body.codeRepositoryUrl,
      demoUrl: body.demoUrl || null,
      videoUrl: body.videoUrl || null,
      presentationUrl: body.presentationUrl || null,
      technologies: body.technologies || [],
      category: body.category || null,
      status: body.status || "draft",
      isPublic: body.isPublic !== undefined ? body.isPublic : true,
      submittedAt:
        body.status === "submitted" ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    } as any;
    projectsStore.push(newProject);
    return HttpResponse.json(newProject, { status: 201 });
  }),

  // PUT update project
  http.put("/api/projects/:id", async ({ params, request }) => {
    const projectIndex = projectsStore.findIndex(
      (p) => p.id === Number(params.id)
    );
    if (projectIndex === -1) {
      return HttpResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = (await request.json()) as any;
    const currentProject = projectsStore[projectIndex];
    const updated = {
      ...currentProject,
      ...body,
      updatedAt: new Date().toISOString(),
      submittedAt:
        body.status === "submitted" && !currentProject?.submittedAt
          ? new Date().toISOString()
          : currentProject?.submittedAt,
    } as any;
    projectsStore[projectIndex] = updated;
    return HttpResponse.json(updated);
  }),

  // DELETE project
  http.delete("/api/projects/:id", ({ params }) => {
    const projectIndex = projectsStore.findIndex(
      (p) => p.id === Number(params.id)
    );
    if (projectIndex === -1) {
      return HttpResponse.json({ error: "Project not found" }, { status: 404 });
    }
    projectsStore.splice(projectIndex, 1);
    return HttpResponse.json({ message: "Project deleted" }, { status: 200 });
  }),

  // ============================================
  // TEAM MEMBERS ENDPOINTS
  // ============================================

  // GET team members for a project
  http.get("/api/projects/:id/team", ({ params }) => {
    const members = teamMembersStore.filter(
      (m) => m.projectId === Number(params.id)
    );
    return HttpResponse.json(members);
  }),

  // POST add team member
  http.post("/api/projects/:id/team", async ({ params, request }) => {
    const body = (await request.json()) as any;
    const newMember = {
      id: teamMembersStore.length + 1,
      projectId: Number(params.id),
      userId: body.userId || null,
      name: body.name,
      email: body.email,
      role: body.role || null,
      isLeader: body.isLeader || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    teamMembersStore.push(newMember);
    return HttpResponse.json(newMember, { status: 201 });
  }),

  // DELETE team member
  http.delete("/api/team-members/:id", ({ params }) => {
    const memberIndex = teamMembersStore.findIndex(
      (m) => m.id === Number(params.id)
    );
    if (memberIndex === -1) {
      return HttpResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    teamMembersStore.splice(memberIndex, 1);
    return HttpResponse.json(
      { message: "Team member removed" },
      { status: 200 }
    );
  }),

  // ============================================
  // JUDGES ENDPOINTS
  // ============================================

  // GET all judges
  http.get("/api/judges", ({ request }) => {
    const url = new URL(request.url);
    const isActive = url.searchParams.get("isActive");

    let filtered = [...judgesStore];
    if (isActive !== null) {
      filtered = filtered.filter((j) => j.isActive === (isActive === "true"));
    }

    return HttpResponse.json(filtered);
  }),

  // GET single judge
  http.get("/api/judges/:id", ({ params }) => {
    const judge = judgesStore.find((j) => j.id === Number(params.id));
    if (!judge) {
      return HttpResponse.json({ error: "Judge not found" }, { status: 404 });
    }
    return HttpResponse.json(judge);
  }),

  // POST create judge
  http.post("/api/judges", async ({ request }) => {
    const body = (await request.json()) as any;
    const newJudge = {
      id: judgesStore.length + 1,
      userId: body.userId,
      name: body.name,
      email: body.email,
      bio: body.bio || null,
      expertise: body.expertise || [],
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    judgesStore.push(newJudge);
    return HttpResponse.json(newJudge, { status: 201 });
  }),

  // PUT update judge
  http.put("/api/judges/:id", async ({ params, request }) => {
    const judgeIndex = judgesStore.findIndex((j) => j.id === Number(params.id));
    if (judgeIndex === -1) {
      return HttpResponse.json({ error: "Judge not found" }, { status: 404 });
    }

    const body = (await request.json()) as any;
    const updated = {
      ...judgesStore[judgeIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    judgesStore[judgeIndex] = updated;
    return HttpResponse.json(updated);
  }),

  // ============================================
  // EVALUATIONS ENDPOINTS
  // ============================================

  // GET all evaluations (with filters)
  http.get("/api/evaluations", ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get("projectId");
    const judgeId = url.searchParams.get("judgeId");

    let filtered = [...evaluationsStore];

    if (projectId) {
      filtered = filtered.filter((e) => e.projectId === Number(projectId));
    }
    if (judgeId) {
      filtered = filtered.filter((e) => e.judgeId === Number(judgeId));
    }

    return HttpResponse.json(filtered);
  }),

  // GET single evaluation
  http.get("/api/evaluations/:id", ({ params }) => {
    const evaluation = evaluationsStore.find((e) => e.id === Number(params.id));
    if (!evaluation) {
      return HttpResponse.json(
        { error: "Evaluation not found" },
        { status: 404 }
      );
    }
    return HttpResponse.json(evaluation);
  }),

  // POST create/submit evaluation
  http.post("/api/evaluations", async ({ request }) => {
    const body = (await request.json()) as any;

    // Check if evaluation already exists for this judge/project
    const existing = evaluationsStore.find(
      (e) => e.projectId === body.projectId && e.judgeId === body.judgeId
    );

    if (existing) {
      return HttpResponse.json(
        { error: "Evaluation already exists for this judge and project" },
        { status: 400 }
      );
    }

    const totalScore =
      (body.innovationScore || 0) +
      (body.technicalScore || 0) +
      (body.designScore || 0) +
      (body.impactScore || 0) +
      (body.presentationScore || 0);

    const newEvaluation = {
      id: evaluationsStore.length + 1,
      projectId: body.projectId,
      judgeId: body.judgeId,
      innovationScore: body.innovationScore,
      technicalScore: body.technicalScore,
      designScore: body.designScore,
      impactScore: body.impactScore,
      presentationScore: body.presentationScore,
      totalScore,
      feedback: body.feedback || null,
      strengths: body.strengths || null,
      improvements: body.improvements || null,
      isFinalized: body.isFinalized || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    evaluationsStore.push(newEvaluation);
    return HttpResponse.json(newEvaluation, { status: 201 });
  }),

  // PUT update evaluation
  http.put("/api/evaluations/:id", async ({ params, request }) => {
    const evalIndex = evaluationsStore.findIndex(
      (e) => e.id === Number(params.id)
    );
    if (evalIndex === -1) {
      return HttpResponse.json(
        { error: "Evaluation not found" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as any;
    const currentEval = evaluationsStore[evalIndex];
    const totalScore =
      (body.innovationScore || currentEval?.innovationScore || 0) +
      (body.technicalScore || currentEval?.technicalScore || 0) +
      (body.designScore || currentEval?.designScore || 0) +
      (body.impactScore || currentEval?.impactScore || 0) +
      (body.presentationScore || currentEval?.presentationScore || 0);

    const updated = {
      ...currentEval,
      ...body,
      totalScore,
      updatedAt: new Date().toISOString(),
    } as any;
    evaluationsStore[evalIndex] = updated;
    return HttpResponse.json(updated);
  }),

  // ============================================
  // USER ROLES ENDPOINTS
  // ============================================

  // GET user role
  http.get("/api/users/:userId/role", ({ params }) => {
    const userRole = userRolesStore.find((ur) => ur.userId === params.userId);
    if (!userRole) {
      return HttpResponse.json(
        { error: "User role not found" },
        { status: 404 }
      );
    }
    return HttpResponse.json(userRole);
  }),

  // POST create user role
  http.post("/api/users/roles", async ({ request }) => {
    const body = (await request.json()) as any;
    const newRole = {
      id: userRolesStore.length + 1,
      userId: body.userId,
      role: body.role || "participant",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    userRolesStore.push(newRole);
    return HttpResponse.json(newRole, { status: 201 });
  }),

  // PUT update user role
  http.put("/api/users/:userId/role", async ({ params, request }) => {
    const roleIndex = userRolesStore.findIndex(
      (ur) => ur.userId === params.userId
    );
    if (roleIndex === -1) {
      return HttpResponse.json(
        { error: "User role not found" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as any;
    const currentRole = userRolesStore[roleIndex];
    const updated = {
      ...currentRole,
      role: body.role,
      updatedAt: new Date().toISOString(),
    } as any;
    userRolesStore[roleIndex] = updated;
    return HttpResponse.json(updated);
  }),

  // ============================================
  // LEADERBOARD ENDPOINT
  // ============================================

  http.get("/api/leaderboard", () => {
    // Calculate average scores per project
    const projectScores = evaluationsStore
      .filter((e) => e.isFinalized)
      .reduce(
        (acc, evaluation) => {
          if (!acc[evaluation.projectId]) {
            acc[evaluation.projectId] = { total: 0, count: 0 };
          }
          const projectScore = acc[evaluation.projectId];
          if (projectScore) {
            projectScore.total += evaluation.totalScore;
            projectScore.count += 1;
          }
          return acc;
        },
        {} as Record<number, { total: number; count: number }>
      );

    const leaderboard = Object.entries(projectScores)
      .map(([projectId, scores]) => {
        const project = projectsStore.find((p) => p.id === Number(projectId));
        const teamLeader = teamMembersStore.find(
          (m) => m.projectId === Number(projectId) && m.isLeader
        );
        const avgScore = scores.total / scores.count;

        return {
          projectId: Number(projectId),
          projectName: project?.name || "Unknown",
          team: teamLeader?.name || "Unknown Team",
          category: project?.category || "N/A",
          averageScore: Math.round(avgScore * 10) / 10,
          evaluationCount: scores.count,
        };
      })
      .sort((a, b) => b.averageScore - a.averageScore)
      .map((item, index) => ({ rank: index + 1, ...item }));

    return HttpResponse.json(leaderboard);
  }),

  // ============================================
  // ORGANIZER STATS ENDPOINT
  // ============================================

  http.get("/api/organizer/stats", () => {
    const stats = {
      totalProjects: projectsStore.length,
      submittedProjects: projectsStore.filter(
        (p) => p.status === "submitted" || p.status === "reviewed"
      ).length,
      draftProjects: projectsStore.filter((p) => p.status === "draft").length,
      reviewedProjects: projectsStore.filter((p) => p.status === "reviewed")
        .length,
      totalParticipants: new Set(
        teamMembersStore.map((m) => m.userId).filter(Boolean)
      ).size,
      totalTeams: projectsStore.length,
      totalJudges: judgesStore.filter((j) => j.isActive).length,
      totalEvaluations: evaluationsStore.length,
      finalizedEvaluations: evaluationsStore.filter((e) => e.isFinalized)
        .length,
    };
    return HttpResponse.json(stats);
  }),
];
