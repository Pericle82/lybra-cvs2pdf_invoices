import { createContext } from "react";

type AppContextType = {
    rows_ricevute:{ [K: string]: string }[]
    rows_soci:{ [K: string]: string }[]
};

export const AppContext = createContext<AppContextType>({
    rows_ricevute: [],
    rows_soci: []
});