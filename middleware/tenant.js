// middleware/tenant.js
export default function withTenant(handler) {
    return async (req, res) => {
      const { tenant } = req.headers
      if (!tenant) {
        return res.status(400).json({ error: 'Tenant not specified' })
      }
      req.tenant = tenant
      return handler(req, res)
    }
  }
  