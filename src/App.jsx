import { useState } from "react";

/*
 * Faircado Prototype — Enriched Onboarding → Personalized Feed
 * Brand reference: faircado.com, New Standard.S case study, iOS app
 * Colors: near-black (#1A1A18), warm cream (#FBF9F6), green accent (#3B8A4A),
 *         soft greys, rounded cards, clean sans-serif
 * Font: PP Right Grotesk (brand font) — fallback to DM Sans
 */

const BRAND = {
  black: "#1A1A18",
  cream: "#FBF9F6",
  cardBg: "#FFFFFF",
  green: "#3B8A4A",
  greenLight: "#E8F5E9",
  greenDark: "#2E7D32",
  grey100: "#F5F3F0",
  grey200: "#EBEBEB",
  grey400: "#AAAAAA",
  grey600: "#777777",
  grey800: "#444444",
  red: "#D84315",
  redLight: "#FBE9E7",
};

const STYLES = [
  { id: "minimalist", label: "Minimalist", emoji: "◻️", desc: "Clean lines, neutral tones" },
  { id: "streetwear", label: "Streetwear", emoji: "🔥", desc: "Bold, urban, statement pieces" },
  { id: "y2k", label: "Y2K", emoji: "✨", desc: "Nostalgic, playful, colorful" },
  { id: "classic", label: "Classic", emoji: "🎩", desc: "Timeless, polished, refined" },
  { id: "bohemian", label: "Bohemian", emoji: "🌿", desc: "Earthy, textured, free-spirited" },
  { id: "sporty", label: "Sporty", emoji: "⚡", desc: "Athletic, functional, comfort" },
];

const SIZES = {
  clothing: ["XS", "S", "M", "L", "XL"],
  shoes: ["36", "37", "38", "39", "40", "41", "42"],
};

const PRICE_RANGES = [
  { id: "budget", label: "Under €25", desc: "Best deals first", max: 25 },
  { id: "mid", label: "€25 – €75", desc: "Sweet spot", max: 75 },
  { id: "premium", label: "€75 – €150", desc: "Quality picks", max: 150 },
  { id: "luxury", label: "€150+", desc: "Designer & rare finds", max: 999 },
];

