import React, { ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { Home } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentsIcon from "@mui/icons-material/Payments";

interface IListItemLink {
  children?: ReactNode;
  label: string;
  icon: React.ReactElement;
  to: string;
  onClick?: () => void;
}

interface IMenuDrawerProps {
  children: React.ReactNode;
}

const ListItemLink: React.FC<IListItemLink> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuDrawer: React.FC<IMenuDrawerProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(32)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(26)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
              alt="Logo"
              src=""
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemLink
                icon={<Home />}
                label="Pagina Inicial"
                to="/pagina-inicial"
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
              <ListItemLink
                icon={<Icon>Home</Icon>}
                label="Users"
                to="/users"
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
              <ListItemLink
                icon={
                  <Icon>
                    <InventoryIcon />
                  </Icon>
                }
                label="Products"
                to="/products"
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
              <ListItemLink
                icon={
                  <Icon>
                    <PaymentsIcon />
                  </Icon>
                }
                label="Cobranças"
                to="/payments"
                onClick={smDown ? toggleDrawerOpen : undefined}
              />

              <ListItemLink
                icon={
                  <Icon>
                    <PaymentsIcon />
                  </Icon>
                }
                label="Kanban"
                to="/kanban"
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>
                    <DarkModeIcon />
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Alterar Tema" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(33)}>
        {children}
      </Box>
    </>
  );
};
