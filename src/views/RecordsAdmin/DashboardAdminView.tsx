import { useAuth } from '../../hooks/useAuth'

export default function DashboardAdminView() {

    const {data:admin,isLoading:loadingAdmin} = useAuth()
    if (loadingAdmin) return 'Loading...'

    if (admin) return (
        <div>DashboardAdminView</div>
    )
}
