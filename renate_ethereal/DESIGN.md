# Design System Document: The Sovereign Path

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Luminary"**

This design system moves away from the cluttered, "utility-first" aesthetic of traditional HR tech. Instead, it adopts a high-end editorial approach that mirrors the precision of AI and the prestige of executive search. We treat the interface as a curated gallery where talent and opportunity meet. 

By leveraging **intentional asymmetry**, we break the rigid 12-column grid to create a sense of forward motion (the "Wing" effect). We utilize a "High-Contrast Ether" layout—large areas of breathable white space juxtaposed against the authoritative weight of our deep purple (#552299). This is not just a platform; it is a sophisticated environment that feels intelligent, calm, and definitive.

---

## 2. Colors & Tonal Architecture
The palette is anchored in a binary power dynamic: Deep Purple and Optical White. However, the sophistication lies in the "in-between" tones used for structural depth.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts. 
*   *Implementation:* Use `surface-container-low` (#f5f3f7) for the main background and `surface-container-lowest` (#ffffff) for active cards to create separation without "boxing in" the user.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
1.  **Base:** `surface` (#faf9fc)
2.  **Sectioning:** `surface-container` (#efedf1)
3.  **Interactive Elements:** `surface-container-lowest` (#ffffff)
4.  **Actionable Focus:** `primary-container` (#552299)

### The "Glass & Gradient" Rule
To prevent the UI from feeling "flat," use Glassmorphism for floating panels (Modals, Hover Tooltips).
*   **Token:** `surface_variant` at 70% opacity with a `24px` backdrop-blur. 
*   **Signature Texture:** Use a subtle linear gradient on primary CTAs: `primary` (#3d007d) to `primary_container` (#552299) at a 135-degree angle to mimic the iridescent sheen of a wing.

---

## 3. Typography
We utilize a dual-font strategy to balance AI-driven efficiency with human-centric professionalism.

*   **Display & Headlines (Manrope):** A modern, geometric sans-serif. Use `display-lg` (3.5rem) with tight letter spacing (-0.02em) for hero moments. This conveys authority and "The Sovereign Path."
*   **Body & Labels (Inter):** Chosen for its exceptional readability at small scales. 
*   **The Editorial Scale:** Lead with large `headline-lg` (2rem) titles in Purple (#3d007d) followed by generous `body-lg` (1rem) descriptions in `on_surface_variant` (#4a4452). This high-contrast ratio ensures the user’s eye is always guided to the most critical information first.

---

## 4. Elevation & Depth
Depth is a tool for focus, not just decoration. We move away from traditional "Material" shadows toward **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The shift from #f5f3f7 to #ffffff creates a "soft lift" that feels architectural.
*   **Ambient Shadows:** When an element must float (e.g., a candidate profile modal), use an ultra-diffused shadow: `0px 20px 40px rgba(85, 34, 153, 0.06)`. Note the purple tint in the shadow—this maintains brand harmony in the shadows.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use `outline-variant` (#cdc3d4) at 20% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary_container` (#552299) with `on_primary` (#ffffff) text. Radius: `md` (0.75rem / 12px).
*   **Secondary:** Ghost style. No background, `primary` text, and a `Ghost Border` (outline-variant at 20%).
*   **Tertiary:** Text only, bolded, with an 8px "wing" icon (the branding anchor) appearing on hover.

### Input Fields
*   **Style:** Minimalist. No bottom line, no full box. Use a `surface-container-highest` (#e3e2e6) background with `md` (12px) rounded corners. 
*   **State:** On focus, the background shifts to `surface-container-lowest` (#ffffff) with a soft `primary` ambient shadow.

### Cards & Lists (The "Breathable" List)
*   **Prohibition:** Divider lines between list items are forbidden. 
*   **Execution:** Use `spacing-6` (1.5rem) vertical padding to separate items. On hover, the entire list item row should transition to `surface-container-low` (#f5f3f7) with a `sm` (0.25rem) radius.

### The "AI Insight" Chip
*   **Context:** Unique to this design system. 
*   **Style:** A `secondary_container` (#dfc8fd) background with `on_secondary_container` (#63517f) text. Use a subtle `primary` 2px glow effect to signify AI-generated data.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., more padding on the left than the right in hero sections) to create a sense of dynamic energy.
*   **Do** use `primary_fixed` (#ecdcff) for low-priority background highlights to maintain the purple soul without overwhelming the user.
*   **Do** lean into `display-sm` (2.25rem) typography for dashboard greetings to feel welcoming yet professional.

### Don't
*   **Don't** use pure black (#000000). Always use `on_surface` (#1b1b1e) for text.
*   **Don't** use 90-degree corners. Everything must adhere to the `8px-12px` (sm to md) rounding scale to feel "streamlined."
*   **Don't** stack more than three levels of surface containers. If you need more depth, use a `Glassmorphism` overlay.

### Accessibility Note
Ensure all `on_primary_container` text maintains a 4.5:1 contrast ratio against the `primary_container` background. Use `on_surface_variant` (#4a4452) sparingly for secondary text to ensure it remains legible for all users.