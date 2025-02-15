// types/html2pdf.d.ts
declare module 'html2pdf.js' {
    interface Html2Pdf {
        from(element: HTMLElement): Html2Pdf;
        save(filename: string): void;
    }

    function html2pdf(): Html2Pdf;
    export default html2pdf;
}
