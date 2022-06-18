
import { FC, useEffect, useState } from 'react'
import { Cell } from '../Cell/Cell'
import './Grid.css'

const OPTIONS = {
    SIZE: 4,
    STARTING_CELLS: [2, 4, 4, 2, 2]
}

enum Directions {
    Up,
    Down,
    Left,
    Right
}
const createGrid = () => {
    let array = new Array()
    for (let i = 0; i < OPTIONS.SIZE; i++) {
        array.push(new Array(OPTIONS.SIZE).fill(0))
    }
    return array
}
const startingTiles = (grid: number[][], numbers: number[]): number[][] => {
    numbers.forEach((element: number) => {
        let x = Math.floor(Math.random() * grid.length);
        let y = Math.floor(Math.random() * grid.length);
        grid[x][y] = element

    })
    return grid
}

const getRotated90DegRightBitch = (arr: number[][]): number[][] => {
    /*
        starting array = [
            [1,2,3],
            [1,2,3],
            [1,2,3]
        ]

        end array = [
            [1,1,1],
            [2,2,2],
            [3,3,3]
        ]
    */
    let tempArr = []
    for (let i = 0; i < arr.length; i++) {
        let tempRow = []
        for (let j = 0; j < arr.length; j++) {
            tempRow.push(arr[j][i])
        }
        tempArr.push(tempRow)
    }
    return tempArr
}

export const Grid: FC = () => {
    const [grid, setGrid] = useState<number[][]>([[]])
    const [usedPositons, setUsedPositions] = useState<number[]>([])
    const [direction, setDirection] = useState<Directions>()
    const setup = () => {
        let newGrid = createGrid();
        // add them  starting tiles at random
        newGrid = startingTiles(newGrid, OPTIONS.STARTING_CELLS)
        setGrid(newGrid)
    }
    // temp move
    const move = () => {
        let newGrid = [...grid]
        // ***find non empty posisions
        // let takenPositions = []
        // for (let i = 0; i < newGrid.length; i++) {
        //     for (let j = 0; j < newGrid.length; j++) {
        //         if (newGrid[i][j] !== 0) takenPositions.push([i, j])
        //     }
        // }
        // push them all down
        //  loop 

        // *** for every column get not empty and then from the end push them to the end of column
        // newGrid.forEach((array: number[]) => {
        //     console.log(array)
        // })
        console.log(getRotated90DegRightBitch(newGrid))
    }

    const events = (e: KeyboardEvent) => {
        // disable searching
        e.preventDefault();
        // using IF since switch cant take || operator
        if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") setDirection(Directions.Up)
        if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") setDirection(Directions.Down)
        if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") setDirection(Directions.Left)
        if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") setDirection(Directions.Right)
    }


    useEffect(() => {
        move()
    }, [direction])
    useEffect(() => {
        setup()
        window.addEventListener('keydown', (e: KeyboardEvent) => events(e))
        return () => window.removeEventListener('keydown', events)
    }, [])

    return (
        <div className="grid-container">
            {grid?.map((element: number[], indexA: number) => {
                return element.map((element: number, indexB: number) => {
                    return <Cell key={`${indexA}${indexB}`} value={element} className={`${indexA}${indexB}`} />
                })
            })}
        </div>
    )
}