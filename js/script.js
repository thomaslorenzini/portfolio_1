document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced skill levels animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = parseInt(skill.getAttribute('data-level')); // Convert level to integer
        skill.style.setProperty('--level', level + '%');

        // Determine color based on skill level and set CSS variable
        let barColor;
        if (level < 25) {
            barColor = '#f44336'; // Red
        } else if (level < 60) { // 25-49
            barColor = '#ffeb3b'; // Yellow
        } else { // 50 and above (includes 50-69 and 70+)
            barColor = '#4caf50'; // Green
        }
        skill.style.setProperty('--skill-bar-color', barColor);

        // The classList.add for level-low, level-medium, etc. are no longer needed for color
        // but might be used for other styling, so we can leave them or remove them.
        // For now, let's remove them to make it clear color is handled by --skill-bar-color.
        skill.classList.remove('level-low', 'level-medium', 'level-high', 'level-expert'); // Clean up old classes
        // Re-add general classes if they were meant for something else, or adjust as needed.
        // For this specific request, we focus on color via JS.
    });
    
    // Animate elements when they come into view
    const animateOnScroll = (elements, callback) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Animate skill bars when they come into view
    animateOnScroll(skillLevels, (element) => {
        setTimeout(() => {
            // Add a class to trigger transition via CSS
            element.classList.add('in-view');
        }, 300);
    });
    
    // Project navigation - update project card links
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        // Project data mapping
        const projectData = [
            { id: 'ecommerce', title: 'E-Commerce Website' },
            { id: 'portfolio', title: 'Portfolio Template' },
            { id: 'weather', title: 'Weather App' }
        ];
        
        // Update project links
        projectCards.forEach((card, index) => {
            if (index < projectData.length) {
                const viewButton = card.querySelector('.btn-small');
                if (viewButton) {
                    viewButton.href = `project-${projectData[index].id}.html`;
                    
                    // Add click event to navigate to project page
                    viewButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        window.location.href = this.href;
                    });
                }
            }
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it to the console
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Show success message (in a real application)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Parallax effect for shapes
    const shapes = document.querySelectorAll('.shape');
    
    if (shapes.length > 0) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach(shape => {
                const speed = shape.classList.contains('shape1') ? 20 : 30;
                const offsetX = (x - 0.5) * speed;
                const offsetY = (y - 0.5) * speed;
                
                shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }
    
    // Project cards hover effect
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
});