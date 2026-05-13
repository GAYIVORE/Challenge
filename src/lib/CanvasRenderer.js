// Canvas renderer for the Success Blueprint card (1080x1920)
const NAVY = '#002366';
const GOLD = '#D4AF37';
const WHITE = '#FFFFFF';
const LIGHT_GOLD = '#F5E6B8';
const DARK_NAVY = '#001744';

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Enhanced Logo Drawing:
 * Handles clipping and ensures the image covers the circle without stretching.
 */
function drawLogo(ctx, logoImg, cx, cy, size) {
  if (!logoImg || !logoImg.complete) return;

  ctx.save();
  // Create circular clip
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Calculate "aspect fill" (cover) logic
  const imgAspect = logoImg.width / logoImg.height;
  let drawW, drawH;

  if (imgAspect > 1) {
    drawW = size * imgAspect;
    drawH = size;
  } else {
    drawW = size;
    drawH = size / imgAspect;
  }

  ctx.drawImage(logoImg, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
  ctx.restore();

  // Add a subtle gold ring around the logo
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2 + 2, 0, Math.PI * 2);
  ctx.stroke();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

export function renderBlueprint(canvas, { photo, vision, discipline, name, logoImg }) {
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;
  canvas.width = W;
  canvas.height = H;

  // === BACKGROUND ===
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, DARK_NAVY);
  bgGrad.addColorStop(0.3, NAVY);
  bgGrad.addColorStop(0.7, NAVY);
  bgGrad.addColorStop(1, DARK_NAVY);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // === DECORATIVE GOLD BORDER ===
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, 30, 30, W - 60, H - 60, 20);
  ctx.stroke();
  
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 42, 42, W - 84, H - 84, 16);
  ctx.stroke();

  // === TOP DECORATIVE LINE ===
  const lineY = 100;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, lineY);
  ctx.lineTo(W / 2 - 80, lineY); // Wider gap for logo
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W / 2 + 80, lineY);
  ctx.lineTo(W - 100, lineY);
  ctx.stroke();

  // Draw Logo at top
  drawLogo(ctx, logoImg, W / 2, lineY, 110);

  // === TITLE ===
  ctx.fillStyle = WHITE;
  ctx.font = '700 52px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('PENSA UCC', W / 2, 205);

  ctx.fillStyle = GOLD;
  ctx.font = '605 28px Poppins, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('THE SUCCESS BLUEPRINT', W / 2, 245);

  // === SECTION HEADER ===
  const sectionY = 290;
  const sectionGrad = ctx.createLinearGradient(80, sectionY, W - 80, sectionY);
  sectionGrad.addColorStop(0, GOLD);
  sectionGrad.addColorStop(0.5, LIGHT_GOLD);
  sectionGrad.addColorStop(1, GOLD);
  ctx.fillStyle = sectionGrad;
  drawRoundedRect(ctx, 80, sectionY, W - 160, 52, 6);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = '700 24px Poppins, sans-serif';
  ctx.fillText("LADIES' AND GENTS' WEEK CELEBRATION", W / 2, sectionY + 35);

  // === PHOTO FRAME ===
  const frameX = 120;
  const frameY = 375;
  const frameW = W - 240;
  const frameH = 620;

  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, frameX, frameY, frameW, frameH, 16);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = '700 40px Poppins, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('MY', W / 2 - 30, frameY + 55);
  
  ctx.fillStyle = GOLD;
  ctx.font = 'italic 700 44px "Playfair Display", serif';
  ctx.textAlign = 'left';
  ctx.fillText('blueprint', W / 2 - 25, frameY + 57);

  // Photo Drawing Logic
  const pAreaX = frameX + 60, pAreaY = frameY + 80, pAreaW = frameW - 120, pAreaH = frameH - 110;

  if (photo) {
    ctx.save();
    drawRoundedRect(ctx, pAreaX, pAreaY, pAreaW, pAreaH, 12);
    ctx.clip();
    const ratio = Math.max(pAreaW / photo.width, pAreaH / photo.height);
    const w = photo.width * ratio, h = photo.height * ratio;
    ctx.drawImage(photo, pAreaX + (pAreaW - w) / 2, pAreaY + (pAreaH - h) / 2, w, h);
    ctx.restore();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, pAreaX, pAreaY, pAreaW, pAreaH, 12);
    ctx.stroke();
  } else {
    ctx.fillStyle = '#f8f8f8';
    drawRoundedRect(ctx, pAreaX, pAreaY, pAreaW, pAreaH, 12);
    ctx.fill();
    ctx.fillStyle = '#bbb';
    ctx.textAlign = 'center';
    ctx.font = '500 24px Poppins';
    ctx.fillText('PHOTO AREA', W/2, pAreaY + pAreaH/2);
  }

  // === VISION & DISCIPLINE ===
  const drawEntry = (y, label, val, placeholder) => {
    const labelW = 270;
    const labelX = 70;
    const valueX = labelX + labelW + 12;
    const valueW = W - valueX - 70;
    const rowH = 52;

    // Label pill (gold)
    ctx.fillStyle = GOLD;
    drawRoundedRect(ctx, labelX, y, labelW, rowH, 8);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.font = '700 19px Poppins';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, labelX + labelW / 2, y + rowH / 2);

    // Value box (white with gold border)
    ctx.fillStyle = WHITE;
    drawRoundedRect(ctx, valueX, y, valueW, rowH, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,175,55,0.5)';
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, valueX, y, valueW, rowH, 8);
    ctx.stroke();

    // Value text — bold and dark for visibility
    ctx.fillStyle = val ? '#001744' : '#999';
    ctx.textAlign = 'left';
    ctx.font = val ? '600 20px Poppins' : '400 18px Poppins';
    ctx.textBaseline = 'middle';

    // Clip long text
    ctx.save();
    drawRoundedRect(ctx, valueX + 2, y, valueW - 4, rowH, 8);
    ctx.clip();
    ctx.fillText(val || placeholder, valueX + 18, y + rowH / 2);
    ctx.restore();

    ctx.textBaseline = 'alphabetic';
  };

  drawEntry(1050, 'MY VISION:', vision, '[Vision for the year]');
  drawEntry(1118, 'DAILY DISCIPLINE:', discipline, '[Your daily habit]');


  // === AFFIRMATION SECTION ===
  const affirmY = 1215;
  const affirmW = W - 140;
  const affirmH = 195;
  const affirmX = 70;

  // Outer card with subtle gradient
  const affirmGrad = ctx.createLinearGradient(affirmX, affirmY, affirmX + affirmW, affirmY + affirmH);
  affirmGrad.addColorStop(0, 'rgba(212,175,55,0.12)');
  affirmGrad.addColorStop(0.5, 'rgba(255,255,255,0.06)');
  affirmGrad.addColorStop(1, 'rgba(212,175,55,0.12)');
  ctx.fillStyle = affirmGrad;
  drawRoundedRect(ctx, affirmX, affirmY, affirmW, affirmH, 16);
  ctx.fill();

  // Gold outer border
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, affirmX, affirmY, affirmW, affirmH, 16);
  ctx.stroke();

  // Inner thin border
  ctx.strokeStyle = 'rgba(212,175,55,0.35)';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, affirmX + 10, affirmY + 10, affirmW - 20, affirmH - 20, 10);
  ctx.stroke();

  // Header pill: "THE MILESTONE — DAY 3"
  const pillW = 420;
  const pillH = 38;
  const pillX = W / 2 - pillW / 2;
  const pillY = affirmY - 19;
  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = 'bold 20px Poppins';
  ctx.letterSpacing = '3px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦  THE MILESTONE — DAY 3  ✦', W / 2, pillY + pillH / 2);
  ctx.letterSpacing = '0px';
  ctx.textBaseline = 'alphabetic';

  // Large decorative opening quote mark
  ctx.fillStyle = 'rgba(212,175,55,0.5)';
  ctx.font = 'bold 100px "Playfair Display", serif';
  ctx.textAlign = 'left';
  ctx.fillText('"', affirmX + 22, affirmY + 90);

  // Affirmation text
  const affirmation = "I am a vessel of divine purpose, refining my character through the fire of discipline. I do not just carry a title; I carry the responsibility of a King/Queen, crowned with a vision that outlives me.";
  ctx.fillStyle = WHITE;
  ctx.font = 'italic 500 23px "Playfair Display", serif';
  ctx.textAlign = 'center';
  const affirmLines = wrapText(ctx, affirmation, affirmW - 120);
  const lineH = 34;
  const totalTextH = affirmLines.length * lineH;
  const textStartY = affirmY + (affirmH - totalTextH) / 2 + 18;
  affirmLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, textStartY + i * lineH);
  });

  // Closing quote mark
  ctx.fillStyle = 'rgba(212,175,55,0.5)';
  ctx.font = 'bold 100px "Playfair Display", serif';
  ctx.textAlign = 'right';
  ctx.fillText('"', affirmX + affirmW - 22, affirmY + affirmH - 10);

  // Bottom crown accent
  ctx.fillStyle = GOLD;
  ctx.font = '26px serif';
  ctx.textAlign = 'center';
  ctx.fillText('👑', W / 2, affirmY + affirmH - 14);
  
  
  // === JOIN BAR ===
  const joinY = 1420;
  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, 60, joinY, W - 120, 50, 8);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.font = '600 20px Poppins';
  ctx.textAlign = 'center';
  ctx.fillText('HOW TO JOIN:  1.Fill Template   2.Post to Story   3.Tag @PENSAUCC', W / 2, joinY + 33);

  // === NAME ===
  if (name) {
    ctx.fillStyle = LIGHT_GOLD;
    ctx.font = '600 26px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(`— ${name.toUpperCase()} —`, W / 2, 1505);
  }

   // === PANEL SECTION ===
  const panelY = 1530;
  ctx.fillStyle = DARK_NAVY;
  drawRoundedRect(ctx, 60, panelY, W - 120, 110, 12);
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 60, panelY, W - 120, 110, 12);
  ctx.stroke();
  ctx.fillStyle = WHITE;
  ctx.font = '600 22px Poppins';
  ctx.textAlign = 'center';
  ctx.fillText('Join the Panel Discussion:', W / 2, panelY + 38);
  ctx.fillStyle = GOLD;
  ctx.font = '700 26px Poppins';
  ctx.fillText('THURSDAY  |  APEWOSIKA AUDITORIUM  |  6:30 PM', W / 2, panelY + 78);


  // === LADIES & GENTS WEEK CELEBRATION BANNER ===
  const brandY = 1650;
  const bW = 960;
  const bH = 200;
  const bX = (W - bW) / 2;
  const centerX = W / 2;

  // Outer ornate border (cream/white background)
  ctx.fillStyle = '#F9F3E3';
  drawRoundedRect(ctx, bX, brandY, bW, bH, 8);
  ctx.fill();

  // Double-line border
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, bX, brandY, bW, bH, 8);
  ctx.stroke();

  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, bX + 8, brandY + 8, bW - 16, bH - 16, 5);
  ctx.stroke();

  // Corner decorative notches
  const notchSize = 18;
  [[bX, brandY], [bX + bW, brandY], [bX, brandY + bH], [bX + bW, brandY + bH]].forEach(([nx, ny]) => {
    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(nx, ny, notchSize, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Top thin gold rule
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bX + 40, brandY + 20);
  ctx.lineTo(bX + bW - 40, brandY + 20);
  ctx.stroke();

  // "LADIES" text
  ctx.fillStyle = NAVY;
  ctx.font = 'bold 80px "Poppins", sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText("LADIES'", centerX - 48, brandY + 88);

  // "&" in gold italic
  ctx.fillStyle = GOLD;
  ctx.font = 'italic bold 90px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('&', centerX, brandY + 86);

  // "GENTS" text
  ctx.fillStyle = NAVY;
  ctx.font = 'bold 80px "Poppins", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText("GENTS'", centerX + 48, brandY + 88);

  // Divider line before subtitle
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(bX + 30, brandY + 130);
  ctx.lineTo(bX + bW - 30, brandY + 130);
  ctx.stroke();

  // "WEEK CELEBRATION" subtitle
  ctx.fillStyle = NAVY;
  ctx.font = 'bold 36px "Poppins", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('WEEK CELEBRATION', centerX, brandY + 165);
  ctx.letterSpacing = '0px';

  // Bottom thin gold rule
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bX + 40, brandY + bH - 18);
  ctx.lineTo(bX + bW - 40, brandY + bH - 18);
  ctx.stroke();

  ctx.fillStyle = LIGHT_GOLD;
  ctx.font = '500 22px Poppins';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('#CrownedWithPurpose', centerX, brandY + bH + 55-20);
}