import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectChecking from '../ProjectChecking/ProjectChecking';
import Header from './components/Header/Header';
import WorkPlace from './components/WorkPlace/WorkPlace';

function ChartProjectChecking() {
    return (
        <div>
            <Header />
            <WorkPlace />
        </div>
    )
}

export default ChartProjectChecking
