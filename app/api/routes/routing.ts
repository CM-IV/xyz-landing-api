/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

Route.group(() => {
  //Health check
  //Make sure to configure .env values
  Route.get("health", async ({ response }) => {
    const report = await HealthCheck.getReport();

    return report.healthy ? response.ok(report) : response.badRequest(report);
  });
  //Test
  Route.get("test", async ({ response }) => {
    response.json({
      message: "ok",
    });

    return response.status(200);
  });

  Route.get("/links/all", "LinksController.getAll");
  Route.get("/todos/all", "TodosController.getAll");

  Route.resource("/todos", "TodosController").apiOnly();
  Route.resource("/links", "LinksController").apiOnly();
  
}).prefix("/api");