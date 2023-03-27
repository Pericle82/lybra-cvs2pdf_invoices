import React from "react";
import styles from './invoice.module.scss'

interface InvoiceProps {
    numerazione: string;
    operazione: string;
    nominativo: string;
    entrata: string;
    uscita: string;
    codice_fiscale: string;
}


const capitalizeFirstLetter = (string: string) => {
   return  string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  
}



const Invoice = React.forwardRef<HTMLDivElement, InvoiceProps>(({ numerazione, operazione, nominativo, entrata, codice_fiscale }, ref) => {

    return (
        <div ref={ref} className={styles.visually_hidden}>
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p>Ricevuta n. {numerazione}</p>
            </div>
            <div className={styles.main}>
            <div className={styles.main}>
                <p>
                Associazione ASD Lybra Fitness Via G. Trissino N. 10C  CAP 00137 Città Roma (RM), C.F. 96433190582 

                </p>
            </div>
            <div>
            Riceviamo dal socio/a { capitalizeFirstLetter(nominativo)}, CF {codice_fiscale} la somma di {entrata} a titolo di {operazione}.
            </div>

            <div>
                <p>
                Il pagamento è stato effettuato tramite bonifico bancario.
                </p>
            </div>

            </div>

            <div className={styles.footer}>
                <div className={styles.footer_left} >
                    <p>Roma, li {}</p>
                </div>
                <div className={styles.footer_right}>
                    <p>Il Tesoriere</p>

                </div>
            </div>
      
        

        </div>
        </div>
       
    )

}

)

export default Invoice