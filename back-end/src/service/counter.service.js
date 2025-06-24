import prisma from "../configs/db.config.js";
let instance = null;

export const getCounterService = () => {
  if (!instance) {
    instance = new CounterService();
  }
  return instance;
};

export class CounterService {
  updateCounter = async (value) => {
    console.log("Updating counter with value:", value);
    try {
      const counter = await prisma.counter.update({
        where: { id: 1 },
        data: {
          count: value,
        },
      });
      return counter;
    } catch (error) {
      console.error("Error updating counter:", error);
      throw error;
    }
  };
  createCounter = async (value) => {
    console.log("Updating counter with value:", value);
    try {
      const counter = await prisma.counter.create({
        data: {
          count: value,
        },
      });
      return counter;
    } catch (error) {
      console.error("Error updating counter:", error);
      throw error;
    }
  };
  getCounter = async (id) => {
    try {
      const counter = await prisma.counter.findUnique({
        where: { id: id },
      });
      return counter;
    } catch (error) {
      console.error("Error getting counter:", error);
      throw error;
    }
  };
}
