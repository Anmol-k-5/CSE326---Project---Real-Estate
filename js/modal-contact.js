/**
 * ==============================================================================
 * File: modal-contact.js
 * Author: Kunal (Dev 3 - Interactive Tools & Utilities)
 * GitHub: @kp4339536-netizen
 * Feature: Property Quick-View Modal, Photo Gallery Switcher,
 *          Site Visit Booking Form Validation, and Toast Notifications
 * ==============================================================================
 */

window.ModalManager = window.ModalManager || {};
window.UIUtils = window.UIUtils || {};

(function () {
    'use strict';

    // ==========================================================================
    // 1. FLOATING TOAST NOTIFICATION ENGINE
    // ==========================================================================

    /**
     * Displays a floating toast notification in the corner of the screen
     * @param {string} message - Text notification to display
     * @param {'success'|'info'|'warning'|'error'} [type='info'] - Visual status tone
     */
    function showToast(message, type) {
        // Step 1: Ensure container element exists
        var container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        var statusType = type || 'info';

        // Step 2: Select appropriate icon
        var icon = 'ℹ️';
        if (statusType === 'success') icon = '✅';
        if (statusType === 'warning') icon = '⚠️';
        if (statusType === 'error') icon = '❌';

        // Step 3: Create toast element
        var toast = document.createElement('div');
        toast.className = 'toast-pill toast-pill--' + statusType;
        toast.innerHTML = '<span class="toast-pill__icon">' + icon + '</span>' +
                          '<span class="toast-pill__msg">' + message + '</span>' +
                          '<button type="button" class="toast-pill__close" aria-label="Close notification">&times;</button>';

        // Step 4: Attach close listener
        var closeBtn = toast.querySelector('.toast-pill__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                removeToast(toast);
            });
        }

        // Step 5: Append to screen
        container.appendChild(toast);

        // Auto remove after 3.5 seconds
        setTimeout(function () {
            removeToast(toast);
        }, 3500);
    }

    /**
     * Smoothly fades out and removes a toast pill
     */
    function removeToast(toastElement) {
        if (!toastElement || !toastElement.parentNode) return;
        toastElement.classList.add('is-hiding');
        setTimeout(function () {
            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
            }
        }, 300);
    }

    // Expose toast publicly
    window.UIUtils.showToast = showToast;

    // ==========================================================================
    // 2. PROPERTY QUICK-VIEW MODAL & PHOTO GALLERY
    // ==========================================================================

    var activePropertyId = null;

    /**
     * Opens the Quick-View modal populated with the selected property data
     * @param {number|string} propertyId 
     */
    function openPropertyModal(propertyId) {
        // Step 1: Query property details from Anmol's data layer
        if (!window.RealEstateData || typeof window.RealEstateData.getPropertyById !== 'function') {
            console.error('[ModalManager] RealEstateData source not found.');
            return;
        }

        var property = window.RealEstateData.getPropertyById(propertyId);
        if (!property) {
            showToast('Property details could not be found.', 'error');
            return;
        }

        activePropertyId = property.id;

        // Step 2: Grab modal elements
        var modalOverlay = document.getElementById('propertyDetailsModal');
        if (!modalOverlay) {
            console.warn('[ModalManager] Modal overlay markup missing.');
            return;
        }

        // Step 3: Populate modal headers and text
        document.getElementById('modalPropertyTitle').textContent = property.title;
        document.getElementById('modalPropertyAddress').textContent = '📍 ' + property.address;
        document.getElementById('modalPropertyPrice').textContent = property.formattedPrice;
        document.getElementById('modalPropertyTypeBadge').textContent = property.type + ' • For ' + property.purpose;
        document.getElementById('modalPropertyDesc').textContent = property.description;
        document.getElementById('modalPropertyRera').textContent = 'RERA Reg: ' + property.reraId;

        // Step 4: Populate specifications table
        document.getElementById('modalSpecBeds').textContent = property.bedrooms + ' BHK';
        document.getElementById('modalSpecBaths').textContent = property.bathrooms + ' Bathrooms';
        document.getElementById('modalSpecArea').textContent = property.areaSqFt + ' sq.ft';
        document.getElementById('modalSpecFurnish').textContent = property.furnishing;
        document.getElementById('modalSpecFacing').textContent = property.facing + ' Facing';
        document.getElementById('modalSpecFloor').textContent = 'Floor ' + property.floorNumber + ' of ' + property.totalFloors;
        document.getElementById('modalSpecParking').textContent = property.parkingSpots + ' Reserved Spot(s)';

        // Step 5: Render verified amenities checklist
        var amenitiesContainer = document.getElementById('modalAmenitiesList');
        if (amenitiesContainer) {
            var amenitiesHtml = '';
            for (var i = 0; i < property.amenities.length; i++) {
                amenitiesHtml += '<li class="amenity-item">✓ ' + property.amenities[i] + '</li>';
            }
            amenitiesContainer.innerHTML = amenitiesHtml;
        }

        // Step 6: Render interactive photo gallery
        var mainImage = document.getElementById('modalMainImage');
        var thumbStrip = document.getElementById('modalThumbnailsStrip');

        if (mainImage) {
            mainImage.src = property.mainImage;
            mainImage.alt = property.title;
        }

        if (thumbStrip && property.gallery && property.gallery.length > 0) {
            var thumbsHtml = '';
            for (var j = 0; j < property.gallery.length; j++) {
                var isActive = j === 0 ? 'is-active' : '';
                thumbsHtml += '<img src="' + property.gallery[j] + '" ' +
                              'alt="Thumbnail ' + (j + 1) + '" ' +
                              'class="modal-thumb ' + isActive + '" ' +
                              'data-thumb-src="' + property.gallery[j] + '" />';
            }
            thumbStrip.innerHTML = thumbsHtml;

            // Attach click listeners to thumbnails
            var thumbs = thumbStrip.querySelectorAll('.modal-thumb');
            for (var k = 0; k < thumbs.length; k++) {
                thumbs[k].addEventListener('click', function () {
                    for (var x = 0; x < thumbs.length; x++) {
                        thumbs[x].classList.remove('is-active');
                    }
                    this.classList.add('is-active');
                    if (mainImage) {
                        mainImage.src = this.getAttribute('data-thumb-src');
                    }
                });
            }
        }

        // Step 7: Pre-fill tour booking form hidden property ID
        var tourPropInput = document.getElementById('tourFormPropertyId');
        if (tourPropInput) {
            tourPropInput.value = property.id;
        }
        var tourFormTitle = document.getElementById('tourBookingPropTitle');
        if (tourFormTitle) {
            tourFormTitle.textContent = 'Property: ' + property.title;
        }

        // Step 8: Open modal and disable background scrolling
        modalOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Closes the active modal
     */
    function closePropertyModal() {
        var modalOverlay = document.getElementById('propertyDetailsModal');
        if (modalOverlay) {
            modalOverlay.classList.remove('is-open');
        }
        document.body.style.overflow = '';
        activePropertyId = null;
    }

    // ==========================================================================
    // 3. SCHEDULE A SITE VISIT / BOOKING FORM VALIDATION
    // ==========================================================================

    /**
     * Initializes booking form input constraints and event handlers
     */
    function initTourBookingForm() {
        var form = document.getElementById('tourBookingForm');
        var dateInput = document.getElementById('tourDateInput');

        // Step 1: Prevent users from choosing past dates
        if (dateInput) {
            var today = new Date();
            var yyyy = today.getFullYear();
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var dd = String(today.getDate()).padStart(2, '0');
            dateInput.min = yyyy + '-' + mm + '-' + dd;
        }

        if (!form) return;

        // Step 2: Handle form submission with full regex validation
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var nameInput = document.getElementById('tourNameInput');
            var emailInput = document.getElementById('tourEmailInput');
            var phoneInput = document.getElementById('tourPhoneInput');
            var timeSlotInput = document.getElementById('tourTimeSlotInput');
            var notesInput = document.getElementById('tourNotesInput');

            var formIsValid = true;

            // 1. Name validation
            if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
                showInputError(nameInput, 'Please enter a valid full name (min 3 characters).');
                formIsValid = false;
            } else {
                clearInputError(nameInput);
            }

            // 2. Email regex validation
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                showInputError(emailInput, 'Please enter a valid email address.');
                formIsValid = false;
            } else {
                clearInputError(emailInput);
            }

            // 3. 10-digit Indian Mobile regex validation
            var phonePattern = /^[6-9]\d{9}$/;
            var cleanPhone = phoneInput.value.trim().replace(/\D/g, '');
            if (!phonePattern.test(cleanPhone)) {
                showInputError(phoneInput, 'Please enter a valid 10-digit mobile number.');
                formIsValid = false;
            } else {
                clearInputError(phoneInput);
            }

            // 4. Date validation
            if (dateInput && !dateInput.value) {
                showInputError(dateInput, 'Please select your preferred visit date.');
                formIsValid = false;
            } else if (dateInput) {
                clearInputError(dateInput);
            }

            if (!formIsValid) {
                showToast('Please fix the errors highlighted in the form.', 'warning');
                return;
            }

            // Step 3: Success state - Simulate booking confirmation
            var bookedDate = dateInput ? dateInput.value : 'Upcoming date';
            var bookedTime = timeSlotInput ? timeSlotInput.value : 'Morning slot';

            // Show confirmation UI inside the form
            form.innerHTML = '<div class="booking-success-box">' +
                             '<div class="booking-success-box__icon">🎉</div>' +
                             '<h3>Site Visit Scheduled Successfully!</h3>' +
                             '<p>Thank you <strong>' + escapeHtml(nameInput.value.trim()) + '</strong>. Our verified property relationship manager will contact you at <strong>' + escapeHtml(phoneInput.value.trim()) + '</strong> to confirm your arrival on <strong>' + bookedDate + ' (' + bookedTime + ')</strong>.</p>' +
                             '<p class="booking-success-box__ref">Booking Reference: #DN-' + Math.floor(100000 + Math.random() * 900000) + '</p>' +
                             '<button type="button" class="btn btn--outline btn--sm" id="bookAnotherVisitBtn">Book Another Visit</button>' +
                             '</div>';

            showToast('Site visit confirmed! Our agent will call you shortly.', 'success');

            var anotherBtn = document.getElementById('bookAnotherVisitBtn');
            if (anotherBtn) {
                anotherBtn.addEventListener('click', function () {
                    closePropertyModal();
                });
            }
        });
    }

    /**
     * Displays validation error message next to an input field
     */
    function showInputError(inputElement, errorMessage) {
        if (!inputElement) return;
        inputElement.classList.add('is-invalid');

        var parent = inputElement.parentElement;
        var existingError = parent.querySelector('.input-error-msg');
        if (!existingError) {
            var msg = document.createElement('span');
            msg.className = 'input-error-msg';
            msg.textContent = errorMessage;
            parent.appendChild(msg);
        } else {
            existingError.textContent = errorMessage;
        }
    }

    /**
     * Clears error highlight
     */
    function clearInputError(inputElement) {
        if (!inputElement) return;
        inputElement.classList.remove('is-invalid');
        var parent = inputElement.parentElement;
        var existingError = parent.querySelector('.input-error-msg');
        if (existingError) {
            parent.removeChild(existingError);
        }
    }

    /**
     * Escapes HTML characters to prevent XSS in confirmations
     */
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ==========================================================================
    // 4. INTERACTIVE UTILITIES (FAQ, Scroll-To-Top, Share)
    // ==========================================================================

    /**
     * Initializes accordion toggle on FAQ sections
     */
    function initFaqAccordion() {
        var faqItems = document.querySelectorAll('.faq-accordion__item');
        for (var i = 0; i < faqItems.length; i++) {
            var questionBtn = faqItems[i].querySelector('.faq-accordion__question');
            if (questionBtn) {
                questionBtn.addEventListener('click', function () {
                    var parentItem = this.parentElement;
                    var isOpen = parentItem.classList.contains('is-open');

                    // Close all other items
                    for (var j = 0; j < faqItems.length; j++) {
                        faqItems[j].classList.remove('is-open');
                    }

                    // Toggle clicked item
                    if (!isOpen) {
                        parentItem.classList.add('is-open');
                    }
                });
            }
        }
    }

    /**
     * Sets up Scroll-To-Top button behavior
     */
    function initScrollToTop() {
        var topBtn = document.getElementById('scrollToTopBtn');
        if (!topBtn) return;

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 380) {
                topBtn.classList.add('is-visible');
            } else {
                topBtn.classList.remove('is-visible');
            }
        });

        topBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Initializes modal backdrop and close trigger listeners
     */
    function initModalListeners() {
        var modalOverlay = document.getElementById('propertyDetailsModal');
        var closeBtn = document.getElementById('modalCloseBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', closePropertyModal);
        }

        if (modalOverlay) {
            // Close when clicking outside the dialog content box
            modalOverlay.addEventListener('click', function (event) {
                if (event.target === modalOverlay) {
                    closePropertyModal();
                }
            });
        }

        // Close on ESC key press
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                closePropertyModal();
            }
        });

        // Tab switching inside modal (Details vs Schedule Tour)
        var modalTabBtns = document.querySelectorAll('[data-modal-tab]');
        for (var i = 0; i < modalTabBtns.length; i++) {
            modalTabBtns[i].addEventListener('click', function () {
                var targetTab = this.getAttribute('data-modal-tab');

                for (var j = 0; j < modalTabBtns.length; j++) {
                    modalTabBtns[j].classList.remove('is-active');
                }
                this.classList.add('is-active');

                var tabPanes = document.querySelectorAll('.modal-tab-content');
                for (var k = 0; k < tabPanes.length; k++) {
                    tabPanes[k].classList.remove('is-active');
                }

                var activePane = document.getElementById('modalTabPane_' + targetTab);
                if (activePane) {
                    activePane.classList.add('is-active');
                }
            });
        }
    }

    /**
     * Master bootstrap for Kunal's interactive components
     */
    function init() {
        initModalListeners();
        initTourBookingForm();
        initFaqAccordion();
        initScrollToTop();
    }

    // Public API exposed for Anmol and Mukesh
    window.ModalManager = {
        init: init,
        openModal: openPropertyModal,
        closeModal: closePropertyModal
    };

    // Auto-boot on DOM ready
    document.addEventListener('DOMContentLoaded', init);

})();
