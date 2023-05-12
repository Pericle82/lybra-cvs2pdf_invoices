import { useRef } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"


interface PDFrenderProps {
    rows: { [K: string]: string }[]
    show: boolean,
    showControl?: boolean
}

const PDFrender: React.FC<PDFrenderProps> = ({ rows, show, showControl = false }) => {

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
            {showControl &&
                <Row>
                    <Col className="text-start">
                        <Button className="me-4" variant="primary" onClick={toggleAll}>Toggle All</Button>
                        <Button className="me-4" onClick={checkAll}>Check All</Button>
                        <Button  onClick={uncheckAll}>Uncheck All</Button>
                    </Col>
                </Row>

            }


            {
                show && rows?.length > 0 && <h1>rows</h1> &&
                <Table style={{ marginTop: "20px" }} striped bordered hover>
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
                </Table>

            }

        </>)

}

export default PDFrender

