import { useThemeStore } from "../../stores/themeStore";

/**
 * Fullscreen sweep that covers the viewport when transitioning to/from AI mode.
 *
 * - On `cascade === "down"`: a dark panel slides down from the top and covers
 *   the screen while the site underneath becomes dark.
 * - On `cascade === "up"`: the panel slides up and releases the site back to
 *   light.
 *
 * This is purely visual. The actual theme flip happens in the store.
 */
export default function CascadeOverlay() {
  const cascade = useThemeStore((s) => s.cascade);

  if (!cascade) return null;

  const animName = cascade === "down" ? "poaw-cascade-down" : "poaw-cascade-up";
  const duration = cascade === "down" ? "800ms" : "400ms";
  const easing = cascade === "down" ? "cubic-bezier(0.4, 0, 0.2, 1)" : "cubic-bezier(0.7, 0, 0.84, 0)";

  return (
    <>
      <style>
        {`
          @keyframes poaw-cascade-down {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(0); }
          }
          @keyframes poaw-cascade-up {
            0%   { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }
        `}
      </style>
      <div
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #09090b 0%, #0f0f12 40%, #16161a 100%)",
          animation: `${animName} ${duration} ${easing} forwards`,
          willChange: "transform",
        }}
      />
    </>
  );
}
