export function normalEndpoint(concat) {
  const localEndpoint = "http://127.0.0.1:8000/";
  const sharedLocalEndpoint = "http://192.168.200.49:8000/";
  const testEndpoint = "https://api.mes.ferredevs.com/";
  return `${localEndpoint}${concat}`;
}
