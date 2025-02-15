"use client"
import React from 'react'
import Link from 'next/link'
import html2pdf from 'html2pdf.js'
import { Button } from '@/components/ui/button'
import { Download } from "lucide-react";
import { useState } from "react";


const HtmlToPdfResume = () => {
    const downloadPDF = () => {
        const element = document.getElementById('resume-content');
        if (element) {
            html2pdf().from(element).save('resume.pdf');
        }
    };

    return (
        <div id="resume-content">

        </div>
    )
}
