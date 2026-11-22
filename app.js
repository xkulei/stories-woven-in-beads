const config = window.STORIES_CONFIG || {};

const media = {
  landing: {
    fallback: "./assets/maasai-landing.jpg",
    alt: "Collage of six Maasai faces in traditional adornment with the word MAASAI across the centre",
  },
  spear: {
    fallback: "./assets/spear-at-entrance.jpg",
    alt: "Spear standing in front of a wooden doorway in an earthen home",
  },
  beadworkPortrait1: { fallback: "./assets/beadwork-portrait-1.jpg", alt: "Portrait of a person wearing layered Maasai beadwork" },
  beadworkDetail: { fallback: "./assets/beadwork-detail.jpg", alt: "Close view of layered beaded necklaces and patterned cloth" },
  beadworkBasket: { fallback: "./assets/beadwork-basket.jpg", alt: "Colourful beaded items arranged inside a woven basket" },
  beadworkPortrait2: { fallback: "./assets/beadwork-portrait-2.jpg", alt: "Portrait of a smiling person wearing colourful beaded adornment" },
  hero: {
    fallback: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Traditional_Maasai_beadwork_and_cultural_identity_in_Kajiado_County.jpg/960px-Traditional_Maasai_beadwork_and_cultural_identity_in_Kajiado_County.jpg",
    alt: "Maasai woman wearing beadwork at a gathering in Kajiado County, Kenya",
    source: "https://commons.wikimedia.org/wiki/File:Traditional_Maasai_beadwork_and_cultural_identity_in_Kajiado_County.jpg",
    cardCredit: "Photo: Mark Myles Mugambi / CC BY-SA 4.0 · adapted",
  },
  shuka1: { fallback: "./assets/shuka-story-1.jpg" },
  shuka2: { fallback: "./assets/shuka-story-2.jpg" },
  shuka3: { fallback: "./assets/shuka-story-3.jpg" },
  shuka4: { fallback: "./assets/shuka-story-4.jpg" },
  shuka5: { fallback: "./assets/shuka-story-5.jpg" },
  voices1: { fallback: "./assets/voices-1.jpg" },
  voices2: { fallback: "./assets/voices-2.jpg" },
  voices3: { fallback: "./assets/voices-3.jpg" },
  voices4: { fallback: "./assets/voices-4.jpg" },
  voices5: { fallback: "./assets/voices-5.jpg" },
  voices6: { fallback: "./assets/voices-6.jpg" },
  voices7: { fallback: "./assets/voices-7.jpg" },
  voices8: { fallback: "./assets/voices-8.jpg" },
  hands: {
    chapter: "01 / 03",
    place: "MAASAI MARA, KENYA",
    title: "The hands behind the work.",
    description: "A photograph catches a beadmaker at work in the Maasai Mara. It asks us to notice the time, skill, and decisions that sit behind a finished piece.",
    context: "The Maa Trust describes beadwork as a source of income for women and their families, alongside its role as a long-practiced art.",
    detailTitle: "A skill in motion",
    detail: "Look at the maker's hands and the small choices involved in placing each bead. The photograph documents one moment of a much longer process.",
    fallback: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Masai_woman_making_a_beaded_necklace.jpg/960px-Masai_woman_making_a_beaded_necklace.jpg",
    alt: "Woman making a beaded necklace at a Maasai Mara campsite in Kenya",
    source: "https://commons.wikimedia.org/wiki/File:Masai_woman_making_a_beaded_necklace.jpg",
    artist: "Roberto Carisi",
    credit: "Roberto Carisi · CC BY-SA 4.0",
    cardCredit: "Photo: Roberto Carisi / CC BY-SA 4.0 · adapted",
  },
  craft: {
    chapter: "02 / 03",
    place: "KENYA",
    title: "The beauty of detail.",
    description: "From a distance, a necklace reads as one shape. Up close, it becomes a record of hundreds of individual placements, colours, and patterns.",
    context: "Beadwork is living creative practice. Meanings differ across makers and communities, so a particular piece is best understood through its maker's own account.",
    detailTitle: "Look at the pattern",
    detail: "Follow one line of beads across the necklace. A close crop makes the work itself the focus, inviting attention to pattern and construction.",
    fallback: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Maasai_beaded_necklace%2C_handcrafted_using_colorful_beads.jpg/960px-Maasai_beaded_necklace%2C_handcrafted_using_colorful_beads.jpg",
    alt: "Handcrafted Maasai beaded necklace photographed in Kenya",
    source: "https://commons.wikimedia.org/wiki/File:Maasai_beaded_necklace,_handcrafted_using_colorful_beads.jpg",
    artist: "Tish Madesh",
    credit: "Tish Madesh · CC BY-SA 4.0",
    cardCredit: "Photo: Tish Madesh / CC BY-SA 4.0 · adapted",
  },
  market: {
    chapter: "03 / 03",
    place: "NAIROBI, KENYA",
    title: "Where stories travel.",
    description: "Beaded necklaces on display at an open-air market in Nairobi show the craft in another setting: seen, chosen, bought, and carried onward.",
    context: "The Maa Trust's beadwork project connects craft with income and opportunity. This market photograph shows one point in that wider journey.",
    detailTitle: "From maker to market",
    detail: "Notice how each piece has its own arrangement. A market display brings different makers' creative choices together, but the photograph does not identify who made each necklace.",
    fallback: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Maasai_Beaded_Necklaces.jpg/960px-Maasai_Beaded_Necklaces.jpg",
    alt: "Maasai beaded necklaces displayed at an open-air market in Nairobi",
    source: "https://commons.wikimedia.org/wiki/File:Maasai_Beaded_Necklaces.jpg",
    artist: "Queen Asali",
    credit: "Queen Asali · CC BY-SA 4.0",
    cardCredit: "Photo: Queen Asali / CC BY-SA 4.0 · adapted",
  },
};

