# Personalisation Page - Animation Specification

This document describes the animation behavior for the Personalisation/Onboarding progress screen for mobile implementation.

## Overview

The progress animation consists of three main phases:
1. **Start Phase** (150ms): Height expansion and symbol fade-out
2. **Middle Phase** (1500ms): Progress bar width animation
3. **End Phase** (150ms): Height contraction and symbol fade-in

Total animation duration: **1800ms**

---

## Components

### 1. Progress Card
- **Height Animation**:
  - Default state: `40px`
  - During animation (Start + Middle phases): `56px`
  - Transition: `150ms ease-in-out`

### 2. Header Text & Spinner
- **States**:
  - Default: "Calibration moving ahead!" (no spinner)
  - During `middle` phase: "Setting up smarter progression…" (with spinner)
- **Transition**: `150ms ease-in-out` opacity fade
- **Note**: Spinner should only appear during the middle phase

### 3. Progress Bar Fill
- **Width Animation**:
  - Animates from current percentage to new percentage
  - Duration: `1500ms ease-in-out`
  - Formula: `(currentLevel / 5) * 100%`
  - Examples:
    - Level 1: 20%
    - Level 2: 40%
    - Level 3: 60%
    - Level 4: 80%
    - Level 5: 100%

### 4. Progress Symbols (5 items)
Each symbol position shows different states based on completion:
- **Incomplete**: Gray dot (4px circle, opacity 0.16)
- **Complete**: White checkmark "✓"
- **Final position (locked)**: Lock icon with reduced opacity

---

## Animation Sequences

### Standard Animation (Levels 0-3)

#### Timeline:
```
0ms ────────────── 150ms ─────────────────────── 1650ms ──────── 1800ms
     [START PHASE]        [MIDDLE PHASE]                [END PHASE]
```

#### Start Phase (0-150ms):
1. Progress card height: `40px` → `56px` (`150ms ease-in-out`)
2. **Next symbol** (at currentLevel position) fades out:
   - Animation: `fade-out` keyframes
   - Duration: `150ms ease-in-out`
   - Effect: `opacity: 1 → 0` with `scale: 1 → 1.5`

#### Middle Phase (150ms-1650ms):
1. Progress card height: stays at `56px`
2. Progress bar width animates to new level (`1500ms ease-in-out`)
3. Header text changes to "Setting up smarter progression…"
4. Spinner appears and rotates
5. **Updated symbol** (at currentLevel - 1 position) plays pop animation:
   - Animation: `checkmark-pop` keyframes
   - Duration: `1150ms ease-in`
   - Keyframes:
     - `0%`: `opacity: 0, scale: 1.5`
     - `50%`: `opacity: 0, scale: 1.5, rotate: -5deg`
     - `70%`: `opacity: 1, scale: 2, rotate: 5deg`
     - `80%`: `opacity: 1, scale: 2, rotate: 8deg`
     - `100%`: `opacity: 1, scale: 1, rotate: 0deg`

#### End Phase (1650ms-1800ms):
1. Progress card height: `56px` → `40px` (`150ms ease-in-out`)
2. Header text changes back to "Calibration moving ahead!"
3. Spinner disappears

---

### Special Case: Final Level (Level 4 → 5)

When completing the final workout (level 4), the lock icon needs special handling.

#### Timeline:
```
0ms ────────────── 150ms ─────────────────────── 1650ms ──────── 1800ms
     [START PHASE]        [MIDDLE PHASE]                [END PHASE]
       (delayed)
```

#### Differences from Standard:
1. **Lock icon fade-out**:
   - Animation: `fade-out` keyframes
   - Duration: `150ms ease-in-out`
   - **Delay**: `1500ms` (waits for bar to reach it)
   - Total time: starts at 1500ms, ends at 1650ms
   - Effect: `opacity: 1 → 0` with `scale: 1 → 1.5`

2. **Checkmark pop** (position 3):
   - Same as standard animation
   - Plays during middle phase

---

## Animation State Machine

```typescript
type AnimationState = {
  start: boolean;   // Height grows, next symbol fades out
  middle: boolean;  // Bar animates, checkmark pops in
  end: boolean;     // Height shrinks, UI resets
};
```

