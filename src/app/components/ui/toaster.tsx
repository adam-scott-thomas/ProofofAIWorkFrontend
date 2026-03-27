import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: 'white',
          color: '#030213',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px',
        },
        className: 'shadow-sm',
      }}
    />
  );
}
