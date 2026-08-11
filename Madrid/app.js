// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
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
    let activeTab = "itinerary";
    let filterMaxPrice = 3000;
    let filterSite = "all";
    let filterBeds = "all";
    let filterCancel = "all";
    let filterSearch = "";
    let sortOrder = "opcion";
    let activeDayFilter = "all";
    let showBothOnMap = false;

    // Initialize Application
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    initMap();
    setupEventListeners();
    renderLodgings();
    renderItinerary();
    renderViabilityList();
    updateMapMarkers();

    // Map logic
    function initMap() {
        // Center on Madrid
        map = L.map("map", {
            center: [40.4168, -3.7038],
            zoom: 14,
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
                            <div class="viability-section-title"><i class="fa-solid fa-circle-info"></i> A tener en cuenta</div>
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

    function renderViabilityList() {
        const container = document.getElementById("viability-list");
        container.innerHTML = `
            <div class="viability-category">
                <div class="category-title"><i class="fa-solid fa-ticket"></i> Entradas Anticipadas Críticas</div>
                
                <div class="viability-card info-card">
                     <div class="card-title-sec">
                         <span class="monument-name">Palacio Real de Madrid</span>
                         <span class="warning-badge">Altamente Recomendado</span>
                     </div>
                     <div class="card-body-sec">
                         <p><strong>Aviso:</strong> Apertura oficial a las 10:00 hs. Se recomienda comprar entrada para esa franja horaria online. Evitar llevar bolsos o mochilas grandes debido a regulaciones de seguridad.</p>
                     </div>
                 </div>

                 <div class="viability-card info-card">
                     <div class="card-title-sec">
                         <span class="monument-name">Tour Bernabéu (Classic)</span>
                         <span class="warning-badge">Altamente Recomendado</span>
                     </div>
                     <div class="card-body-sec">
                         <p><strong>Aviso:</strong> Compra de entrada Classic online obligatoria con fecha y hora. Advertencia: el recorrido incluye bastantes escaleras y puede sufrir restricciones parciales los días de partido o víspera.</p>
                     </div>
                 </div>

                 <div class="viability-card info-card">
                     <div class="card-title-sec">
                         <span class="monument-name">Museo Nacional del Prado</span>
                         <span class="info-badge">Comprar Online</span>
                     </div>
                     <div class="card-body-sec">
                         <p><strong>Aviso:</strong> Imprescindible reservar pase horario online para evitar largas colas de taquilla. Menores de 18 años entran gratis, pero requieren ticket de acceso gratuito.</p>
                     </div>
                 </div>

                 <div class="viability-card info-card">
                     <div class="card-title-sec">
                         <span class="monument-name">Museo Reina Sofía</span>
                         <span class="info-badge">Comprar Online</span>
                     </div>
                     <div class="card-body-sec">
                         <p><strong>Aviso:</strong> Menores de 18 gratis en taquilla acreditados. Se recomienda visitar por la mañana. Horas de mayor afluencia: 10:00 a 12:00 hs.</p>
                     </div>
                 </div>

                 <div class="viability-card info-card">
                      <div class="card-title-sec">
                          <span class="monument-name">Museum of Senses</span>
                          <span class="info-badge">Comprar Online</span>
                      </div>
                      <div class="card-body-sec">
                          <p><strong>Aviso:</strong> Se aconseja comprar online. Entrada familiar (2+2) + 1 adulto adicional = €79 aprox. Incluye kit con medias (la experiencia es sin zapatos) y dulces.</p>
                      </div>
                  </div>

                 <div class="viability-card info-card">
                     <div class="card-title-sec">
                         <span class="monument-name">Faro de Moncloa</span>
                         <span class="info-badge">Se sugiere reservar</span>
                     </div>
                     <div class="card-body-sec">
                         <p><strong>Aviso:</strong> La estancia máxima es de 30 minutos. El mirador puede cerrar sin previo aviso en caso de condiciones meteorológicas adversas (fuertes vientos).</p>
                     </div>
                 </div>
            </div>

            <div class="viability-category">
                <div class="category-title"><i class="fa-solid fa-triangle-exclamation" style="color:var(--color-tourist);"></i> Puntos a Reconfirmar</div>
                
                <div class="viability-card alert-card">
                     <div class="card-title-sec">
                         <span class="alert-title-text"><i class="fa-solid fa-hotel"></i> Check-in e Impuestos</span>
                     </div>
                     <div class="card-body-sec">
                         <p>Coordinar el check-in o depósito de maletas para estar a las 13:00 en Mercado San Miguel. El último día (3/10), finalizar todo a las 15:00 hs para retirar maletas y llegar al aeropuerto para trámites de Tax Refund.</p>
                     </div>
                 </div>

                 <div class="viability-card alert-card">
                     <div class="card-title-sec">
                         <span class="alert-title-text"><i class="fa-solid fa-ban"></i> Palacio de Cristal</span>
                     </div>
                     <div class="card-body-sec">
                         <p><strong>Cierre Temporal:</strong> El Palacio de Cristal en el Parque del Retiro permanece cerrado al público por obras de conservación arquitectónica. Se visita únicamente su espectacular exterior y lago.</p>
                     </div>
                 </div>
            </div>

            <div class="viability-category" style="margin-bottom:20px;">
                <div class="category-title"><i class="fa-solid fa-tree"></i> Espacios Libres (Sin Ticket)</div>
                <div class="viability-card info-card">
                    <p style="font-size: 13px; line-height: 1.5; color: var(--text-muted); padding: 8px;">
                        Plaza Mayor, Puerta del Sol, Gran Vía, Templo de Debod (exterior), Parque del Retiro y Madrid Río son de acceso libre. Madrid Río cuenta con 17 áreas infantiles excelentes para los niños (toboganes y tirolesas).
                    </p>
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

            // Draw confirmed accommodation permanently on map
            const baseLodging = HOSPEDAJES.find(h => h.opcion === "12");
            if (baseLodging) {
                const markerId = `base-lodging`;
                const isActive = markerId === activeMarkerId;
                const markerHtml = `<div class="custom-marker base-accommodation ${isActive ? 'active-marker' : ''}"><i class="fa-solid fa-house"></i></div>`;
                const icon = L.divIcon({ html: markerHtml, className: '', iconSize: [32, 32] });
                const marker = L.marker([baseLodging.lat, baseLodging.lng], { icon: icon, zIndexOffset: 1000 });
                const popupContent = `
                    <div class="popup-container">
                        <div class="popup-header">
                            <span class="option-badge" style="background:#fbbf24; color:black;">Alojamiento</span>
                        </div>
                        <div class="popup-title">Alojamiento Confirmado:<br>${baseLodging.hospedaje}</div>
                        <div class="popup-address">${baseLodging.direccion}</div>
                        <p style="font-size:12px; color:var(--text-muted); line-height:1.4; margin:4px 0 8px 0;">Base de operaciones para el viaje.<br><a href="${baseLodging.link}" target="_blank" style="color:#2563eb; text-decoration:underline; font-weight:600;"><i class="fa-solid fa-link"></i> Ver en ${baseLodging.sitio || 'Booking'}</a></p>
                    </div>
                `;
                marker.bindPopup(popupContent, { maxWidth: 280 });
                marker.on("click", () => { handleMarkerClick(markerId, [baseLodging.lat, baseLodging.lng]); });
                markersGroup.addLayer(marker);
                if (isActive) marker.openPopup();
            }

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
                            <button class="btn-primary popup-detail-btn" style="width:100%; justify-content:center; padding:4px 0; font-size:11px;" onclick="window.openAttractionModal('${pt.id}')">
                                Ver Detalles <i class="fa-solid fa-expand"></i>
                            </button>
                        </div>
                    `;

                    marker.bindPopup(popupContent, { maxWidth: 280 });

                    marker.on("click", () => {
                        handleMarkerClick(markerId, [pt.lat, pt.lng]);
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
                    map.setView([39.469, -0.376], 13);
                } else if (activeTab === "itinerary") {
                    renderItinerary();
                    fitMapToItinerary();
                } else if (activeTab === "viability") {
                    renderViabilityList();
                    map.setView([39.469, -0.376], 12);
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
                map.setView([39.469, -0.376], 13, { animate: true });
            } else {
                if (activeTab === "lodgings") {
                    map.setView([39.469, -0.376], 13, { animate: true });
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

        // Budget Overlay event listeners
        const btnBudget = document.getElementById("btn-budget");
        const closeBudgetBtn = document.getElementById("close-budget-btn");
        const budgetView = document.getElementById("budget-view");

        if (btnBudget && closeBudgetBtn && budgetView) {
            btnBudget.addEventListener("click", () => {
                budgetView.classList.remove("hidden");
                renderBudgetList();
            });

            closeBudgetBtn.addEventListener("click", () => {
                budgetView.classList.add("hidden");
            });
        }

        // Master Plan Overlay event listeners
        const btnMasterPlan = document.getElementById("btn-master-plan");
        const closeMasterPlanBtn = document.getElementById("close-master-plan-btn");
        const masterPlanView = document.getElementById("master-plan-view");

        if (btnMasterPlan && closeMasterPlanBtn && masterPlanView) {
            btnMasterPlan.addEventListener("click", () => {
                masterPlanView.classList.remove("hidden");
            });

            closeMasterPlanBtn.addEventListener("click", () => {
                masterPlanView.classList.add("hidden");
            });
        }
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

    // Expose openModal to window for popup links
    window.openAttractionModal = function (id) {
        const pt = PUNTOS_TURISTICOS.find(p => p.id === id);
        if (pt) openModal(pt);
    };

    // Budget Logic
    function renderBudgetList() {
        const listContainer = document.getElementById('budget-list');
        listContainer.innerHTML = '';

        let savedSelections = {};
        try {
            const saved = localStorage.getItem('budgetSelections');
            if (saved) savedSelections = JSON.parse(saved);
        } catch (e) { }

        PUNTOS_TURISTICOS.forEach(pt => {
            // Se asume que BUDGET_DATA está cargado globalmente desde budget_data.js
            const data = typeof BUDGET_DATA !== "undefined" ? BUDGET_DATA[pt.id] : null;
            if (!data) return;

            const selection = savedSelections[pt.id] || { checked: true, option: 0 };

            const itemDiv = document.createElement('div');
            itemDiv.className = `budget-item ${selection.checked ? '' : 'disabled'}`;
            itemDiv.dataset.id = pt.id;

            let optionsHtml = '';
            if (data.options.length > 1) {
                optionsHtml = `<select class="budget-select">`;
                data.options.forEach((opt, idx) => {
                    const selected = idx === selection.option ? 'selected' : '';
                    optionsHtml += `<option value="${idx}" ${selected}>${opt.name}</option>`;
                });
                optionsHtml += `</select>`;
            } else {
                optionsHtml = `<span style="font-size: 0.9rem; color: var(--text-muted);">${data.options[0].name}</span>`;
            }

            itemDiv.innerHTML = `
                <input type="checkbox" class="budget-item-checkbox" ${selection.checked ? 'checked' : ''}>
                <div class="budget-item-details">
                    <h4>${pt.nombre}</h4>
                    <p>Día ${pt.dia} - ${pt.tiempo}</p>
                </div>
                <div class="budget-item-controls">
                    ${optionsHtml}
                    <div class="budget-item-price">€ 0.00</div>
                </div>
            `;

            const checkbox = itemDiv.querySelector('.budget-item-checkbox');
            checkbox.addEventListener('change', calculateBudgetTotal);

            const select = itemDiv.querySelector('.budget-select');
            if (select) {
                select.addEventListener('change', calculateBudgetTotal);
            }

            listContainer.appendChild(itemDiv);
        });

        calculateBudgetTotal();
    }

    function calculateBudgetTotal() {
        let total = 0;
        const listItems = document.querySelectorAll('.budget-item');
        const selections = {};

        listItems.forEach(item => {
            const id = item.dataset.id;
            const checkbox = item.querySelector('.budget-item-checkbox');
            const select = item.querySelector('.budget-select');
            const data = BUDGET_DATA[id];

            if (!data) return;

            const optionIndex = select ? parseInt(select.value) : 0;
            const isChecked = checkbox.checked;

            selections[id] = { checked: isChecked, option: optionIndex };

            if (isChecked) {
                item.classList.remove('disabled');
                const opt = data.options[optionIndex];
                let itemTotal = 0;

                if (opt.isFamilyPrice) {
                    itemTotal = opt.priceAdult; // Precio globar para toda la familia (ej. Free Tour)
                } else {
                    const priceAdult = opt.priceAdult || 0;
                    const price14 = opt.price14 !== undefined ? opt.price14 : priceAdult;
                    const price11 = opt.price11 !== undefined ? opt.price11 : priceAdult;
                    const price8 = opt.price8 !== undefined ? opt.price8 : priceAdult;

                    itemTotal = (priceAdult * 2) + price14 + price11 + price8;
                }

                total += itemTotal;
                item.querySelector('.budget-item-price').textContent = `€ ${itemTotal.toFixed(2)}`;
            } else {
                item.classList.add('disabled');
                item.querySelector('.budget-item-price').textContent = `€ 0.00`;
            }
        });

        document.getElementById('budget-total-value').textContent = `€ ${total.toFixed(2)}`;
        localStorage.setItem('budgetSelections', JSON.stringify(selections));
    }
});
