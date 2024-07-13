import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
    duration: number; // duration in seconds
    onComplete: () => void;
    shape: 'fill-circular' | 'line' | 'percent-circular'; // shape prop to determine style
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onComplete, shape }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const nextProgress = prev + 1;
                if (nextProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 0);
                }
                return nextProgress;
            });
        }, (duration * 1000) / 100);

        return () => clearInterval(interval);
    }, [duration, onComplete]);

    if (shape === 'fill-circular') {
        return (
            <div className="relative w-8 h-8 mx-1">
                <div className="absolute inset-0 rounded-full border-2 border-green-500">
                    <div
                        className="absolute inset-0 bg-white rounded-full transition-all duration-100"
                        style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                    />
                </div>
            </div>
        );
    }

    if (shape === 'percent-circular') {
        return (
            <div className="flex items-center justify-center">
                <div className="relative w-8 h-8 rounded-full border-4 border-gray-300">
                    <div
                        className="absolute inset-0 rounded-full bg-white-500"
                        style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                        {progress}%
                    </span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative h-2 w-full bg-gray-300 rounded-full">
                <div
                    className="absolute h-full bg-green-500 rounded-full"
                    style={{ width: `${progress}%`, transition: 'width 0.1s ease' }}
                />
            </div>
        </>
    );
};

