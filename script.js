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

      return {
        caption,
        image,
        src: image.currentSrc || image.src,
        trigger,
      };
    })
    .filter(Boolean);

  let activeIndex = 0;
  let returnFocusNode = null;

  const updateLightbox = (index) => {
    if (!items.length) {
      return;
    }

    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];

    if (imageNode instanceof HTMLImageElement) {
      imageNode.src = item.src;
      imageNode.alt = item.caption;
    }

    if (captionNode) {
      captionNode.textContent = item.caption;
    }

    if (counterNode) {
      counterNode.textContent = `${activeIndex + 1} / ${items.length}`;
    }
  };

  const openLightbox = (index, triggerNode) => {
    if (!items.length) {
      return;
    }

    returnFocusNode = triggerNode || document.activeElement;
    updateLightbox(index);

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

    trigger.addEventListener("click", () => openLightbox(index, trigger));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index, trigger);
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
}