const storyKeys = ["hands", "craft", "market"];
let currentStory = "hands";

function safePublicId(id) {
  return id.split("/").map(encodeURIComponent).join("/");
}

function cloudinaryUrl(key, width, height, options = {}) {
  const cloudName = String(config.cloudName || "").trim();
  const publicId = String(config.publicIds?.[key] || "").trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(cloudName) || !publicId) return null;
  const crop = options.crop || "fill";
  const gravity = options.gravity || "auto";
  const gravityPart = crop === "fit" ? "" : `,g_${gravity}`;
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_${crop}${gravityPart},w_${width},h_${height}/f_auto,q_auto/${safePublicId(publicId)}`;
}

function setMediaImage(element, key, width, height, options = {}) {
  const fallback = media[key].fallback;
  const transformed = cloudinaryUrl(key, width, height, options);
  const widths = [400, 640, 960, 1200, 1600];
  const ratio = height / width;
  element.removeAttribute("srcset");
  if (transformed) {
    element.srcset = widths.map((candidate) => `${cloudinaryUrl(key, candidate, Math.round(candidate * ratio), options)} ${candidate}w`).join(", ");
    element.sizes = options.sizes || "(max-width: 680px) 100vw, 50vw";
  }
  element.loading = options.loading || "lazy";
  element.decoding = "async";
  element.onerror = transformed ? () => {
    element.onerror = null;
    element.removeAttribute("srcset");
    element.src = fallback;
  } : null;
  element.src = transformed || fallback;
}

function setStory(key, focusTab = false) {
  if (!media[key] || key === "hero") return;
  currentStory = key;
  const story = media[key];
  document.querySelectorAll(".story-tab").forEach((tab) => {
    const active = tab.dataset.story === key;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focusTab) tab.focus();
  });
  const image = document.getElementById("story-image");
  image.alt = story.alt;
  setMediaImage(image, key, 1200, 1000, { sizes: "(max-width: 680px) 100vw, 55vw" });
  const detailImage = document.getElementById("detail-image");
  detailImage.alt = `Closer view of ${story.alt.toLowerCase()}`;
  setMediaImage(detailImage, key, 800, 520, { crop: "thumb", gravity: "auto:0", sizes: "390px" });
  document.getElementById("image-index").textContent = story.chapter;
  document.getElementById("story-place").textContent = story.place;
  document.getElementById("story-title").textContent = story.title;
  document.getElementById("story-description").textContent = story.description;
  document.getElementById("story-context").textContent = story.context;
  document.getElementById("story-source").href = story.source;
  document.getElementById("story-credit").textContent = story.credit;
  document.getElementById("detail-title").textContent = story.detailTitle;
  document.getElementById("detail-text").textContent = story.detail;
  hideDetail();
}

function hideDetail() {
  document.getElementById("detail-popover").hidden = true;
  document.getElementById("detail-trigger").setAttribute("aria-expanded", "false");
}

function makeCloudinaryPostcardUrl(key, note, cardTitle = "Stories Woven in Beads - Kenya") {
  const cloudName = String(config.cloudName || "").trim();
  const publicId = String(config.publicIds?.[key] || "").trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(cloudName) || !publicId) return null;
  if (/[\uD800-\uDFFF]/.test(note)) return null; // Cloudinary text fonts do not render emoji.
  const overlayText = (value) => encodeURIComponent(encodeURIComponent(value));
  const words = (note || "A story worth sharing.").trim().split(/\s+/);
  const lines = [];
  for (const originalWord of words) {
    let word = originalWord;
    while (word.length > 30) {
      lines.push(word.slice(0, 30));
      word = word.slice(30);
    }
    if (!word) continue;
    const last = lines.length - 1;
    if (last < 0 || `${lines[last]} ${word}`.length > 30) lines.push(word);
    else lines[last] += ` ${word}`;
  }
  const message = overlayText(lines.join("\n"));
  const credit = overlayText(media[key].cardCredit);
  const source = overlayText(media[key].source);
  const title = overlayText(cardTitle);
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,g_auto,w_1400,h_1000/b_rgb:202820,co_white,l_text:Arial_26_bold:${title}/fl_layer_apply,g_north_west,x_72,y_70/b_rgb:202820,co_white,l_text:Arial_62_bold:${message}/fl_layer_apply,g_south_west,x_72,y_130/b_rgb:202820,co_white,l_text:Arial_24:${credit}/fl_layer_apply,g_south_west,x_72,y_56/b_rgb:202820,co_white,l_text:Arial_16:${source}/fl_layer_apply,g_south_west,x_72,y_20/f_png/${safePublicId(publicId)}`;
}

