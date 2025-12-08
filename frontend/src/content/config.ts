import { defineCollection, z } from "astro:content";

const certifications = defineCollection({
  schema: z.object({
    title: z.string(),
    company: z.string(),
    date_issued: z.number(),
    description: z.string(),
    url: z.string().url().optional(),
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
    technologies: z.string(),
    repository_url: z.string().url().optional(),
    project_url: z.string().url().optional(),
    description: z.string(),
  }),
});

export const collections = {
  certifications,
  experience,
  projects,
};
