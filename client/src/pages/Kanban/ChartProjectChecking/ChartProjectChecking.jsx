import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectChecking from '../ProjectChecking/ProjectChecking';
import Header from './components/Header/Header';
import WorkPlace from './components/WorkPlace/WorkPlace';

function ChartProjectChecking() {
    return (
        <div>
            <Switch>
                <Route exact path="/projectchecking/Nhutngu">
                    <ProjectChecking />
                </Route>
            </Switch>
            <Header />
            <WorkPlace />
        </div>
    )
}

export default ChartProjectChecking
