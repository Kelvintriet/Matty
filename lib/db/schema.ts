import { boolean, datetime, int, json, longtext, mysqlTable, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: datetime("expires_at", { fsp: 3 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
  ipAddress: varchar("ip_address", { length: 255 }),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: datetime("access_token_expires_at", { fsp: 3 }),
  refreshTokenExpiresAt: datetime("refresh_token_expires_at", { fsp: 3 }),
  scope: text("scope"),
  password: text("password"),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: text("value").notNull(),
  expiresAt: datetime("expires_at", { fsp: 3 }).notNull(),
  createdAt: datetime("created_at", { fsp: 3 }),
  updatedAt: datetime("updated_at", { fsp: 3 }),
});

export const problems = mysqlTable("problems", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  level: int("level").notNull(),
  rating: int("rating").notNull(),
  statement: longtext("statement").notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
  explanation: longtext("explanation").notNull(),
  authorId: varchar("author_id", { length: 36 }).notNull().references(() => user.id),
  publishedAt: datetime("published_at", { fsp: 3 }),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
});

export const problemProgress = mysqlTable("problem_progress", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }),
  problemId: varchar("problem_id", { length: 36 }).notNull().references(() => problems.id, { onDelete: "cascade" }),
  solved: boolean("solved").notNull().default(false),
  notes: longtext("notes"),
  whiteboard: json("whiteboard"),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
}, (table) => [uniqueIndex("problem_progress_user_problem").on(table.userId, table.problemId)]);

export const contributorImages = mysqlTable("contributor_images", {
  id: varchar("id", { length: 36 }).primaryKey(),
  ownerId: varchar("owner_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }),
  content: longtext("content").notNull(),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
});

export const problemImages = mysqlTable("problem_images", {
  problemId: varchar("problem_id", { length: 36 }).notNull().references(() => problems.id, { onDelete: "cascade" }),
  imageId: varchar("image_id", { length: 36 }).notNull().references(() => contributorImages.id, { onDelete: "cascade" }),
}, (table) => [uniqueIndex("problem_image_unique").on(table.problemId, table.imageId)]);

export const problemTopics = mysqlTable("problem_topics", {
  problemId: varchar("problem_id", { length: 36 }).notNull().references(() => problems.id, { onDelete: "cascade" }),
  unitId: varchar("unit_id", { length: 100 }).notNull(),
  subtopicId: varchar("subtopic_id", { length: 100 }).notNull(),
}, (table) => [uniqueIndex("problem_topics_unique").on(table.problemId, table.unitId, table.subtopicId)]);
