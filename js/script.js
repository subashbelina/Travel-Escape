// Mobile menu functionality
const initMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button if it doesn't exist
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.insertBefore(mobileMenuBtn, navLinks);
    }
    
    // Toggle menu on click
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle('show');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and submission
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (validateForm(formData)) {
                // Here you would typically send the data to a server
                console.log('Form submitted:', formData);
                
                // Show success message
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
};

// Form validation
const validateForm = (formData) => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
        showNotification('Please enter your name', 'error');
        isValid = false;
    }

    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        isValid = false;
    }

    if (!formData.subject.trim()) {
        showNotification('Please enter a subject', 'error');
        isValid = false;
    }

    if (!formData.message.trim()) {
        showNotification('Please enter your message', 'error');
        isValid = false;
    }

    return isValid;
};

// Notification system
const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Navbar scroll effect
const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
};

// Image lazy loading
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Animate elements on scroll
const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => observer.observe(element));
};

// Search functionality
const initSearch = () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Sample destination data for search
    const destinations = [
        {
            name: 'Maldives Paradise',
            category: 'Beach Getaways',
            description: 'Experience crystal clear turquoise waters and pristine white sandy beaches in this tropical paradise.',
            image: 'images/beaches/beach1.jpg',
            type: 'beach'
        },
        {
            name: 'Bali Coast',
            category: 'Beach Getaways',
            description: 'Discover the perfect blend of culture and beach life in beautiful Bali.',
            image: 'images/beaches/beach2.jpg',
            type: 'beach'
        },
        {
            name: 'Swiss Alps',
            category: 'Country Adventures',
            description: 'Experience the breathtaking beauty of the Swiss countryside with its majestic mountains.',
            image: 'images/countries/country1.jpg',
            type: 'country'
        },
        {
            name: 'New Zealand',
            category: 'Country Adventures',
            description: 'Discover the stunning landscapes of Middle Earth, from rolling green hills to dramatic fjords.',
            image: 'images/countries/country2.jpg',
            type: 'country'
        },
        {
            name: 'Angkor Wat, Cambodia',
            category: 'Cultural Temples',
            description: 'Explore the magnificent ancient temples of Cambodia, a UNESCO World Heritage site.',
            image: 'images/temples/temple1.jpg',
            type: 'temple'
        },
        {
            name: 'Kyoto Temples, Japan',
            category: 'Cultural Temples',
            description: 'Immerse yourself in the rich cultural heritage of Japan through its ancient temples and shrines.',
            image: 'images/temples/temple2.jpg',
            type: 'temple'
        }
    ];

    // Open search overlay
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    });

    // Close search overlay
    const closeSearchOverlay = () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.body.style.overflow = '';
    };

    closeSearch.addEventListener('click', closeSearchOverlay);

    // Close on overlay click
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearchOverlay();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    // Search functionality
    const performSearch = (query) => {
        if (!query.trim()) {
            searchResults.innerHTML = '';
            return;
        }

        const filteredDestinations = destinations.filter(destination => {
            const searchTerm = query.toLowerCase();
            return (
                destination.name.toLowerCase().includes(searchTerm) ||
                destination.category.toLowerCase().includes(searchTerm) ||
                destination.description.toLowerCase().includes(searchTerm) ||
                destination.type.toLowerCase().includes(searchTerm)
            );
        });

        displaySearchResults(filteredDestinations);
    };

    // Display search results
    const displaySearchResults = (results) => {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No destinations found matching your search.</p>
                    <p>Try searching for "beach", "temple", "adventure", or specific destinations.</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(destination => `
            <div class="search-result-item" onclick="scrollToDestination('${destination.name}')">
                <img src="${destination.image}" alt="${destination.name}" loading="lazy">
                <div class="search-result-info">
                    <h4>${destination.name}</h4>
                    <p>${destination.category}</p>
                    <p>${destination.description.substring(0, 80)}...</p>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    };

    // Handle search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    // Real-time search as user types
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // Make scrollToDestination function global
    window.scrollToDestination = (destinationName) => {
        closeSearchOverlay();
        
        // Find the destination card and scroll to it
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && title.textContent.includes(destinationName)) {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add a highlight effect
                card.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.5)';
                setTimeout(() => {
                    card.style.boxShadow = '';
                }, 2000);
            }
        });
    };
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initContactForm();
    initNavbarScroll();
    initLazyLoading();
    initScrollAnimations();
    initSearch();
}); 