import React from 'react';
import { jsPDF } from "jspdf";



// Create Document Component
export function Anwesenheitsliste() {
    const doc = new jsPDF();
    return(
        <div>
            <p>PDF</p>
            {doc.text("Hello world!", 10, 10)}
            {doc.save("a4.pdf")}
        </div>
    )
};
