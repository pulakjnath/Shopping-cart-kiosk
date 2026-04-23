***

# Design Document: Antigravity Spatial Engine
**Project Name:** NEBULA / Antigravity  
**Architect:** Lead Frontend Engineer  
**Stack:** React, Three.js (R3F), Framer Motion, Tailwind CSS  
**Version:** 1.0.0-PROTOTYPE  

---

## 1. System Architecture
Decoupled Overlay Architecture. 3D Scene (Spatial Map) + 2D UI (HUD/Ledger) separate layers, shared state.

### 1.1 The Layer Stack
* **Layer 1 (The Void):** Three.js `<Canvas>` 3D floorplan, lighting.
* **Layer 2 (The Interface):** React DOM elements for Ledger, System Pulse.
* **Layer 3 (The Bridge):** Zustand store manage "Current Coordinate", "Cart Payload".

---

## 2. 3D Scene Configuration (Three.js)

### 2.1 The Environmental Model
Procedural generation for performance:
* **Floor:** `PlaneGeometry` + custom `ShaderMaterial`, pulsing digital grid.
* **Aisles:** `BoxGeometry` + `MeshStandardMaterial`.
    * *Props:* `metalness: 0.9`, `roughness: 0.1` (catch neon lights).
* **Lighting:** `AmbientLight` (0.2) base. `RectAreaLight` strips cinematic "retail-future" glow.

### 2.2 Camera Orchestration
Cinematic Follow Camera via `react-three/drei` `PerspectiveCamera` + `maath`.
* **Default:** Isometric view ($x: 20, y: 20, z: 20$).
* **Logic:** Aisle selection triggers camera `lerp` to target.

---

## 3. Component Breakdown

### 3.1 `<SpatialMap />` (3D Engine)
* **Pathing:** `CatmullRomCurve3` defines "Ghost Path".
* **The Cart:** 3D mesh follow curve ($0.0 \to 1.0$).
* **Interaction:** `onPointerOver` aisles trigger 2D `<Html />` Tooltip.

### 3.2 `<KineticLedger />` (HUD)
* **Animation:** Framer Motion.
* **Entry:** `layout` prop for auto-reorder.
* **Styling:** ```css
    backdrop-filter: blur(12px);
    background: linear-gradient(180deg, rgba(10,10,12,0.8) 0%, rgba(20,20,25,0.4) 100%);
    ```

---

## 4. State Management (Zustand)
Single source of truth.

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
`<EffectComposer>` mandatory:
* **Bloom Pass:** High intensity emissive (neon paths).
* **Vignette:** Draw focus center.
* **Chromatic Aberration:** Subtle (0.002) edge offset, high-end glass display feel.

---

## 6. Presentation Logic (Demo Runner)
"Director's Console" hidden portal.

| Event | Logic | Visual Result |
| :--- | :--- | :--- |
| `DEMO_START` | `Animate(progress, 0, 1)` | Cart glides entrance to Aisle 4. |
| `ITEM_SCAN` | `addToCart(mockData[0])` | LED flash + Item slide into Ledger. |
| `CHECKOUT` | `camera.zoom(5)` | Camera punch-in QR code. |

---

## 7. Security & Verification Design
Guard Mode interface high-contrast:
* **Palette:** `#00FF00` (Success), `#000000` (Background).
* **Hash:** Dynamic string (cart ID + timestamp).
* **Watermark:** Full-screen SVG overlay, rotating logo prevent recording spoof.

---

## 8. Performance Architecture
60FPS target. Render boundaries:
* **Delegation:** Framer Motion for layout. GSAP for heavy timeline (odometer) to bypass React overhead.
* **SSR Bypass:** Offline kiosk/WebGL focus. `"use client"` avoid hydration mismatch.
* **Optimization:** Procedural assets use instance meshes, shared `useMemo` materials.

---

## 9. Development Roadmap (Demo)
1. **Phase 1:** R3F Canvas, isometric controls.
2. **Phase 2:** 3D aisles, floor grid.
3. **Phase 3:** Framer Motion Ledger.
4. **Phase 4:** Ghost Path transitions.
5. **Phase 5:** Payment + Guard Check finales.

***

**END OF DOCUMENT** *Confidential // Antigravity Project Nebula*