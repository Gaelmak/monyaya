"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import clsx from "clsx";
import { Init } from "@/app/(onboarding)/steps/init";
import { CompleteRegistration } from "@/app/(onboarding)/steps/complete-registration";

interface Props {
  user: {
    email: string | null;
    name: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    password: string | null;
    municipality: string | null;
    district: string | null;
    avenue: string | null;
    number: string | null;
  };
  className?: string;
}

export const ScrollOnboard = ({ user, className }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastElement, setLastElement] = useState(0);

  useEffect(() => {
    const content = document.querySelector<HTMLElement>(
      ".content-scroll-animation"
    );
    const slider: HTMLElement[] = gsap.utils.toArray(
      content ? content.children : null
    );
    setLastElement(slider.length);

    gsap.set(content, { x: `-${currentIndex * 100}%` });
  }, [currentIndex, lastElement]);

  return (
    <div
      className={clsx(
        "container-scroll-animation relative overflow-hidden",
        className
      )}
    >
      <div className={clsx("content-scroll-animation flex h-full w-full")}>
        <div className="w-full h-full flex-shrink-0">
          <Init
            onComplete={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
          />
        </div>
        <div className="w-full h-full flex-shrink-0">
          <CompleteRegistration
            data={user}
            name={user?.name}
            onReturn={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
            onComplete={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
          />
        </div>
      </div>
    </div>
  );
};
