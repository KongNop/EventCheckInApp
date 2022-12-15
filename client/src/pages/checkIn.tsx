import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select, { ActionMeta } from "react-select";

const CheckIn = () => {
    const [eventDetail, setEventDetail] = useState({ eventName: '', eventDate: '', description: '', users: [{ name: '', status: false }] });
    const [users, setUsers] = useState(eventDetail.users)
    const [targetUser, setUser] = useState('')
    const { event } = useParams();
    const navigate = useNavigate()
    async function handleChangeUser() {
        console.log(targetUser)
        let newUserList: any[] = []
        users.map((user) => {
            if (user.name == targetUser) {
                console.log('matched')
                user.status = true
            }
            newUserList.push(user)
        })
        console.log(newUserList)
        const res: AxiosResponse<any, any> = await axios.patch(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/checkIn/${event}`, {updatedUsers: newUserList}
        );
        console.log(res)
        alert(`You have been checked in to event: ${event}`)
        navigate(`/checkIn/completed/${event}`)
    }
    async function fetchEvent(): Promise<void> {
        const res: AxiosResponse<any, any> = await axios.get(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/checkIn/${event}`
        );
        console.log(res.data);
        setEventDetail(res.data.Item)
        setUsers(res.data.Item.users)
    }
    useEffect(() => {
        fetchEvent()
    }, []);

    if (event === undefined) {
        console.log('HIhi')
        return (
            <>
                <h1>Oops, something is wrong</h1>
            </>
        )
    }
    const uncheckedUser = users.filter((user) => { return user.status === false })
    let userOptions: any[] = []
    uncheckedUser.forEach((user) => {
        userOptions.push({ value: user.name, label: user.name });
    })
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
            <div
                style={{
                    backgroundColor: "#f87d64",
                    borderRadius: 5,
                    width: "full",
                }}
            >
                <Typography
                    align="center"
                    sx={{ mb: 2, color: "#FFFFFF" }}
                    paragraph
                    component="div"
                >
                    {eventDetail.eventDate}
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
                        align="left"
                        sx={{
                            mt: 4,
                            mb: 2,
                            whiteSpace: "pre-line",
                            color: "white",
                        }}
                        variant="h6"
                        component="div"
                    >
                        {eventDetail.description}
                    </Typography>
                </Grid>
            </Box>

            <Container
                component="main"
                sx={{ backgroundColor: "white", padding: 3 }}
            >
                <h3>Find your name here</h3>
                <Select
                    options={userOptions}
                    onChange={(option) => {
                        setUser(option.value);
                    }}
                />
                <Button
                    type="button"
                    fullWidth
                    // color="success"
                    disabled={targetUser === ""}
                    variant="contained"
                    onClick={() => {
                        handleChangeUser();
                    }}
                    sx={{
                        mt: 3,
                        mb: 2,
                        bgcolor: "#5EC2B7",
                        color: "white",
                        ":hover": { bgcolor: "#8ad1c9" },
                    }}
                >
                    Check In
                </Button>
            </Container>
        </>
    ); 
};

export default CheckIn;
