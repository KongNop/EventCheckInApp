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
            <h1>Check In to Event: {event}</h1>
            <h2>{eventDetail.description}</h2>
            <h3>{eventDetail.eventDate}</h3>
            <h3>Find your name</h3>
            <ul>
                {uncheckedUser.map((user, index) => {
                    return (
                        <li key={index}>
                            {user.name} :{" "}
                            {user.status ? "Checked In" : "Not Checked In"}
                        </li>
                    );
                })}
            </ul>
            <h3>Find your name here</h3>
            <Select
                options={userOptions}
                onChange={(option) => {
                    setUser(option.value);
                }}
            />
            <button type="button" onClick={() => { handleChangeUser() }}>
                CheckIn
            </button>
        </>
    ); 
};

export default CheckIn;
