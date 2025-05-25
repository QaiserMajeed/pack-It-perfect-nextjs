import { Metadata } from 'next'
import PaymentPlansPage from '../../components/PaymentsPlans'

export const metadata: Metadata = {
  title: 'Flexible Payment Plans | Pay in Installments',
  description: 'Discover our flexible payment plans that allow you to pay for your custom packaging in installments.',
}

export default function PaymentPlans() {
  return <PaymentPlansPage />
}
