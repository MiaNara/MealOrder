import { Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <div>
            <Typography sx={{
                position: 'relative',
                left: '0',
                bottom: { md: 0, sm: '-80px', xs: '-20px' },
                width: '100%',
                fontFamily: '"Public Sans", sans-serif',
                padding: '20px 0 20px 0',
                fontSize: '0.75rem',
                fontWeight: '400',
                lineHeight: '1.66',
                color: 'rgb(140, 140, 140)',
                textAlign: 'center'
            }}> © 2023. All rights reserved </Typography>
        </div>
    )
}
