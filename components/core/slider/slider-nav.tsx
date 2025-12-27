"use client";

import { Icon, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function PrevButton() {
  return (
    <IconButton
      aria-label="Previous slide"
      icon={<Icon as={ChevronLeftIcon} boxSize={6} />}
      className="swiper-button-prev"
      variant="ghost"
      color="white"
      size="lg"
    />
  );
}

export function NextButton() {
  return (
    <IconButton
      aria-label="Next slide"
      icon={<Icon as={ChevronRightIcon} boxSize={6} />}
      className="swiper-button-next"
      variant="ghost"
      color="white"
      size="lg"
    />
  );
}
