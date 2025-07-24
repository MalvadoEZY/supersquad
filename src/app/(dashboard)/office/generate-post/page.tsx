"use client";
import {
    generatePostSchema,
    vibeOptions,
    type GeneratePostFormData
} from "@/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function GeneratePostPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const penRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<GeneratePostFormData>({
    resolver: zodResolver(generatePostSchema),
    mode: "onChange",
  });

  const watchedVibe = watch("vibe");
  const watchedPlatform = watch("platform");

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVibeSelection = async (vibe: "corporate" | "default" | "funny" | "zen") => {
    setValue("vibe", vibe);
    await trigger("vibe");
  };

  const handlePlatformSelection = async (platform: "linkedin" | "instagram" | "facebook") => {
    setValue("platform", platform);
    await trigger("platform");
  };

  const startPenAnimation = () => {
    if (!penRef.current || !paperRef.current) return;

    const pen = penRef.current;
    const paper = paperRef.current;

    // Reset animation
    gsap.set(pen, { x: 0, y: 0, rotation: 0 });
    gsap.set(paper, { opacity: 0 });

    // Fade in paper
    gsap.to(paper, { opacity: 1, duration: 0.5 });

    // Create multiple writing paths for looping
    const writingPaths = [
      // First line
      [
        { x: 50, y: 80 },
        { x: 120, y: 75 },
        { x: 200, y: 85 },
        { x: 280, y: 78 },
        { x: 350, y: 82 },
        { x: 420, y: 76 },
        { x: 490, y: 84 },
        { x: 560, y: 79 },
        { x: 630, y: 83 },
        { x: 700, y: 77 },
        { x: 770, y: 81 },
        { x: 840, y: 78 },
        { x: 910, y: 82 },
        { x: 980, y: 76 },
        { x: 1050, y: 80 }
      ],
      // Second line
      [
        { x: 50, y: 120 },
        { x: 130, y: 115 },
        { x: 210, y: 125 },
        { x: 290, y: 118 },
        { x: 370, y: 122 },
        { x: 450, y: 116 },
        { x: 530, y: 124 },
        { x: 610, y: 119 },
        { x: 690, y: 123 },
        { x: 770, y: 117 },
        { x: 850, y: 121 },
        { x: 930, y: 118 },
        { x: 1010, y: 122 },
        { x: 1090, y: 116 },
        { x: 1170, y: 120 }
      ],
      // Third line
      [
        { x: 50, y: 160 },
        { x: 140, y: 155 },
        { x: 220, y: 165 },
        { x: 300, y: 158 },
        { x: 380, y: 162 },
        { x: 460, y: 156 },
        { x: 540, y: 164 },
        { x: 620, y: 159 },
        { x: 700, y: 163 },
        { x: 780, y: 157 },
        { x: 860, y: 161 },
        { x: 940, y: 158 },
        { x: 1020, y: 162 },
        { x: 1100, y: 156 },
        { x: 1180, y: 160 }
      ]
    ];

    // Create the main timeline
    const timeline = gsap.timeline({
      repeat: -1, // Infinite loop
      repeatDelay: 0.5 // Pause between loops
    });

    // Add each writing path to the timeline
    writingPaths.forEach((path, pathIndex) => {
      // Add a pause before starting each line
      if (pathIndex > 0) {
        timeline.to(pen, { duration: 0.3 }, "-=0.1");
      }

      // Animate pen along each path
      path.forEach((point, index) => {
        timeline.to(pen, {
          x: point.x,
          y: point.y,
          rotation: Math.sin(index * 0.3) * 12, // More subtle rotation
          duration: 0.15, // Slower movement
          ease: "power1.out"
        });
      });

      // Add writing pauses within each line
      timeline.to(pen, { duration: 0.2 }, "-=0.1");
      timeline.to(pen, { duration: 0.2 }, "-=0.1");
    });

    // Add a final pause before the loop restarts
    timeline.to(pen, { duration: 0.5 }, "-=0.1");
  };

  const onSubmit = async (data: GeneratePostFormData) => {
    setShowLoading(true);
    setIsGenerating(true);
    setAnimationComplete(false);
    
    // Start pen animation after a short delay
    setTimeout(() => {
      startPenAnimation();
    }, 500);

    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json() as { error: string };
        throw new Error(errorData.error || 'Failed to generate post');
      }

      const result = await response.json() as { generatedPost: string };
      setGeneratedPost(result.generatedPost);
      setAnimationComplete(true);
    } catch (error) {
      console.error("Error generating post:", error);
      // Return to form on error
      setShowLoading(false);
      setIsGenerating(false);
      setAnimationComplete(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const platformOptions = [
    {
      value: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedin className="text-3xl" />,
    },
    {
      value: "instagram",
      label: "Instagram",
      icon: <FaInstagram className="text-3xl" />,
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: <FaFacebook className="text-3xl" />,
    },
  ];

  const canProceedToNext = () => {
    if (currentStep === 1) {
      return watchedPlatform && !errors.platform;
    }
    if (currentStep === 2) {
      // Check if both product name and description are filled
      const productName = watch("product.name");
      const productDescription = watch("product.description");
      return productName && productDescription && !errors.product?.name && !errors.product?.description;
    }
    return true;
  };

  const resetToForm = () => {
    setShowLoading(false);
    setIsGenerating(false);
    setAnimationComplete(false);
    setGeneratedPost("");
    setCurrentStep(1);
  };

  // Loading Screen
  if (showLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center" ref={loadingRef}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {animationComplete ? "Post Generated!" : "Generating Your Post..."}
            </h1>
            <p className="text-base-content/70 text-lg">
              {animationComplete ? "Your AI-powered post is ready!" : "Our AI is crafting the perfect post for you"}
            </p>
          </div>

                     {/* Pen Writing Animation - Only show when animation is not complete */}
           {!animationComplete && (
             <div className="relative w-full h-96 bg-base-200 rounded-lg border border-base-300 overflow-hidden mb-8">
               {/* Paper */}
               <div 
                 ref={paperRef}
                 className="absolute inset-4 bg-base-100 rounded border border-base-300"
                 style={{ opacity: 0 }}
               >
                 {/* Writing lines */}
                 <div className="p-6 space-y-4">
                   {[...Array(8)].map((_, i) => (
                     <div 
                       key={i}
                       className="h-0.5 bg-base-300 rounded"
                       style={{ width: `${Math.random() * 60 + 40}%` }}
                     />
                   ))}
                 </div>
               </div>

               {/* Pen */}
               <div 
                 ref={penRef}
                 className="absolute w-8 h-32 bg-primary rounded-full shadow-lg"
                 style={{ 
                   transformOrigin: "center bottom",
                   zIndex: 10
                 }}
               >
                 {/* Pen tip */}
                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-accent rounded-full" />
                 {/* Pen body */}
                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-24 bg-primary rounded-full" />
                 {/* Pen cap */}
                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent rounded-full" />
               </div>
             </div>
           )}

          {/* Action Buttons */}
          {animationComplete && (
            <div className="space-y-4">
              {generatedPost ? (
                <div className="card bg-base-200 shadow-xl border border-base-300">
                  <div className="card-body">
                    <h3 className="card-title text-xl mb-4 text-base-content">Generated Post</h3>
                    <div className="bg-base-100 p-4 rounded-lg border border-base-300">
                      <pre className="whitespace-pre-wrap text-sm text-base-content">{generatedPost}</pre>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button
                        className="btn btn-outline border-base-300 text-base-content hover:bg-base-300"
                        onClick={() => navigator.clipboard.writeText(generatedPost)}
                      >
                        Copy to Clipboard
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={resetToForm}
                      >
                        Generate Another
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-x-4">
                  <button
                    className="btn btn-outline border-base-300 text-base-content hover:bg-base-300"
                    onClick={resetToForm}
                  >
                    Back to Form
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto" ref={formRef}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Generate AI Post</h1>
          <p className="text-base-content/70 mt-2">
            Create engaging social media posts with AI assistance
          </p>
        </div>

        {/* Progress Steps */}
        <div className="steps steps-horizontal w-full mb-8">
          <div className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>
            Platform
          </div>
          <div className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>
            Product Details
          </div>
          <div className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>
            Vibe
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Platform Selection */}
          {currentStep === 1 && (
            <div className="card bg-base-200 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 text-base-content">Choose Target Platform</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {platformOptions.map((platform) => (
                    <div
                      key={platform.value}
                      className={`card cursor-pointer transition-all duration-200 border ${
                        watchedPlatform === platform.value
                          ? "bg-primary text-primary-content shadow-lg scale-105 border-primary"
                          : "bg-base-100 hover:bg-base-300 border-base-300"
                      }`}
                      onClick={() => handlePlatformSelection(platform.value as "linkedin" | "instagram" | "facebook")}
                    >
                      <div className="card-body text-center">
                        <div className="flex justify-center mb-2">{platform.icon}</div>
                        <h3 className="card-title justify-center text-base-content">{platform.label}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.platform && (
                  <p className="text-error text-sm mt-2">{errors.platform.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Product Details */}
          {currentStep === 2 && (
            <div className="card bg-base-200 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 text-base-content">Product Details</h2>
                
                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content">
                        Product Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
                      placeholder="Enter product name"
                      {...register("product.name")}
                    />
                    {errors.product?.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.product.name.message}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content">
                        Product Description *
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full p-2"
                      placeholder="Describe your product or service for the AI to generate a relevant post"
                      rows={5}
                      {...register("product.description")}
                    />
                    {errors.product?.description && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.product.description.message}</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Vibe Selection */}
          {currentStep === 3 && (
            <div className="card bg-base-200 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 text-base-content">Choose Your Vibe</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vibeOptions.map((vibe) => (
                    <div
                      key={vibe.value}
                      className={`card cursor-pointer transition-all duration-200 border ${
                        watchedVibe === vibe.value
                          ? "bg-primary text-primary-content shadow-lg scale-105 border-primary"
                          : "bg-base-100 hover:bg-base-300 border-base-300"
                      }`}
                      onClick={() => handleVibeSelection(vibe.value as "corporate" | "default" | "funny" | "zen")}
                    >
                      <div className="card-body text-center">
                        <div className="text-4xl mb-2">{vibe.icon}</div>
                        <h3 className="card-title justify-center text-base-content">{vibe.label}</h3>
                        <p className="text-sm opacity-80 text-base-content/70">{vibe.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.vibe && (
                  <p className="text-error text-sm mt-2">{errors.vibe.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className={`btn btn-outline border-base-300 text-base-content hover:bg-base-300 ${currentStep === 1 ? 'invisible' : ''}`}
              onClick={prevStep}
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                disabled={!canProceedToNext()}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Generating...
                  </>
                ) : (
                  "Generate Post"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}