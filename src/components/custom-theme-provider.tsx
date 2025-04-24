import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import { customTheme } from "../styles/theme";

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MTThemeProvider value={customTheme as any}>{children}</MTThemeProvider>
  );
} 