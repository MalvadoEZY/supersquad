import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

export default function How2({ tl }: { tl: GSAPTimeline }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        postsPerDay: "",
        vibe: "",
        complexity: ""
    });

    // Timeline scroll refs and state
    const timelineRef = useRef<HTMLDivElement>(null);

    // Generate blue balls ONCE and store in state (3 schedules per day)
    const [ballsArr] = useState(() =>
        Array.from({ length: 24 }, (_, hourIdx) => ({
            id: `ball-${hourIdx}`,
            hour: hourIdx,
            shouldShow: Math.random() < 0.6, // 60% of hours get a ball (more frequent for 3 schedules)
        }))
    );

    // Animate balls on mount
    useEffect(() => {
        ballsArr.forEach((ball) => {
            const selector = `[data-ball-id='${ball.id}']`;
            const animate = () => {
                gsap.to(selector, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: 1,
                    delay: 2 + Math.random() * 8,
                });
            };
            animate();
        });
    }, [ballsArr]);

    // Infinite scroll effect for timeline
    useEffect(() => {
        if (!timelineRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(timelineRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear",
            });
        }, timelineRef);
        return () => ctx.revert();
    }, []);

    // Helper: build timeline hours (doubled for infinite effect)
    const hours = Array.from({ length: 24 }, (_, i) =>
        `${i.toString().padStart(2, "0")}:00`
    );
    const timelineHours = [...hours, ...hours];

    useEffect(() => {
        // Initial container animation 
        tl.fromTo(containerRef.current, 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        // Pre-define text content for performance
        const postsPerDayText = "3";
        const vibeText = "formal";
        const complexityText = "detailed";
        
        // Throttle function for smooth performance
        let animationFrameId: number;
        let lastProgress = -1;
        
        const updateFormWithThrottle = (progress: number) => {
            if (Math.abs(progress - lastProgress) < 0.01) return;
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
    }, [tl, formData]);

    return (
        <div ref={containerRef} className="bg-base-200/30 border border-primary rounded-xl shadow-2xl shadow-primary/25 p-6 hover:bg-base-200/40 transition-all duration-300">
            
            {/* Timeline Section */}
            <div>
                <h4 className="text-2xl text-center mb-2">Posting Schedule </h4>
                <div className="relative overflow-hidden w-full" style={{ height: 70 }}>
                    <div
                        ref={timelineRef}
                        className="flex items-end gap-8"
                        style={{
                            width: `${timelineHours.length * 80}px`,
                        }}
                    >
                        {timelineHours.map((hour, idx) => {
                            const realIdx = idx % 24;
                            const ball = ballsArr.find((b) => b.hour === realIdx);
                            return (
                                <div key={idx} className="flex flex-col items-center" style={{ width: 80 }}>
                                    {/* Animated blue ball */}
                                    <div style={{ height: 30, position: "relative" }}>
                                        {ball && ball.shouldShow && idx < 24 && (
                                            <span
                                                data-ball-id={ball.id}
                                                style={{
                                                    position: "absolute",
                                                    left: "50%",
                                                    top: 10,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: "50%",
                                                    background: "#2563eb",
                                                    boxShadow: "0 0 2px #2563eb88",
                                                    opacity: 1,
                                                    animation: "pulse 2s infinite",
                                                    transform: "translate(-50%, 0)",
                                                }}
                                            />
                                        )}
                                    </div> 
                                    {/* Hour marker */}
                                    <span className={`text-xs ${ball && ball.shouldShow ? 'text-primary font-bold' : 'text-primary-content'}`}>{hour}</span>
                                    <span className={`h-4 w-px bg-gray-600 rounded-full ${ball && ball.shouldShow ? 'bg-primary font-bold' : 'bg-primary-content'}`}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}