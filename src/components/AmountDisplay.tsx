import { formatCurrency } from "../helpers"
type AmountDisplayProps = {
    label?: string
    amount: number
}

export default function AmountDisplay({label, amount}: AmountDisplayProps) {
    return (
        // <p className="text-xl text-blue-900 font-bold">
        <p className={label ? "text-xl text-blue-900 font-bold" : "text-3xl text-blue-900 font-bold"}>
            {label && `${label}: `}
            <span className="font-black text-gray-700">{formatCurrency(amount)}</span>
        </p>
    )
}
