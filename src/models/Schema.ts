import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// Enums
export const projectStatusEnum = pgEnum('project_status', [
  'draft',
  'submitted',
  'under_review',
  'reviewed',
]);

export const userRoleEnum = pgEnum('user_role', [
  'participant',
  'organizer',
  'judge',
  'admin',
]);

// Hackathon Projects Table
export const projectSchema = pgTable('project', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID of submitter
  hackathonId: text('hackathon_id').notNull(), // For future multi-hackathon support
  name: text('name').notNull(),
  description: text('description').notNull(),
  problemStatement: text('problem_statement'),
  solution: text('solution'),
  
  // Project Links
  codeRepositoryUrl: text('code_repository_url').notNull(),
  demoUrl: text('demo_url'),
  videoUrl: text('video_url'),
  presentationUrl: text('presentation_url'),
  
  // Project Details
  technologies: jsonb('technologies').$type<string[]>().default([]),
  category: text('category'),
  
  // Status
  status: projectStatusEnum('status').default('draft').notNull(),
  isPublic: boolean('is_public').default(true).notNull(),
  
  // Metadata
  submittedAt: timestamp('submitted_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Team Members Table
export const teamMemberSchema = pgTable('team_member', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => projectSchema.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id'), // Clerk user ID if registered
  name: text('name').notNull(),
  email: text('email').notNull(),
  role: text('role'), // e.g., "Developer", "Designer", "Project Manager"
  isLeader: boolean('is_leader').default(false).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Judges Table
export const judgeSchema = pgTable('judge', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique(), // Clerk user ID
  name: text('name').notNull(),
  email: text('email').notNull(),
  bio: text('bio'),
  expertise: jsonb('expertise').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Evaluations Table
export const evaluationSchema = pgTable(
  'evaluation',
  {
    id: serial('id').primaryKey(),
    projectId: integer('project_id')
      .references(() => projectSchema.id, { onDelete: 'cascade' })
      .notNull(),
    judgeId: integer('judge_id')
      .references(() => judgeSchema.id, { onDelete: 'cascade' })
      .notNull(),
    
    // Scoring Criteria (out of 10 each)
    innovationScore: integer('innovation_score').notNull(), // 0-10
    technicalScore: integer('technical_score').notNull(), // 0-10
    designScore: integer('design_score').notNull(), // 0-10
    impactScore: integer('impact_score').notNull(), // 0-10
    presentationScore: integer('presentation_score').notNull(), // 0-10
    
    // Total Score (auto-calculated)
    totalScore: integer('total_score').notNull(), // Sum of above
    
    // Feedback
    feedback: text('feedback'),
    strengths: text('strengths'),
    improvements: text('improvements'),
    
    // Metadata
    isFinalized: boolean('is_finalized').default(false).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      // Ensure one evaluation per judge per project
      uniqueJudgeProject: uniqueIndex('unique_judge_project_idx').on(
        table.judgeId,
        table.projectId,
      ),
    };
  },
);

// User Roles Table (extends Clerk users with platform roles)
export const userRoleSchema = pgTable('user_role', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique(), // Clerk user ID
  role: userRoleEnum('role').default('participant').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
