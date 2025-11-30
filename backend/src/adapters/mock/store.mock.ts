import { StoreAdapter, StoreInfo } from "../interfaces/StoreAdapter.ts";

const mockStoreAdapter: StoreAdapter = {
  getStoreInfo: async (): Promise<StoreInfo> => ({
    name: "Default",
    currency: "KES"
  })
};

export default mockStoreAdapter;