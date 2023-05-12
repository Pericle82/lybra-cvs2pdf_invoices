import { useRef } from "react"


interface PDFrenderProps {
    rows: { [K: string]: string }[]
    show: boolean
}

const PDFrender: React.FC<PDFrenderProps> = ({ rows, show }) => {

    const rowRef = useRef<HTMLInputElement[]>([])

    const toggleAll = () => {
        rowRef.current.forEach(el => el.checked = !el.checked)
    }

    const checkAll = () => {
        rowRef.current.forEach(el => el.checked = true)
    }

    const uncheckAll = () => {
        rowRef.current.forEach(el => el.checked = false)
    }


    return (
        <>
            <button onClick={toggleAll}>Toggle All</button>
            <button onClick={checkAll}>Check All</button>
            <button onClick={uncheckAll}>Uncheck All</button>

            {show && rows?.length > 0 && <h1>rows</h1> &&
                <table >
                    <thead>
                        <tr>
                            <th></th>
                            {Object.keys(rows[0]).map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows?.map((row: { [K: string]: string }, index) => (
                                <tr key={index}>
                                    <td>
                                        {//selected
                                            <input
                                                type="checkbox"
                                                ref={
                                                    (el) => {
                                                        if (el) {
                                                            rowRef.current[index] = el
                                                        }
                                                    }
                                                }
                                                defaultChecked={true}
                                            />

                                        }
                                    </td>
                                    {Object.keys(row).map((key, index) => (
                                        <td key={index}>{row[key]}</td>
                                    ))}

                                </tr>
                            ))}


                    </tbody>
                </table>

            }

        </>

    )

}

export default PDFrender

