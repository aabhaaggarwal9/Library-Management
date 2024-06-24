import { useEffect, useState } from "react"
import CheckoutModel from "../../../Models/CheckoutModel"
import { getLoansByUsername } from "../../../Service/CheckoutService";
import { ReturnLoan } from "./ReturnLoan";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Loans: React.FC<{manageLoan: boolean, setManageLoan: any}> = (props) => {

    const [loans, setLoans] = useState<CheckoutModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        getLoansByUsername().then((response: any) => {
            const loadedLoans: CheckoutModel[] = [];
            for (let key in response) {
                loadedLoans.push({
                    id: response[key].id,
                    username: response[key].username,
                    checkoutDate: response[key].checkoutDate,
                    returnDate: response[key].returnDate,
                    book: response[key].book
                })
            }
            setLoans(loadedLoans);
            setIsLoading(false);
            setHttpError(null);

        }).catch((error: any) => {
            setHttpError(error.message);
            setIsLoading(false);
        })
    }, [props.manageLoan]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className="container border m-3 p-3 ">
            {loans.length > 0 ? (
                loans.map((loan) => (
                    <ReturnLoan loan={loan} setManageLoan={props.setManageLoan}/>
                ))
            ) : (
                <p>No loans available</p>
            )}
        </div>
    );
};