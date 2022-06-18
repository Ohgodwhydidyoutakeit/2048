
import { FC, useEffect, useState } from 'react'
import { Cell } from '../Cell/Cell'
import './Grid.css'

const OPTIONS = {
    SIZE: 4,
    STARTING_CELLS: [2, 4]
}
const createGrid = () => {
    let array = new Array()
    for (let i = 0; i < OPTIONS.SIZE; i++) {
        array.push(new Array(OPTIONS.SIZE).fill(0))
    }
    return array
}
export const Grid: FC = () => {
    const [grid, setGrid] = useState<number[][]>([[]])

    const setup = () => {
        setGrid(createGrid())
    }

    useEffect(() => {
        setup()

    }, [])

    return (
        <div className="grid-container">
            {grid?.map((element: number[], indexA: number) => {
                return element.map((element: number, indexB: number) => {
                    return <Cell />
                })
            })}
        </div>
    )
}