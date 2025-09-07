import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post({ path: '/subscription/reminder', handlers: (req, res) => sendReminders })

export default workflowRouter;