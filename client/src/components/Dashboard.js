import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import DashboardContent from './dashboard/DashboardContent';

class Dashboard extends React.Component {
    render() {
        return (
            <Container fluid style={{color: '#71db77', textAlign: 'center'}}>
                <Switch>
                    <Route exact path="/dashboard">
                        <DashboardContent />
                    </Route>
                </Switch>
            </Container>
        );
    }
}

export default Dashboard;