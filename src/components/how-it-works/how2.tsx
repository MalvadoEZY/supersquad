import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function How2({ tl }: { tl: GSAPTimeline }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        postsPerDay: "",
        vibe: "",
        complexity: ""
    });

    useEffect(() => {
        // Initial container animation 
        tl.fromTo(containerRef.current, 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        // Pre-define text content for performance
        const postsPerDayText = "2";
        const vibeText = "formal";
        const complexityText = "detailed";
        
        // Throttle function for smooth performance
        let animationFrameId: number;
        let lastProgress = -1;
        
        const updateFormWithThrottle = (progress: number) => {
            if (Math.abs(progress - lastProgress) < 0.01) return; // Skip tiny updates
            lastProgress = progress;
            
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                const newFormData = { ...formData };
                
                // Posts per day fills at 0-33% scroll
                if (progress >= 0 && progress < 0.33) {
                    const fieldProgress = progress / 0.33;
                    const visibleChars = Math.floor(postsPerDayText.length * fieldProgress);
                    newFormData.postsPerDay = postsPerDayText.substring(0, visibleChars);
                } else if (progress >= 0.33) {
                    newFormData.postsPerDay = postsPerDayText;
                } else {
                    newFormData.postsPerDay = "";
                }
                
                // Vibe fills at 33-66% scroll
                if (progress >= 0.33 && progress < 0.66) {
                    const fieldProgress = (progress - 0.33) / 0.33;
                    const visibleChars = Math.floor(vibeText.length * fieldProgress);
                    newFormData.vibe = vibeText.substring(0, visibleChars);
                } else if (progress >= 0.66) {
                    newFormData.vibe = vibeText;
                } else if (progress < 0.33) {
                    newFormData.vibe = "";
                }
                
                // Complexity fills at 66-100% scroll
                if (progress >= 0.66 && progress <= 1) {
                    const fieldProgress = (progress - 0.66) / 0.34;
                    const visibleChars = Math.floor(complexityText.length * fieldProgress);
                    newFormData.complexity = complexityText.substring(0, visibleChars);
                } else if (progress < 0.66) {
                    newFormData.complexity = "";
                }
                
                setFormData(newFormData);
            });
        };
 
        // Scroll-triggered form completion
        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.2,
            onUpdate: (self) => {
                updateFormWithThrottle(self.progress);
            },
            markers: false,
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            scrollTrigger?.kill();
        }; 
    }, [tl]);

    return (
        <div ref={containerRef} className="bg-base-200/30 border border-primary rounded-xl p-6 hover:bg-base-200/40 transition-all duration-300">
            <div className="flex gap-6">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center border-2 border-white/20">
                        <User className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Form Section */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Generate Task</h3>
                        <p className="text-white/70">Configure your content generation settings</p>
                    </div>

                    <div className="space-y-4">
                        {/* Posts Per Day */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Posts per day
                            </label>
                            <input
                                type="text"
                                value={formData.postsPerDay}
                                disabled
                                className="w-full px-4 py-3 bg-base-100/50 border border-white/20 rounded-lg text-white placeholder-white/50 opacity-75 cursor-not-allowed"
                                placeholder="Enter posts per day..."
                            />
                        </div>

                        {/* Vibe */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Vibe
                            </label>
                            <input
                                type="text"
                                value={formData.vibe}
                                disabled
                                className="w-full px-4 py-3 bg-base-100/50 border border-white/20 rounded-lg text-white placeholder-white/50 opacity-75 cursor-not-allowed"
                                placeholder="Enter vibe..."
                            />
                        </div>

                        {/* Complexity */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Complexity
                            </label>
                            <input
                                type="text"
                                value={formData.complexity}
                                disabled
                                className="w-full px-4 py-3 bg-base-100/50 border border-white/20 rounded-lg text-white placeholder-white/50 opacity-75 cursor-not-allowed"
                                placeholder="Enter complexity..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}