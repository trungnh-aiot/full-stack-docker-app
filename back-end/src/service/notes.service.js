import prisma from "../configs/db.config.js";
let instance = null;

export const getNoteService = () => {
  if (!instance) {
    instance = new NoteService();
  }
  return instance;
};

export class NoteService {
  updateNote = async (note) => {
    try {
      console.log("Updating note with content:", note);
      const updateNoter = await prisma.note.update({
        where: { id: note.id },
        data: {
          content: note.content,
        },
      });
      return updateNoter;
    } catch (error) {
      console.error("Error update note:", error);
      throw error;
    }
  };
  addNote = async (content) => {
    try {
      const newNote = await prisma.note.create({
        data: {
          content,
        },
      });
      return newNote;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };
  deleteNote = async (id) => {
    try {
      const deletedNote = await prisma.note.delete({
        where: { id },
      });
      return deletedNote;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };
  getNotes = async () => {
    try {
      const notes = await prisma.note.findMany();
      return notes;
    } catch (error) {
      console.error("Error getting notes:", error);
      throw error;
    }
  };
}
