import config from './config'
import axios from 'axios'

const base = config.api_base_url

const API = {
  route_api: async (route, direction, serviceType) => await axios.get(`${base}/v1/transport/kmb/route/${route}/${direction === 'I' ? 'inbound' : 'outbound'}/${serviceType}`),

  routeStop_api: async (route, direction, serviceType) => await axios.get(`${base}/v1/transport/kmb/route-stop/${route}/${direction === 'I' ? 'inbound' : 'outbound'}/${serviceType}`),

  routeETA_api: async (route, serviceType) => await axios.get(`${base}/v1/transport/kmb/route-eta/${route}/${serviceType}`),

  stopList_api: async () => await axios.get(`${base}/v1/transport/kmb/stop`),

  stop_api: async (id) => await axios.get(`${base}/v1/transport/kmb/stop/${id}`),

  stop_eta: async (id) => await axios.get(`${base}/v1/transport/kmb/stop-eta/${id}`),

  all_route_api: async () => await axios.get('https://data.etabus.gov.hk/v1/transport/kmb/route/')

}

export default API
