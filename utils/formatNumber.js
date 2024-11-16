export default function formatNumber(num) {
  if (num && num >= 100) {
    return num.toString();
  }
  return num.toString().padStart(3, '0') || '';
}
