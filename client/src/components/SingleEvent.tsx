import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from '@mui/icons-material/Pending';
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleEvent = () => {
    const [eventDetail, setEventDetail] = useState({
        eventName: "",
        eventDate: "",
        description: "",
        users: [{ name: "", status: false }],
    });
    const { event } = useParams();
    async function fetchEvent(): Promise<void> {
        const res: AxiosResponse<any, any> = await axios.get(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/checkIn/${event}`
        );
        console.log(res.data);
        setEventDetail(res.data.Item);
    }
    useEffect(() => {
        fetchEvent();
    }, []);
    const Demo = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));
    
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    minWidth: 290,
                }}
            >
                …
                <Grid item xs={12} md={12}>
                    <Typography
                        align="center"
                        sx={{ mt: 10, mb: 2 }}
                        variant="h2"
                        component="div"
                    >
                        {eventDetail.eventName}
                    </Typography>
                    <Typography
                        align="center"
                        sx={{ mt: 4, mb: 2 }}
                        component="div"
                    >
                        {eventDetail.eventDate}
                    </Typography>
                    <Typography
                        align="center"
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        {eventDetail.description}
                    </Typography>
                    <Demo>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                minWidth: 290,
                            }}
                        >
                            <List>
                                {eventDetail.users.map((user) => {
                                    return (
                                        <ListItem
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    {user.status === true ? (
                                                        <CheckCircleIcon color="success" />
                                                    ) : (
                                                        <PendingIcon />
                                                    )}
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={user.name} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>
                    </Demo>
                </Grid>
            </Box>
        </>
    );
};

export default SingleEvent;
