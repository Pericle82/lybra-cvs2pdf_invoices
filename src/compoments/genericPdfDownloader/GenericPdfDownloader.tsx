import { jsPDF } from "jspdf";
import Signature from '../../assets/img/signature.png';

const GenericPdfDownloader: React.FC<{ downloadFileName: string, refs: HTMLElement[] }> = ({ downloadFileName, refs }) => {

    const downloadPdfDocument = () => {

        if (refs.length === 0) {
            console.log('no refs')
            return
        }

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const prom = refs.map((ref, index) => {

            return pdf.html(ref, {
                x: 2645.8333333,
                y: 30,
                width: 210,
                windowWidth: 793.7007874,
                autoPaging: false,
                callback: (pdf) => {
                    pdf.addImage(Signature, 'png', 130, 135, 50, 50)
                    pdf.addPage()
                }
            })
        })

        Promise.all(prom).then(() => {
            // delete final black page generate for some reason I don't understand
            pdf.deletePage(pdf.getCurrentPageInfo().pageNumber)
            pdf.save(`${downloadFileName}.pdf`)

        })


    }

    return <button onClick={downloadPdfDocument}>Download Pdf</button>



}



export default GenericPdfDownloader;