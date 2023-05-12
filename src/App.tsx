import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import FileUpload from './compoments/file_upload/FileUpload';
import GenericPdfDownloader from './compoments/genericPdfDownloader/GenericPdfDownloader';
import Invoice from './compoments/invoice/Invoice';
import PDFrender from './compoments/pdf_render/PDFrender';

const App = () => {

  const [rows_soci, setRows_soci] = useState<{ [K: string]: string }[]>([])
  const [rows_ricevute, setRows_ricevute] = useState<{ [K: string]: string }[]>([])
  const [rows, setRows] = useState<{ [K: string]: string }[]>([])
  const pdfHtmlRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const rows = rows_ricevute.map(row => {
      const row_socio = rows_soci.find(row_socio =>
        row['nominativo']?.toLowerCase().includes(row_socio['nome']?.toLowerCase()) && row['nominativo']?.toLowerCase().includes(row_socio['cognome']?.toLowerCase()))
      if (!row_socio) return { ...row, codice_fiscale: 'non trovato' };
      else return {
        ...row,
        codice_fiscale: row_socio?.['codice_fiscale']
      }
    })

    const filtered_rows = rows.filter(row => row.codice_fiscale !== 'non trovato')
    if (filtered_rows && filtered_rows.length > 0) setRows(filtered_rows)

  }, [rows_soci, rows_ricevute])

  const filterHtmlRef = useMemo(() => {
    console.log('pdfHtmlRef.current.length: ', pdfHtmlRef.current.length)
    return pdfHtmlRef.current;
  }, [rows])


  return (

    <div className="App">
      <GenericPdfDownloader
        refs={filterHtmlRef}
        downloadFileName={"ricevuta"}
      />

      {rows?.length > 0 && rows?.map((row, index) => {
        return (
          <Invoice
            ref={ref => ref ? pdfHtmlRef.current[index] = ref : null}
            key={index}
            numerazione={row.numerazione}
            operazione={row.operazione}
            nominativo={row.nominativo}
            entrata={row.entrata}
            uscita={row.uscita}
            codice_fiscale={row.codice_fiscale}
          />
        )
      })
      }

      <FileUpload label='upload libro soci' setRows={setRows_soci} />
      <FileUpload label='upload ricevute' setRows={setRows_ricevute} />
      <PDFrender show={false} rows={rows_soci} />
      <PDFrender show={true} rows={rows_ricevute} />

    </div>
  );

}

export default App;
