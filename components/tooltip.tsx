// components/CustomTooltip.tsx

import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface CustomTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, content }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default CustomTooltip;
