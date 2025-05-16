// Gestione del menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }

    // Chiudi il menu quando si clicca su un link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });

    // Animazione smooth scroll per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animazione per gli elementi quando entrano nel viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .project-card, .feature, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Aggiungi classe per l'animazione iniziale
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Gestione form di contatto (se presente)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Qui si potrebbe implementare la logica di invio del form
            // Per ora mostriamo solo un messaggio di successo
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Grazie per averci contattato! Ti risponderemo al più presto.';
            
            contactForm.appendChild(formMessage);
            contactForm.reset();
            
            // Rimuovi il messaggio dopo 5 secondi
            setTimeout(() => {
                formMessage.remove();
            }, 5000);
        });
    }
});

// Funzione per caricare le immagini in modo lazy
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        images.forEach(image => imageObserver.observe(image));
    } else {
        // Fallback per browser che non supportano IntersectionObserver
        images.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
}

// Esegui lazy loading quando il documento è pronto
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Funzione per il pulsante "Torna su"
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
});

// Funzione per i filtri dei progetti
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Rimuovi la classe active da tutti i pulsanti
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Aggiungi la classe active al pulsante cliccato
            this.classList.add('active');
            
            // Ottieni il valore del filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Filtra i progetti
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Effetto header al scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animazione elementi al scroll
document.addEventListener('DOMContentLoaded', function() {
    // Funzione per controllare se un elemento è visibile nella viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Elementi da animare
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .feature, .testimonial');
    
    // Funzione per aggiungere la classe di animazione
    function checkForAnimation() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // Controlla all'avvio
    checkForAnimation();
    
    // Controlla allo scroll
    window.addEventListener('scroll', checkForAnimation);
    
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});