import type { Application } from "../../2.application/Application";

import { application } from "./bootstrap";

export interface Context {
  app: Application;
}

export const context: Context = {
  app: application,
};
