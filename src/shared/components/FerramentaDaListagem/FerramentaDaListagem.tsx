import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ModalProduto } from "../modalProdutos/modalProdutos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IFerramentaDaListagemProps {
  textoDeBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
  rota?: string;
  isloading?: boolean;
}

export const FerramentaDaListagem: React.FC<IFerramentaDaListagemProps> = ({
  textoDeBusca = "",
  isloading,
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  aoClicarEmNovo,
  rota,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDeBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          placeholder="Pesquisar..."
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            variant="contained"
            color="primary"
            disabled={isloading}
            disableElevation
            endIcon={<Add />}
            onClick={() => navigate(rota ?? '') }
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
