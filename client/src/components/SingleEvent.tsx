import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleEvent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
        setEventDetail(res.data.Item);
        setLoading(false);
    }
    useEffect(() => {
        setLoading(true);
        fetchEvent();
    }, []);
    const Demo = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    if (loading) {
        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        minWidth: 290,
                        height: "100vh",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                    </Box>
                </Box>
            </>
        );
    }
    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    width: "full",
                }}
            >
                <Typography
                    align="center"
                    sx={{ mt: 5, mb: 2, color: "#E67F0D" }}
                    variant="h2"
                    component="div"
                >
                    {eventDetail.eventName}
                </Typography>
            </div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    minWidth: 290,
                }}
            >
                <Grid item xs={12} md={12}>
                    <Typography
                        align="center"
                        sx={{ mt: 4, mb: 2 }}
                        component="div"
                    >
                        {eventDetail.eventDate}
                    </Typography>
                    <Typography
                        align="left"
                        sx={{ mt: 4, mb: 2, whiteSpace: "pre-line" }}
                        variant="h6"
                        component="div"
                    >
                        {eventDetail.description}
                    </Typography>
                    <Demo>
                        <Box
                            sx={{
                                minWidth: 290,
                            }}
                        >
                            <List>
                                {eventDetail.users.map((user, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    {user.status === true ? (
                                                        <CheckCircleIcon
                                                            fontSize="large"
                                                            color="success"
                                                        />
                                                    ) : (
                                                        <PendingIcon fontSize="large" />
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
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            sx={{ mt: 2, bgcolor: "gray" }}
                            onClick={() => {
                                navigate("/admin");
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </>
    );
};

export default SingleEvent;
