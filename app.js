// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const searchInput = document.getElementById("search-input");
    const priceSlider = document.getElementById("filter-price-slider");
    const priceValLabel = document.getElementById("price-val");
    const siteSelect = document.getElementById("filter-site");
    const bedsSelect = document.getElementById("filter-beds");
    const cancelSelect = document.getElementById("filter-cancel");
    const sortBySelect = document.getElementById("sort-by");
    const dayBtns = document.querySelectorAll(".day-selector-btn");
    const toggleBothBtn = document.getElementById("toggle-both-btn");
    const toggleBothIcon = document.getElementById("toggle-both-icon");
    
    const lodgingCountBadge = document.getElementById("lodging-count");
    const lodgingsListContainer = document.getElementById("lodgings-list");
    const itineraryListContainer = document.getElementById("itinerary-list");

    // Modal UI Elements
    const attractionModal = document.getElementById("attraction-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalDayBadge = document.getElementById("modal-day-badge");
    const modalTimeSpan = document.getElementById("modal-time").querySelector("span");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalViabilityText = document.getElementById("modal-viability-text");
    const modalMapsLink = document.getElementById("modal-maps-link");

    // Map Variable
    let map;
    let markersGroup;
    let activeMarkerId = null;

    // State Variables
    let activeTab = "lodgings";
    let filterMaxPrice = 3000;
    let filterSite = "all";
    let filterBeds = "all";
    let filterCancel = "all";
    let filterSearch = "";
    let sortOrder = "opcion";
    let activeDayFilter = "all";
    let showBothOnMap = false;

    // Initialize Application
    initTheme();
    initMap();
    setupEventListeners();
    renderLodgings();
    renderItinerary();
    renderViabilityList();
    updateMapMarkers();

    // Theme logic
    function initTheme() {
        const darkThemePreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (darkThemePreferred) {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
            themeIcon.className = "fa-solid fa-sun";
        } else {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
            themeIcon.className = "fa-solid fa-moon";
        }
    }

    function toggleTheme() {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            themeIcon.className = "fa-solid fa-moon";
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            themeIcon.className = "fa-solid fa-sun";
        }
    }

    // Map logic
    function initMap() {
        // Center on Barcelona
        map = L.map("map", {
            center: [41.396, 2.170],
            zoom: 13,
            zoomControl: false
        });

        // Add zoom control at bottom-right
        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Add CartoDB Voyager tiles (clean, beautiful map style)
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        markersGroup = L.layerGroup().addTo(map);
    }

    // Helper functions to parse Excel data
    function parsePrice(priceStr) {
        if (!priceStr) return 0;
        return parseFloat(priceStr.replace(/[^0-9]/g, ''));
    }

    function parseRating(ratingStr) {
        if (!ratingStr) return 0;
        // e.g. "8,4/10" or "4,64/5" or "8,7/10 aprox."
        let cleaned = ratingStr.split('/')[0].replace(',', '.').replace(/[^0-9.]/g, '');
        let val = parseFloat(cleaned);
        if (isNaN(val)) return 0;
        if (ratingStr.includes('/5')) {
            return val * 2; // normalize to 10 scale
        }
        return val;
    }

    function getBedsCount(bedsStr) {
        if (!bedsStr) return 0;
        if (bedsStr.includes("6 camas")) return 6;
        if (bedsStr.includes("2 + 2 + 1")) return 5;
        if (bedsStr.includes("2 + 2 + 2")) return 6;
        let numbers = bedsStr.match(/\d+/g);
        if (!numbers) return 0;
        return numbers.map(Number).reduce((sum, n) => sum + n, 0);
    }

    function isFlexibleCancellation(cancelStr) {
        if (!cancelStr) return false;
        const lowercase = cancelStr.toLowerCase();
        return lowercase.includes("cancelable") || lowercase.includes("flexible");
    }

    // Render lodging options in the sidebar
    function renderLodgings() {
        // Clear container
        lodgingsListContainer.innerHTML = "";

        // Filter data
        let filtered = HOSPEDAJES.filter(item => {
            const priceVal = parsePrice(item.importe);
            const bedsVal = getBedsCount(item.camas);
            const isFlex = isFlexibleCancellation(item.cancelacion);

            // Search query
            const matchesSearch = item.hospedaje.toLowerCase().includes(filterSearch.toLowerCase()) || 
                                  item.direccion.toLowerCase().includes(filterSearch.toLowerCase()) ||
                                  item.opcion.toLowerCase().includes(filterSearch.toLowerCase());
            
            // Price Filter
            const matchesPrice = priceVal <= filterMaxPrice;

            // Site Filter
            const matchesSite = filterSite === "all" || item.sitio.toLowerCase() === filterSite.toLowerCase();

            // Beds Filter
            let matchesBeds = true;
            if (filterBeds !== "all") {
                matchesBeds = bedsVal >= parseInt(filterBeds);
            }

            // Cancellation Filter
            let matchesCancel = true;
            if (filterCancel === "free") {
                matchesCancel = isFlex;
            }

            return matchesSearch && matchesPrice && matchesSite && matchesBeds && matchesCancel;
        });

        // Sort data
        filtered.sort((a, b) => {
            if (sortOrder === "opcion") {
                // Natural sort for option names (e.g. 1A, 1B, 2, 3, 6A, 8.1A)
                return a.opcion.localeCompare(b.opcion, undefined, { numeric: true, sensitivity: 'base' });
            } else if (sortOrder === "price-asc") {
                return parsePrice(a.importe) - parsePrice(b.importe);
            } else if (sortOrder === "price-desc") {
                return parsePrice(b.importe) - parsePrice(a.importe);
            } else if (sortOrder === "rating") {
                return parseRating(b.calificacion) - parseRating(a.calificacion);
            }
            return 0;
        });

        // Update badge count
        lodgingCountBadge.textContent = filtered.length;

        // Update slider value display
        priceValLabel.textContent = `USD ${filterMaxPrice.toLocaleString()}`;

        if (filtered.length === 0) {
            lodgingsListContainer.innerHTML = `
                <div class="no-results">
                    <i class="fa-regular fa-face-frown"></i>
                    <p>No se encontraron hospedajes con los filtros aplicados.</p>
                </div>
            `;
            return;
        }

        // Render card elements
        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = `lodging-card ${activeMarkerId === `lodging-${item.opcion}` ? 'selected' : ''}`;
            card.id = `card-lodging-${item.opcion}`;

            const price = parsePrice(item.importe);
            const isFlex = isFlexibleCancellation(item.cancelacion);
            const bedsCount = getBedsCount(item.camas);

            card.innerHTML = `
                <div class="card-header">
                    <span class="option-badge">Opción ${item.opcion}</span>
                    <span class="site-pill ${item.sitio.toLowerCase().replace('.', '')}">${item.sitio}</span>
                </div>
                <div class="card-title">${item.hospedaje}</div>
                <div class="card-address">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${item.direccion}</span>
                    ${item.address_estimated ? '<span class="estimated-tag">(Ubicación aprox.)</span>' : ''}
                </div>
                
                <div class="specs-grid">
                    <div class="spec-item">
                        <span class="spec-val">${item.dorm || '-'}</span>
                        <span class="spec-lbl">Dorm.</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-val">${item.banos || '-'}</span>
                        <span class="spec-lbl">Baños</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-val">${bedsCount}</span>
                        <span class="spec-lbl">Camas</span>
                    </div>
                </div>

                <div class="card-header">
                    <div class="rating-pill">
                        <i class="fa-solid fa-star"></i>
                        <span>${item.calificacion || 'Sin calif.'}</span>
                    </div>
                    <div class="cancel-badge ${isFlex ? 'flexible' : 'non-refundable'}">
                        <i class="fa-solid ${isFlex ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                        <span>${item.cancelacion}</span>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="price-area">
                        <span class="price-lbl">Importe Total</span>
                        <span class="price-val">${item.importe}</span>
                    </div>
                    ${item.link ? `
                        <a href="${item.link}" target="_blank" class="btn-primary" onclick="event.stopPropagation();">
                            Ver Oferta <i class="fa-solid fa-up-right-from-square"></i>
                        </a>
                    ` : ''}
                </div>
            `;

            // Click interaction
            card.addEventListener("click", () => {
                focusMarker(`lodging-${item.opcion}`, [item.lat, item.lng]);
            });

            lodgingsListContainer.appendChild(card);
        });
    }

    // Render Itinerary timeline
    function renderItinerary() {
        itineraryListContainer.innerHTML = "";

        // Group tourist points by day
        const daysMap = {};
        PUNTOS_TURISTICOS.forEach(pt => {
            if (!daysMap[pt.dia]) {
                daysMap[pt.dia] = [];
            }
            daysMap[pt.dia].push(pt);
        });

        // Filter days
        const daysToRender = activeDayFilter === "all" 
            ? Object.keys(daysMap) 
            : [activeDayFilter];

        if (daysToRender.length === 0) {
            itineraryListContainer.innerHTML = `<p class="no-results">No hay actividades programadas.</p>`;
            return;
        }

        daysToRender.forEach(dayNum => {
            const points = daysMap[dayNum] || [];
            if (points.length === 0) return;

            const dateStr = points[0].fecha;
            const daySection = document.createElement("div");
            daySection.className = "itinerary-day-section";

            daySection.innerHTML = `
                <div class="day-header">
                    <i class="fa-solid fa-calendar-check"></i> Día ${dayNum}
                    <span class="day-subtitle">${dateStr}</span>
                </div>
            `;

            points.forEach(pt => {
                const ptCard = document.createElement("div");
                const isSelected = activeMarkerId === `tourist-${pt.id}`;
                ptCard.className = `tourist-card ${isSelected ? 'selected' : ''} ${pt.isFreeTour ? 'free-tour-card' : ''}`;
                ptCard.id = `card-tourist-${pt.id}`;

                let freeTourBadge = "";
                if (pt.isFreeTour) {
                    freeTourBadge = `
                        <div class="free-tour-tag">
                            <i class="fa-solid fa-flag"></i> Free Tour
                        </div>
                    `;
                }

                let viabilityHtml = "";
                if (pt.viability) {
                    viabilityHtml = `
                        <div class="viability-details" style="${isSelected ? 'display: block;' : 'display: none;'}">
                            <div class="viability-section-title"><i class="fa-solid fa-circle-info"></i> Viabilidad y Consejos</div>
                            <div class="viability-grid">
                                ${pt.viability.horario ? `<div class="viability-item"><strong>Horario:</strong> ${pt.viability.horario}</div>` : ''}
                                ${pt.viability.tarifas ? `<div class="viability-item"><strong>Tarifa:</strong> ${pt.viability.tarifas}</div>` : ''}
                            </div>
                        </div>
                    `;
                }

                let detailBtnHtml = `
                    <button class="btn-primary detail-modal-btn" style="margin-top: 8px; width: 100%; justify-content: center; background-color: var(--accent-color);" onclick="event.stopPropagation();">
                        Ver Detalles <i class="fa-solid fa-expand"></i>
                    </button>
                `;

                ptCard.innerHTML = `
                    <div class="tourist-header">
                        <div class="tourist-title-container">
                            <div class="tourist-title">${pt.nombre}</div>
                            ${freeTourBadge}
                        </div>
                        <span class="time-badge"><i class="fa-regular fa-clock"></i> ${pt.tiempo}</span>
                    </div>
                    <div class="tourist-desc">${pt.descripcion}</div>
                    ${viabilityHtml}
                    ${detailBtnHtml}
                `;

                ptCard.addEventListener("click", () => {
                    focusMarker(`tourist-${pt.id}`, [pt.lat, pt.lng]);
                });

                // Attach modal click event
                const modalBtn = ptCard.querySelector(".detail-modal-btn");
                if (modalBtn) {
                    modalBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        openModal(pt);
                    });
                }

                daySection.appendChild(ptCard);
            });

            itineraryListContainer.appendChild(daySection);
        });
    }

    // Modal Control Functions
    function openModal(pt) {
        modalDayBadge.textContent = `Día ${pt.dia}`;
        modalTimeSpan.textContent = pt.tiempo;
        modalTitle.textContent = pt.nombre;
        modalDescription.textContent = pt.descripcion;

        // Set full viability paragraph text
        modalViabilityText.textContent = pt.viability_full || "Información de acceso libre y de libre tránsito.";

        // Set Google Maps link
        if (pt.maps_link) {
            modalMapsLink.href = pt.maps_link;
            modalMapsLink.style.display = "flex";
        } else {
            modalMapsLink.href = "#";
            modalMapsLink.style.display = "none";
        }

        attractionModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Disable background scrolling
    }

    function closeModal() {
        attractionModal.style.display = "none";
        document.body.style.overflow = ""; // Enable background scrolling
    }

    // Render general viability panel content
    function renderViabilityList() {
        const container = document.getElementById("viability-list");
        container.innerHTML = `
            <div class="viability-category">
                <div class="category-title"><i class="fa-solid fa-ticket"></i> Entradas Anticipadas Críticas</div>
                
                <div class="viability-card info-card">
                    <div class="card-title-sec">
                        <span class="monument-name">Basílica de la Sagrada Familia</span>
                        <span class="warning-badge">3-4 semanas antes</span>
                    </div>
                    <div class="card-body-sec">
                        <p><strong>Tarifas:</strong> €26.00 a €40.00 online. No hay venta física en taquillas.</p>
                        <p class="warning-text"><i class="fa-solid fa-triangle-exclamation"></i> <strong>Torres:</strong> Descenso por escalera de caracol muy estrecha. No recomendado con movilidad reducida, vértigo o claustrofobia.</p>
                    </div>
                </div>

                <div class="viability-card info-card">
                    <div class="card-title-sec">
                        <span class="monument-name">Park Güell (Zona Monumental)</span>
                        <span class="warning-badge">2-3 semanas antes</span>
                    </div>
                    <div class="card-body-sec">
                        <p><strong>Tarifas:</strong> €18.00 general | €13.50 niños/mayores.</p>
                        <p class="warning-text"><i class="fa-solid fa-triangle-exclamation"></i> <strong>Aviso:</strong> Acceso a primera hora (9:30 am) ideal para evitar calor y masas. Retraso máximo tolerado: 30 minutos.</p>
                    </div>
                </div>

                <div class="viability-card info-card">
                    <div class="card-title-sec">
                        <span class="monument-name">Casa Batlló</span>
                        <span class="info-badge">Comprar Online</span>
                    </div>
                    <div class="card-body-sec">
                        <p><strong>Tarifas:</strong> Desde €29.00 online. Taquilla física tiene recargo de €4.00 a €15.00.</p>
                        <p><strong>Consejo:</strong> Audioguía de realidad aumentada interactiva excelente para niños. Gaudí Cube inmersivo incluido.</p>
                    </div>
                </div>

                <div class="viability-card info-card">
                    <div class="card-title-sec">
                        <span class="monument-name">La Pedrera (Casa Milà)</span>
                        <span class="info-badge">Comprar Online</span>
                    </div>
                    <div class="card-body-sec">
                        <p><strong>Tarifas:</strong> €25.00 diurno | €39.00 nocturno.</p>
                        <p><strong>Consejo:</strong> Visita de tarde (luego de las 18:00 hs) ofrece la iluminación más espectacular para fotografías en la azotea.</p>
                    </div>
                </div>

                <div class="viability-card info-card">
                    <div class="card-title-sec">
                        <span class="monument-name">Barça Immersive Tour</span>
                        <span class="info-badge">Comprar Online</span>
                    </div>
                    <div class="card-body-sec">
                        <p><strong>Tarifas:</strong> €28.00 básico online. En taquilla física o reventas sube a €34.00-€36.00.</p>
                        <p class="warning-text"><i class="fa-solid fa-triangle-exclamation"></i> <strong>Obras Camp Nou:</strong> El estadio está en reconstrucción y cerrado. No se visitan gradas ni vestuarios, solo la sala interactiva, museo y mirador de obras.</p>
                    </div>
                </div>
            </div>

            <div class="viability-category">
                <div class="category-title"><i class="fa-solid fa-triangle-exclamation" style="color:var(--color-hoteles);"></i> Alertas Logísticas Críticas</div>
                
                <div class="viability-card alert-card">
                    <div class="card-title-sec">
                        <span class="alert-title-text"><i class="fa-solid fa-circle-xmark"></i> Laberinto de Horta en Restauración</span>
                    </div>
                    <div class="card-body-sec">
                        <p>Bajo plan de restauración botánica severa <strong>hasta el primer trimestre de 2026</strong>. El laberinto de cipreses está cerrado. Jardines perimetrales parcialmente transitables. Entrada general €2.50 (gratis dom/mié).</p>
                    </div>
                </div>

                <div class="viability-card alert-card">
                    <div class="card-title-sec">
                        <span class="alert-title-text"><i class="fa-solid fa-calendar-xmark"></i> Cierre Dominical de La Boquería</span>
                    </div>
                    <div class="card-body-sec">
                        <p>El histórico mercado de Las Ramblas cierra de forma absoluta todos los domingos del año. El itinerario sitúa la visita en viernes para asegurar la experiencia.</p>
                    </div>
                </div>
            </div>

            <div class="viability-category">
                <div class="category-title"><i class="fa-solid fa-circle-info"></i> Teleféricos de Montjuïc: ¡No Confundirlos!</div>
                <div class="viability-card info-card">
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <div class="teleferico-item">
                            <span class="teleferico-name"><i class="fa-solid fa-cable-car"></i> 1. Teleférico de Montjuïc (TMB - Público)</span>
                            <p style="font-size:11px; margin-top:2px; color:var(--text-muted);">Sube la ladera desde el Funicular hasta el Castillo. Cabinas de 8 pasajeros sentados. 100% adaptado a cochecitos y movilidad reducida. Admite compra online. (€17.10 ida/vuelta).</p>
                        </div>
                        <div class="teleferico-item" style="border-top:1px solid var(--border-color); padding-top:8px;">
                            <span class="teleferico-name"><i class="fa-solid fa-cable-car" style="color:var(--color-airbnb);"></i> 2. Transbordador Aeri del Port (Privado)</span>
                            <p style="font-size:11px; margin-top:2px; color:var(--text-muted);">Cruza el mar desde la Barceloneta hasta Miramar. Cabinas de pie de 20 personas. <strong>No adaptado</strong>. Compra exclusivamente en taquilla física en el día. (€12.50 ida / €20.00 ida/vuelta).</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="viability-category" style="margin-bottom:20px;">
                <div class="category-title"><i class="fa-solid fa-person-hiking"></i> Enlaces Reservas Free Tours (Civitatis)</div>
                <div class="viability-card info-card" style="display:flex; flex-direction:column; gap:10px; padding: 12px;">
                    <a href="https://www.civitatis.com/ar/barcelona/free-tour-barcelona/" target="_blank" class="free-tour-link-item">
                        <span><i class="fa-solid fa-location-dot"></i> Free Tour Barcelona (Centro) - 2 hs</span>
                        <i class="fa-solid fa-up-right-from-square"></i>
                    </a>
                    <a href="https://www.civitatis.com/ar/barcelona/free-tour-born/#detalles" target="_blank" class="free-tour-link-item">
                        <span><i class="fa-solid fa-location-dot"></i> Free Tour Born / Gótico - 2 hs</span>
                        <i class="fa-solid fa-up-right-from-square"></i>
                    </a>
                    <a href="https://www.civitatis.com/ar/barcelona/free-tour-park-guell/" target="_blank" class="free-tour-link-item">
                        <span><i class="fa-solid fa-location-dot"></i> Free Tour Parque Güell - 1.5 hs</span>
                        <i class="fa-solid fa-up-right-from-square"></i>
                    </a>
                    <a href="https://www.civitatis.com/ar/barcelona/free-tour-parque-ciudadela-barceloneta/#detalles" target="_blank" class="free-tour-link-item">
                        <span><i class="fa-solid fa-location-dot"></i> Free Tour Ciudadela - Barceloneta - 2 hs</span>
                        <i class="fa-solid fa-up-right-from-square"></i>
                    </a>
                </div>
            </div>
        `;
    }

    // Update map markers based on selected tab and filters
    function updateMapMarkers() {
        markersGroup.clearLayers();

        // 1. Lodgings Map Markers
        if (activeTab === "lodgings" || showBothOnMap) {
            HOSPEDAJES.forEach(item => {
                const priceVal = parsePrice(item.importe);
                const bedsVal = getBedsCount(item.camas);
                const isFlex = isFlexibleCancellation(item.cancelacion);

                // Apply current filters to map markers too
                const matchesSearch = item.hospedaje.toLowerCase().includes(filterSearch.toLowerCase()) || 
                                      item.direccion.toLowerCase().includes(filterSearch.toLowerCase()) ||
                                      item.opcion.toLowerCase().includes(filterSearch.toLowerCase());
                const matchesPrice = priceVal <= filterMaxPrice;
                const matchesSite = filterSite === "all" || item.sitio.toLowerCase() === filterSite.toLowerCase();
                let matchesBeds = true;
                if (filterBeds !== "all") {
                    matchesBeds = bedsVal >= parseInt(filterBeds);
                }
                let matchesCancel = true;
                if (filterCancel === "free") {
                    matchesCancel = isFlex;
                }

                if (matchesSearch && matchesPrice && matchesSite && matchesBeds && matchesCancel) {
                    const markerId = `lodging-${item.opcion}`;
                    const isActive = markerId === activeMarkerId;
                    
                    const markerHtml = `<div class="custom-marker lodging ${isActive ? 'active-marker' : ''}"><i class="fa-solid fa-house"></i></div>`;
                    
                    const icon = L.divIcon({
                        html: markerHtml,
                        className: '',
                        iconSize: [32, 32]
                    });

                    const marker = L.marker([item.lat, item.lng], { icon: icon });
                    
                    // Bind beautiful popup
                    const popupContent = `
                        <div class="popup-container">
                            <div class="popup-header">
                                <span class="option-badge">Opción ${item.opcion}</span>
                                <span class="site-pill ${item.sitio.toLowerCase().replace('.', '')}">${item.sitio}</span>
                            </div>
                            <div class="popup-title">${item.hospedaje}</div>
                            <div class="popup-address">${item.direccion}</div>
                            <div class="popup-specs">
                                <span><i class="fa-solid fa-door-open"></i> ${item.dorm || '-'} D.</span>
                                <span><i class="fa-solid fa-bath"></i> ${item.banos || '-'} B.</span>
                                <span><i class="fa-solid fa-bed"></i> ${bedsVal} C.</span>
                            </div>
                            <div class="popup-header">
                                <div class="popup-price">${item.importe}</div>
                                <span style="font-size:11px;"><i class="fa-solid fa-star" style="color:var(--color-tourist)"></i> ${item.calificacion || '-'}</span>
                            </div>
                            ${item.link ? `
                                <a href="${item.link}" target="_blank" class="btn-primary popup-button">
                                    Ver en ${item.sitio} <i class="fa-solid fa-up-right-from-square"></i>
                                </a>
                            ` : ''}
                        </div>
                    `;

                    marker.bindPopup(popupContent, { maxWidth: 280 });
                    
                    marker.on("click", () => {
                        handleMarkerClick(markerId, [item.lat, item.lng]);
                    });

                    markersGroup.addLayer(marker);

                    if (isActive) {
                        marker.openPopup();
                    }
                }
            });
        } 
        
        // 2. Tourist Points Map Markers
        if (activeTab === "itinerary" || showBothOnMap) {
            PUNTOS_TURISTICOS.forEach(pt => {
                if (activeDayFilter === "all" || pt.dia === parseInt(activeDayFilter)) {
                    const markerId = `tourist-${pt.id}`;
                    const isActive = markerId === activeMarkerId;
                    
                    const markerHtml = `<div class="custom-marker tourist ${isActive ? 'active-marker' : ''}"><i class="fa-solid fa-star"></i></div>`;
                    
                    const icon = L.divIcon({
                        html: markerHtml,
                        className: '',
                        iconSize: [32, 32]
                    });

                    const marker = L.marker([pt.lat, pt.lng], { icon: icon });
                    
                    const popupContent = `
                        <div class="popup-container">
                            <div class="popup-header">
                                <span class="option-badge" style="background:var(--color-tourist); color:white;">Día ${pt.dia}</span>
                                <span class="time-badge">${pt.tiempo}</span>
                            </div>
                            <div class="popup-title">${pt.nombre}</div>
                            <p style="font-size:12px; color:var(--text-muted); line-height:1.4; margin:4px 0 8px 0;">${pt.descripcion}</p>
                            <button class="btn-primary popup-detail-btn" style="width:100%; justify-content:center; padding:4px 0; font-size:11px;" data-id="${pt.id}">
                                Ver Detalles y Fotos <i class="fa-solid fa-expand"></i>
                            </button>
                        </div>
                    `;

                    marker.bindPopup(popupContent, { maxWidth: 280 });

                    marker.on("click", () => {
                        handleMarkerClick(markerId, [pt.lat, pt.lng]);
                    });

                    marker.on("popupopen", () => {
                        const btn = document.querySelector(`.popup-detail-btn[data-id="${pt.id}"]`);
                        if (btn) {
                            btn.addEventListener("click", (e) => {
                                e.stopPropagation();
                                openModal(pt);
                            });
                        }
                    });

                    markersGroup.addLayer(marker);

                    if (isActive) {
                        marker.openPopup();
                    }
                }
            });

            // Trazar una línea conectando los puntos del día para ver el recorrido si se selecciona un día específico
            if (activeDayFilter !== "all") {
                const dayPoints = PUNTOS_TURISTICOS
                    .filter(pt => pt.dia === parseInt(activeDayFilter))
                    .map(pt => [pt.lat, pt.lng]);
                
                if (dayPoints.length > 1) {
                    const polyline = L.polyline(dayPoints, {
                        color: 'var(--color-tourist)',
                        weight: 3,
                        opacity: 0.7,
                        dashArray: '5, 10'
                    });
                    markersGroup.addLayer(polyline);
                }
            }
        }
    }

    // Handles clicking on a marker (synchronizes listing list highlight)
    function handleMarkerClick(id, coords) {
        activeMarkerId = id;
        
        // Highlight active marker class in DOM
        updateMapMarkers();

        if (activeTab === "lodgings") {
            renderLodgings();
            // Scroll matching card into view
            const cardEl = document.getElementById(`card-${id}`);
            if (cardEl) {
                cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        } else {
            renderItinerary();
            const cardEl = document.getElementById(`card-${id}`);
            if (cardEl) {
                cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }

        map.setView(coords, map.getZoom(), { animate: true });
    }

    // Programmatically focus a marker (e.g. from clicking a listing card)
    function focusMarker(id, coords) {
        activeMarkerId = id;
        
        // Render lists to apply selected classes
        if (activeTab === "lodgings") {
            renderLodgings();
        } else {
            renderItinerary();
        }

        // Update markers to show highlight state
        updateMapMarkers();

        // Zoom map and open popup
        map.setView(coords, 15, { animate: true });
    }

    // Setup interactive event listeners
    function setupEventListeners() {
        // Theme button click
        themeToggleBtn.addEventListener("click", toggleTheme);

        // Sidebar tabs switching
        tabBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const tabId = e.currentTarget.getAttribute("data-tab");
                if (activeTab === tabId) return;

                activeTab = tabId;
                activeMarkerId = null; // reset selection

                // Update tab buttons style
                tabBtns.forEach(b => b.classList.remove("active"));
                e.currentTarget.classList.add("active");

                // Update panel visibility
                tabPanels.forEach(p => p.classList.remove("active"));
                document.getElementById(`panel-${tabId}`).classList.add("active");

                // Refresh listings and markers
                updateMapMarkers();
                if (activeTab === "lodgings") {
                    renderLodgings();
                    map.setView([41.396, 2.170], 13);
                } else if (activeTab === "itinerary") {
                    renderItinerary();
                    fitMapToItinerary();
                } else if (activeTab === "viability") {
                    renderViabilityList();
                    map.setView([41.396, 2.170], 12);
                }
            });
        });

        // Lodging filter triggers
        searchInput.addEventListener("input", (e) => {
            filterSearch = e.target.value;
            renderLodgings();
            updateMapMarkers();
        });

        priceSlider.addEventListener("input", (e) => {
            filterMaxPrice = parseInt(e.target.value);
            renderLodgings();
            updateMapMarkers();
        });

        siteSelect.addEventListener("change", (e) => {
            filterSite = e.target.value;
            renderLodgings();
            updateMapMarkers();
        });

        bedsSelect.addEventListener("change", (e) => {
            filterBeds = e.target.value;
            renderLodgings();
            updateMapMarkers();
        });

        cancelSelect.addEventListener("change", (e) => {
            filterCancel = e.target.value;
            renderLodgings();
            updateMapMarkers();
        });

        sortBySelect.addEventListener("change", (e) => {
            sortOrder = e.target.value;
            renderLodgings();
        });

        // Day selection triggers for itinerary
        dayBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                dayBtns.forEach(b => b.classList.remove("active"));
                e.currentTarget.classList.add("active");

                activeDayFilter = e.currentTarget.getAttribute("data-day");
                activeMarkerId = null; // reset selection

                renderItinerary();
                updateMapMarkers();
                fitMapToItinerary();
            });
        });

        // Toggle both map markers button
        toggleBothBtn.addEventListener("click", () => {
            showBothOnMap = !showBothOnMap;
            if (showBothOnMap) {
                toggleBothIcon.classList.remove("fa-toggle-off");
                toggleBothIcon.classList.add("fa-toggle-on");
                toggleBothIcon.style.color = "var(--color-primary)";
            } else {
                toggleBothIcon.classList.remove("fa-toggle-on");
                toggleBothIcon.classList.add("fa-toggle-off");
                toggleBothIcon.style.color = "var(--text-muted)";
            }
            
            updateMapMarkers();
            
            if (showBothOnMap) {
                map.setView([41.396, 2.170], 13, { animate: true });
            } else {
                if (activeTab === "lodgings") {
                    map.setView([41.396, 2.170], 13, { animate: true });
                } else {
                    fitMapToItinerary();
                }
            }
        });

        // Modal event listeners
        modalCloseBtn.addEventListener("click", closeModal);
        window.addEventListener("click", (e) => {
            if (e.target === attractionModal) {
                closeModal();
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && attractionModal.style.display === "flex") {
                closeModal();
            }
        });
    }

    // Auto-fit map viewport to show all selected itinerary points
    function fitMapToItinerary() {
        let pts = PUNTOS_TURISTICOS;
        if (activeDayFilter !== "all") {
            pts = PUNTOS_TURISTICOS.filter(pt => pt.dia === parseInt(activeDayFilter));
        }

        if (pts.length === 0) return;

        const bounds = L.latLngBounds(pts.map(pt => [pt.lat, pt.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
});
