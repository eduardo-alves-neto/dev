// Coluna.tsx
import { Box, Typography, Paper, Button } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import { IItem } from "./Kanban";
import { Task } from "./Task";

interface IColumnProps {
  title: string;
  id: string;
  items: IItem[];
}

export const Column: React.FC<IColumnProps> = ({ title, id, items }) => {
  const getListStyle = (isDraggingOver: boolean) => ({
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 2,
    width: 300,
    minHeight: 400,
    maxHeight: "70vh",
    overflow: "auto",
  });

  return (
    <Box sx={{ width: 350, margin: 2 }} key={id}>
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Paper
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {/* Tarefas */}
            {items.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Paper>
        )}
      </Droppable>
      <Button>add+</Button>
    </Box>
  );
};
