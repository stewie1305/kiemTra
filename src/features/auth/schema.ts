import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .email({ message: "Email kh dung dinh dang" })
    .min(1, { message: "Email la bat buoc" }),
  password: z.string().min(6, { message: "Mật khẩu phải ít nhất 6 ký tự" }),

  rememberMe: z.boolean().optional(),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
