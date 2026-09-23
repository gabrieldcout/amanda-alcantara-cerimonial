import { z } from "zod";

const cpfSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length === 11, "CPF precisa ter 11 dígitos");

const birthDateSchema = z
  .string()
  .trim()
  .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), "Data inválida");

export const brideSignupSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome"),
  email: z.string().trim().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
  cpf: cpfSchema,
  birthDate: birthDateSchema,
});

export const brideLoginSchema = z.object({
  email: z.string().trim().email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
});

export const bridePasswordResetSchema = z.object({
  email: z.string().trim().email("E-mail inválido"),
  cpf: cpfSchema,
  birthDate: birthDateSchema,
  newPassword: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export const postSchema = z.object({
  content: z.string().trim().min(1, "Escreva algo para postar").max(2000),
  imageUrl: z.string().trim().optional().or(z.literal("")),
});

export const commentSchema = z.object({
  content: z.string().trim().min(1, "Escreva um comentário").max(1000),
});

export const coupleSchema = z.object({
  names: z.string().trim().min(2, "Informe os nomes do casal"),
  slug: z
    .string()
    .trim()
    .min(2, "Informe um identificador (slug)")
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífen"),
  weddingDate: z.string().trim().optional().or(z.literal("")),
  story: z.string().trim().optional().or(z.literal("")),
  published: z.coerce.boolean(),
  order: z.coerce.number().int().default(0),
});

export const coupleMediaSchema = z.object({
  type: z.enum(["photo", "video"]),
  url: z.string().trim().min(1, "Informe a URL"),
  caption: z.string().trim().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
});

export const backstageMediaSchema = z.object({
  type: z.enum(["photo", "video"]),
  url: z.string().trim().min(1, "Informe a URL"),
  caption: z.string().trim().optional().or(z.literal("")),
  published: z.coerce.boolean(),
  order: z.coerce.number().int().default(0),
});

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo"),
  email: z.string().trim().email("E-mail inválido"),
  phone: z.string().trim().min(8, "Informe um telefone/WhatsApp válido"),
  eventType: z.string().trim().min(1, "Selecione o tipo de evento"),
  eventDate: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  guestCount: z.string().trim().optional().or(z.literal("")),
  partnerName: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().optional().or(z.literal("")),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(2, "Informe o nome do cliente"),
  eventType: z.string().trim().optional().or(z.literal("")),
  quote: z.string().trim().min(5, "O depoimento não pode ficar vazio"),
  rating: z.coerce.number().int().min(1).max(5),
  published: z.coerce.boolean(),
  order: z.coerce.number().int().default(0),
});

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome"),
  role: z.string().trim().min(2, "Informe o cargo/função"),
  bio: z.string().trim().optional().or(z.literal("")),
  published: z.coerce.boolean(),
  order: z.coerce.number().int().default(0),
});

export const partnerSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome do parceiro"),
  category: z.string().trim().optional().or(z.literal("")),
  website: z.string().trim().optional().or(z.literal("")),
  published: z.coerce.boolean(),
  order: z.coerce.number().int().default(0),
});

export const galleryImageSchema = z.object({
  caption: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  published: z.coerce.boolean(),
  order: z.coerce.number().int().default(0),
});

export const siteSettingsSchema = z.object({
  heroTitle: z.string().trim().min(1),
  heroSubtitle: z.string().trim().min(1),
  aboutText: z.string().trim().min(1),
  instagramUrl: z.string().trim().optional().or(z.literal("")),
  tiktokUrl: z.string().trim().optional().or(z.literal("")),
  whatsappNumber: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().optional().or(z.literal("")),
});
