// Kanban.tsx
import { Box, Paper, Typography } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "@hello-pangea/dnd";
import { useState } from "react";

interface IItem {
  id: string;
  content: string;
}

interface IColumns {
  title: string;
  id: string;
  items: IItem[];
}
export const Kanban: React.FC = () => {
  const initialItems: IItem[] = [
    { id: "1", content: "conteudo 1" },
    { id: "2", content: "conteudo 2" },
    { id: "3", content: "conteudo 3" },
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

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 2,
    width: 250,
    minHeight: 300,
  });

  const ondragEnd = (result: {
    destination: DraggableLocation | null;
    source: DraggableLocation;
    draggableId: string;
  }) => {
    console.log(result);
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
      <DragDropContext onDragEnd={ondragEnd}>
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
            marginTop: 2,
            marginRight: 2,
          }}
        >
          {/* COLUNAS */}
          {columns.map((column) => (
            <Box sx={{ width: 300 }} key={column.id}>
              <Typography variant="h6" gutterBottom component="div">
                {column.title}
              </Typography>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Paper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {/* Tarefas */}
                    {column.items.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provider) => (
                          <Box
                            component="div"
                            ref={provider.innerRef}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                          >
                            <Box
                              sx={{
                                backgroundColor: "InactiveCaption",
                                margin: 1,
                                padding: 1,
                              }}
                            >
                              {task.content}
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};