const MOCK_ITEMS = [
  { id: 1, brand: "Arket", name: "Oversized Wool Coat", price: 89, originalPrice: 229, img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=300&h=360&fit=crop", styles: ["minimalist", "classic"], cat: "jackets", condition: "Like New", platform: "Vestiaire Collective" },
  { id: 2, brand: "Nike", name: "Air Force 1 '07", price: 45, originalPrice: 119, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=360&fit=crop", styles: ["streetwear", "sporty"], cat: "shoes", condition: "Good", platform: "eBay" },
  { id: 3, brand: "Zara", name: "Satin Midi Dress", price: 22, originalPrice: 59, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=360&fit=crop", styles: ["y2k", "classic"], cat: "dresses", condition: "Very Good", platform: "Sellpy" },
  { id: 4, brand: "COS", name: "Wide-Leg Trousers", price: 35, originalPrice: 89, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=360&fit=crop", styles: ["minimalist"], cat: "jeans", condition: "Like New", platform: "Vinted" },
  { id: 5, brand: "Dr. Martens", name: "1460 Smooth Leather", price: 68, originalPrice: 169, img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=360&fit=crop", styles: ["streetwear", "bohemian"], cat: "shoes", condition: "Good", platform: "Back Market" },
  { id: 6, brand: "Massimo Dutti", name: "Linen Blazer", price: 42, originalPrice: 129, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=360&fit=crop", styles: ["classic", "minimalist"], cat: "jackets", condition: "Very Good", platform: "Vestiaire Collective" },
  { id: 7, brand: "Adidas", name: "Handball Spezial", price: 52, originalPrice: 110, img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=360&fit=crop", styles: ["streetwear", "sporty", "y2k"], cat: "shoes", condition: "Good", platform: "eBay" },
  { id: 8, brand: "& Other Stories", name: "Knit Cardigan", price: 28, originalPrice: 79, img: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a0e?w=300&h=360&fit=crop", styles: ["bohemian", "minimalist"], cat: "tops", condition: "Like New", platform: "Sellpy" },
  { id: 9, brand: "Mango", name: "Leather Crossbody Bag", price: 19, originalPrice: 49, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=360&fit=crop", styles: ["classic", "minimalist"], cat: "bags", condition: "Very Good", platform: "Vinted" },
  { id: 10, brand: "Urban Outfitters", name: "Vintage Band Tee", price: 15, originalPrice: 35, img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=360&fit=crop", styles: ["y2k", "streetwear"], cat: "tops", condition: "Good", platform: "Sellpy" },
  { id: 11, brand: "Reformation", name: "Floral Wrap Dress", price: 78, originalPrice: 248, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=360&fit=crop", styles: ["bohemian", "classic"], cat: "dresses", condition: "Like New", platform: "Vestiaire Collective" },
  { id: 12, brand: "Levi's", name: "501 Original Fit", price: 32, originalPrice: 89, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=360&fit=crop", styles: ["classic", "streetwear", "minimalist"], cat: "jeans", condition: "Good", platform: "Vinted" },
  { id: 13, brand: "Stüssy", name: "Logo Hoodie", price: 55, originalPrice: 120, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=360&fit=crop", styles: ["streetwear"], cat: "tops", condition: "Very Good", platform: "eBay" },
  { id: 14, brand: "Birkenstock", name: "Arizona Sandals", price: 38, originalPrice: 80, img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=360&fit=crop", styles: ["bohemian", "minimalist"], cat: "shoes", condition: "Good", platform: "Sellpy" },
  { id: 15, brand: "Acne Studios", name: "Musubi Mini Bag", price: 195, originalPrice: 550, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=360&fit=crop", styles: ["minimalist", "classic"], cat: "bags", condition: "Like New", platform: "Vestiaire Collective" },
  { id: 16, brand: "H&M", name: "Oversized Denim Jacket", price: 18, originalPrice: 39, img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=360&fit=crop", styles: ["y2k", "streetwear", "bohemian"], cat: "jackets", condition: "Good", platform: "Vinted" },
];

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "0 20px", marginBottom: 28 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i <= step ? BRAND.green : BRAND.grey200,
          transition: "background 0.4s ease",
        }} />
      ))}
    </div>
  );
}

function OnboardingShell({ children, step, total, subtitle }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      background: BRAND.cream, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: BRAND.black }}>faircado</span>
        <span style={{ fontSize: 13, color: BRAND.grey400 }}>{step + 1}/{total}</span>
      </div>
      <ProgressBar step={step} total={total} />
      {subtitle && (
        <p style={{ padding: "0 20px", fontSize: 14, color: BRAND.grey600, margin: "0 0 16px", lineHeight: 1.5 }}>{subtitle}</p>
      )}
      <div style={{ flex: 1, padding: "0 20px 24px", overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function StepGender({ value, onChange, onNext }) {
  const options = [
    { id: "women", label: "Damen", sub: "Women's fashion" },
    { id: "men", label: "Herren", sub: "Men's fashion" },
    { id: "all", label: "Alle", sub: "Show me everything" },
  ];
  return (
    <OnboardingShell step={0} total={4} subtitle="Let's personalize your feed from the start.">
      <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 24px", letterSpacing: -0.3, color: BRAND.black }}>
        Für wen kaufst du ein?
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map(o => (
          <button key={o.id} onClick={() => onChange(o.id)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px",
              border: value === o.id ? `2px solid ${BRAND.green}` : `2px solid ${BRAND.grey200}`,
              borderRadius: 16, background: value === o.id ? BRAND.greenLight : BRAND.cardBg,
              cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
            }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: BRAND.black }}>{o.label}</div>
              <div style={{ fontSize: 13, color: BRAND.grey600, marginTop: 2 }}>{o.sub}</div>
            </div>
            {value === o.id && (
              <div style={{
                width: 24, height: 24, borderRadius: 12, background: BRAND.green,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#FFF", fontSize: 14, fontWeight: 700,
              }}>✓</div>
            )}
          </button>
        ))}
      </div>
      <button onClick={onNext} disabled={!value}
        style={{
          width: "100%", padding: "16px", border: "none", borderRadius: 14,
          background: value ? BRAND.green : BRAND.grey200,
          color: value ? "#FFF" : BRAND.grey400,
          fontSize: 16, fontWeight: 700, cursor: value ? "pointer" : "default",
          marginTop: 32, transition: "all 0.3s", fontFamily: "inherit",
        }}>
        Weiter
      </button>
    </OnboardingShell>
  );
}

function StepStyle({ selected, onChange, onNext }) {
  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };
  return (
    <OnboardingShell step={1} total={4} subtitle="Pick what resonates — this powers your For You feed.">
      <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 24px", letterSpacing: -0.3, color: BRAND.black }}>
        Was ist dein Style?
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {STYLES.map(s => {
          const active = selected.includes(s.id);
          return (
            <button key={s.id} onClick={() => toggle(s.id)}
              style={{
                padding: "20px 14px",
                border: active ? `2px solid ${BRAND.green}` : `2px solid ${BRAND.grey200}`,
                borderRadius: 16, background: active ? BRAND.greenLight : BRAND.cardBg,
                cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                fontFamily: "inherit", position: "relative",
              }}>
              {active && (
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  width: 20, height: 20, borderRadius: 10, background: BRAND.green,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#FFF", fontSize: 11, fontWeight: 700,
                }}>✓</div>
              )}
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: BRAND.black }}>{s.label}</div>
              <div style={{ fontSize: 12, color: BRAND.grey600, lineHeight: 1.4 }}>{s.desc}</div>
            </button>
          );
        })}
      </div>
      <button onClick={onNext} disabled={selected.length === 0}
        style={{
          width: "100%", padding: "16px", border: "none", borderRadius: 14,
          background: selected.length > 0 ? BRAND.green : BRAND.grey200,
          color: selected.length > 0 ? "#FFF" : BRAND.grey400,
          fontSize: 16, fontWeight: 700, cursor: selected.length > 0 ? "pointer" : "default",
          marginTop: 20, transition: "all 0.3s", fontFamily: "inherit",
        }}>
        Weiter{selected.length > 0 ? ` · ${selected.length} ausgewählt` : ""}
      </button>
    </OnboardingShell>
  );
}

function StepSize({ clothingSize, shoeSize, onClothingChange, onShoeChange, onNext }) {
  return (
    <OnboardingShell step={2} total={4} subtitle="So we only show items that fit.">
      <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 28px", letterSpacing: -0.3, color: BRAND.black }}>
        Deine Größen
      </h2>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: BRAND.grey800 }}>Kleidung</p>
        <div style={{ display: "flex", gap: 8 }}>
          {SIZES.clothing.map(s => (
            <button key={s} onClick={() => onClothingChange(s)}
              style={{
                flex: 1, padding: "14px 0",
                border: clothingSize === s ? `2px solid ${BRAND.green}` : `2px solid ${BRAND.grey200}`,
                borderRadius: 12,
                background: clothingSize === s ? BRAND.green : BRAND.cardBg,
                color: clothingSize === s ? "#FFF" : BRAND.grey800,
                fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                fontFamily: "inherit",
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: BRAND.grey800 }}>Schuhe</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SIZES.shoes.map(s => (
            <button key={s} onClick={() => onShoeChange(s)}
              style={{
                padding: "12px 16px",
                border: shoeSize === s ? `2px solid ${BRAND.green}` : `2px solid ${BRAND.grey200}`,
                borderRadius: 12,
                background: shoeSize === s ? BRAND.green : BRAND.cardBg,
                color: shoeSize === s ? "#FFF" : BRAND.grey800,
                fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                fontFamily: "inherit",
              }}>
              EU {s}
            </button>
          ))}
        </div>
      </div>
      <button onClick={onNext}
        style={{
          width: "100%", padding: "16px", border: "none", borderRadius: 14,
          background: BRAND.green, color: "#FFF",
          fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
        {clothingSize || shoeSize ? "Weiter" : "Überspringen"}
      </button>
    </OnboardingShell>
  );
}

function StepPrice({ value, onChange, onNext }) {
  return (
    <OnboardingShell step={3} total={4} subtitle="We'll prioritize finds in your comfort zone.">
      <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 24px", letterSpacing: -0.3, color: BRAND.black }}>
        Dein Budget?
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PRICE_RANGES.map(p => (
          <button key={p.id} onClick={() => onChange(p.id)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px",
              border: value === p.id ? `2px solid ${BRAND.green}` : `2px solid ${BRAND.grey200}`,
              borderRadius: 16, background: value === p.id ? BRAND.greenLight : BRAND.cardBg,
              cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
            }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.black }}>{p.label}</div>
              <div style={{ fontSize: 13, color: BRAND.grey600, marginTop: 2 }}>{p.desc}</div>
            </div>
            {value === p.id && (
              <div style={{
                width: 24, height: 24, borderRadius: 12, background: BRAND.green,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#FFF", fontSize: 14, fontWeight: 700,
              }}>✓</div>
            )}
          </button>
        ))}
      </div>
      <button onClick={onNext}
        style={{
          width: "100%", padding: "16px", border: "none", borderRadius: 14,
          background: BRAND.green, color: "#FFF",
          fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 24,
          fontFamily: "inherit",
        }}>
        {value ? "Feed anzeigen →" : "Überspringen →"}
      </button>
    </OnboardingShell>
  );
}

function ItemCard({ item, onLike, onSkip, liked, skipped }) {
  const discount = Math.round((1 - item.price / item.originalPrice) * 100);
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      background: BRAND.cardBg, borderRadius: 16, overflow: "hidden",
      border: `1px solid ${BRAND.grey200}`, transition: "all 0.3s",
      opacity: skipped ? 0.35 : 1,
    }}>
      <div style={{ height: 200, position: "relative", overflow: "hidden", background: BRAND.grey100 }}>
        {!imgError ? (
          <img src={item.img} alt={item.name} onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{
            width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 48, background: BRAND.grey100,
          }}>
            {item.cat === "shoes" ? "👟" : item.cat === "bags" ? "👜" : item.cat === "dresses" ? "👗" : item.cat === "jackets" ? "🧥" : item.cat === "jeans" ? "👖" : "👕"}
          </div>
        )}
        <span style={{
          position: "absolute", top: 10, left: 10, background: BRAND.green, color: "#FFF",
          fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 8,
        }}>−{discount}%</span>
        <span style={{
          position: "absolute", top: 10, right: 10,
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
          fontSize: 10, fontWeight: 600, padding: "4px 8px", borderRadius: 8, color: BRAND.grey600,
        }}>{item.platform}</span>
      </div>
      <div style={{ padding: "12px 12px 10px" }}>
        <div style={{ fontSize: 11, color: BRAND.grey400, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{item.brand}</div>
        <div style={{ fontSize: 14, fontWeight: 500, margin: "3px 0", color: BRAND.black, lineHeight: 1.3 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: BRAND.black }}>€{item.price}</span>
          <span style={{ fontSize: 13, color: BRAND.grey400, textDecoration: "line-through" }}>€{item.originalPrice}</span>
        </div>
        <div style={{ fontSize: 11, color: BRAND.grey400, marginBottom: 10 }}>{item.condition}</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={onLike} style={{
            flex: 1, padding: "9px", border: liked ? `2px solid ${BRAND.red}` : `2px solid ${BRAND.grey200}`,
            borderRadius: 10, background: liked ? BRAND.redLight : BRAND.cardBg,
            cursor: "pointer", fontSize: 16, transition: "all 0.2s", fontFamily: "inherit",
          }}>{liked ? "♥" : "♡"}</button>
          <button onClick={onSkip} style={{
            flex: 1, padding: "9px", border: `2px solid ${BRAND.grey200}`, borderRadius: 10,
            background: skipped ? BRAND.grey100 : BRAND.cardBg, cursor: "pointer",
            fontSize: 12, color: BRAND.grey400, transition: "all 0.2s", fontFamily: "inherit", fontWeight: 500,
          }}>Not for me</button>
        </div>
      </div>
    </div>
  );
}