const festivalOptions = {
  look: {
    shuka: { label: "Shuka & beadwork", image: "hero", card: "Shuka and beadwork" },
    necklace: { label: "Necklace detail", image: "craft", card: "Necklace detail" },
  },
  food: {
    milk: { label: "Milk", card: "Milk", insight: "In Transmara, a community account describes milk as a staple that can be shared with visitors as a sign of hospitality." },
    roast: { label: "Roasted meat", card: "Roasted meat", insight: "The Transmara account describes meat roasted over an open fire, sometimes with leaves and herbs for flavour, during gatherings and ceremonies." },
  },
  music: {
    enkalaoi: { label: "“Enkalaoi”", card: "Enkalaoi", video: "q9j4SzOOn4w", title: "“Enkalaoi” — Ilaitete Le Meto", iframeTitle: "Enkalaoi by Ilaitete Le Meto on YouTube" },
    orkuak: { label: "“Orkuak Le Maa”", card: "Orkuak Le Maa", video: "nl83ZNxaoaw", title: "“Orkuak Le Maa” — DJ QUEEN254", iframeTitle: "Orkuak Le Maa by DJ QUEEN254 on YouTube" },
  },
  word: {
    sopa: { label: "Sopa", meaning: "Hello", insight: "Try “sop ah” as a friendly hello when you meet someone." },
    ashe: { label: "Ashe", meaning: "Thank you", insight: "Say “Ashe” (áshé) to thank someone who has helped you." },
    sii: { label: "Sii sii", meaning: "Please", insight: "Use “Sii sii” (sí síí) when making a polite request." },
  },
};
const festivalSelection = { look: "shuka", food: "milk", music: "enkalaoi", word: "sopa" };
let visitorPhotoId = "";

function visitorPhotoUrl() {
  const cloudName = String(config.cloudName || "");
  if (!visitorPhotoId || !/^[a-zA-Z0-9_-]+$/.test(cloudName)) return "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,g_auto,w_600,h_600/f_auto,q_auto/${safePublicId(visitorPhotoId)}`;
}

function festivalVideoUrl() {
  const cloudName = String(config.cloudName || "");
  const baseId = String(config.publicIds?.festivalBaseVideo || "");
  if (!/^[a-zA-Z0-9_-]+$/.test(cloudName) || !baseId) return "";
  const look = festivalOptions.look[festivalSelection.look];
  const food = festivalOptions.food[festivalSelection.food];
  const music = festivalOptions.music[festivalSelection.music];
  const word = festivalOptions.word[festivalSelection.word];
  const text = (value) => encodeURIComponent(value);
  const layers = [];
  if (visitorPhotoId) layers.push(`l_${visitorPhotoId.replaceAll("/", ":")}/c_fill,g_auto,w_270,h_320/fl_layer_apply,g_north_east,x_25,y_85`);
  layers.push(`co_white,l_text:Arial_30_bold:${text("FESTIVAL IN A BOX - KENYA")}/fl_layer_apply,g_north_west,x_25,y_27`);
  layers.push(`b_rgb:1b2920,co_white,l_text:Arial_48_bold:${text(`${word.label} - ${word.meaning}`)}/fl_layer_apply,g_south_west,x_25,y_255`);
  layers.push(`b_rgb:1b2920,co_white,l_text:Arial_34_bold:${text(look.card)}/fl_layer_apply,g_south_west,x_25,y_195`);
  layers.push(`b_rgb:1b2920,co_white,l_text:Arial_34_bold:${text(food.card)}/fl_layer_apply,g_south_west,x_25,y_140`);
  layers.push(`b_rgb:1b2920,co_white,l_text:Arial_25:${text(`Listen separately: ${music.card}`)}/fl_layer_apply,g_south_west,x_25,y_80`);
  layers.push(`b_rgb:1b2920,co_white,l_text:Arial_18:${text("Contributor photos - creator rights retained")}/fl_layer_apply,g_south_west,x_25,y_24`);
  return `https://res.cloudinary.com/${cloudName}/video/upload/${layers.join("/")}/f_mp4,q_auto/${safePublicId(baseId)}.mp4`;
}

