import { Draggable } from "@hello-pangea/dnd";
import { Box } from "@mui/material";

interface ITaskProps {
  id: string;
  index: number;
  title: string;
}

export default function Task({ id, index, title }: ITaskProps) {
  function bgColor(props: boolean) {
    return props ? "lightgreen" : "#F2D7D5";
  }

  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provider, snapshot) => (
        <div
          ref={provider.innerRef}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          <Box
            sx={{
              backgroundColor: bgColor(snapshot.isDragging),
              margin: 1,
              padding: 1,
            }}
          >
            {title}
          </Box>
        </div>
      )}
    </Draggable>
  );
}
