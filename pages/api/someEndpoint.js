// pages/api/someEndpoint.js
import withTenant from '../../middleware/tenant'

async function handler(req, res) {
  const { tenant } = req
  // Lógica para tratar a requisição no contexto do inquilino
}

export default withTenant(handler)
