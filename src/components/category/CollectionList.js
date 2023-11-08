import React, { memo } from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Card, Stack, ListItemButton, CardContent } from '@mui/material';
import { ListStyled } from '../style/ListStyle';
import { formatCurrency } from "../utils/Price";
import { shortenString } from '../utils/Name';
function CollectionList({ data }) {
    return (
        <div>
            <Stack flexDirection={'row'}>
                <Grid2 container>
                    <Grid2 xs={12} >
                        <Card sx={{
                            marginRight: { md: '15px' },

                        }}>
                            <CardContent sx={{ flexDirection: 'column', paddingLeft: '2rem', display: 'flex', justifyContent: 'center', paddingBottom: '0', }}>
                                {data && data.map((listData, index) => {
                                    return (
                                        <ListStyled key={index}
                                            component="nav"
                                            aria-labelledby="nested-list-subheader"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader" sx={{ padding: 0, color: '#616161' }}>
                                                    Menu {index + 1}
                                                </ListSubheader>
                                            }
                                        >
                                            {listData.foodItems.map((item, index) => {
                                                return (
                                                    <Grid2 container columnSpacing={2} key={index} sx={{ paddingLeft: '1rem' }}>
                                                        <ListItemButton sx={{ padding: '0' }}>
                                                            <Grid2 xs={9} >
                                                                <p >{item.foodName && shortenString(item.foodName, 18)} </p>
                                                            </Grid2>
                                                            <Grid2 xs={2} sx={{ float: 'right' }}>
                                                                <p>{item.price && formatCurrency(item.price)}</p>
                                                            </Grid2>
                                                        </ListItemButton>
                                                    </Grid2>

                                                )
                                            }
                                            )}
                                        </ListStyled>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </Grid2>

                </Grid2>
            </Stack>


        </div >
    )
}
export default memo(CollectionList);
