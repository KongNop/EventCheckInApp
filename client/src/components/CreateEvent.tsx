import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";

const CreateEvent = () => {
    const [event, setEvent] = useState({});
    const [users, setUsers] = useState(['']);
    const [user, setUser] = useState("");
    async function handleCreateEvent() {
        const res = await axios.post(
            `https://1ay74hu2ik.execute-api.us-east-1.amazonaws.com/default/events`,
            event
        );
    }
    let userList: string[] = []
  function handleAddPeople() {
    userList.push(user)
    setUsers(userList)
    setUser('')
  }
    return (
        <>
            <Container component="main" maxWidth="xs" className="createEvent">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create Event
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="eventName"
                            label="Event Name"
                            name="eventName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="eventDescription"
                            label="Event Description"
                            type="eventDescription"
                            id="eventDescription"
                        />
                        <TextField
                            id="date"
                            label="Event Date"
                            type="date"
                            defaultValue="2022-12-17"
                            sx={{ width: "100%", mt: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <form>
                            <div>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="participants"
                                    label="Participants"
                                    type="eventDescription"
                                    id="participants"
                                    value={user}
                                    onChange={(e) => {
                                        setUser(e.target.value);
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                >
                                    Add Participants
                                </Button>
                            </div>
                        </form>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Event
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default CreateEvent;