function PersonalizedFeed({ preferences }) {
  const [liked, setLiked] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());
  const [feedUpdated, setFeedUpdated] = useState(false);
  const [activeTab, setActiveTab] = useState("foryou");

  const styleNames = preferences.styles.map(s => STYLES.find(st => st.id === s)?.label).filter(Boolean);

  const scoredItems = MOCK_ITEMS.map(item => {
    let score = 0;
    const styleOverlap = item.styles.filter(s => preferences.styles.includes(s)).length;
    score += styleOverlap * 3;
    const priceRange = PRICE_RANGES.find(p => p.id === preferences.price);
    if (priceRange && item.price <= priceRange.max) score += 2;
    liked.forEach(likedId => {
      const likedItem = MOCK_ITEMS.find(i => i.id === likedId);
      if (likedItem) {
        if (likedItem.styles.some(s => item.styles.includes(s))) score += 1;
        if (likedItem.cat === item.cat) score += 1;
      }
    });
    skipped.forEach(skippedId => {
      const skippedItem = MOCK_ITEMS.find(i => i.id === skippedId);
      if (skippedItem && skippedItem.cat === item.cat && skippedItem.styles.every(s => item.styles.includes(s))) score -= 1;
    });
    return { ...item, score };
  }).sort((a, b) => b.score - a.score);

  const topItems = scoredItems.filter(i => !skipped.has(i.id));

  const triggerFeedback = () => { setFeedUpdated(true); setTimeout(() => setFeedUpdated(false), 2200); };
  const handleLike = (id) => { setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }); triggerFeedback(); };
  const handleSkip = (id) => { setSkipped(prev => new Set(prev).add(id)); triggerFeedback(); };

  const getReasonTag = (item) => {
    const matched = item.styles.filter(s => preferences.styles.includes(s));
    if (matched.length > 0) return `Matches your ${STYLES.find(s => s.id === matched[0])?.label} style`;
    return "Popular near you";
  };

  return (
    <div style={{ minHeight: "100vh", background: BRAND.cream, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <div style={{ padding: "14px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: BRAND.black }}>faircado</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {["📷", "🔔"].map(icon => (
            <div key={icon} style={{
              width: 36, height: 36, borderRadius: 12, background: BRAND.cardBg,
              border: `1px solid ${BRAND.grey200}`, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 18, cursor: "pointer",
            }}>{icon}</div>
          ))}
        </div>
      </div>

      <div style={{
        margin: "14px 20px", padding: "12px 16px", background: BRAND.greenLight,
        borderRadius: 14, fontSize: 13, color: BRAND.greenDark, lineHeight: 1.5,
        border: `1px solid ${BRAND.green}22`,
      }}>
        <span style={{ fontWeight: 700 }}>🌿 Your feed is personalized</span>
        <span style={{ color: BRAND.green, margin: "0 6px" }}>·</span>
        {styleNames.join(", ")}
        {preferences.clothingSize && <><span style={{ color: BRAND.green, margin: "0 6px" }}>·</span>Size {preferences.clothingSize}</>}
        {preferences.price && <><span style={{ color: BRAND.green, margin: "0 6px" }}>·</span>{PRICE_RANGES.find(p => p.id === preferences.price)?.label}</>}
      </div>

      <div style={{ display: "flex", padding: "0 20px", borderBottom: `1px solid ${BRAND.grey200}` }}>
        {[{ id: "foryou", label: "Für dich" }, { id: "popular", label: "Beliebt" }, { id: "new", label: "Gerade gelistet" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 14px", border: "none",
            borderBottom: activeTab === tab.id ? `2.5px solid ${BRAND.green}` : "2.5px solid transparent",
            background: "none", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400,
            color: activeTab === tab.id ? BRAND.black : BRAND.grey400,
            cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
          }}>{tab.label}</button>
        ))}
      </div>

      {feedUpdated && (
        <div style={{
          margin: "12px 20px 0", padding: "10px 14px", background: BRAND.green, color: "#FFF",
          borderRadius: 12, fontSize: 13, fontWeight: 600, textAlign: "center", animation: "fadeIn 0.3s ease",
        }}>✨ Feed updated based on your preference</div>
      )}

      {liked.size > 0 && !feedUpdated && (
        <div style={{
          margin: "12px 20px 0", padding: "10px 14px", background: BRAND.redLight,
          borderRadius: 12, fontSize: 13, color: BRAND.red, fontWeight: 600, border: `1px solid ${BRAND.red}22`,
        }}>♥ {liked.size} item{liked.size > 1 ? "s" : ""} saved · Feed is learning your taste</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "14px 20px 100px" }}>
        {topItems.map((item, i) => (
          <div key={item.id} style={{ animation: `fadeSlideUp 0.4s ease ${i * 0.06}s both` }}>
            {(i === 0 || i === 4) && (
              <div style={{ fontSize: 11, color: BRAND.grey400, marginBottom: 6, fontWeight: 600, letterSpacing: 0.2 }}>
                {getReasonTag(item)}
              </div>
            )}
            <ItemCard item={item} liked={liked.has(item.id)} skipped={skipped.has(item.id)}
              onLike={() => handleLike(item.id)} onSkip={() => handleSkip(item.id)} />
          </div>
        ))}
      </div>

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, display: "flex",
        justifyContent: "space-around", padding: "10px 0 22px",
        background: BRAND.cardBg, borderTop: `1px solid ${BRAND.grey200}`,
      }}>
        {[
          { icon: "🏠", label: "Home", active: true },
          { icon: "🔍", label: "Suche", active: false },
          { icon: "📷", label: "Snap", active: false },
          { icon: "♥", label: "Favoriten", active: false },
          { icon: "👤", label: "Profil", active: false },
        ].map(nav => (
          <div key={nav.label} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            opacity: nav.active ? 1 : 0.35, cursor: "pointer",
          }}>
            <span style={{ fontSize: 20 }}>{nav.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: BRAND.black }}>{nav.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default function FaircadoPrototype() {
  const [step, setStep] = useState(-1);
  const [gender, setGender] = useState(null);
  const [styles, setStyles] = useState([]);
  const [clothingSize, setClothingSize] = useState(null);
  const [shoeSize, setShoeSize] = useState(null);
  const [price, setPrice] = useState(null);

  if (step === -1) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: BRAND.black, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        padding: 40, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: BRAND.grey600, textTransform: "uppercase", marginBottom: 20 }}>
          Prototype · Take-Home Assessment
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#FFF", margin: "0 0 8px", letterSpacing: -0.5 }}>faircado</h1>
        <p style={{ fontSize: 15, color: BRAND.grey400, lineHeight: 1.6, maxWidth: 300, margin: "0 0 12px" }}>Second-hand made easyyy</p>
        <div style={{ width: 48, height: 3, background: BRAND.green, borderRadius: 2, margin: "16px 0 28px" }} />
        <p style={{ fontSize: 14, color: BRAND.grey600, lineHeight: 1.7, maxWidth: 320, margin: "0 0 40px" }}>
          Enriched onboarding → instant personalized feed.<br />Showing how preference signals power discovery from minute one.
        </p>
        <button onClick={() => setStep(0)} style={{
          padding: "16px 48px", border: `2px solid ${BRAND.green}`, borderRadius: 14,
          background: BRAND.green, color: "#FFF", fontSize: 16, fontWeight: 700,
          cursor: "pointer", transition: "all 0.3s", fontFamily: "inherit",
        }}
          onMouseOver={e => { e.target.style.background = "transparent"; }}
          onMouseOut={e => { e.target.style.background = BRAND.green; }}>
          Start Onboarding →
        </button>
        <div style={{ marginTop: 48, fontSize: 12, color: BRAND.grey600 }}>Built by Zahra Mammadli · May 2026</div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
      </div>
    );
  }

  if (step === 0) return <StepGender value={gender} onChange={setGender} onNext={() => setStep(1)} />;
  if (step === 1) return <StepStyle selected={styles} onChange={setStyles} onNext={() => setStep(2)} />;
  if (step === 2) return <StepSize clothingSize={clothingSize} shoeSize={shoeSize} onClothingChange={setClothingSize} onShoeChange={setShoeSize} onNext={() => setStep(3)} />;
  if (step === 3) return <StepPrice value={price} onChange={setPrice} onNext={() => setStep(4)} />;

  return <PersonalizedFeed preferences={{ gender, styles, clothingSize, shoeSize, price }} />;
}
