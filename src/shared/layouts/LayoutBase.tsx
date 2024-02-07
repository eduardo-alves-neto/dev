import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDrawerContext } from "../contexts";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface ILayoutBase {
  children?: React.ReactNode;
  title: string;
  barraDeFerramenta?: React.ReactNode;
}
export const LayoutBase: React.FC<ILayoutBase> = ({
  children,
  title,
  barraDeFerramenta,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        height={theme.spacing(12)}
        display="flex"
        alignItems="center"
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>
              <MenuOpenIcon />
            </Icon>
          </IconButton>
        )}
        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Typography>
      </Box>

      {barraDeFerramenta && <Box>{barraDeFerramenta}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
