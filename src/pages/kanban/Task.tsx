// Tarefa.tsx
import { Box, Divider, Typography } from "@mui/material";
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
              minHeight: 200,
              maxHeight: 300,
              backgroundColor: "#4682B4",
              margin: 1,
              padding: 1,
              borderRadius: 2,
            }}
          >
            <Box sx={{ marginY:1}}>
              <Typography sx={{color:"yellow", fontSize:"22px"}}>
                {task.title}
              </Typography>
              <Divider sx={{borderBottom:1}}/>
            </Box>
            {task.content}
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
