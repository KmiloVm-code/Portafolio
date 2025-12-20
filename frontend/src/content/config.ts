import { defineCollection, z } from "astro:content";

const certifications = defineCollection({
  schema: z.object({
    title: z.string(),
    company: z.string(),
    badge_url: z.string().url(),
    date_issued: z.number(),
    certificate_url: z.string().url().optional(),
  }),
});

const experience = defineCollection({
  schema: z.object({
    title: z.string(),
    company: z.string(),
    start_date: z.number(),
    end_date: z.number().optional(),
    technologies: z.string(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    technologies: z.array(z.string()),
    repository_url: z.string().url().optional(),
    project_url: z.string().url().optional(),
    description: z.string(),
    images: z.array(z.string()).optional(),
  }),
});

const studies = defineCollection({
  schema: z.object({
    tittle: z.string(),
    university: z.string(),
    year_start: z.number(),
    year_end: z.number().optional(),
    finish: z.boolean(),
  }),
});

const courses = defineCollection({
  schema: z.object({
    title: z.string(),
    university: z.string(),
    year: z.number(),
    hours: z.number().optional(),
  }),
});

export const collections = {
  certifications,
  experience,
  projects,
  studies,
  courses,
};
