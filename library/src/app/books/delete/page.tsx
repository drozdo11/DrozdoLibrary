import { Suspense } from "react";
import DeleteBook from "./DeleteBook";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DeleteBook />
        </Suspense>
    );
};