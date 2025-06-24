import { getNoteService } from "../service/notes.service.js";
let instance = null;

export const getNoteController = () => {
  if (!instance) {
    instance = new NoteController();
  }
  return instance;
};

export class NoteController {
  noteService;
  constructor() {
    this.noteService = getNoteService();
  }
  getNotes = async (req, res) => {
    try {
      const notes = await this.noteService.getNotes();
      return res.status(200).json({
        message: "Get all notes successfully",
        data: notes,
      });
    } catch (error) {
      console.error("Error getting notes:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  addNote = async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      const newNote = await this.noteService.addNote(content);
      return res.status(201).json({
        message: "Note added successfully",
        data: newNote,
      });
    } catch (error) {
      console.error("Error adding note:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  updateNote = async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      if (!id || !content) {
        return res.status(400).json({ error: "ID and content are required" });
      }
      console.log("Updating note with content:", content);
      console.log("Note ID:", id);
      const updatedNote = await this.noteService.updateNote({
        id: parseInt(id),
        content,
      });
      return res.status(200).json({
        message: "Note updated successfully",
        data: updatedNote,
      });
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }
      const deletedNote = await this.noteService.deleteNote(id);
      return res.status(200).json({
        message: "Note deleted successfully",
        data: deletedNote,
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
