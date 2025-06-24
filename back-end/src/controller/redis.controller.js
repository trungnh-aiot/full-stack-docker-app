import { getRedisService } from "../service/redis.service.js";
let instance = null;

export const getRedisController = () => {
  if (!instance) {
    instance = new RedisController();
  }
  return instance;
};

export class RedisController {
  redisService;
  constructor() {
    this.redisService = getRedisService();
  }
  getAllKeys = async (req, res) => {
    try {
      const redisKeys = await this.redisService.getAllKeys();
      console.log("Redis keys:", redisKeys);
      return res.status(200).json({
        message: "Get all redis keys successfully",
        data: redisKeys,
      });
    } catch (error) {
      console.error("Error getting redis keys:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  getRedisValue = async (req, res) => {
    try {
      const { key } = req.params;
      if (!key) {
        return res.status(400).json({ error: "Key is required" });
      }
      const value = await this.redisService.getValue(key);
      if (value === null) {
        return res.status(404).json({ error: "Key not found" });
      }
      return res.status(200).json({
        message: "Get redis value successfully",
        data: { key, value },
      });
    } catch (error) {
      console.error("Error getting redis value:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  addRedisKeyValue = async (req, res) => {
    try {
      const { key, value } = req.body;
      if (!key || !value) {
        return res.status(400).json({ error: "Key and value are required" });
      }
      await this.redisService.saveValue(key, value);
      return res.status(201).json({
        message: "Key-value pair added successfully",
        data: { key, value },
      });
    } catch (error) {
      console.error("Error adding redis:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteKey = async (req, res) => {
    try {
      const { key } = req.params;
      if (!key) {
        return res.status(400).json({ error: "Key is required" });
      }
      const deletedKey = await this.redisService.deleteKey(key);
      return res.status(200).json({
        message: "Redis key deleted successfully",
        data: deletedKey,
      });
    } catch (error) {
      console.error("Error deleting redis:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
