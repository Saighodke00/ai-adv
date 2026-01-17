
import { GoogleGenAI } from "@google/genai";

export const geminiService = {
  /**
   * Generates a logo based on detailed business details.
   */
  async generateLogo(params: {
    companyName?: string;
    industry: string;
    audience: string;
    personality: string;
    colors: string[];
    tagline?: string;
    iconStyle: string;
    fontStyle: string;
  }) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const personalityCues: Record<string, string> = {
      'Professional & Corporate': 'structured, trustworthy, solid, clean sans-serif typography, blue-chip feel, stable',
      'Playful & Energetic': 'vibrant, rounded shapes, dynamic movement, friendly curves, enthusiastic, high-spirited',
      'Luxury & Elegant': 'sophisticated, thin lines, serif typography, high-end, premium, spacious, graceful',
      'Minimal & Modern': 'uncluttered, geometric, stark, functional, futuristic, sleek, contemporary',
      'Vintage & Traditional': 'textured, heritage feel, classic emblems, nostalgic, ornate borders, established',
      'Organic & Natural': 'flowing lines, earth tones, soft shapes, eco-friendly, botanical hints, grounded',
      'Bold & Disruptive': 'high contrast, edgy, thick strokes, aggressive geometry, unconventional, rebellious',
      'High-Tech & Futuristic': 'circuit-like patterns, sleek metallic feel, digital precision, neon accents, advanced',
      'Friendly & Approachable': 'warm, soft edges, inviting icons, human-centric, casual but reliable, kind',
      'Sustainable & Earth-Friendly': 'green-centric, botanical motifs, balanced and ethical, raw textures, renewable',
      'Fast-Paced & Tech-Forward': 'italicized speed lines, sharp corners, motion-blur effects, high-velocity, rapid',
      'Community-Driven & Warm': 'interlocking circles, connectivity, inclusive, group-focused symbols, shared',
      'Artistic & Creative': 'unconventional layouts, painterly textures, expressive brushwork, unique flair, imaginative',
      'Reliable & Established': 'strong architectural forms, deep colors, bold weighting, institutional feel, sturdy',
      'Whimsical & Magical': 'dreamy elements, sparkling accents, playful proportions, imaginative and soft, ethereal',
      'Industrial & Rugged': 'heavy iron-like textures, gear motifs, sturdy construction, raw and powerful weighting, gritty',
      'Ethereal & Zen': 'light as air, thin gradients, meditative shapes, high-harmony, calm and balanced, peaceful',
      'Scholarly & Academic': 'bookish motifs, ink-pen styles, refined classicism, intellectual weight and symmetry, learned',
      'Sporty & High-Performance': 'aerodynamic shapes, high-tension curves, competitive energy, swift movement, athletic'
    };

    const styleCues: Record<string, string> = {
      'Abstract Geometry': 'unique non-representational shapes, mathematical balance, symbolic forms, sharp vectors',
      'Letter-based (Wordmark)': 'creative typography, letterform art, customized glyphs, character-based focal point',
      'Pictorial (Object-based)': 'recognizable silhouette of a related industry object, iconic representation, literal',
      'Minimalist Line-art': 'single stroke width, elegant contours, no fills, maximum clarity and breath, refined',
      'Mascot / Character': 'personified brand ambassador, stylized figure, expressive and memorable character design',
      'Badge / Emblem': 'contained within a shield or circle, decorative borders, authoritative crest, traditional',
      'Monogram': 'interlocking initials, modern heraldry, compact and prestigious identity, signature feel',
      'Gradient Modern': 'smooth color transitions, depth, glossy finish, web 3.0 aesthetic, tech-forward',
      'Hand-drawn / Organic': 'sketch-like texture, irregular lines, artisanal, handcrafted appeal, human touch',
      'Negative Space': 'hidden secondary icons within shapes, smart background usage, clever visual pun, multi-layered',
      'Duo-tone Minimalist': 'strictly two colors, high contrast, poster-style simplicity, punchy and clear, iconic',
      'Isometric 3D (Vector)': '3D depth achieved through 2D geometry, architectural and precise vector art, structured',
      'Brutalist': 'raw, unpolished, heavy industrial typography, stark and anti-design vibes, high impact, honest',
      'Geometric Animals': 'wildlife constructed from simple geometric shapes, modern nature representation, stylized',
      'Pixel Art / Retro': '8-bit or 16-bit blocky aesthetics, nostalgic gaming feel, digital grid precision, lo-fi',
      'Art Nouveau / Decorative': 'ornate flowing curves, natural forms, highly decorative and feminine elements, floral',
      'Bauhaus / Functionalist': 'primary shapes (circle, square, triangle), emphasis on utility, color-blocking, basic',
      'Stained Glass Style': 'segmented colors with black lead-like outlines, kaleidoscopic, vibrant transparency, radiant',
      'Origami / Paper-fold': 'sharp creases, paper-like shadows, folded geometry, precision and patience, layered'
    };

    const fontStyleCues: Record<string, string> = {
      'modern': 'sleek sans-serif, geometric, high-tech, balanced weights, clean lines',
      'classic': 'traditional serif, authoritative, timeless, elegant proportions, high readability',
      'playful': 'rounded, bubbly, friendly, informal, expressive curves, jovial',
      'luxury': 'high-contrast serif, thin hairline strokes, expensive, sophisticated, fashion-forward',
      'minimal': 'ultra-thin sans-serif, spacious, stark, functional, hidden details'
    };

    const personalityDetail = personalityCues[params.personality] || params.personality;
    const styleDetail = styleCues[params.iconStyle] || params.iconStyle;
    const fontDetail = fontStyleCues[params.fontStyle] || params.fontStyle;

    const promptText = `Task: Professional Brand Identity Design (Logo + Wordmark).
    Brand Name: ${params.companyName || "The Brand"}
    Industry: ${params.industry}
    Target Audience: ${params.audience}
    Personality: ${params.personality} (${personalityDetail})
    Visual Style: ${params.iconStyle} (${styleDetail})
    Typography Preference: ${params.fontStyle} (${fontDetail})
    Color Palette: ${params.colors.join(", ")}
    
    Strict Design Rules:
    1. Background: SOLID WHITE (#FFFFFF). No mockups, no textures, no shadows, no gradients in background.
    2. Layout: The logo icon must be perfectly centered above the brand name. The brand name must be centered.
    3. Iconography: Create a distinct, flat vector symbol that subtly represents ${params.industry}.
    4. Typography: Use a font that perfectly aligns with the ${fontDetail} style. No generic fonts.
    5. Scalability: Ensure lines are thick enough to be visible at small sizes. No complex photographic details.
    6. Aesthetics: Production-grade, professional, and unique. Avoid clichés.
    7. No Overlap: Keep a clear safe-zone between the icon and the text.
    
    Output Format: A clean, high-resolution logo suitable for a corporate brand guide.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: promptText }]
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  },

  async generateOccasionCopy(occasion: string, language: string, year: number) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const promptText = `Write a short, engaging greeting for ${occasion} in the year ${year}. Language: ${language}. Return the text only.`;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptText
    });
    return response.text?.trim() || "";
  },

  async generateAIImage(params: {
    userPrompt: string;
    style: string;
    brandPersonality?: string;
    brandIndustry?: string;
    targetAudience?: string;
    brandColors?: string[];
  }) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const promptText = `Task: Create a professional marketing creative.
    Subject: ${params.userPrompt}
    Artistic Style: ${params.style}
    Industry: ${params.brandIndustry || "General"}
    Audience: ${params.targetAudience || "General Public"}
    Personality: ${params.brandPersonality || "Professional"}
    Colors: ${params.brandColors?.join(", ") || "Natural"}
    
    Guidelines: High resolution, professional composition, clean asset ready for branding.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: promptText }]
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  },

  async generateAIVideo(params: {
    prompt: string;
    resolution: "720p" | "1080p";
    aspectRatio: "16:9" | "9:16";
  }) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      let operation = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-preview",
        prompt: params.prompt,
        config: {
          numberOfVideos: 1,
          resolution: params.resolution,
          aspectRatio: params.aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const videoData = operation.response?.generatedVideos?.[0]?.video;
      if (!videoData?.uri) throw new Error("Video URI not found");

      return `${videoData.uri}&key=${process.env.API_KEY}`;
    } catch (error) {
      console.error("Video Generation Error:", error);
      throw error;
    }
  }
};
