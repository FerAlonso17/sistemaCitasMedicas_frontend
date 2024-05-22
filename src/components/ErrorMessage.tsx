
export default function ErrorMessage({children}:{children:React.ReactNode}) {
    return (
        <div className="pl-2 text-red-600 font-bold uppercase text-xs">
            {children}!
        </div>
    )
}
