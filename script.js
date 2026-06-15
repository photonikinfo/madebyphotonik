const yearNode = document.querySelector("[data-year]");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const revealNodes = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const lightbox = document.querySelector("[data-lightbox-modal]");

if (lightbox instanceof HTMLDialogElement) {
  const imageNode = lightbox.querySelector("[data-lightbox-image]");
  const captionNode = lightbox.querySelector("[data-lightbox-caption]");
  const counterNode = lightbox.querySelector("[data-lightbox-counter]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const prevButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));

  const formatGroupLabel = (groupName) =>
    (groupName || "portfolio")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (character) => character.toUpperCase());

  const buildGalleryItems = (groupName, sources) => {
    const groupLabel = formatGroupLabel(groupName);

    return sources.map((src) => ({
      caption: groupLabel,
      group: groupName,
      groupLabel,
      src,
    }));
  };

  const galleryGroups = {
    featured: buildGalleryItems("featured", [
      "./Real%20Estate/cda2ae30-609c-4676-adf7-3932787cbc8c_rw_3840.jpg",
      "./Food%20Photography/2898faf7-e80b-47ae-8633-46c9ee684898_rw_1200.jpg",
      "./Product/5e4c6c60-3d9a-43c3-b21a-c1be21f61671_rw_1200.jpg",
      "./Wedding%20Photos/Z62_1480.JPG",
    ]),
    "Real Estate": buildGalleryItems("Real Estate", [
      "./Real%20Estate/cda2ae30-609c-4676-adf7-3932787cbc8c_rw_3840.jpg",
      "./Real%20Estate/01e9c26e-7c5b-48c5-98ed-27c35a403784_rw_1200.jpg",
      "./Real%20Estate/18ab797b-c323-459c-b422-58e020eb15f0_rw_1200.jpg",
      "./Real%20Estate/4b36bfd0-d1e6-4f31-ba1a-e5dfc4e3d659_rw_1200.jpg",
      "./Real%20Estate/97bdce87-1e9b-410c-916c-3de485e5363e_rw_1200.jpg",
      "./Real%20Estate/a145d123-110d-4047-a393-048fd9cca39e_rw_3840.jpg",
      "./Real%20Estate/e5cc9e4c-d416-4bd4-87b2-ddfbb1761350_rw_1920.jpg",
      "./Real%20Estate/e8253d6a-df8b-4f95-9c12-c9c6f9f7a18a_rw_3840.jpg",
    ]),
    "Food Photography": buildGalleryItems("Food Photography", [
      "./Food%20Photography/2898faf7-e80b-47ae-8633-46c9ee684898_rw_1200.jpg",
      "./Food%20Photography/1a184fc3-8a65-426a-9b52-65c83eccdf35_rw_1200.jpg",
      "./Food%20Photography/2ab947f8-d40a-48df-bfad-ddce698a38f5_rw_1200.jpg",
      "./Food%20Photography/48b68a9c-923e-4c2f-8646-8be6ad7a04a2_rw_1920.jpg",
      "./Food%20Photography/53650fe5-6854-49c5-9dce-43fc3a845143_rw_1200.jpg",
      "./Food%20Photography/b3fbed87-4931-4812-a444-632bc21bec50_rw_1200.jpg",
      "./Food%20Photography/d40efb3e-c8af-42eb-bc81-998b83695a1e_rw_1200.jpg",
      "./Food%20Photography/8969aff2-f300-4fb3-a0d0-197c2c53040f_rw_3840.jpg",
      "./Food%20Photography/a0ffcd88-d048-4ad7-bdeb-68e1b133109c_rw_600.jpg",
      "./Food%20Photography/d55b01ff-a995-4690-8a53-8b621060ae3b_rw_600.jpg",
    ]),
    "Wedding Photos": buildGalleryItems("Wedding Photos", [
      "./Wedding%20Photos/Z62_1480.JPG",
      "./Wedding%20Photos/0bf7c67d-2a9a-4921-85e8-080c1e01f136_rw_1200.jpg",
      "./Wedding%20Photos/13e3fd0a-49d6-464d-9e22-7686f212dc4d_rw_1920.jpg",
      "./Wedding%20Photos/700306584_10245107369365333_1400997159503684980_n.jpg",
      "./Wedding%20Photos/750_6064.JPG",
      "./Wedding%20Photos/7c7c51cf-f560-4dc6-9eb7-bccf0d4eabb4_rw_1200.jpg",
      "./Wedding%20Photos/85a2b189-8d3b-4f64-b71f-a38e75767e2b_rw_1200.jpg",
      "./Wedding%20Photos/8ad62ad4-0c9b-448d-9c98-a67193f3f9e2_rw_1200.jpg",
      "./Wedding%20Photos/9ce57347-a4a7-4e22-86b0-c4d82db66333_rw_1200.jpg",
      "./Wedding%20Photos/a7301fce-f3e6-4364-b046-8a1870908392_rw_1920.jpeg",
      "./Wedding%20Photos/c36e9166-ec2f-41ce-9bdd-df0ebbff44e3_rw_1920.jpg",
      "./Wedding%20Photos/d2658a61-b673-4ea1-b18b-c68bcdb7cdb3_rw_1200.jpg",
      "./Wedding%20Photos/Z62_0783.JPG",
      "./Wedding%20Photos/Z62_1116.JPG",
      "./Wedding%20Photos/Z62_1523.JPG",
      "./Wedding%20Photos/Z62_1594.JPG",
    ]),
    Event: buildGalleryItems("Event", [
      "./Event/6ac54ddc-1d72-4f2c-a0f2-0e772bdb275f_rw_1920.jpg",
      "./Event/217be994-0943-4562-af7f-2b1afcaf3c14_rw_1920.jpg",
      "./Event/6acf3239-5e32-49e5-9f8e-713fb92e4f3e_rw_1200.jpg",
      "./Event/84fc8ab6-94af-4986-87c7-de57c99d4970_rw_1200.jpg",
      "./Event/981a3af8-e23f-4e6f-8e3b-c91961b17b26_rw_1920.jpg",
      "./Event/bc702566-16c0-4f5d-902b-de5dd5492057_rw_1200.jpg",
      "./Event/d29721b5-1091-4f09-81db-4d4affc3d761_rw_600.jpg",
      "./Event/d9520d2a-8197-4cc6-a964-a26d44965919_rw_1920.jpg",
      "./Event/f62a78e7-3042-4c91-9c5b-37b7432cb40e_rw_1200.jpg",
    ]),
    "Party & Nightlife": buildGalleryItems("Party & Nightlife", [
      "./Party%20%26%20Nightlife/6fa2534c-1f35-45fe-942a-a774f82e0d85_rw_1920.jpg",
      "./Party%20%26%20Nightlife/7483bc8d-fa15-4429-8aef-7cae42c9d63b_rw_1200.jpg",
      "./Party%20%26%20Nightlife/7845dc6e-bbec-4089-b06a-e95a7cf10edb_rw_1200.jpg",
      "./Party%20%26%20Nightlife/de2f69ca-e3b1-4f90-889c-9fbfeae8f653_rw_1920.jpg",
      "./Party%20%26%20Nightlife/e7385fcb-6a64-41aa-800d-7f16f40b30e9_rw_1200.jpg",
      "./Party%20%26%20Nightlife/ffb598a8-aa59-495c-a3b4-88594c240973_rw_1920.jpg",
    ]),
    Product: buildGalleryItems("Product", [
      "./Product/5e4c6c60-3d9a-43c3-b21a-c1be21f61671_rw_1200.jpg",
      "./Product/1b31ea7b-0e2d-4b75-98e8-69af993eb167_rw_600.jpg",
      "./Product/6d3b5311-8a82-41c0-9685-c6bd6ed7aeea_rw_1200.jpg",
      "./Product/9eaafa76-4df1-4efa-8bba-1925cd539d4e_rw_600.jpg",
      "./Product/b7f26f6e-51e3-4cdb-aac3-131501fea818_rw_1200.jpg",
      "./Product/f24db809-688f-48cc-baf4-40477c9aec84_rw_600.jpg",
    ]),
    Sports: buildGalleryItems("Sports", [
      "./Sports/0af88d78-18fd-46ea-8a27-8d5b436260ee_rw_1920.jpg",
      "./Sports/1e68f486-25b9-4029-b4e1-de43f6b909fd_rw_600.jpg",
      "./Sports/489b99aa-5fa6-41f9-8509-bbc2ba7b6d97_rw_1920.jpg",
      "./Sports/54ca5b9d-11ee-404c-8a72-021c2711458d_rw_1200.jpg",
      "./Sports/65928ff0-c413-404a-a896-e67e6f687ad0_rw_1200.jpg",
      "./Sports/73200baf-a495-4d33-b7fa-4031142bab67_rw_1200.jpg",
      "./Sports/780451b4-885d-4152-8c4d-cf8df97ea6f4_rw_1200.jpg",
      "./Sports/84f21e34-790f-49b6-b2eb-560a35f90b1d_rw_1920.jpg",
      "./Sports/9e4ff5db-07ab-4fa1-b07b-c7b84c5dfb99_rw_1200.jpg",
      "./Sports/97222911-9bee-411c-a230-6f64d9cbf816_rw_1200.jpg",
      "./Sports/b9795d15-d0ef-4273-a3d8-6914a76fad44_rw_1200.jpg",
      "./Sports/bddb25cc-32ab-4993-b052-e16e0e85e3e5_rw_1200.jpg",
    ]),
  };

  const resolveGroupName = (trigger, image) => {
    const explicitGroup = trigger.getAttribute("data-lightbox-group")?.trim();

    if (explicitGroup) {
      return explicitGroup;
    }

    const source = image.currentSrc || image.getAttribute("src") || "";

    try {
      const decodedPath = decodeURIComponent(new URL(source, document.baseURI).pathname);
      const pathParts = decodedPath.split("/").filter(Boolean);
      const folderName = pathParts.length > 1 ? pathParts[pathParts.length - 2] : "";

      if (folderName) {
        return folderName;
      }
    } catch {
      // Fall back to the default portfolio group if the source cannot be parsed.
    }

    return "portfolio";
  };

  const triggerItems = triggers
    .map((trigger, index) => {
      const image = trigger.querySelector("img");

      if (!image) {
        return null;
      }

      const caption =
        trigger.querySelector("figcaption")?.textContent?.trim() ||
        image.alt.trim() ||
        `Photo ${index + 1}`;
      const group = resolveGroupName(trigger, image);
      const groupLabel = formatGroupLabel(group);

      return {
        caption,
        group,
        groupLabel,
        image,
        src: image.currentSrc || image.src,
        trigger,
      };
    })
    .filter(Boolean);

  let activeItems = [];
  let activeIndex = 0;
  let returnFocusNode = null;

  const syncNavState = () => {
    const hasMultipleItems = activeItems.length > 1;

    if (prevButton instanceof HTMLButtonElement) {
      prevButton.disabled = !hasMultipleItems;
    }

    if (nextButton instanceof HTMLButtonElement) {
      nextButton.disabled = !hasMultipleItems;
    }
  };

  const updateLightbox = (index) => {
    if (!activeItems.length) {
      return;
    }

    activeIndex = (index + activeItems.length) % activeItems.length;
    const item = activeItems[activeIndex];

    if (imageNode instanceof HTMLImageElement) {
      imageNode.src = item.src;
      imageNode.alt = item.caption || item.groupLabel;
    }

    if (captionNode) {
      captionNode.textContent = item.caption || item.groupLabel;
    }

    if (counterNode) {
      counterNode.textContent = `${activeIndex + 1} / ${activeItems.length}`;
    }

    syncNavState();
  };

  const openLightbox = (triggerNode) => {
    if (!triggerItems.length) {
      return;
    }

    const activeItem = triggerItems.find((item) => item.trigger === triggerNode);

    if (!activeItem) {
      return;
    }

    const groupItems = galleryGroups[activeItem.group];
    activeItems = Array.isArray(groupItems) && groupItems.length > 0 ? groupItems : [activeItem];
    activeIndex = activeItems.findIndex((item) => item.src === activeItem.src);
    if (activeIndex < 0) {
      activeIndex = 0;
    }
    returnFocusNode = triggerNode || document.activeElement;
    updateLightbox(activeIndex);

    if (!lightbox.open) {
      lightbox.showModal();
    }

    document.body.classList.add("no-scroll");
    closeButton?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox.open) {
      return;
    }

    lightbox.close();
    document.body.classList.remove("no-scroll");

    if (returnFocusNode instanceof HTMLElement) {
      returnFocusNode.focus();
    }
  };

  triggers.forEach((trigger, index) => {
    const image = trigger.querySelector("img");
    const caption =
      trigger.querySelector("figcaption")?.textContent?.trim() ||
      image?.alt?.trim() ||
      `Photo ${index + 1}`;

    trigger.classList.add("lightbox-trigger");
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", `Open photo: ${caption}`);

    trigger.addEventListener("click", () => openLightbox(trigger));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(trigger);
      }
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", () => updateLightbox(activeIndex - 1));
  nextButton?.addEventListener("click", () => updateLightbox(activeIndex + 1));

  lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      updateLightbox(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      updateLightbox(activeIndex + 1);
    }
  });

  syncNavState();
}
