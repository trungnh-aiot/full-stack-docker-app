import { getCounterService } from "../service/counter.service.js";
import { getRedisService } from "../service/redis.service.js";
let instance = null;

export const getCounterController = () => {
  if (!instance) {
    instance = new CounterController();
  }
  return instance;
};

export class CounterController {
  counterService;
  redisService;
  constructor() {
    this.counterService = getCounterService();
    this.redisService = getRedisService();
  }
  getCounter = async (req, res) => {
    try {
      let fromRedisCounter = await this.redisService.getValue("counter");
      fromRedisCounter = parseInt(fromRedisCounter);
      if (fromRedisCounter) {
        const updatedCounter = await this.counterService.updateCounter(
          ++fromRedisCounter,
        );
        await this.redisService.saveValue("counter", updatedCounter.count);
        return res.status(200).json({
          message: "Get counter from redis",
          data: { count: updatedCounter.count },
        });
      }
      let fromDbCounter = await this.counterService.getCounter(1);
      if (!fromDbCounter) {
        await this.counterService.createCounter(1);
        fromDbCounter = {
          count: 0,
        };
      } else {
        await this.counterService.updateCounter(fromDbCounter.count + 1);
      }
      await this.redisService.saveValue("counter", fromDbCounter.count + 1);
      return res.status(200).json({
        message: "Get counter from redis",
        data: { count: fromDbCounter.count + 1 },
      });
    } catch (error) {
      console.error("Error getting counter:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
