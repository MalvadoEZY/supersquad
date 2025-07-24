import { z } from "zod";

export const vibeSchema = z.enum(["corporate", "default", "funny", "zen"]);

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
});

export const platformSchema = z.enum(["linkedin", "instagram", "facebook"]);

export const generatePostSchema = z.object({
  vibe: vibeSchema,
  product: productSchema,
  platform: platformSchema,
});

export type GeneratePostFormData = z.infer<typeof generatePostSchema>;

export const vibeOptions = [
  {
    value: "corporate",
    label: "Formal",
    description: "Professional and business-like tone",
    icon: "🎯",
  },
  {
    value: "default",
    label: "Casual",
    description: "Friendly and approachable tone",
    icon: "😊",
  },
  {
    value: "funny",
    label: "Playful",
    description: "Fun and engaging tone",
    icon: "🎉",
  },
  {
    value: "zen",
    label: "Assertive",
    description: "Confident and bold tone",
    icon: "💪",
  },
];
