/**
 * ==================== PORTFOLIO JAVASCRIPT ====================
 * 
 * Ce fichier gère:
 * - Validation du formulaire de contact
 * - Animation fade-in au scroll
 * - Smooth scroll
 * - Gestion des événements
 */

// ==================== INITIALISATION ====================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les animations
    initScrollAnimations();
    
    // Initialiser la validation du formulaire
    initFormValidation();
    
    // Initialiser les event listeners
    initEventListeners();
});

// ==================== ANIMATIONS AU SCROLL ====================

/**
 * Initialise les animations fade-in au scroll
 * Les éléments avec la classe 'fade-in' s'animent quand ils sont visibles
 */
function initScrollAnimations() {
    // Créer un Intersection Observer pour détecter les éléments visibles
    const observerOptions = {
        threshold: 0.1,        // L'élément doit être 10% visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // Si l'élément est visible, ajouter la classe active
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ne pas réobserver après que c'est fait
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(function(element) {
        observer.observe(element);
    });
}

// ==================== VALIDATION FORMULAIRE ====================

/**
 * Initialise la validation du formulaire de contact
 * Validation côté client avec messages d'erreur personnalisés
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Vérifier si le formulaire est valide
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Valider les données
        if (validateFormData(data)) {
            // Afficher le message de succès
            showSuccessMessage();
            
            // Réinitialiser le formulaire
            form.reset();
            form.classList.remove('was-validated');
            
            // Réinitialiser les messages après 5 secondes
            setTimeout(hideMessages, 5000);
        } else {
            showErrorMessage();
            setTimeout(hideMessages, 5000);
        }
    });
}

/**
 * Valide les données du formulaire
 * @param {Object} data - Les données du formulaire
 * @returns {boolean} - Vrai si les données sont valides
 */
function validateFormData(data) {
    // Vérifier que le nom n'est pas vide et contient au moins 3 caractères
    if (!data.name || data.name.trim().length < 3) {
        return false;
    }

    // Vérifier que l'email est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    // Vérifier que le message n'est pas vide et contient au moins 10 caractères
    if (!data.message || data.message.trim().length < 10) {
        return false;
    }

    return true;
}

/**
 * Affiche le message de succès
 */
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (successMessage) {
        successMessage.style.display = 'block';
    }
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

/**
 * Affiche le message d'erreur
 */
function showErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    if (errorMessage) {
        errorMessage.style.display = 'block';
    }
    if (successMessage) {
        successMessage.style.display = 'none';
    }
}

/**
 * Masque les messages
 */
function hideMessages() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (successMessage) {
        successMessage.style.display = 'none';
    }
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

// ==================== EVENT LISTENERS ====================

/**
 * Initialise les event listeners supplémentaires
 */
function initEventListeners() {
    // Ajouter un event listener au clic sur les liens de navigation
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Fermer le menu déroulant après le clic
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        });
    });

    // Ajouter une classe active au lien de navigation actuel lors du scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * Met à jour le lien de navigation actif en fonction du scroll
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');

    let currentSection = '';

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ==================== UTILITAIRES ====================

/**
 * Log pour le debug (garder pour le développement)
 */
console.log('Portfolio JavaScript chargé avec succès');