const shukaSlides = [
  { key: "shuka1", title: "What the colours of the Maasai shuka mean", caption: "An introduction to shuka cloth and its colours.", alt: "Muse visual story cover showing Maasai men in red shukas" },
  { key: "shuka2", title: "More than colour and pattern", caption: "Shuka cloth is part of living Maasai identity, with more than one way to wear and understand it.", alt: "Four people seen from behind in red and blue shukas, with a caption about meaning" },
  { key: "shuka3", title: "Red, white, and blue", caption: "The original frame connects these colours with courage, peace, milk, rain, and hope.", alt: "Maasai men in red shukas with text describing associations for red, white, and blue" },
  { key: "shuka4", title: "Green, black, yellow, and orange", caption: "The original frame connects these colours with land, resilience, sunlight, and hospitality.", alt: "Maasai men in shukas with text describing associations for green, black, yellow, and orange" },
  { key: "shuka5", title: "An identity that keeps evolving", caption: "The final frame celebrates the shuka as part of a living, changing culture.", alt: "Four people in red and blue shukas seen from behind with a closing reflection" },
];
const shukaColours = {
  red: { title: "Red — courage and unity", meaning: "Red is often associated with bravery, kinship, and life. It is one of the most recognisable colours in Maasai dress.", slide: 2 },
  white: { title: "White — peace and health", meaning: "White can evoke peace, health, and milk, which has an important place in Maasai food traditions.", slide: 2 },
  blue: { title: "Blue — sky and rain", meaning: "Blue can suggest the sky, rain, and water that sustain people, cattle, and pasture.", slide: 2 },
  green: { title: "Green — pasture and land", meaning: "Green can represent grass, grazing land, and the health of livestock and people.", slide: 3 },
  black: { title: "Black — resilience", meaning: "Black has been linked with challenges people endure and the strength to meet them.", slide: 3 },
  sun: { title: "Yellow and orange — hospitality", meaning: "Yellow and orange are often associated with warmth and hospitality; orange also recalls the gourds used to serve milk.", slide: 3 },
};
let currentShukaSlide = 0;

function setShukaSlide(index) {
  currentShukaSlide = (index + shukaSlides.length) % shukaSlides.length;
  const slide = shukaSlides[currentShukaSlide];
  const image = document.getElementById("shuka-image");
  image.alt = slide.alt;
  setMediaImage(image, slide.key, 828, 1048, { crop: "fit", sizes: "(max-width: 1050px) 100vw, 42vw" });
  document.getElementById("shuka-slide-count").textContent = `${String(currentShukaSlide + 1).padStart(2, "0")} / 05`;
  document.getElementById("shuka-slide-title").textContent = slide.title;
  document.getElementById("shuka-slide-caption").textContent = slide.caption;
  document.querySelectorAll(".shuka-dot").forEach((dot, dotIndex) => {
    dot.setAttribute("aria-pressed", String(dotIndex === currentShukaSlide));
  });
}

