import {
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { LayoutBase } from "../../../shared/layouts/LayoutBase";
import { useForm } from "react-hook-form";
import { userTypeRequest } from "../services/types";
import { useMutation } from "@tanstack/react-query";
import { UserTypeServices } from "../services";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const PostUsers = () => {
  const navigate = useNavigate();

  const form = useForm<userTypeRequest>({
    mode: "onChange",
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: userTypeRequest) => {
      await UserTypeServices.create(values);
    },
    onSuccess: () => {
      navigate("/users");
      enqueueSnackbar("salvo com sucesso"),
        {
          variant: "success",
        };
    },
    onError: () => {
      const errorMessage = "não foi possível enviar dados"!;

      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });

  const onSubmit = async (data: userTypeRequest) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LayoutBase title={"Novo Cliente"}>
        <Box padding={10}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label={"Nome"}
                  {...form.register("name")}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label={"Email"}
                  size="small"
                  {...form.register("email")}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label={"Telefone"}
                  size="small"
                  {...form.register("phone")}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  fullWidth
                  label={"Endereço"}
                  size="small"
                  {...form.register("address")}
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-start" marginTop={4}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isPending}
                style={{ marginRight: "10px" }}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/users")}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </LayoutBase>
    </>
  );
};
