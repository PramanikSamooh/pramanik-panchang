import { LanguageProvider } from "@/components/learn/LanguageContext";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
