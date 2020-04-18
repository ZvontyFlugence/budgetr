import React from 'react';
import Container from 'react-bootstrap/Container';
import DashboardContent from './dashboard/DashboardContent';

class Dashboard extends React.Component {
    render() {
        return (
            <Container fluid style={{color: '#71db77', textAlign: 'center'}}>
                <DashboardContent />
            </Container>
        );
    }
}

export default Dashboard;