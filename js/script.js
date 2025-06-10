document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
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
    
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = parseInt(skill.getAttribute('data-level'));
        skill.style.setProperty('--level', level + '%');

        let barColor;
        if (level < 25) {
            barColor = '#f44336'; // Red
        } else if (level < 60) { // 25-49
            barColor = '#ffeb3b'; // Yellow
        } else { // 50 and above (includes 50-69 and 70+)
            barColor = '#4caf50'; // Green
        }
        skill.style.setProperty('--skill-bar-color', barColor);

        
        skill.classList.remove('level-low', 'level-medium', 'level-high', 'level-expert');
    });
    
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
    
    animateOnScroll(skillLevels, (element) => {
        setTimeout(() => {
            element.classList.add('in-view');
        }, 300);
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        const projectData = [
            { id: 'ecommerce', title: 'E-Commerce Website' },
            { id: 'portfolio', title: 'Portfolio Template' },
            { id: 'weather', title: 'Weather App' }
        ];
        
        projectCards.forEach((card, index) => {
            if (index < projectData.length) {
                const viewButton = card.querySelector('.btn-small');
                if (viewButton) {
                    viewButton.href = `project-${projectData[index].id}.html`;
                    
                    viewButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        window.location.href = this.href;
                    });
                }
            }
        });
    }
    /*
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
           
            console.log({
                name,
                email,
                subject,
                message
            });
            
            alert('Thank you for your message! I will get back to you soon.');
            
            contactForm.reset();
        });
    }
        */
    
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