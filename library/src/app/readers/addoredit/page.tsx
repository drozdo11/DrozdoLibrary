import { Suspense } from "react";
import AddOrEditReader from "./AddOrEditReader";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddOrEditReader />
        </Suspense>
    );
};