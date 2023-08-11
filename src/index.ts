import dotenv from "dotenv";
dotenv.config({});

import express from 'express';
import mongoose from 'mongoose';
import countryRoutes from '../src/domain/country/routes/CountryRoutes';
import petRequirementRoutes from '../src/domain/pets/routes/PetRequirementRoutes';

const app = express();
const cors = require('cors');
const PORT = 3000;

// Database connection
mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(countryRoutes);
app.use(petRequirementRoutes);

app.get('/list-all-routes', (req, res) => {
    const routes: any[] = [];

    app._router.stack.forEach((middleware: { route: any; name: string; handle: { stack: any[]; }; }) => {
        if (middleware.route) { // routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === 'router') { // router middleware 
            middleware.handle.stack.forEach((handler: { route: any; }) => {
                if (handler.route) {
                    routes.push(handler.route);
                }
            });
        }
    });

    res.json(routes.map(route => {
        return {
            path: route.path,
            methods: Object.keys(route.methods).join(', ').toUpperCase()
        };
    }));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
