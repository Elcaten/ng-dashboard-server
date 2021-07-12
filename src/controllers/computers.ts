import {Computer} from "../models/computer";
import {buildController} from "./build-controller";

export const computersController = buildController(Computer)