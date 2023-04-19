import { Router } from "express";
import multer from "multer";
import relatorioController from "./controller/RelatorioController";

const routes: Router = Router();

routes.post(
  "/gerar-relatorio",
  multer().single("file"),
  relatorioController.importarPlanilha
);

export default routes;
