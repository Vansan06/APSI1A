import { NextResponse } from "next/server";
export function ok(data: unknown, status = 200) { return NextResponse.json({ success: true, data }, { status }); }
export function fail(message: string, status = 400, details?: unknown) { return NextResponse.json({ success: false, error: message, details }, { status }); }
export function parseBody<T>(request: Request): Promise<T> { return request.json() as Promise<T>; }
export function asNumber(value: unknown, fallback = 0) { const n = Number(value); return Number.isFinite(n) ? n : fallback; }
