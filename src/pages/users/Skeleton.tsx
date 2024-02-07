import { Skeleton, Stack } from '@mui/material';

export const SkeletonLoading = () => {
  return (
    <Stack direction='column' spacing={2} mt={3}>
      <Skeleton variant='rectangular' width='100%' height={40} />
      <Skeleton variant='rectangular' width='100%' height={500} />
    </Stack>
  );
};
