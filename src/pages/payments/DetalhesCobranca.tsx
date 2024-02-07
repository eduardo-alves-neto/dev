// src/components/DetalhesCobranca.tsx
import React, { useState } from "react";
import {
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface DetalhesCobrancaProps {
  diasDecobranca: number;
}

export const DetalhesCobranca: React.FC<DetalhesCobrancaProps> = ({
  diasDecobranca,
}) => {
  const [mensagem, setMensagem] = useState("");

  const enviarMensagem = () => {
   
  };

  return (
    <>
      <AccordionDetails>
      
        <TextField
          label="Mensagem de Cobrança"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          onClick={enviarMensagem}
        >
          Enviar Mensagem
        </Button>
      </AccordionDetails>
    </>
  );
};
