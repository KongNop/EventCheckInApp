import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <Container
                sx={{
                    width: "100%",
                    //   height: "60px",
                    bgcolor: "#777777",
                    padding: 2,
                    paddingX: 8,
                    // position: "fixed",
                    // bottom: 0,
                }}
            >
                <Typography
                    sx={{ color: "white" }}
                    gutterBottom
                    paragraph
                    align="center"
                >
                    Creadera Festive Hackathon
                </Typography>
                <Typography
                    sx={{ color: "white", fontSize: 11 }}
                    paragraph
                    align="center"
                >
                    Kong Nopwattanapong
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer