import * as z from "zod";

// ساخت یک اسکیمای پایه بدون وابستگی به تابع ترجمه برای استخراج دقیق تایپ‌ها
const baseSchema = z.object({
  emailOrPhone: z.string(),
  password: z.string(),
  rememberMe: z.boolean().default(false),
});

// استخراج تایپ خالص خروجی فرم به صورت کاملاً دقیق
export type SignInFormValues = z.infer<typeof baseSchema>;

// این تابع اسکیمای نهایی را همراه با متن‌های ارور چندزبانه تولید می‌کند
export const createSignInSchema = (t: (key: string) => string) => {
  return z.object({
    emailOrPhone: z.string().min(5, { message: t("emailError") }),
    password: z
      .string()
      .min(4, { message: t("passwordError") })
      .max(60, { message: t("passwordError") }),
    rememberMe: z.boolean().default(false),
  });
};