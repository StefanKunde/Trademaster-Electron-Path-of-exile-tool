import { Injectable } from '@angular/core';
import * as NodeCache from 'node-cache';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  static instance: CacheService;

  private readonly cache: NodeCache;
  constructor() {
    this.cache = new NodeCache({
      stdTTL: 300,
      checkperiod: 30
    });
    CacheService.instance = this;
  }

  public set<T>(topic: string, key: string, value: T, ttl?: number): boolean {
    const k = this.getCompoundKey(topic, key);
    return this.cache.set(k, value, ttl ? ttl : 0);
  }

  public has(topic: string, key: string): boolean {
    const k = this.getCompoundKey(topic, key);
    return this.cache.get(k) != undefined;
  }

  public get<T>(topic: string, key: string): T {
    const k = this.getCompoundKey(topic, key);
    return this.cache.get(k);
  }

  public remove(topic: string, key: string): boolean {
    const k = this.getCompoundKey(topic, key);
    return this.cache.del(k) > 0;
  }

  private getCompoundKey(topic: string, key: string): string {
    return `${ topic }/${ key }`;
  }
}
