import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { bgcolor } from "@mui/system";
import axios from "axios";
import { text } from "node:stream/consumers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventList = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([
        {
            eventName: "",
            description: "",
            users: [{ name: "", status: false }],
            eventDate: "",
        },
    ]);
    async function fetchAllEvents() {
        const res = await axios.get(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/events`
        );
        console.log(res);
        setEvents(res.data.Items);
        setLoading(false);
    }
    useEffect(() => {
        setLoading(true);
        fetchAllEvents();
    }, []);

    if (loading) {
        return (
            <>
                <Typography
                    align="center"
                    sx={{ mt: 10, mb: 2, color: "white", fontWeight: "bold" }}
                    variant="h2"
                    component="div"
                >
                    All Events
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
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
            <Typography
                align="center"
                sx={{ mt: 10, mb: 2, color: "white", fontWeight: "bold" }}
                variant="h2"
                component="div"
            >
                All Events
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    mb: 5,
                }}
            >
                {events.map((event, index) => {
                    return <EventCard key={index} event={event} />;
                })}
            </Box>
        </>
    );
};

const EventCard = ({ event }: { event: any }) => {
    const [users, setUser] = useState([]);
    useEffect(() => {
        setUser(event.users);
    }, [event]);
    const checkedInUser = users.filter((user: { status: boolean }) => {
        return user.status === true;
    });
    const navigate = useNavigate();
    let ratio = checkedInUser.length / users.length;
  let bgColor;
  let textColor
    if (ratio == 1) {
      bgColor = "#C3E8BD";
      textColor = "green"
    } else if (ratio < 1 && ratio > 0.2)
    {
      textColor = "#de8704";
      bgColor = "#faf9da";
    }
    else {
      bgColor = "white";
      textColor = "#b40202";
    }

    return (
        <Card sx={{ width: 400, m: 2, bgcolor: bgColor }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {event.eventDate}
                </Typography>
                <Typography variant="h5" component="div">
                    {event.eventName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {event.description}
                </Typography>
                <Typography variant="body2" sx={{color: textColor, fontWeight: "bold"}}>
                    {checkedInUser.length} / {users.length} Checked
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        navigate(`/event/${event.eventName}`);
                    }}
                >
                    View Event
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventList;
