import { jsPDF } from "jspdf";
import Signature from '../../assets/img/signature.png';
import { Button, Modal, ModalBody, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const GenericPdfDownloader: React.FC<{ downloadFileName: string, refs: () => HTMLElement[], rows: any }> = ({ downloadFileName, refs, rows }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        console.log('rows: ', rows)
    }, [rows])

    function downloadPdfDocument() {

        if (refs().length === 0) {
            console.log('no refs');
            return;
        }

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const prom = refs().map((ref, index) => {

            return pdf.html(ref, {
                x: 2645.8333333,
                y: 30,
                width: 210,
                windowWidth: 793.7007874,
                autoPaging: false,
                callback: (pdf) => {
                    pdf.addImage(Signature, 'png', 130, 135, 50, 50);
                    pdf.addPage();
                }
            });
        });

        Promise.all(prom).then(() => {
            // delete final black page generate for some reason I don't understand
            pdf.deletePage(pdf.getCurrentPageInfo().pageNumber);
            pdf.output('dataurlnewwindow');
            setShow(true)
            //pdf.save(`${downloadFileName}.pdf`)
        });


    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ricevute generate #{rows.length}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    Numerazione
                                </th>
                                <th>
                                    Nominativo
                                </th>
                                <th>
                                    CF
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows && rows.length > 0 && rows?.map((row: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{row.numerazione}</td>
                                        <td>{row.nominativo}</td>
                                        <td>{row.codice_fiscale}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button disabled={rows?.length === 0} onClick={downloadPdfDocument}>Download Pdf</Button>
        </>


    )

}



export default GenericPdfDownloader;