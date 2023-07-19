import * as React from "react";

export default function ({ str }: { str: string }) {
    return <span dangerouslySetInnerHTML={{ __html: str }} />;
}
