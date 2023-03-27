
// react functional component

import Papa from "papaparse"; // https://www.npmjs.com/package/papaparse
interface FileUploadProps {
    setRows: React.Dispatch<React.SetStateAction<{[K: string]: string}[]>>
    label: string
}


const FileUpload: React.FC<FileUploadProps> = ({setRows, label}) => {

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

    return (
        <div>
             <label htmlFor="">{label}</label>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
           
        </div>


    )

}

export default FileUpload;