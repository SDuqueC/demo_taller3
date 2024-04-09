import {useContext, useState} from "react";
// @mui
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import {Container, Box, Tab, Tabs} from '@mui/material';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <Container maxWidth="xl">
            </Container>
        </>
    );
}


