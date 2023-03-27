import { jsPDF } from "jspdf";
import { useEffect } from "react";

const GenericPdfDownloader: React.FC<{ downloadFileName: string, refs: HTMLElement[] }> = ({ downloadFileName, refs }) => {

    const downloadPdfDocument = () => {
      
        if(refs.length === 0) {
            console.log('no refs')
            return
        }

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts:true
           });
       
        const prom = refs.map( (ref, index) => {
           
           return pdf.html(ref, {
                x: 2645.8333333,
                y: 0,
                width: 210,
                windowWidth: 793.7007874,
                autoPaging: false,
                callback: (pdf) => {
                    if (index < refs.length - 1) {
                        pdf.addPage()
                    }
                }
        })

    })

    Promise.all(prom).then(() => {
        pdf.save(`${downloadFileName}.pdf`)

    })

    
    }

    return <button onClick={downloadPdfDocument}>Download Pdf</button>



}



export default GenericPdfDownloader;