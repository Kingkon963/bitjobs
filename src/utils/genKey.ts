export default function genKey(): string {
  return `${Date.now()}-${Math.trunc(Math.random() * 10_000_00)}`;
}
