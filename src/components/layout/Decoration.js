import React from 'react'
import { Box } from '@mui/material';

export default function Decoration() {
    return (
        <>
            <Box
                component="img"
                sx={{
                    position: 'absolute',
                    bottom: { md: '20px', sm: '180px', xs: '100px' },
                    left: { md: '-40px', sm: '-30px', xs: '-20px' },
                    height: { md: '270px', sm: '216px', xs: '180px' },
                    width: { md: '180px', sm: '144px', xs: '120px' },
                    zIndex: '-1',
                    opacity: '0.9',
                }}
                alt="A yummy dish"
                src="bg1.png"
            />
            <Box
                component="img"
                sx={{
                    position: 'absolute',
                    top: { md: '120px', sm: '180px', xs: '180px' },
                    right: '0',
                    height: { md: '192px', sm: '153px', xs: '120px' },
                    width: { md: '76.3px', sm: '61px', xs: '48px' },
                    zIndex: '-1',
                    opacity: '0.8',

                }}
                alt="A orange shape to make the design look better"
                src="bg2.png"
            />
            <Box
                component="img"
                sx={{
                    position: 'absolute',
                    bottom: { md: '0px', sm: '140px', xs: '70px' },
                    right: '0',
                    height: { md: '90px', sm: '72px', xs: '60px' },
                    width: { md: '120px', sm: '96px', xs: '80px' },
                    zIndex: '-1',
                    opacity: '0.9',
                }}
                alt="Some decoration"
                src="bg3.png"
            />

        </>
    )
}
