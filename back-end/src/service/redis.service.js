import { createClient } from "redis";

import { STATUS_CONNECT_REDIS } from "../constants/redis-status.constants.js";

let instance = null;

export const getRedisService = () => {
  if (!instance) {
    instance = new RedisService();
  }
  return instance;
};

class RedisService {
  instanceRedis;
  constructor() {
    this.instanceRedis = createClient({ url: process.env.REDIS_URL });
    this.handleEventConnection({
      connectionRedis: this.instanceRedis,
    });

    this.disconnect().catch((err) => {
      console.error("Redis initial disconnect error:", err);
    });
  }
  connect = async () => {
    if (!this.instanceRedis.isReady) {
      await this.instanceRedis.connect();
    }
  };
  disconnect = async () => {
    if (this.instanceRedis.isOpen) {
      try {
        await this.instanceRedis.quit();
        console.log("Redis connection closed gracefully.");
      } catch (err) {
        console.error("Error disconnecting Redis:", err);
      }
    }
  };
  handleEventConnection({ connectionRedis }) {
    connectionRedis.on(STATUS_CONNECT_REDIS.CONNECT, () => {
      console.log("Connection status: connected");
    });
    connectionRedis.on(STATUS_CONNECT_REDIS.END, () => {
      console.log("Connection status: disconnected");
    });
    connectionRedis.on(STATUS_CONNECT_REDIS.RECONNECT, () => {
      console.log("Connection status: reconnecting");
    });
    connectionRedis.on(STATUS_CONNECT_REDIS.ERROR, (err) => {
      console.log(`Connection status: error ${err}`);
    });
  }
  saveValue = async (key, value) => {
    await this.connect();
    await this.instanceRedis.set(key, value);
  };
  getValue = async (key) => {
    await this.connect();
    return await this.instanceRedis.get(key);
  };
  deleteKey = async (key) => {
    await this.connect();
    return await this.instanceRedis.del(key);
  };
  getAllKeys = async () => {
    await this.connect();
    const keys = [];
    let cursor = "0";
    do {
      const { cursor: nextCursor, keys: scannedKeys } =
        await this.instanceRedis.scan(cursor, {
          MATCH: "*",
          COUNT: 100,
        });
      cursor = nextCursor;
      keys.push(...scannedKeys);
    } while (cursor !== "0");
    return keys;
  };
}
