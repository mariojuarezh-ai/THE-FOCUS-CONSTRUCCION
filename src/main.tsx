import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  declare props: ErrorBoundaryProps;
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0B0B] text-[#F2F2F2] flex flex-col items-center justify-center p-6 text-center space-y-6">
          <img
            src="https://thefocusplan.com/IMAGENES/THE%20FOCUS%20EN%20CONSTRUCCION.png"
            alt="The Focus Plan - Sitio en Construcción"
            className="w-full max-w-sm aspect-square object-contain border border-[#768455]/40 rounded-sm"
          />
          <a
            href="https://api.whatsapp.com/send?phone=523318042910&text=Hola%20Coach%2C%20me%20interesan%20las%20promociones%20de%20Buen%20Fin%20en%20The%20Focus%20Plan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#B4D330] text-[#0B0B0B] font-black text-xs tracking-widest uppercase rounded-sm"
          >
            CONTACTAR POR WHATSAPP
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
