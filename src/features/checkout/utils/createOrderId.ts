export function createOrderId(): string {
  return `PK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}
