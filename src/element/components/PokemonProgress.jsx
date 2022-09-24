import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const PokeProgress = styled(({...props }) => (
  <LinearProgress
    variant="determinate" 
    {...props} />
))`
  padding: 8px
`;

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <PokeProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography 
          variant="body2" 
          color="text.secondary">{`${Math.round( props.value )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function PokemonProgress({ progress }) {

  return <LinearProgressWithLabel value={progress} />
  
}