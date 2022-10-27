import express, { Application } from "express";
import ip from "ip";
import cors from "cors";
import { HttpResponse } from "./domain/response";
import { Code } from "./enum/code.enum";
import { Status } from "./enum/status.enum";
import patientRoutes from "./routes/patients.routes";
import dotenv from "dotenv";

dotenv.config();

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = "application is running on:";
  private readonly ROUTE_NOT_FOUND = "Route does not exist on the server";
  constructor(
    private readonly port: string | number = process.env.SERVER_PORT || 3000
  ) {
    this.app = express();
    this.middleware();
    this.routes();
  }
  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
  }

  private middleware(): void {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }
  private routes() {
    this.app.use("/patients", patientRoutes);
    this.app.get("/", (req, res) =>
      res
        .status(200)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            "Welcome to the Patients API v1.0"
          )
        )
    );
    this.app.all("/*", (req, res) => {
      res.status(404).send({ message: this.ROUTE_NOT_FOUND });
    });
  }
}
