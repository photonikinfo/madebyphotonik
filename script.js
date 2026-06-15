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

  const items = triggers
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

      return {
        caption,
        group,
        groupLabel: formatGroupLabel(group),
        image,
        src: image.currentSrc || image.src,
        trigger,
      };
    })
    .filter(Boolean);

  let activeItems = items;
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
      imageNode.alt = item.caption;
    }

    if (captionNode) {
      captionNode.textContent = item.caption;
    }

    if (counterNode) {
      counterNode.textContent = `${item.groupLabel} • ${activeIndex + 1} / ${activeItems.length}`;
    }

    syncNavState();
  };

  const openLightbox = (triggerNode) => {
    if (!items.length) {
      return;
    }

    const activeItem = items.find((item) => item.trigger === triggerNode);

    if (!activeItem) {
      return;
    }

    activeItems = items.filter((item) => item.group === activeItem.group);
    activeIndex = activeItems.findIndex((item) => item.trigger === triggerNode);
    returnFocusNode = triggerNode || document.activeElement;
    updateLightbox(activeIndex < 0 ? 0 : activeIndex);

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