function setShukaColour(key) {
  const colour = shukaColours[key];
  if (!colour) return;
  document.querySelectorAll(".shuka-colour").forEach((button) => {
    const active = button.dataset.colour === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.getElementById("shuka-meaning-title").textContent = colour.title;
  document.getElementById("shuka-meaning-text").textContent = colour.meaning;
  setShukaSlide(colour.slide);
}

function festivalCardUrl() {
  const look = festivalOptions.look[festivalSelection.look];
  const food = festivalOptions.food[festivalSelection.food];
  const music = festivalOptions.music[festivalSelection.music];
  const word = festivalOptions.word[festivalSelection.word];
  const base = makeCloudinaryPostcardUrl(look.image, `${word.label} - ${word.meaning}. ${look.card}. ${food.card}. ${music.card}.`, "Festival in a Box - Kenya");
  if (!base || !visitorPhotoId) return base;
  const layer = `l_${visitorPhotoId.replaceAll("/", ":")}/c_fill,g_auto,w_260,h_260/fl_layer_apply,g_north_east,x_72,y_70`;
  return base.replace("/b_rgb:202820", `/${layer}/b_rgb:202820`);
}

function updateFestival(changedGroup = "") {
  const look = festivalOptions.look[festivalSelection.look];
  const food = festivalOptions.food[festivalSelection.food];
  const music = festivalOptions.music[festivalSelection.music];
  const word = festivalOptions.word[festivalSelection.word];
  const image = document.getElementById("festival-image");
  image.alt = media[look.image].alt;
  setMediaImage(image, look.image, 1000, 760, { sizes: "(max-width: 680px) 100vw, 40vw" });
  document.getElementById("festival-word").textContent = word.label;
  document.getElementById("festival-meaning").textContent = `${word.meaning} in Maa`;
  document.getElementById("festival-summary").textContent = `${look.label} · ${food.label} · ${music.label}`;
  document.getElementById("festival-credit").textContent = media[look.image].cardCredit;
  const visitorImage = document.getElementById("festival-visitor-image");
  visitorImage.hidden = !visitorPhotoId;
  if (visitorPhotoId) visitorImage.src = visitorPhotoUrl();
  else visitorImage.removeAttribute("src");
  document.getElementById("festival-food-insight").textContent = food.insight;
  document.getElementById("festival-word-insight").textContent = word.insight;
  const url = festivalCardUrl();
  const render = document.getElementById("festival-render-link");
  render.href = url || "#festival";
  render.setAttribute("aria-disabled", String(!url));
  if (changedGroup === "music") {
    const video = document.getElementById("festival-video");
    video.src = `https://www.youtube-nocookie.com/embed/${music.video}`;
    video.title = music.iframeTitle;
  }
  document.getElementById("festival-track-title").textContent = music.title;
  if (!document.getElementById("festival-video-result").hidden) refreshFestivalVideo();
}

let festivalVideoGeneration = 0;
async function refreshFestivalVideo() {
  const generation = ++festivalVideoGeneration;
  const url = festivalVideoUrl();
  const video = document.getElementById("festival-personal-video");
  video.pause();
  video.removeAttribute("src");
  video.load();
  document.getElementById("festival-video-link").href = url;
  const status = document.getElementById("festival-video-status");
  status.textContent = "Cloudinary is preparing your video. A new version may take a minute.";
  for (let attempt = 0; attempt < 24 && generation === festivalVideoGeneration; attempt++) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (generation !== festivalVideoGeneration) return;
      if (response.ok) {
        video.src = url;
        video.load();
        status.textContent = "Your video is ready. Press play to watch it.";
        return;
      }
      if (response.status !== 423) break;
    } catch (error) {
      // Keep the share link available if a status check is blocked.
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  if (generation === festivalVideoGeneration) status.textContent = "Cloudinary is still preparing this version. Press Create short video to retry, or open the video link.";
}

let widgetPromise;
function loadFestivalWidget() {
  if (window.cloudinary?.createUploadWidget) return Promise.resolve();
  if (!widgetPromise) widgetPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Upload widget did not load"));
    document.head.append(script);
  });
  return widgetPromise;
}

async function openFestivalUpload(statusId = "festival-upload-status") {
  const status = document.getElementById(statusId);
  status.textContent = "Opening photo picker…";
  try {
    await loadFestivalWidget();
    const widget = window.cloudinary.createUploadWidget({
      cloudName: config.cloudName,
      uploadPreset: config.visitorUploadPreset,
      sources: ["local"],
      resourceType: "image",
      clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      maxFiles: 1,
      multiple: false,
      maxFileSize: 5000000,
      maxImageWidth: 1600,
      maxImageHeight: 1600,
      showAdvancedOptions: false,
    }, (error, result) => {
      if (error) { status.textContent = "Upload failed. Please try a JPG, PNG, or WebP under 5 MB."; return; }
      if (result?.event !== "success") return;
      const id = String(result.info?.public_id || "");
      if (result.info?.resource_type !== "image" || !/^stories-woven-in-beads\/visitor-photos\/[a-zA-Z0-9_-]+$/.test(id)) {
        status.textContent = "The uploaded image could not be used. Please try again.";
        return;
      }
      visitorPhotoId = id;
      document.getElementById("festival-remove-photo").hidden = false;
      updateFestival();
      updateTryOnPhotoState();
      status.textContent = statusId === "tryon-status"
        ? "Portrait uploaded. Press Generate my preview to try the look."
        : "Photo added. Your card and video now include it.";
    });
    widget.open();
    status.textContent = "Choose a photo to upload.";
  } catch (error) {
    status.textContent = "Photo picker unavailable. You can still make a festival card and video.";
  }
}

