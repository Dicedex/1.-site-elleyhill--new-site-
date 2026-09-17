"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ProjectItem {
  id: string;
  category: "residential" | "commercial" | "agricultural";
  badge: string;
  badgeBg: string;
  badgeIcon?: string;
  location: string;
  title: string;
  desc?: string;
  ctaText: string;
  imgUrl: string;
  imgAlt: string;
  cols: string;
  layout: "featured-large" | "standard" | "featured-horizontal";
}

const projectsData: ProjectItem[] = [
  {
    id: "cold-storage",
    category: "agricultural",
    badge: "15kW OFF-GRID",
    badgeBg: "bg-elleyhill-green text-white",
    badgeIcon: "bolt",
    location: "Mazabuka, Southern Province",
    title: "100% Downtime Elimination for Agricultural Cold Storage",
    ctaText: "View System Configuration",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSny1Zylde-lk6xYsuK5zHoZ0Uoms9qIgw4z27faaf69jqR7KMJivZoPJ7mQ0thkTjmFtw7WErZlvONPNha_lR5oKPfrBC3qA0TRtg6FECGirZCu2ozrrb_NR-g2vBUy0GmV5V5SyRdcRCGIaWB3bQWcHaAr2uKxFB0JLHXzQuYmfDtN6-Vdf1CUFyPwalT_I5_sBsKC_8fBhG1vNDo52SEruH-nMRiInVTT2onzgGzDl6CD_fixhY",
    imgAlt:
      "High-quality architectural photography of a modern agricultural cold storage facility in Zambia, featuring a massive, neatly installed solar panel array on its IBR roof. The scene is bathed in bright, clear daylight, showcasing the clean lines of the industrial structure and the gleaming solar tech. The mood is professional, resilient, and highly efficient.",
    cols: "md:col-span-8",
    layout: "featured-large",
  },
  {
    id: "executive-home",
    category: "residential",
    badge: "5kW HYBRID",
    badgeBg: "bg-elleyhill-green/90 backdrop-blur-sm text-white",
    location: "Lusaka Estate",
    title: "Seamless Backup Power for Modern Executive Home",
    ctaText: "View Details",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkWBJ0yRBVdbRyEzHmahexiUe6QBN4dhwW9hjqa4JmG8ubtTvGOkGenGz9V3YkQHLwK7-AYYV3j6I6Py2dUlcdjUmWI5s6t0GoOnYk3nGL_4n_30s1E9cThi7VBepQrbsXgUpTNwNMDZeYy-IT_UpSWLktHV4mpJHnRfskdsRN-G3bMERW1EOtxaceiBwYc06xD8U2MqKf0RR_rZFdnYTKsucLEOyqvvsfqJVzLFdWFzYW-1WGQdeu",
    imgAlt:
      "A beautifully lit, wide-angle shot of a premium residential home in Lusaka, Zambia, highlighting a pristine 5kW hybrid solar installation. The neat wiring and sleek Greenrich inverter are visible in a clean, modern garage setting. The lighting is soft and natural, emphasizing the high-end, reliable aesthetic of the setup.",
    cols: "md:col-span-4",
    layout: "standard",
  },
  {
    id: "copperbelt-retail",
    category: "commercial",
    badge: "30kW COMMERCIAL",
    badgeBg: "bg-elleyhill-green/90 backdrop-blur-sm text-white",
    location: "Copperbelt Retail",
    title: "Retail Complex Grid Independence & Cost Reduction",
    ctaText: "View Details",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXclgbcP2KbhABw-EDYUWs39phbQA6NL0Z6lDqQJwE0fobGEn-3T0TmXWRZDbICT_L-zhmwBRce9lzlHD_getR4nzKo8wR3Sx1vRCnzFiN337og67NB_qNNy55zvpw6WSzq2izia-li4q3nfo-nxk6IJBK-pkEX4vbG1w8zec7wA53HQWN2yuNcaDdS2qqAAObjLwpRtbVADBY3XRR8BJgDWnwTUsBXsSrcex3R1LZF9U_pQLvWmRX",
    imgAlt:
      "A striking exterior shot of a modern retail complex in the Copperbelt region of Zambia. The flat roof is covered with a meticulously aligned commercial solar array. The sky is a vibrant blue, and the image conveys a sense of large-scale commercial energy independence and sustainable business practices.",
    cols: "md:col-span-4",
    layout: "standard",
  },
  {
    id: "chibombo-borehole",
    category: "agricultural",
    badge: "AGRICULTURE",
    badgeBg: "bg-black text-white",
    location: "Chibombo District",
    title: "Off-Grid Borehole Pumping for 50-Hectare Farm",
    desc: "Consistent water supply achieved using high-torque inductive startup inverters, entirely bypassing unstable grid connections.",
    ctaText: "Explore Setup",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDX0-qnIfEbiVbwYR3Ru2k0tz7RXnl5V6khTQ3noACK1YXhkit2VJQvRbEpTjdki1PJxlHkE6wHFtNl4gvgrN8Q10BK8HE-TdJxU-XaLSRcrrX76bCZktwDLEOWcIdXhM816vULZsJoUnBqrY-a4LXG_Nn8OOzXemlMOxC2mbYQvUj7nW-EHm9vYGUaXYrKv9NjTgzbH9eAxJQ0PwUhhmfqOOdOx9FZ08hZo6h7UTawubkhTxLKbEdv",
    imgAlt:
      "A close-up, high-contrast shot of a heavy-duty borehole water pumping system powered directly by a solar array on a rural Zambian farm. The image focuses on the rugged durability of the installation, with bright sunlight highlighting the metallic textures and the reliable flow of water.",
    cols: "md:col-span-8",
    layout: "featured-horizontal",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((item) => item.category === filter);

  return (
    <div className="bg-background text-on-background font-body-lg min-h-screen flex flex-col antialiased selection:bg-elleyhill-green selection:text-white">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-[104px] pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 text-primary">
            Case Studies &amp; Projects
          </h1>
          <p className="font-body-lg text-text-secondary max-w-3xl md:text-lg">
            Explore our portfolio of energy resilience installations across
            Zambia, from residential estates to heavy-duty agricultural setups.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`font-label-cta text-label-cta px-5 py-2.5 rounded-full transition-colors shadow-sm ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-surface-container-lowest text-primary border border-border-medium hover:border-primary"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter("residential")}
            className={`font-label-cta text-label-cta px-5 py-2.5 rounded-full transition-colors ${
              filter === "residential"
                ? "bg-primary text-white"
                : "bg-surface-container-lowest text-primary border border-border-medium hover:border-primary"
            }`}
          >
            Residential Estates
          </button>
          <button
            onClick={() => setFilter("commercial")}
            className={`font-label-cta text-label-cta px-5 py-2.5 rounded-full transition-colors ${
              filter === "commercial"
                ? "bg-primary text-white"
                : "bg-surface-container-lowest text-primary border border-border-medium hover:border-primary"
            }`}
          >
            Commercial &amp; Retail
          </button>
          <button
            onClick={() => setFilter("agricultural")}
            className={`font-label-cta text-label-cta px-5 py-2.5 rounded-full transition-colors ${
              filter === "agricultural"
                ? "bg-primary text-white"
                : "bg-surface-container-lowest text-primary border border-border-medium hover:border-primary"
            }`}
          >
            Agricultural &amp; Water Pumping
          </button>
        </div>

        {/* Projects Grid (Bento/Asymmetric Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {filteredProjects.map((project) => {
            if (project.layout === "featured-large") {
              return (
                <div
                  key={project.id}
                  className={`${project.cols} bg-surface-container-lowest rounded-bento border border-border-light hover-lift overflow-hidden flex flex-col group cursor-pointer relative`}
                >
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <span
                      className={`${project.badgeBg} font-technical-data text-technical-data px-3 py-1 rounded-full shadow-sm flex items-center gap-1`}
                    >
                      {project.badgeIcon && (
                        <span className="material-symbols-outlined text-[16px]">
                          {project.badgeIcon}
                        </span>
                      )}
                      {project.badge}
                    </span>
                  </div>
                  <div
                    className="h-64 md:h-80 w-full relative overflow-hidden bg-surface-container-low bg-cover bg-center"
                    data-alt={project.imgAlt}
                    style={{ backgroundImage: `url('${project.imgUrl}')` }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow glass-panel absolute bottom-0 left-0 right-0 border-t border-border-light md:relative md:bg-surface-container-lowest md:border-t-0 md:backdrop-filter-none">
                    <div className="flex items-center gap-2 text-text-secondary font-body-sm text-body-sm mb-2 md:mb-3 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[18px]">
                        location_on
                      </span>{" "}
                      {project.location}
                    </div>
                    <h3 className="font-headline-md text-headline-md text-white md:text-primary mb-4 leading-tight group-hover:text-elleyhill-green transition-colors">
                      {project.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-white md:text-primary font-label-cta text-label-cta">
                      <span className="flex items-center gap-1 group-hover:underline decoration-2 underline-offset-4 decoration-elleyhill-green">
                        {project.ctaText}
                      </span>
                      <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            if (project.layout === "standard") {
              return (
                <div
                  key={project.id}
                  className={`${project.cols} bg-surface-container-lowest rounded-card border border-border-light hover-lift overflow-hidden flex flex-col group cursor-pointer`}
                >
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className={`${project.badgeBg} font-technical-data text-[12px] px-2.5 py-1 rounded-full shadow-sm`}
                      >
                        {project.badge}
                      </span>
                    </div>
                    <div
                      className="h-48 w-full bg-surface-container-low bg-cover bg-center"
                      data-alt={project.imgAlt}
                      style={{ backgroundImage: `url('${project.imgUrl}')` }}
                    ></div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1.5 text-text-secondary font-body-sm text-body-sm mb-2 text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[16px]">
                        location_on
                      </span>{" "}
                      {project.location}
                    </div>
                    <h3 className="font-body-lg text-body-lg font-semibold text-primary mb-4 leading-snug group-hover:text-elleyhill-green transition-colors">
                      {project.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-primary font-label-cta text-sm">
                      <span className="group-hover:underline decoration-2 underline-offset-4 decoration-elleyhill-green">
                        {project.ctaText}
                      </span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            if (project.layout === "featured-horizontal") {
              return (
                <div
                  key={project.id}
                  className={`${project.cols} bg-surface-bright rounded-bento border border-border-light hover-lift overflow-hidden flex flex-col md:flex-row group cursor-pointer`}
                >
                  <div
                    className="md:w-1/2 h-56 md:h-auto relative bg-surface-container-low bg-cover bg-center"
                    data-alt={project.imgAlt}
                    style={{ backgroundImage: `url('${project.imgUrl}')` }}
                  >
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`${project.badgeBg} font-technical-data text-[12px] px-2.5 py-1 rounded-full shadow-sm tracking-wide`}
                      >
                        {project.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2 bg-surface-container-lowest">
                    <div className="flex items-center gap-2 text-text-secondary font-body-sm text-body-sm mb-3 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[18px]">
                        location_on
                      </span>{" "}
                      {project.location}
                    </div>
                    <h3 className="font-headline-md text-[20px] leading-snug font-semibold text-primary mb-3 group-hover:text-elleyhill-green transition-colors">
                      {project.title}
                    </h3>
                    {project.desc && (
                      <p className="font-body-sm text-text-secondary mb-6 line-clamp-2">
                        {project.desc}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-2 text-primary font-label-cta text-label-cta">
                      <span className="group-hover:underline decoration-2 underline-offset-4 decoration-elleyhill-green">
                        {project.ctaText}
                      </span>
                      <span className="material-symbols-outlined text-[20px]">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Load More Action */}
        <div className="mt-16 text-center">
          <button className="font-label-cta text-label-cta text-primary border border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-colors">
            LOAD MORE PROJECTS
          </button>
        </div>
      </main>
    </div>
  );
}

