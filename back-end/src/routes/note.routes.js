import { Router } from "express";
import { ROUTES } from "../constants/routes.constants.js";
import { getNoteController } from "../controller/note.controller.js";

const noteRouter = Router();

const noteController = getNoteController();

noteRouter.post(ROUTES.NOTES.POST, noteController.addNote);
noteRouter.get(ROUTES.NOTES.GET, noteController.getNotes);
noteRouter.put(ROUTES.NOTES.PUT, noteController.updateNote);
noteRouter.delete(ROUTES.NOTES.DELETE, noteController.deleteNote);

export default noteRouter;
