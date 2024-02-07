import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { MenuDrawer } from "./shared/components";
import { DrawerProvider } from "./shared/contexts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/constants/queryClient";
import './index.css';

export const App = () => {
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DrawerProvider>
          <BrowserRouter>
            <MenuDrawer>
              <AppRoutes />
            </MenuDrawer>
          </BrowserRouter>
        </DrawerProvider>
      </QueryClientProvider>
    </AppThemeProvider>
  );
};
