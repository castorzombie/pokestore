import React from 'react';
import { Chip } from '@mui/material';

export const PokemonChip = ({ chips }) => {
  return (
    <div>
        { chips && chips.map( chip => {
            return (
                <React.Fragment key={chip}>
                    <Chip size="small" label={ chip } color="secondary" />
                </React.Fragment>
                )
        } ) }
    </div>
  )
}
