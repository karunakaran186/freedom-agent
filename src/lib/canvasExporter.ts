import { FreedomMapData } from '../types';

export type CardFormat = '4:5' | '9:16';

export async function generateFreedomCardBlob(data: FreedomMapData, format: CardFormat = '4:5'): Promise<Blob> {
  const isStory = format === '9:16';
  const width = 1080;
  const height = isStory ? 1920 : 1350;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Background: Pure White / Subtle premium gradient
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Subtle top background aura
  const topGrad = ctx.createRadialGradient(width / 2, 0, 50, width / 2, 0, height * 0.6);
  topGrad.addColorStop(0, 'rgba(238, 242, 255, 0.7)'); // soft indigo tint
  topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle Tricolor Accent Bars on top edge
  const barWidth = width / 3;
  ctx.fillStyle = '#FF9933'; // Saffron
  ctx.fillRect(0, 0, barWidth, 10);
  ctx.fillStyle = '#FFFFFF'; // White
  ctx.fillRect(barWidth, 0, barWidth, 10);
  ctx.fillStyle = '#138808'; // India Green
  ctx.fillRect(barWidth * 2, 0, barWidth, 10);

  // Outer border with subtle rounding inset
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Top Flag & Header
  let currentY = isStory ? 160 : 120;

  // Ashoka Chakra subtle ring
  ctx.save();
  ctx.translate(width / 2, currentY);
  ctx.strokeStyle = '#000080';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 24; i++) {
    const angle = (i * 2 * Math.PI) / 24;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * 16, Math.sin(angle) * 16);
    ctx.stroke();
  }
  ctx.restore();

  currentY += 45;

  // Title: MY INDIA. MY FREEDOM.
  ctx.textAlign = 'center';
  ctx.font = '900 36px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.letterSpacing = '4px';
  ctx.fillText('MY INDIA. MY FREEDOM.', width / 2, currentY);

  currentY += 34;
  ctx.font = '600 16px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.letterSpacing = '2px';
  ctx.fillText('15 AUGUST 2026 • INDEPENDENCE DAY SPECIAL', width / 2, currentY);

  currentY += isStory ? 80 : 50;

  // Card Content Box
  const cardMargin = 80;
  const cardWidth = width - (cardMargin * 2);

  // 1. FREEDOM FROM BOX
  const box1Height = isStory ? 180 : 150;
  drawRoundedBox(ctx, cardMargin, currentY, cardWidth, box1Height, 16, '#FFF7ED', '#FDBA74');
  
  ctx.textAlign = 'left';
  ctx.font = '700 14px system-ui, sans-serif';
  ctx.fillStyle = '#C2410C'; // Saffron dark
  ctx.letterSpacing = '1.5px';
  ctx.fillText('YOUR FREEDOM FROM', cardMargin + 30, currentY + 36);

  ctx.font = '800 24px system-ui, sans-serif';
  ctx.fillStyle = '#1E293B';
  wrapText(ctx, `"${data.freedomFrom}"`, cardMargin + 30, currentY + 74, cardWidth - 60, 32, 2);

  currentY += box1Height + (isStory ? 35 : 24);

  // Directional Indicator
  ctx.textAlign = 'center';
  ctx.font = '700 22px system-ui, sans-serif';
  ctx.fillStyle = '#6366F1';
  ctx.fillText('↓  TRANSFORMING TOWARD  ↓', width / 2, currentY);

  currentY += isStory ? 35 : 25;

  // 2. FREEDOM TOWARD BOX
  const box2Height = isStory ? 180 : 150;
  drawRoundedBox(ctx, cardMargin, currentY, cardWidth, box2Height, 16, '#F0FDF4', '#86EFAC');
  
  ctx.textAlign = 'left';
  ctx.font = '700 14px system-ui, sans-serif';
  ctx.fillStyle = '#15803D'; // Green dark
  ctx.letterSpacing = '1.5px';
  ctx.fillText('YOUR FREEDOM TOWARD', cardMargin + 30, currentY + 36);

  ctx.font = '800 24px system-ui, sans-serif';
  ctx.fillStyle = '#0F172A';
  wrapText(ctx, `"${data.freedomToward}"`, cardMargin + 30, currentY + 74, cardWidth - 60, 32, 2);

  currentY += box2Height + (isStory ? 45 : 30);

  // 3. MAIN FREEDOM STATEMENT HERO BOX
  const statementBoxHeight = isStory ? 320 : 250;
  drawRoundedBox(ctx, cardMargin, currentY, cardWidth, statementBoxHeight, 20, '#0F172A', '#334155');

  // Badge inside hero box
  ctx.textAlign = 'center';
  ctx.font = '800 13px system-ui, sans-serif';
  ctx.fillStyle = '#38BDF8'; // Cyan accent
  ctx.letterSpacing = '2px';
  ctx.fillText('MY FREEDOM STATEMENT', width / 2, currentY + 45);

  // Statement quote
  ctx.font = 'italic 700 32px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#FFFFFF';
  wrapText(ctx, `“${data.freedomStatement}”`, width / 2, currentY + 110, cardWidth - 80, 44, 3, true);

  // First step summary
  ctx.font = '500 16px system-ui, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`First step: ${data.firstStep}`, width / 2, currentY + statementBoxHeight - 35);

  currentY += statementBoxHeight + (isStory ? 60 : 40);

  // Footer / Watermark & Tech Advisor Callout
  const footerY = height - (isStory ? 200 : 160);

  // Tech Advisor Box
  const advisorBoxHeight = isStory ? 90 : 75;
  drawRoundedBox(ctx, cardMargin, footerY, cardWidth, advisorBoxHeight, 14, '#F8FAFC', '#CBD5E1');

  // Mini Tricolor vertical pill inside advisor box
  ctx.fillStyle = '#FF9933';
  ctx.fillRect(cardMargin + 18, footerY + 18, 4, 12);
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(cardMargin + 18, footerY + 30, 4, 12);
  ctx.fillStyle = '#138808';
  ctx.fillRect(cardMargin + 18, footerY + 42, 4, 12);

  ctx.textAlign = 'left';
  ctx.font = '800 15px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.letterSpacing = '0.5px';
  ctx.fillText('LOOKING FOR A TECH ADVISOR? GET IN TOUCH', cardMargin + 32, footerY + (isStory ? 38 : 32));

  ctx.font = '600 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#2563EB'; // Blue link color
  ctx.letterSpacing = '0.5px';
  ctx.fillText('https://techadvisor.lykspire.com/', cardMargin + 32, footerY + (isStory ? 64 : 54));

  // Bottom Branding Watermark
  ctx.textAlign = 'center';
  ctx.font = '800 14px system-ui, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.letterSpacing = '2px';
  ctx.fillText('LYKSPIRE HQ™  •  DECISION ARCHITECT AGENTS', width / 2, height - (isStory ? 45 : 30));

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob || new Blob());
    }, 'image/png');
  });
}

function drawRoundedBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  fill: string,
  stroke?: string
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  ctx.fillStyle = fill;
  ctx.fill();

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 3,
  center: boolean = false
) {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      if (lineCount >= maxLines - 1) {
        ctx.fillText(line.trim() + '...', x, y);
        return;
      }
      ctx.fillText(line.trim(), x, y);
      line = words[n] + ' ';
      y += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}
