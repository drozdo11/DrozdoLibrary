import { Suspense } from "react";
import DeleteReader from "./DeleteReader";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DeleteReader />
        </Suspense>
    );
};