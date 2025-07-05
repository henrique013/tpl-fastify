export interface ICacheProvider {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttlSec: number): Promise<void>
  del(key: string): Promise<void>
}
