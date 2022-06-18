
import { FC } from 'react'
import './Cell.css'

interface ICellProps {
    value: number,
    className: string
}

export const Cell: FC<ICellProps> = ({ value, className }) => {
    return (
        <div className={`cell-container ${className}`}>
            {value}
        </div>
    )
}