// Enhanced page transition utility with smooth reveal
window.pageTransition = (function() {
  let overlay = null;
  let isTransitioning = false;

  function createOverlay() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
      display: none;
    `;

    // Layer 1 - White
    const layer1 = document.createElement('div');
    layer1.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #FFFFFF;
      transform: translateY(100%);
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    // Layer 2 - Blue
    const layer2 = document.createElement('div');
    layer2.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #2082BE;
      transform: translateY(100%);
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
    `;

    // Layer 3 - Light Gray (final reveal layer)
    const layer3 = document.createElement('div');
    layer3.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #F8F8F8;
      transform: translateY(100%);
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s;
    `;

    // Reveal layer - Will be used for slide up animation
    const revealLayer = document.createElement('div');
    revealLayer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #F8F8F8;
      opacity: 1;
      transform: translateY(0%);
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    overlay.appendChild(layer1);
    overlay.appendChild(layer2);
    overlay.appendChild(layer3);
    overlay.appendChild(revealLayer);
    document.body.appendChild(overlay);
  }

  function transitionTo(href) {
    if (isTransitioning) return;
    
    console.log('🚀 Starting enhanced page transition to:', href);
    isTransitioning = true;

    createOverlay();
    
    // Show overlay
    overlay.style.display = 'block';
    
    // Reset layers
    const layers = Array.from(overlay.children);
    const revealLayer = layers[3]; // Last layer is reveal layer
    const transitionLayers = layers.slice(0, 3); // First 3 are transition layers

    // Reset all layers
    transitionLayers.forEach(layer => {
      layer.style.transform = 'translateY(100%)';
    });
    // Hide reveal layer initially
    revealLayer.style.transform = 'translateY(100%)';
    revealLayer.style.opacity = '1';

    // Trigger slide up animation with slight delay
    setTimeout(() => {
      transitionLayers.forEach(layer => {
        layer.style.transform = 'translateY(0%)';
      });
    }, 50);

    // Navigate after layers cover screen - increased timing for better visibility
    setTimeout(() => {
      window.location.href = href;
    }, 1200);
  }

  // Page reveal function for when new page loads
  function revealPage() {
    if (!overlay) return;
    
    console.log('✨ Revealing new page with light grey overlay slide-up');
    const layers = Array.from(overlay.children);
    const revealLayer = layers[3];
    
    // Hide first two layers immediately
    layers.slice(0, 2).forEach(layer => {
      layer.style.transform = 'translateY(-100%)';
    });
    
    // Keep layer 3 (light grey) visible for a moment
    const layer3 = layers[2];
    layer3.style.transform = 'translateY(0%)';
    
    // Show reveal layer (light grey) to cover the page
    revealLayer.style.transform = 'translateY(0%)';
    revealLayer.style.opacity = '1';
    
    // Wait for page to be ready, then slide up the reveal layer
    setTimeout(() => {
      // Slide up the reveal layer
      revealLayer.style.transform = 'translateY(-100%)';
      
      // Also slide up layer 3
      layer3.style.transform = 'translateY(-100%)';
      
      // Hide overlay completely after animation
      setTimeout(() => {
        overlay.style.display = 'none';
        isTransitioning = false;
        
        // Reset all layers for next transition
        layers.forEach(layer => {
          layer.style.transform = 'translateY(100%)';
        });
        revealLayer.style.transform = 'translateY(0%)';
      }, 800);
    }, 600);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createOverlay();
      // Reveal page on initial load with longer delay
      setTimeout(revealPage, 200);
    });
  } else {
    createOverlay();
    // Reveal page on initial load with longer delay
    setTimeout(revealPage, 200);
  }

  // Listen for page load to trigger reveal
  window.addEventListener('load', () => {
    if (isTransitioning) {
      revealPage();
    }
  });

  return {
    to: transitionTo,
    reveal: revealPage
  };
})();
