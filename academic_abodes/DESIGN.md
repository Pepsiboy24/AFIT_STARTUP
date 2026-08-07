---
name: Academic Abodes
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#0d0097'
  on-tertiary: '#ffffff'
  tertiary-container: '#2724b8'
  on-tertiary-container: '#a1a4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for a student-centric rental market, prioritizing a sense of security and effortless navigation. The brand personality balances the **trustworthiness** required for financial transactions with the **vibrant energy** of student life. 

The aesthetic follows a **Corporate / Modern** direction with a touch of **Minimalism**. It utilizes expansive white space to reduce cognitive load during complex property searches. High-quality imagery is framed by clean, structured interfaces that evoke a "professional yet accessible" atmosphere. The emotional response should be one of relief and confidence—moving away from the cluttered, high-stress nature of traditional real estate platforms toward an organized, student-first sanctuary.

## Colors

The color strategy uses depth and vibrance to signal both authority and modernity.

- **Primary (Deep Blue):** Used for global navigation, headers, and core brand moments to establish a foundation of trust and stability.
- **Secondary (Teal):** Applied to success states, verification badges, and secondary "apply" actions to provide a fresh, modern contrast.
- **Tertiary (Soft Indigo):** Reserved for interactive highlights, active states in filters, and student-specific features like "Roommate Matching."
- **Neutrals:** A range of cool grays provides structure. Backgrounds use a pure white (`#FFFFFF`) to maintain a "spacious" feel, while surfaces use a very light gray (`#F8FAFC`) to differentiate content cards from the backdrop.

## Typography

The design system utilizes **Inter** exclusively to ensure maximum legibility and a systematic, clean appearance. 

- **Hierarchy:** Strong contrast between bold headlines and regular body weights ensures property details are scannable. 
- **Scale:** Large display styles are reserved for marketing landings, while a tighter, more utilitarian scale is used for property listings and filter panels.
- **Mobile optimization:** Headlines scale down significantly on mobile to ensure property titles remain visible above the fold without excessive wrapping.

## Layout & Spacing

This design system employs a **fluid grid** with strict max-widths to maintain readability on ultra-wide monitors.

- **Grid:** A 12-column grid is used for desktop (breakpoint 1024px+), transitioning to a 4-column grid for mobile.
- **Rhythm:** An 8px base unit governs all dimensions. Generous vertical spacing (`stack-lg`) is used between major sections to prevent the interface from feeling cramped.
- **Safe Areas:** On property detail pages, large internal padding (minimum 32px) is used within cards to emphasize the "clean and easy" brand promise.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** supplemented by **Ambient Shadows**. 

1. **Level 0 (Background):** Pure white, the canvas for all content.
2. **Level 1 (Cards):** Subtle 1px border in a very light neutral, with a soft, diffused shadow (15% opacity, 12px blur) to lift property listings off the page.
3. **Level 2 (Modals/Dropdowns):** Higher contrast shadows with a slightly darker tint to indicate immediate priority and temporary interaction.

Avoid heavy black shadows; use the primary deep blue color at a very low opacity (5-8%) for shadows to maintain a "clean" and "professional" look.

## Shapes

The shape language is consistently **Rounded**, reflecting the approachable and friendly student-focused mission.

- **Standard Elements:** A 12px (`0.5rem`) radius is applied to standard buttons, input fields, and small UI components.
- **Containers:** Larger items like property cards and search bars utilize a 16px (`1rem`) radius to soften the layout.
- **Interactive States:** Hovering over cards should trigger a slight lift in elevation rather than a change in shape.

## Components

- **Buttons:** Primary buttons are solid Deep Blue with white text, using high contrast for clear calls-to-action (e.g., "Book Viewing"). Secondary buttons use an outline style or a Teal tint.
- **Property Cards:** Feature a top-aligned image with a 12px corner radius, followed by padded text sections. Use labels (chips) for "Verified" or "Near Campus" status.
- **Input Fields:** Large, 48px height inputs with 12px rounded corners. Use a subtle light-gray stroke that thickens and turns Indigo on focus.
- **Chips:** Used for amenities (e.g., "WiFi," "Laundry"). These have a pill-shape (32px radius) and use a light Tertiary tint with dark text.
- **Progress Steppers:** Vital for the rental application process. Use a simplified, linear path with clear labels to maintain the "efficient" brand feel.
- **Icons:** Thin-stroke, geometric icons to match the Inter typeface. Avoid filled icons unless indicating an active toggle state.