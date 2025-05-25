// src/components/StickyCTAProvider.jsx
'use client';
import React from "react";
import { useLocation } from "react-router-dom";
import StickyCTA from "./StickyCTA";

/**
 * Component to add the StickyCTA to the app with page-specific configurations
 * This should be added near the end of your App.jsx component
 */
const StickyCTAProvider = () => {
  const pathname = usePathname();


  // Skip showing the CTA on certain pages
  const excludedPaths = ["/get-a-quote", "/contact", "/checkout", "/thank-you"];

  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  // Customize CTA based on the current path
  if (pathname.includes("/category/")) {
    // Product category pages
    return (
      <StickyCTA
        title="Find the perfect packaging for your products"
        description="Custom sizes, materials, and printing. Get exactly what you need."
        primaryButtonText="Request a Quote"
        secondaryButtonText="View Materials"
        secondaryButtonLink="/category/packaging-by-style"
        scrollThreshold={400}
      />
    );
  }

  if (pathname.includes("/product/")) {
    // Product detail pages
    return (
      <StickyCTA
        title="Ready to order this product?"
        description="Get custom dimensions, materials and quantities to match your needs."
        primaryButtonText="Get Your Quote"
        secondaryButtonText="Have Questions?"
        secondaryButtonLink="/contact"
        scrollThreshold={600}
      />
    );
  }

  if (pathname.includes("/blog/")) {
    // Blog pages
    return (
      <StickyCTA
        title="Need custom packaging for your business?"
        description="Apply the tips from this article with our custom solutions."
        primaryButtonText="Get Started"
        secondaryButtonText="Browse Products"
        secondaryButtonLink="/category/packaging-by-style"
        scrollThreshold={800}
      />
    );
  }

  // Default CTA for all other pages
  return <StickyCTA scrollThreshold={300} />;
};

export default StickyCTAProvider;

