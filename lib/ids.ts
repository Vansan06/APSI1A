import { randomUUID } from "node:crypto";
export const newId = (prefix: string) => `${prefix}-${randomUUID().slice(0, 12).toUpperCase()}`;
export const dayStart = (input?: string | Date) => { const d = input ? new Date(input) : new Date(); d.setHours(0,0,0,0); return d; };
