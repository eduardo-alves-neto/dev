import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { productsTypeRequest } from "../../../pages/products/services/types";
import { initialValues } from "../../../pages/products/initialValues";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { productsTypeServices } from "../../../pages/products/services";

interface ModalProdutoProps {
  open: boolean;
  onClose: () => void;
  onSave: (produto: productsTypeRequest) => void; // Alterado para receber productsTypeRequest
}

export const ModalProduto: React.FC<ModalProdutoProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const form = useForm<productsTypeRequest>({
    mode: "onChange",
    defaultValues: { ...initialValues },
  });
  const { reset, watch, setValue, handleSubmit } = form;
  const [nomeProduto, setNomeProduto] = useState("");
  const [newValues, setNewValues] = useState<productsTypeRequest>({}); // Adicionado estado local para os novos valores

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: productsTypeRequest) => {
      await productsTypeServices["create"](values);
    },
    onSuccess: () => {
      enqueueSnackbar("Successfully saved", {
        variant: "success",
      });
    },
    onError: () => {
      const errorMessage = "imposssivel enviar dados"!;

      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });

  const handleSave = async () => {
    try {
      await mutateAsync({
        id: newValues.id, // Se houver um campo id em newValues
        name: newValues.name,
        description: newValues.description,
        price: newValues.price,
        image_Url: newValues.image_Url,
      });

      setNewValues({});
      setNomeProduto("");
      onClose();
    } catch (error) {
      const errorMessage = "Impossível enviar dados";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  // Adicione outros campos necessários para a criação do produto
  // Por exemplo:
  const [description, setDescription] = useState("");
  // const [price, setPrice] = useState(0);
  // const [imageUrl, setImageUrl] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Novo Produto</DialogTitle>
      <Box margin={2}>
        <TextField
          fullWidth
          label="Nome do Produto"
          value={nomeProduto}
          onChange={(e) => {
            setNomeProduto(e.target.value);
            setNewValues({ ...newValues, name: e.target.value }); // Atualizar novos valores
          }}
        />
      </Box>
      <Box margin={2}>
        <TextField
          fullWidth
          label="Descrição"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setNewValues({ ...newValues, description: e.target.value });
          }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" margin={2}>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Box marginLeft={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
