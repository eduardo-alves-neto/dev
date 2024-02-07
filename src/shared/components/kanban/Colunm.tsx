// Column.tsx
import { Droppable } from "@hello-pangea/dnd";
import { Box, Typography, Paper } from "@mui/material";
import Task from "./Task";

interface ColumnProps {
  title: string;
  tasks: string[];
  setTasks?: (tasks: string[]) => void;
  id: string;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  setTasks,
  id,
}) => {
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 2,
    width: 250,
    minHeight: 300,
  });

  return (
    <Box sx={{ width: 300 }}>
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
            {tasks.map((task, index) => (
              <Task key={task} id={task} index={index} title={task} />
            ))}
            {provided.placeholder}
          </Paper>
        )}
      </Droppable>
    </Box>
  );
};
