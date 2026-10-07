import { Suspense } from "react";
import UnborrowedBook from "./UnborrowedBook";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UnborrowedBook />
        </Suspense>
    );
};