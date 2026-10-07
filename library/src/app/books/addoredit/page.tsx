import { Suspense } from "react";
import AddOrEditBook from "./AddOrEditBook";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddOrEditBook />
        </Suspense>
    );
};