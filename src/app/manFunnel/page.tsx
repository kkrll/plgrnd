'use client';

import { FunnelProvider } from './context/FunnelContext';
import FunnelRouter from './components/FunnelRouter';
import "./styles.css"

export default function ManFunnel() {
  return (
    <FunnelProvider>
      <FunnelRouter />
    </FunnelProvider>
  );
}