let tryOnAvailable = false;
function updateTryOnPhotoState() {
  document.getElementById("tryon-photo-label").textContent = visitorPhotoId
    ? "Portrait selected. You can generate your preview."
    : "No portrait selected yet.";
  document.getElementById("tryon-generate").disabled = !visitorPhotoId || !tryOnAvailable;
}

async function checkTryOnServer() {
  try {
    const response = await fetch("/api/try-on/status", { cache: "no-store" });
    const result = await response.json();
    tryOnAvailable = response.ok && result.available === true;
  } catch (error) {
    tryOnAvailable = false;
  }
  updateTryOnPhotoState();
  if (!tryOnAvailable) document.getElementById("tryon-status").textContent = "The live preview needs the site's Node server. The sample shows what it can create.";
}

async function generateTryOn() {
  if (!visitorPhotoId || !tryOnAvailable) return;
  const button = document.getElementById("tryon-generate");
  const status = document.getElementById("tryon-status");
  button.disabled = true;
  status.textContent = "Cloudinary is creating your preview. This may take a minute…";
  try {
    const response = await fetch("/api/try-on", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ photoPublicId: visitorPhotoId }),
      signal: AbortSignal.timeout(130000),
    });
    const result = await response.json();
    if (!response.ok || !result.imageUrl) throw new Error(result.error || "Generation failed.");
    const image = document.getElementById("tryon-image");
    image.src = result.imageUrl;
    image.alt = "AI visualization of your portrait with a red shuka and layered beadwork";
    document.getElementById("tryon-caption").textContent = "AI VISUALIZATION · YOUR PREVIEW";
    const link = document.getElementById("tryon-open");
    link.href = result.imageUrl;
    link.hidden = false;
    status.textContent = "Your preview is ready. Open the full image to save it before the temporary link expires.";
  } catch (error) {
    status.textContent = error.message || "Preview unavailable. Please try again.";
  } finally {
    updateTryOnPhotoState();
  }
}

function updatePostcard() {
  const key = document.getElementById("card-chapter").value;
  const story = media[key];
  const message = document.getElementById("card-message").value.trim() || "A story worth sharing.";
  const image = document.getElementById("card-image");
  image.alt = story.alt;
  setMediaImage(image, key, 1200, 870, { sizes: "(max-width: 680px) 100vw, 55vw" });
  document.getElementById("card-preview-message").textContent = message;
  document.getElementById("card-preview-credit").textContent = story.cardCredit;
  document.getElementById("char-count").textContent = `${document.getElementById("card-message").value.length} / 75`;
  const renderLink = document.getElementById("cloudinary-render-link");
  const copyLink = document.getElementById("copy-card-link");
  const url = makeCloudinaryPostcardUrl(key, message);
  renderLink.hidden = !url;
  copyLink.hidden = !url;
  if (url) renderLink.href = url;
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function drawCover(ctx, image, width, height) {
  const ratio = Math.max(width / image.width, height / image.height);
  const sw = width / ratio;
  const sh = height / ratio;
  const sx = (image.width - sw) / 2;
  const sy = (image.height - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
}

function wrapLines(ctx, value, maxWidth) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(trial).width > maxWidth) {
      lines.push(line);
      line = word;
    } else line = trial;
  }
  if (line) lines.push(line);
  return lines;
}

