***

# Design Document: Antigravity Spatial Engine
**Project Name:** NEBULA / Antigravity  
**Architect:** Lead Frontend Engineer  
**Stack:** React, Three.js (R3F), Framer Motion, Tailwind CSS  
**Version:** 1.0.0-PROTOTYPE  

---

## 1. System Architecture
The application follows a **Decoupled Overlay Architecture**. The 3D Scene (Spatial Map) and the 2D UI (HUD/Ledger) exist in separate layers but communicate through a shared state.

### 1.1 The Layer Stack
* **Layer 1 (The Void):** Three.js `<Canvas>` rendering the 3D floorplan and lighting.
* **Layer 2 (The Interface):** React-based DOM elements for the "Ledger" and "System Pulse."
* **Layer 3 (The Bridge):** Zustand store managing the "Current Coordinate" and "Cart Payload."

---

## 2. 3D Scene Configuration (Three.js)

### 2.1 The Environmental Model
Instead of loading a heavy high-poly model, the store is generated procedurally for performance:
* **Floor:** A `PlaneGeometry` with a custom `ShaderMaterial` creating a pulsing digital grid.
* **Aisles:** `BoxGeometry` instances using `MeshStandardMaterial`.
    * *Properties:* `metalness: 0.9`, `roughness: 0.1` (to catch the scene's neon lights).
* **Lighting:** * `AmbientLight` (Intensity: 0.2) for base visibility.
    * `RectAreaLight` strip lights along the aisles for a cinematic "retail-of-the-future" glow.

### 2.2 Camera Orchestration
We utilize a **Cinematic Follow Camera** using `react-three/drei`'s `PerspectiveCamera` and `maath`.
* **Default State:** Isometric view ($x: 20, y: 20, z: 20$).
* **Transition Logic:** When an aisle is selected, the camera executes a `lerp` (Linear Interpolation) to a specific target coordinate.

---

## 3. Component Breakdown

### 3.1 `<SpatialMap />` (The 3D Engine)
* **Pathing:** Uses `CatmullRomCurve3` to define the "Ghost Path" for the demo.
* **The Cart:** A custom 3D mesh that follows the curve progress ($0.0 \to 1.0$).
* **Interaction:** `onPointerOver` on aisles triggers a 2D "Tooltip" that follows the 3D object using the `<Html />` component from `@react-three/drei`.

### 3.2 `<KineticLedger />` (The HUD)
* **Animation Engine:** Framer Motion.
* **Entry Animation:** `layout` prop enabled for automatic re-ordering when items are added.
* **Styling:** ```css
    backdrop-filter: blur(12px);
    background: linear-gradient(180deg, rgba(10,10,12,0.8) 0%, rgba(20,20,25,0.4) 100%);
    ```

---

## 4. State Management (Zustand)
A single source of truth for the demo's "Storyline."

```javascript
const useStore = create((set) => ({
  currentAisle: null,
  cart: [],
  isPaying: false,
  // Actions
  moveToAisle: (id) => set({ currentAisle: id }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  triggerPayment: () => set({ isPaying: true }),
}));
```

---

## 5. Visual Fidelity & Post-Processing
To achieve the "Pixel Perfect" requirement, the `<EffectComposer>` is mandatory:
* **Bloom Pass:** High intensity on emissive materials (the neon paths).
* **Vignette:** To draw focus to the center of the kiosk.
* **Chromatic Aberration:** A very subtle (0.002) offset on the screen edges to simulate a high-end physical glass display.

---

## 6. Presentation Logic (The "Demo Runner")
The "Director's Console" is implemented as a hidden React portal.

| Event | Logic | Visual Result |
| :--- | :--- | :--- |
| `DEMO_START` | `Animate(progress, 0, 1)` | Cart glides from entrance to Aisle 4. |
| `ITEM_SCAN` | `addToCart(mockData[0])` | LED flash on cart + Item slides into Ledger. |
| `CHECKOUT` | `camera.zoom(5)` | Camera "punches in" to the QR code on the kiosk screen. |

---

## 7. Security & Verification Design
The **Guard Mode** interface uses a high-contrast theme:
* **Color Palette:** `#00FF00` (Success) and `#000000` (Background).
* **Security Hash:** A dynamic string generated from the cart ID and timestamp.
* **Watermark:** A full-screen `SVG` overlay with a rotating "Antigravity" logo to prevent screen-recording spoofing.

---

## 8. Performance Architecture
To guarantee the strict 60FPS requirement while bridging R3F, Framer Motion, and GSAP, we enforce the following rendering boundaries:
* **Animation Delegation:** Framer Motion is restricted to layout transitions (e.g., Ledger auto-reordering). GSAP is isolated to sequenced, heavy timeline events (e.g., odometer effects) to bypass React's render cycle overhead.
* **SSR Bypass:** Given the offline kiosk environment and WebGL focus, Next.js Server-Side Rendering is bypassed for the core engine using aggressive `"use client"` boundaries to prevent hydration mismatches.
* **Draw Call Optimization:** Procedural 3D assets (Aisles, Floors) will heavily utilize instance meshes and shared `useMemo` materials.

---

## 9. Development Roadmap (Demo)
1.  **Phase 1:** Setup R3F Canvas and isometric camera controls.
2.  **Phase 2:** Generate 3D aisle boxes and procedural floor grid.
3.  **Phase 3:** Integrate Framer Motion UI overlay for the Ledger.
4.  **Phase 5:** Script the "Ghost Path" camera transitions.
5.  **Phase 5:** Implement the "Payment" and "Guard Check" cinematic finales.

***

**END OF DOCUMENT** *Confidential // Antigravity Project Nebula*
