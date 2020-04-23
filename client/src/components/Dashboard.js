import React from 'react';
import Container from 'react-bootstrap/Container';
import DashboardContent from './dashboard/DashboardContent';

function Dashboard(props) {
    return (
        <Container fluid style={{color: '#71db77', textAlign: 'center'}}>
            <DashboardContent error={props.error} />
        </Container>
    );
}

export default Dashboard;