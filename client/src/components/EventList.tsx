import {
  Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventList = () => {
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
    }
    useEffect(() => {
      fetchAllEvents();
    }, []);

    return (
        <>
            <Typography
                align="center"
                sx={{ mt: 10, mb: 2 }}
                variant="h2"
                component="div"
            >
                All Events
            </Typography>
            <Box
                sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}
            >
                {events.map((event) => {
                    return <EventCard event={event} />;
                })}
            </Box>
        </>
    );
};

const EventCard = ({ event }: { event: any }) => {
    console.log(event);
    const [users, setUser] = useState([]);
    useEffect(() => {
        setUser(event.users);
    }, [event]);
    console.log(users);
    const checkedInUser = users.filter((user: { status: boolean }) => {
        return user.status === true;
    });
    console.log(checkedInUser);

    const navigate = useNavigate();

    return (
        <Card sx={{ minWidth: 275, m: 2 }}>
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
                <Typography variant="body2">
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
