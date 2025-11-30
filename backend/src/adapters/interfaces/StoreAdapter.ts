export interface StoreInfo {
  name: string;
  currency: string;
}

export interface StoreAdapter {
  getStoreInfo(): Promise<StoreInfo>;
}