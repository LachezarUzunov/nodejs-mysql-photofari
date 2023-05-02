import React from "react";
import classes from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <section className={classes.main}>
            <section>
                <h2>Последни 5 регистрирани потребители</h2>
            </section>
            <section>
                <h2>Последни 5 добавени снимки</h2>
            </section>
            
        </section>
    )
}

export default Dashboard;