import React, { useState } from 'react';
import Button from './Button';

/**
 * OnboardingScreen Component
 *
 * A multi-slide onboarding carousel that introduces the pregnancy companion app.
 * Features smooth transitions, pagination dots, and warm, welcoming messaging.
 *
 * Props:
 * - onComplete: () => void - Callback when user completes onboarding
 */

interface OnboardingSlide {
  image: string;
  title: string;
  description: string;
}

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Onboarding slides content
  const slides: OnboardingSlide[] = [
    {
      image: '/splash1.png',
      title: 'Your Health, Our Priority',
      description:
        'Welcome to your personalized pregnancy journey companion. Receive tailored insights, guidance, and support every step of the way, designed just for you and your baby\'s unique needs.',
    },
    {
      image: '/splash4.png',
      title: 'What to expect, each Trimester',
      description:
        'Monitor your baby\'s growth, track symptoms, and celebrate milestones together. Stay informed with weekly updates tailored to your stage of pregnancy.',
    },
    {
      image: '/check-health2.png',
      title: 'Expert Support',
      description:
        'Access reliable information, wellness tips, and personalized recommendations from healthcare experts. We\'re here to support you every step of the way.',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className=" kooy min-h-screen bg-cream flex flex-col">
      {/* Skip button */}
      <div className="w-full px-6 py-4 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-lavender hover:text-periwinkle transition-colors duration-200 text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Character illustration */}
       <div className="mb-8 transition-opacity duration-500 ease-in-out">
  <img
    src={slides[currentSlide].image}
    alt="Pregnancy companion illustration"
    className="w-64 h-64 md:w-80 md:h-80 object-contain scale-110"
  />
</div>


        {/* Title */}
        <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold text-cocoa text-center mb-6 leading-tight max-w-2xl">
          {slides[currentSlide].title}
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-lavender text-center max-w-xl leading-relaxed mb-12 px-4">
          {slides[currentSlide].description}
        </p>

        {/* CTA Button */}
        <div className="w-full max-w-md px-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            className="mb-8"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
          </Button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${
                  index === currentSlide
                    ? 'w-8 bg-rose'
                    : 'w-2 bg-lilac hover:bg-lavender'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
