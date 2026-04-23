***

# PRD: Project Antigravity
**Product:** Kiosk-Integrated Spatial Retail Engine  
**Codename:** NEBULA  
**Status:** Presentation-Ready / High-Fidelity Demo  
**Lead:** Senior Creative Technologist  

---

## 1. Executive Summary
**Antigravity**: "1:1 Pixel Perfect" digital twin interface for shopping kiosks. Replace traditional checkout with cinematic spatial experience. 2.5D orthographic map + weighted motion physics. Seamless flow Discovery -> Verification.

## 2. Strategic Vision
* **Bespoke UI**: No standard card layouts or basic lists. 
* **Inertia**: Spring physics ($f = -kx$) give UI weight/inertia.
* **Phygital**: Bridge physical cart movement with digital screen.

## 3. Core Functional Modules (Demo Scope)

### 3.1 The "Atlas" Spatial Navigator
Dynamic, layered coordinate system.
* **Orthographic**: 45-degree isometric floorplan.
* **Ghost Pathing**: Bezier curve animation for "You Are Here" chevron.
* **Hotspots**: Aisle intersection triggers contextual product highlight.

### 3.2 The Kinetic Ledger (Cart)
* **Gravity Insertion**: Scanned items scale + accelerate into ledger with "liquid-swish".
* **Odometer**: Glassmorphic panel, high-speed odometer counter updates.
* **Mock Data**: Premium product JSON (Electronics, Groceries) + high-res PNG.

### 3.3 The Verification Bridge
* **Biometric Pulse**: Circular scanning for instant payment.
* **Guard Pass**: High-contrast, full-screen receipt:
    * **Dynamic QR**: Rotating, time-sensitive.
    * **Holographic**: CSS `conic-gradient` moves with tilt (prevents fraud).

## 4. Technical Stack
| Layer | Tech |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Animations** | Framed Motion + GSAP |
| **Mapping** | SVG Paths / R3F |
| **State** | Zustand |
| **Styling** | Tailwind CSS + Radix UI |

## 5. Presentation Scenarios (Director's Console)
Hidden Control Overlay (keypress) for presenter:
1. **Start Journey**: Cart moves to aisle.
2. **Add Item**: Simulate barcode scan.
3. **Alert**: Stock/Security events.
4. **Instant Pay**: Jump to Verified state.

## 6. Performance Constraints & Mitigations
* **Bottlenecks**: WebGL (R3F) vs DOM (Framer/GSAP). Mitigation: Delegate layout to Framer, heavy sequences to GSAP to offload React.
* **SSR Bypass**: Disable SSR for core engine to prioritize WebGL performance.

## 7. Success Metrics for Demo
* **Zero Jitter**: 60FPS during complex transitions.
* **Continuity**: Single camera movement Map -> Payment.
* **Tactile**: Touch triggers visual pulse/haptic-style.

---
**ANTIGRAVITY // RETAIL INNOVATION LAB // 2026**