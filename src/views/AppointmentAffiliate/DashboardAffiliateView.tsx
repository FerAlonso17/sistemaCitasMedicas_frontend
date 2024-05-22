import { useAffiliateAuth } from "../../hooks/useAffiliateAuth"

export default function DashboardAffiliateView() {

    const { data: affiliate, isLoading: authLoading } = useAffiliateAuth()

    if (authLoading) return 'Loading...'

    if (affiliate) return (
        <div>DashboardAffiliateView</div>
    )
}
