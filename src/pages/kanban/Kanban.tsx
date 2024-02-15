// Kanban.tsx
import { Box, Typography } from "@mui/material";
import { DragDropContext, DraggableLocation } from "@hello-pangea/dnd";
import { useState } from "react";
import { Column } from "./Colunm";
import { KanbanServices } from "./services/index";
import { IColumns, IItem } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<IColumns[]>([]);

  const { isLoading, refetch } = useQuery({
    queryKey: ["/kanban"],
    queryFn: async () => {
      try {
        const fetchedColumns = await KanbanServices.getColumns();
        const fetchedItems = await KanbanServices.getItems();

        const columnItemMap = fetchedColumns.map((column) => {
          const items = fetchedItems.filter((item) => {
            return column.id === item.column_id;
          });
          return { ...column, items };
        });

        setColumns(columnItemMap);
        return columnItemMap;
      } catch (error) {
        console.log(error + "erro no get do kanban");
        return [];
      }
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (task: IItem) => {
      await KanbanServices.updateItemPosition(task);
    },
    onSuccess: () => {
      console.log("salvo com sucesso"),
        {
          variant: "success",
        };
    },
    onError: () => {
      const errorMessage = "não foi possível enviar dados"!;
      console.log(errorMessage);
    },
  });

  const onDragEnd = async (result: {
    destination: DraggableLocation | null;
    source: DraggableLocation;
    draggableId: string;
  }) => {
    var sourceColumnItems: any = [];
    var draggadItem: any = [];
    var destinationColumnItemns: any = [];
    var sourceColumnId = "";
    var destinationColumnId = "";

    for (var i in columns) {
      if (columns[i].id == result.source.droppableId) {
        sourceColumnItems = columns[i].items;
        sourceColumnId = i;
      } else if (columns[i].id == result.destination?.droppableId) {
        destinationColumnItemns = columns[i].items;
        destinationColumnId = i;
      }
    }

    for (var i in sourceColumnItems) {
      if (sourceColumnItems[i].id == result.draggableId) {
        draggadItem = sourceColumnItems[i];
      }
    }

    // Atualiza o column_id do item arrastado
    draggadItem.column_id = result.destination?.droppableId;

    //exclui o objeto arrastado
    var filterSourceColumnItems = sourceColumnItems.filter(
      (item: IItem) => item.id != result.draggableId
    );

    //adiciona o objeto na nova posição
    if (result.source.droppableId == result.destination?.droppableId) {
      filterSourceColumnItems.splice(result.destination?.index, 0, draggadItem);

      //mudar o state
      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filterSourceColumnItems;
      setColumns(columnsCopy);
    } else {
      destinationColumnItemns.splice(result.destination?.index, 0, draggadItem);

      //mudar o state
      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filterSourceColumnItems;
      columnsCopy[destinationColumnId].items = destinationColumnItemns;
      setColumns(columnsCopy);
    }

    console.log("🚀 ~ draggadItem:", draggadItem);

    // Envia a atualização para o back-end
    try {
      await mutateAsync(draggadItem);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid red" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Typography variant="h4" gutterBottom component="div">
            Quadro de Progresso
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "flex-start",
            flexDirection: "row",
            margin: 2,
          }}
        >
          {/* COLUNAS */}
          {isLoading && (
            <>
              <h3>carregando....</h3>
            </>
          )}

          {!isLoading &&
            columns.map((column) => (
              <Column
                key={column.id}
                title={column.title}
                id={column.id}
                items={column.items}
              />
            ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};