### State Transitions:

#### Standard (Levels 0-3):
```javascript
// Initial
{ start: false, middle: false, end: false }

// 0ms: Start phase begins
{ start: true, middle: false, end: false }

// 150ms: Middle phase begins
{ start: false, middle: true, end: false }

// 1650ms: End phase begins
{ start: false, middle: false, end: true }

// 1800ms: Reset
{ start: false, middle: false, end: false }
```

#### Level 4 (Special):
```javascript
// Initial
{ start: false, middle: false, end: false }

// 0ms: Start phase begins (lock starts delayed fade)
{ start: true, middle: false, end: false }

// 150ms: Middle phase begins
{ start: false, middle: true, end: false }

// 1650ms: End phase begins
{ start: false, middle: false, end: true }

// 1800ms: Reset
{ start: false, middle: false, end: false }
```

---

## CSS Animations

### Fade-Out (Standard)
```css
@keyframes fade-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

.animate-fade-out {
  animation: fade-out 150ms ease-in-out forwards;
}
```

### Fade-Out (Delayed for Lock Icon)
```css
.animate-fade-out-delayed {
  animation: fade-out 150ms ease-in-out forwards;
  animation-delay: 1500ms;
}
```

### Checkmark Pop
```css
@keyframes checkmark-pop {
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  50% {
    opacity: 0;
    transform: scale(1.5) rotate(-5deg);
  }
  70% {
    opacity: 1;
    transform: scale(2) rotate(5deg);
  }
  80% {
    opacity: 1;
    transform: scale(2) rotate(8deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.animate-checkmark-pop {
  animation: checkmark-pop 1150ms ease-in;
}
```

---

## Symbol Logic by Position

### Position Rules:
For each symbol at index `level` (0-4):

#### During START phase:
```javascript
if (level === currentLevel) {
  // This is the NEXT position (will become a checkmark)
  applyAnimation: "fade-out" (150ms)
}

// Special case for final level
if (level === 4 && currentLevel === 4) {
  applyAnimation: "fade-out-delayed" (1500ms delay + 150ms duration)
}
```

#### During MIDDLE phase:
```javascript
if (level === currentLevel - 1) {
  // This is the NEWLY COMPLETED position
  applyAnimation: "checkmark-pop" (1150ms)
}
```

#### Display Logic:
```javascript
if (level < currentLevel) {
  display: "✓" (checkmark)
} else if (level === 4) {
  display: LockIcon
} else {
  display: GrayDot (4px circle)
}
```

---

## Color Palette

### Gradients:
- **Progress bar**: `linear-gradient(to right, #a655f6, #681bb5)`
- **Background track**: `linear-gradient(to right, #f3f4f7 34%, #e3cafc 66%)`
- **Badge (avatar +)**: `linear-gradient(to right, #c490f9, #8c25f4, #5177eb)`

### Colors:
- **Checkmark**: `#ffffff` (white)
- **Gray dot**: `rgba(0, 0, 0, 0.16)`
- **Lock icon**: `#061338` with `opacity: 0.24`
- **Spinner**: `#681bb5` (border color)
- **Text (active)**: `#000000`
- **Text (inactive)**: `#a3abc3`

---

## Testing Checklist

- [ ] Animation plays smoothly for levels 0→1, 1→2, 2→3, 3→4
- [ ] Level 4→5 shows delayed lock fade-out (waits 1500ms)
- [ ] Progress bar width calculates correctly (20% per level)
- [ ] Card height expands to 56px and contracts to 40px smoothly
- [ ] Header text switches between two states with spinner
- [ ] Checkmark pops in with scale and rotation animation
- [ ] Next symbol fades out before checkmark appears
- [ ] All animations complete in 1800ms total
- [ ] No animation glitches or janky transitions

---

## Implementation Notes

1. **Performance**: Use hardware-accelerated properties (`transform`, `opacity`) for smooth 60fps animations
2. **Timing**: All timers should be cleaned up if component unmounts or new animation starts
3. **State management**: Ensure animation state updates don't conflict with user interactions
4. **Accessibility**: Consider reduced motion preferences (`prefers-reduced-motion`)

---

## Questions?

Contact the web team for clarifications or to see the reference implementation running.
