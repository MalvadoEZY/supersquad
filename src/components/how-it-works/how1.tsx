import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function How1({ tl }: { tl: GSAPTimeline }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [formData, setFormData] = useState({
        businessName: "",
        businessType: "",
        businessDescription: ""
    });
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        // Set card to final position instantly
        gsap.set(cardRef.current, { y: 0, opacity: 1 });
        
        // Pre-define text content for performance
        const businessNameText = "SuperSquad";
        const businessTypeText = "Software Company";
        const businessDescriptionText = "We are a software company that provides innovative software solutions for modern businesses.";
        
         
        // Throttle function for smooth performance
        let animationFrameId: number;
        let lastProgress = -1;
        
        const updateFormWithThrottle = (progress: number) => {
            if (Math.abs(progress - lastProgress) < 0.01) return; // Skip tiny updates
            lastProgress = progress;
            
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                const newFormData = { ...formData };
                
                // Business name fills at 10-30% scroll
                if (progress >= 0.1 && progress < 0.3) {
                    const fieldProgress = (progress - 0.1) / 0.2;
                    const visibleChars = Math.floor(businessNameText.length * fieldProgress);
                    newFormData.businessName = businessNameText.substring(0, visibleChars);
                } else if (progress >= 0.3) {
                    newFormData.businessName = businessNameText; // Keep filled once completed
                } else if (progress < 0.1) {
                    newFormData.businessName = "";
                }
                
                // Business type fills at 30-60% scroll
                if (progress >= 0.3 && progress < 0.6) {
                    const fieldProgress = (progress - 0.3) / 0.3;
                    const visibleChars = Math.floor(businessTypeText.length * fieldProgress);
                    newFormData.businessType = businessTypeText.substring(0, visibleChars);
                } else if (progress >= 0.6) {
                    newFormData.businessType = businessTypeText; // Keep filled once completed
                } else if (progress < 0.3) {
                    newFormData.businessType = "";
                }
                
                // Business description fills at 60-100% scroll
                if (progress >= 0.6 && progress <= 1) {
                    const fieldProgress = (progress - 0.6) / 0.4;
                    const visibleChars = Math.floor(businessDescriptionText.length * fieldProgress);
                    newFormData.businessDescription = businessDescriptionText.substring(0, visibleChars);
                    
                    // Activate button when description is complete
                    if (visibleChars >= businessDescriptionText.length && !isButtonActive) {
                        setIsButtonActive(true);
                    }
                } else if (progress < 0.6) {
                    newFormData.businessDescription = "";
                    // Deactivate button animation
                    if (isButtonActive) {
                        setIsButtonActive(false);
                        gsap.killTweensOf(buttonRef.current);  
                        gsap.set(buttonRef.current, { scale: 1 });
                    }
                }
                
                setFormData(newFormData);
            });
        };
 
        // Scroll-triggered form completion with performance optimisations
        const scrollTrigger = ScrollTrigger.create({
            trigger: cardRef.current,
            start: "top 80%", // Start when card is 80% from top of viewport
            end: "bottom 55%", // End when card is 20% from bottom of viewport
            scrub: 0.2, // Reduced for smoother performance
            onUpdate: (self) => {
                updateFormWithThrottle(self.progress);
            },
            markers: false, // Disable markers in production
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            scrollTrigger?.kill();
            if (buttonRef.current) {
                gsap.killTweensOf(buttonRef.current);
            }
        }; 
    }, [tl]);

    return (
        <div ref={cardRef} className="bg-base-200/30 border border-primary  rounded-xl p-6 hover:bg-base-200/40 transition-all duration-300">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center border-2 border-white/20">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">Create Business</h3>
                        <p className="text-white/70">Set up your business profile</p>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Business Name
                        </label>
                        <input
                            type="text"
                            value={formData.businessName}
                            disabled
                            className="w-full px-4 py-3 bg-base-100/50 border border-white/20 rounded-lg text-white placeholder-white/50 opacity-75 cursor-not-allowed"
                            placeholder="Enter business name..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Type of Business
                        </label>
                        <input
                            type="text"
                            value={formData.businessType}
                            disabled
                            className="w-full px-4 py-3 bg-base-100/50 border border-white/20 rounded-lg text-white placeholder-white/50 opacity-75 cursor-not-allowed"
                            placeholder="Enter business type..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Business Description
                        </label>
                        <textarea
                            value={formData.businessDescription}
                            disabled
                            rows={3}
                            className="w-full px-4 py-3 bg-base-100/50 border border-white/20 rounded-lg text-white placeholder-white/50 opacity-75 cursor-not-allowed resize-none"
                            placeholder="Describe your business..."
                        />
                    </div>
                </div>
 
                {isButtonActive && (
                    <div className="text-center mt-4">
                        <div className="inline-flex items-center gap-2 text-green-400">
                            <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                            <span className="text-sm font-medium">Business Created</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}