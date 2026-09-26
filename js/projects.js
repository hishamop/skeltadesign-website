// Portfolio data. Edit names, locations, areas and descriptions here — the gallery renders from this list.
// Images live in assets/images/<category>/. Add more images to a project's `images` array to show them in its lightbox.
window.CATEGORIES = {
  "modern-contemporary": "Modern Contemporary",
  "tropical-sloped-roof": "Tropical & Sloped Roof",
  "gable-contemporary": "Gable Contemporary",
};

const img = (cat, f) => `assets/images/${cat}/${f}.jpg`;

window.PROJECTS = [
  // Modern Contemporary
  { name: "Residence A", category: "modern-contemporary", tag: "Dusk view", images: [img("modern-contemporary", "residence-a-dusk")] },
  { name: "Residence B", category: "modern-contemporary", tag: "Dusk view", images: [img("modern-contemporary", "residence-b-dusk")] },
  { name: "Residence C", category: "modern-contemporary", images: [img("modern-contemporary", "residence-c")] },
  { name: "Residence D", category: "modern-contemporary", images: [img("modern-contemporary", "residence-d")] },
  { name: "Residence E", category: "modern-contemporary", images: [img("modern-contemporary", "residence-e")] },
  { name: "Residence F", category: "modern-contemporary", images: [img("modern-contemporary", "residence-f")] },
  { name: "Residence G", category: "modern-contemporary", images: [img("modern-contemporary", "residence-g")] },
  { name: "Residence H", category: "modern-contemporary", images: [img("modern-contemporary", "residence-h")] },
  { name: "Residence I", category: "modern-contemporary", images: [img("modern-contemporary", "residence-i")] },
  { name: "Residence J", category: "modern-contemporary", images: [img("modern-contemporary", "residence-j")] },

  // Tropical & Sloped Roof
  { name: "Residence K", category: "tropical-sloped-roof", images: ["k-1", "k-2", "k-3"].map(s => img("tropical-sloped-roof", "residence-" + s)) },
  { name: "Residence L", category: "tropical-sloped-roof", images: [img("tropical-sloped-roof", "residence-l")] },
  { name: "Residence M", category: "tropical-sloped-roof", images: [img("tropical-sloped-roof", "residence-m")] },
  { name: "Residence N", category: "tropical-sloped-roof", tag: "Night view", images: [img("tropical-sloped-roof", "residence-n-night")] },
  { name: "Residence O", category: "tropical-sloped-roof", images: [img("tropical-sloped-roof", "residence-o")] },
  { name: "Residence P", category: "tropical-sloped-roof", tag: "Concept model", images: [img("tropical-sloped-roof", "residence-p-concept")] },

  // Gable Contemporary
  { name: "Residence Q", category: "gable-contemporary", images: ["q-1", "q-2", "q-3"].map(s => img("gable-contemporary", "residence-" + s)) },
  { name: "Residence R", category: "gable-contemporary", images: ["r-1", "r-2"].map(s => img("gable-contemporary", "residence-" + s)) },
  { name: "Residence S", category: "gable-contemporary", images: [img("gable-contemporary", "residence-s")] },
  { name: "Residence T", category: "gable-contemporary", images: [img("gable-contemporary", "residence-t")] },
];
