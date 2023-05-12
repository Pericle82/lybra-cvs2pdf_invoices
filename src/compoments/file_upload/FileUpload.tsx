
// react functional component

import Papa from "papaparse"; // https://www.npmjs.com/package/papaparse
import { useRef } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
interface FileUploadProps {
    setRows: React.Dispatch<React.SetStateAction<{ [K: string]: string }[]>>
    label: string
}


const FileUpload: React.FC<FileUploadProps> = ({ setRows, label }) => {

    const handleFileChange = (e: any) => {
        Papa.parse<{ [K: string]: string }>(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                if (results?.data) {
                    results?.data.forEach(row => {
                        Object.keys(row).forEach(key => {
                            if (key !== key.toLocaleLowerCase()) {
                                row[key.toLocaleLowerCase()] = row[key]
                                delete row[key]
                            }
                        })

                    })
                    setRows(results.data)
                }
            },
        });

    }
    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" arrowProps={{ ...props }} {...props} hasDoneInitialMeasure={true}>
            {label.includes('soci') ? ' [cognome, nome, codice_fiscale]' : ' [data	,numerazione, operazione,	nominativo,entrata,	uscita]'}
           
        </Tooltip>
    );

    const TriggerExample = () => {


        return (
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={props => renderTooltip(props)}
            >
                <Button variant="success">Hover me to see information</Button>
            </OverlayTrigger>
        );
    }


    return (
        <div className="text-start mb-2">

            <Form.Label htmlFor={label}>{label.toUpperCase()}</Form.Label>
            <Form.Control name={label} type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
            <div className="mt-2">
                 {TriggerExample()}
            </div>
           
        </div>


    )

}

export default FileUpload;