// pages/index.js
import Auth from '../components/Auth'
import Groups from '../components/Groups'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function Home() {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('common')

  const handleCheckout = async () => {
    setLoading(true)
    const stripe = await stripePromise
    const response = await fetch('/api/checkout_sessions', { method: 'POST' })
    const session = await response.json()
    await stripe.redirectToCheckout({ sessionId: session.id })
    setLoading(false)
  }

  return (
    <div>
      <h1>Bem-vindo ao CX</h1>
      <Auth />
      <Groups />
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Loading...' : 'Checkout'}
      </button>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}