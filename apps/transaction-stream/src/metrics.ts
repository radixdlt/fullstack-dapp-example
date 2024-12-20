import client from 'prom-client'

export const gatewayStatusGauge = new client.Gauge({
  name: `gateway_status`,
  help: `Is the gateway up or down`
})
