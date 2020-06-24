import React from 'react';
import Box from '@material-ui/core/Box';

const ChallengeYourselfDesc = () => {
    return (
        <Box  display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ maxWidth: 500, justifyContent: 'center' }}>
            <h1>Challange yourself</h1>
        </Box>
    )
}

export default ChallengeYourselfDesc;
