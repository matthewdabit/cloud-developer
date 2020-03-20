import bodyParser from "body-parser";
import express, { Request, Response, Router } from "express";

import { Car, cars as cars_list } from "./cars";

(async () => {
  const cars: Car[]  = cars_list;

  // Create an express applicaiton
  const app = express();
  // default port to listen
  const port = 8082;

  // use middleware so post bodies
  // are accessable as req.body.{{variable}}
  app.use(bodyParser.json());

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name",
    ( req: Request, res: Response ) => {
      const { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    const { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as
  // an application/json body to {{host}}/persons
  app.post( "/persons",
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // it should be filterable by make with a query parameter
  app.get("/cars/", (req: Request, res: Response) => {
     const { make } = req.query;
     let carsData: Car[] = cars;
     if (make) {
        carsData = cars.filter((c) => c.make === make);
     }

     return res.status(200).send(carsData);
  });

  // it should require id
  // it should fail gracefully if no matching car is found
  app.get("/cars/:id", (req: Request, res: Response) => {
   const { id } = req.params;
   if ( !id ) {
      return res.status(400)
                .send(`id is required`);
    }

   const carsWithId = cars.filter((c) => c.id == id);
   if (carsWithId.length === 0) {
       return res.status(404).send("Could not find car");
   }
   return res.status(200).send(carsWithId);
  });

  // it should require id, type, model and cost
  app.post("/cars", (req: Request, res: Response) => {
   const {id, type, model, cost, make} = req.body;
   if (!id || !type || !model || !cost) {
       return res.status(400).send("Missing required fields");
   }
   const newCar: Car = {id, type, model, cost, make};
   cars.push(newCar);
   return res.status(201).send(newCar);
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
