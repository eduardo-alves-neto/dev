// Kanban.tsx
import { Box, Typography } from "@mui/material";
import { DragDropContext, DraggableLocation } from "@hello-pangea/dnd";
import { useState } from "react";
import { Column } from "./Colunm";

export interface IItem {
  id: string;
  content: string;
  title: string;
}

interface IColumns {
  title: string;
  id: string;
  items: IItem[];
}

export const Kanban: React.FC = () => {
  const initialItems: IItem[] = [
    { id: "1", content: "conteudo 1", title: "TArefa1" },
    { id: "2", content: "conteudo 2", title: "TArefa1" },
    { id: "3", content: "conteudo 3", title: "TArefa1" },
    { id: "4", content: "conteudo 1", title: "TArefa1" },
    { id: "5", content: "conteudo 2", title: "TArefa1" },
    { id: "6", content: "conteudo 3", title: "TArefa1" },
  ];
  const initialColumns: IColumns[] = [
    {
      title: "Teste",
      id: "1",
      items: initialItems,
    },
    {
      title: "Teste 2",
      id: "2",
      items: [],
    },
  ];

  const [columns, setColumns] = useState<IColumns[]>(initialColumns);

  const onDragEnd = (result: {
    destination: DraggableLocation | null;
    source: DraggableLocation;
    draggableId: string;
  }) => {
    var sourceColumnItems: any = [];
    var draggadItem: any = [];
    var destinationColumnItemns: any = {};
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