async function downloadPostcard(event) {
  event.preventDefault();
  const status = document.getElementById("download-status");
  const button = document.getElementById("download-card");
  const key = document.getElementById("card-chapter").value;
  const story = media[key];
  const message = document.getElementById("card-message").value.trim() || "A story worth sharing.";
  status.textContent = "Creating your postcard…";
  button.disabled = true;
  try {
    const renderUrl = makeCloudinaryPostcardUrl(key, message);
    if (renderUrl) {
      try {
        const response = await fetch(renderUrl);
        if (!response.ok) throw new Error(`Cloudinary returned ${response.status}`);
        const blobUrl = URL.createObjectURL(await response.blob());
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `stories-woven-in-beads-${key}.png`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
        status.textContent = "Cloudinary postcard saved with image credit and source.";
        return;
      } catch (error) {
        status.textContent = "Cloudinary render unavailable; creating a local copy…";
      }
    }
    const image = await loadImage(cloudinaryUrl(key, 1400, 1000) || story.fallback).catch(() => loadImage(story.fallback));
    const canvas = document.createElement("canvas");
    canvas.width = 1400;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    drawCover(ctx, image, 1400, 1000);
    const shade = ctx.createLinearGradient(0, 280, 0, 1000);
    shade.addColorStop(0, "rgba(12,22,16,0)");
    shade.addColorStop(1, "rgba(12,22,16,.91)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, 1400, 1000);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px Arial, sans-serif";
    ctx.fillText("STORIES WOVEN IN BEADS  ·  KENYA", 80, 610);
    ctx.font = "64px Georgia, serif";
    const lines = wrapLines(ctx, message, 1200).slice(0, 3);
    lines.forEach((line, index) => ctx.fillText(line, 80, 710 + index * 76));
    ctx.font = "23px Arial, sans-serif";
    ctx.fillText(story.cardCredit, 80, 933);
    ctx.font = "16px Arial, sans-serif";
    ctx.fillText(story.source, 80, 969, 1240);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `stories-woven-in-beads-${key}.png`;
    link.click();
    status.textContent = "Postcard saved. Image credit and license are included.";
  } catch (error) {
    status.textContent = "The image could not be loaded for download. Please try again.";
  } finally {
    button.disabled = false;
  }
}

setMediaImage(document.getElementById("landing-image"), "landing", 828, 1043, { crop: "fit", sizes: "100vw", loading: "eager" });
setMediaImage(document.getElementById("spear-image"), "spear", 828, 1413, { crop: "fit", sizes: "(max-width: 800px) 100vw, 42vw" });
[
  ["beadwork-image-1", "beadworkPortrait1"],
  ["beadwork-image-2", "beadworkDetail"],
  ["beadwork-image-3", "beadworkBasket"],
  ["beadwork-image-4", "beadworkPortrait2"],
].forEach(([id, key]) => setMediaImage(document.getElementById(id), key, 828, 1040, { crop: "fit", sizes: "(max-width: 680px) 48vw, 24vw" }));
setStory("hands");
updatePostcard();
updateFestival();
for (let index = 1; index <= 8; index++) {
  const key = `voices${index}`;
  setMediaImage(document.getElementById(`voices-image-${index}`), key, 560, 700, {
    crop: "fit", sizes: "(max-width: 680px) 75vw, (max-width: 1050px) 40vw, 23vw",
  });
  document.getElementById(`voices-link-${index}`).href = cloudinaryUrl(key, 1200, 1500, { crop: "fit" }) || media[key].fallback;
}
setMediaImage(document.getElementById("lemayian-image"), "voices1", 828, 1040, { crop: "fit", sizes: "(max-width: 900px) 100vw, 43vw" });
const spearVideo = document.getElementById("spear-video");
const spearVideoSource = document.getElementById("spear-video-source");
const spearVideoId = String(config.publicIds?.spearVideo || "").trim();
const videoCloudName = String(config.cloudName || "").trim();
if (/^[a-zA-Z0-9_-]+$/.test(videoCloudName) && spearVideoId) {
  const videoBase = `https://res.cloudinary.com/${videoCloudName}/video/upload`;
  const videoPublicId = safePublicId(spearVideoId);
  spearVideo.poster = `${videoBase}/so_7.1,c_scale,w_720,q_auto/${videoPublicId}.jpg`;
  spearVideoSource.src = `${videoBase}/q_auto/${videoPublicId}.mp4`;
  spearVideo.addEventListener("error", () => {
    spearVideo.poster = "./assets/spear-throwing-poster.jpg";
    spearVideoSource.src = "./assets/spear-throwing.mp4";
    spearVideo.load();
  }, { once: true });
  spearVideo.load();
}
shukaSlides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "shuka-dot";
  dot.setAttribute("aria-label", `Show shuka story image ${index + 1}`);
  dot.addEventListener("click", () => setShukaSlide(index));
  document.getElementById("shuka-dots").append(dot);
});
setShukaSlide(0);
document.getElementById("shuka-prev").addEventListener("click", () => setShukaSlide(currentShukaSlide - 1));
document.getElementById("shuka-next").addEventListener("click", () => setShukaSlide(currentShukaSlide + 1));
document.querySelectorAll(".shuka-colour").forEach((button) => {
  button.addEventListener("click", () => setShukaColour(button.dataset.colour));
});

