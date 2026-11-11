import {
  GET as getOrders,
  POST as createOrder,
  PUT as updateOrder,
  PATCH as acceptOrder,
} from '../../../api/pemesanan-bahan-baku/route';

export const GET = getOrders;
export const POST = createOrder;
export const PUT = updateOrder;
export const PATCH = acceptOrder;
