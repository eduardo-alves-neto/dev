import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LayoutBase } from "../../shared/layouts/LayoutBase";
import { FerramentaDaListagem } from "../../shared/components/FerramentaDaListagem/FerramentaDaListagem";
import { DetalhesCobranca } from "./DetalhesCobranca";
import { initialValues } from "./initialValues";

interface CobrancasDoDiaProps {
  //   diasDecobranca: number[];
}

const CobrancasDoDia: React.FC<CobrancasDoDiaProps> = () => {
  const theme = useTheme();

  // Use os initialValues para inicializar os diasDecobranca
  const diasDecobranca = [...initialValues];

  return (
    <LayoutBase
      title={"Cobranças"}
      barraDeFerramenta={<FerramentaDaListagem />}
    >
      <Box
        height={theme.spacing(70)}
        marginX={2}
        padding={1}
        paddingX={2}
        flex={1}
      >
        {diasDecobranca.map((dia, index) => (
          <Accordion key={index} sx={{mb:2}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>Cobranças do Dia {dia}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <DetalhesCobranca diasDecobranca={dia} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </LayoutBase>
  );
};

export default CobrancasDoDia;