document.querySelectorAll(".festival-step").forEach((group) => {
  group.querySelectorAll(".festival-choice").forEach((button) => {
    button.addEventListener("click", () => {
      const name = group.dataset.group;
      const value = button.dataset.value;
      if (!festivalOptions[name]?.[value]) return;
      festivalSelection[name] = value;
      group.querySelectorAll(".festival-choice").forEach((choice) => {
        const active = choice === button;
        choice.classList.toggle("active", active);
        choice.setAttribute("aria-pressed", String(active));
      });
      updateFestival(name);
      document.getElementById("festival-status").textContent = "Your festival card is ready with the new choices.";
    });
  });
});
document.getElementById("festival-upload").addEventListener("click", () => openFestivalUpload());
document.getElementById("tryon-upload").addEventListener("click", () => openFestivalUpload("tryon-status"));
document.getElementById("tryon-generate").addEventListener("click", generateTryOn);
setMediaImage(document.getElementById("tryon-shuka-ref"), "voices4", 400, 450);
setMediaImage(document.getElementById("tryon-beads-ref"), "beadworkDetail", 400, 450);
checkTryOnServer();
document.getElementById("festival-remove-photo").addEventListener("click", () => {
  visitorPhotoId = "";
  document.getElementById("festival-remove-photo").hidden = true;
  document.getElementById("festival-upload-status").textContent = "Photo removed from this card and video. The uploaded copy remains at its public Cloudinary URL.";
  updateFestival();
  updateTryOnPhotoState();
});
document.getElementById("festival-make-video").addEventListener("click", () => {
  document.getElementById("festival-video-result").hidden = false;
  refreshFestivalVideo();
});
document.getElementById("festival-personal-video").addEventListener("loadeddata", () => {
  document.getElementById("festival-video-status").textContent = "Your 12-second video is ready.";
});
document.getElementById("festival-personal-video").addEventListener("error", () => {
  document.getElementById("festival-video-status").textContent = "Video preview unavailable. Try Open video or choose different options.";
});
document.getElementById("festival-video-copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(festivalVideoUrl());
    document.getElementById("festival-video-status").textContent = "Video link copied.";
  } catch (error) {
    document.getElementById("festival-video-status").textContent = "Copy failed. Open the video and copy its address.";
  }
});
document.getElementById("festival-copy").addEventListener("click", async () => {
  const status = document.getElementById("festival-status");
  try {
    await navigator.clipboard.writeText(festivalCardUrl());
    status.textContent = "Festival card link copied.";
  } catch (error) {
    status.textContent = "Copy failed. Open the card and copy its address.";
  }
});
document.getElementById("festival-download").addEventListener("click", async () => {
  const status = document.getElementById("festival-status");
  const button = document.getElementById("festival-download");
  button.disabled = true;
  status.textContent = "Creating your festival card…";
  try {
    const response = await fetch(festivalCardUrl());
    if (!response.ok) throw new Error(`Cloudinary returned ${response.status}`);
    const blobUrl = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "festival-in-a-box-kenya.png";
    link.click();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    status.textContent = "Festival card saved with the photo credit and source.";
  } catch (error) {
    status.textContent = "Download unavailable. Use Open festival card to save the image.";
  } finally {
    button.disabled = false;
  }
});

document.querySelectorAll(".story-tab").forEach((tab) => {
  tab.addEventListener("click", () => setStory(tab.dataset.story));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = storyKeys.indexOf(tab.dataset.story);
    const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (event.key === "ArrowRight" ? 1 : -1) + 3) % 3;
    setStory(storyKeys[next], true);
  });
});
document.getElementById("detail-trigger").addEventListener("click", () => {
  const popover = document.getElementById("detail-popover");
  popover.hidden = !popover.hidden;
  document.getElementById("detail-trigger").setAttribute("aria-expanded", String(!popover.hidden));
});
document.getElementById("detail-close").addEventListener("click", hideDetail);
document.getElementById("card-chapter").addEventListener("change", updatePostcard);
document.getElementById("card-message").addEventListener("input", updatePostcard);
document.getElementById("postcard-form").addEventListener("submit", downloadPostcard);
document.getElementById("copy-card-link").addEventListener("click", async () => {
  const url = makeCloudinaryPostcardUrl(document.getElementById("card-chapter").value, document.getElementById("card-message").value.trim());
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    document.getElementById("download-status").textContent = "Cloudinary postcard link copied.";
  } catch (error) {
    document.getElementById("download-status").textContent = "Copy failed. Open the render link and copy its address.";
  }
});
