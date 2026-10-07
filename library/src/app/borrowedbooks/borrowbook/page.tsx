import { Suspense } from "react";
import BorrowBook from "./BorrowBook";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BorrowBook />
        </Suspense>
    );
};