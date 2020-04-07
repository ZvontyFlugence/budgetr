import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import DashboardContent from './dashboard/DashboardContent';
import Settings from './dashboard/Settings';

class Dashboard extends React.Component {
    render() {
        return (
            <Container fluid style={{color: '#71db77', textAlign: 'center'}}>
                <Switch>
                    <Route exact path="/dashboard">
                        <DashboardContent />
                    </Route>
                    <Route path="/dashboard/settings">
                        <Settings />
                    </Route>
                </Switch>
            </Container>
        );
    }
}

export default Dashboard;