// Kanban.tsx
import { Box, Typography } from "@mui/material";
import { DragDropContext, DraggableLocation } from "@hello-pangea/dnd";
import { useState } from "react";
import { Column } from "./Colunm";
import { KanbanServices } from "./services/index";
import { IColumns, IItem } from "./types";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<IColumns[]>([]);

  useQuery({
    queryKey: ["/kanban"],
    queryFn: async () => {
      try {
        console.log("entrei aqui 1")
        const fetchedColumns = await KanbanServices.getColumns();
        const fetchedItems = await KanbanServices.getItems();
        console.log("entrei aqui 2")
        // Crie um objeto para mapear os itens para suas colunas
        const columnItemMap: { [key: string]: IItem[] } = {};
  console.log("entrei aqui 3")
        // Inicialize cada chave do objeto com um array vazio
        fetchedColumns.forEach((column) => {
        
          columnItemMap[Number(column.id)] = [];
        });
  console.log("entrei aqui 4")
        // Adicione os itens à coluna correspondente
        fetchedItems.forEach((item) => {
          if (columnItemMap[Number(item.id)]) {
            columnItemMap[Number(item.id)].push(item);
          }
        });
        

        // Agora, columnItemMap contém os itens mapeados para cada coluna
        setColumns(
          fetchedColumns.map((column) => ({
            ...column,
            items: columnItemMap[Number(column.id)],
          }))
        );
        console.log("entrei aqui 5")
       
        // return []; 
      } catch (error) {
        enqueueSnackbar("Unable to obtain data", { variant: "error" });
        return []; 
      }
    },
  });

  const onDragEnd = (result: {
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
          {/* {isLoading && <>carregando....</>} */}
          {columns.map((column) => (
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
