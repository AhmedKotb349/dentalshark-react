import styled, { keyframes, css } from 'styled-components';

// ================================================================
// StyledComponents.js — Styled Components library
// Requirement: "Apply different styling techniques → Styled Components"
// These primitives are used in React demo pages (not the legacy site).
// ================================================================

/* --- Keyframe animations --- */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0   rgba(78,204,163,0.45); }
  50%       { box-shadow: 0 0 0 10px rgba(78,204,163,0);   }
`;

/* ────────────────────────────────────────────
   StyledButton — primary / outline / danger
──────────────────────────────────────────── */
export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${({ $size }) => $size === 'lg' ? '14px 28px' : '10px 20px'};
  font-family: 'Inter', sans-serif;
  font-size: ${({ $size }) => $size === 'lg' ? '14px' : '12px'};
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: ${({ $pill }) => $pill ? '50px' : '10px'};
  border: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
  animation: ${fadeInUp} 0.3s ease;

  ${({ $variant }) =>
    $variant === 'outline'
      ? css`
          background: transparent;
          border: 2px solid #4ecca3;
          color: #4ecca3;
          &:hover { background: rgba(78,204,163,0.1); }
        `
      : $variant === 'danger'
      ? css`
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.4);
          color: #f87171;
          &:hover { background: rgba(239,68,68,0.25); }
        `
      : css`
          background: linear-gradient(90deg, #4ecca3, #38b2ac);
          color: #000;
          &:hover { animation: ${glowPulse} 1s infinite; }
        `}

  &:hover  { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.3); }
  &:active { transform: translateY(0); opacity: 0.85; }
  &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
`;

/* ────────────────────────────────────────────
   ProductCard — animated product tile
──────────────────────────────────────────── */
export const ProductCard = styled.div`
  background: var(--card, #1a2535);
  border: 1px solid var(--b2, rgba(255,255,255,0.07));
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  animation: ${fadeInUp} 0.4s ease both;
  animation-delay: ${({ $index }) => `${($index || 0) * 60}ms`};
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.4);
    border-color: rgba(78,204,163,0.3);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: #0f1923;
  }
`;

/* ────────────────────────────────────────────
   Badge — sale / hot / new / flash
──────────────────────────────────────────── */
const BADGE_STYLES = {
  sale:  { bg: 'rgba(239,68,68,.2)',   border: 'rgba(239,68,68,.4)',   color: '#f87171' },
  hot:   { bg: 'rgba(249,115,22,.2)',  border: 'rgba(249,115,22,.4)',  color: '#fb923c' },
  new:   { bg: 'rgba(34,197,94,.2)',   border: 'rgba(34,197,94,.4)',   color: '#4ade80' },
  flash: { bg: 'rgba(245,158,11,.2)',  border: 'rgba(245,158,11,.4)',  color: '#fbbf24' },
};

export const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: ${({ $type }) => (BADGE_STYLES[$type] || BADGE_STYLES.new).bg};
  border: 1px solid ${({ $type }) => (BADGE_STYLES[$type] || BADGE_STYLES.new).border};
  color: ${({ $type }) => (BADGE_STYLES[$type] || BADGE_STYLES.new).color};
`;

/* ────────────────────────────────────────────
   StyledInput — form field
──────────────────────────────────────────── */
export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  background: var(--bg2, #0f1923);
  border: 1px solid var(--b2, rgba(255,255,255,0.1));
  border-radius: 9px;
  color: var(--text, #e2e8f0);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder { color: #475569; }
  &:focus {
    border-color: #4ecca3;
    box-shadow: 0 0 0 3px rgba(78,204,163,0.15);
  }
`;

/* ────────────────────────────────────────────
   SkeletonCard — shimmer loading placeholder
──────────────────────────────────────────── */
export const SkeletonCard = styled.div`
  background: linear-gradient(90deg, #1a2535 25%, rgba(255,255,255,.04) 50%, #1a2535 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 16px;
  height: ${({ $height }) => $height || '280px'};
  border: 1px solid rgba(255,255,255,0.07);
`;

/* ────────────────────────────────────────────
   Price typography
──────────────────────────────────────────── */
export const PriceTag = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  font-size: ${({ $size }) => $size || '20px'};
  color: #4ecca3;
  letter-spacing: 1px;
`;

export const OldPrice = styled.span`
  font-size: 11px;
  color: #475569;
  text-decoration: line-through;
  margin-left: 6px;
`;

/* ────────────────────────────────────────────
   Layout helpers
──────────────────────────────────────────── */
export const Section = styled.section`
  padding: 60px 0;
  background: ${({ $alt }) => $alt ? 'var(--bg2, #0f1923)' : 'var(--bg, #0a1628)'};
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const SectionTitle = styled.h2`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: 2px;
  color: #fff;
  margin-bottom: 8px;

  span {
    background: linear-gradient(135deg, #4ecca3, #38b2ac);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;
