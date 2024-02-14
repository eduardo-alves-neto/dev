// Tarefa.tsx
import { Box, Typography } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import { IItem } from "./types";

interface ITaskProps {
  task: IItem;
  index: number;
}

export const Task: React.FC<ITaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provider) => (
        <Box
          component="div"
          ref={provider.innerRef}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          <Box
            sx={{
              width: "90%",
              height: 100,
              backgroundColor: "gray", // Cor de fundo mais escura
              margin: 1,
              padding: 1,
              borderRadius: 2, // Cantos arredondados
            }}
          >
            <Typography sx={{ color: "yellow" }}>{task.title}</Typography>
            {task.content}
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
