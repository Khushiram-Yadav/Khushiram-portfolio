$(document).ready(function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Set current year in footer
    $('#year').text(new Date().getFullYear());

    // Initialize particles background
    if ($('#particles-js').length) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#7C3AED" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#06B6D4",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Typing Effect
    let phrases = [
        '.NET Backend Developer',
        'C# Specialist',
        'API Architect',
        'Database Expert',
        'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        const $typingText = $('.typing-text');

        if (isDeleting) {
            $typingText.text(currentPhrase.substring(0, charIndex - 1));
            charIndex--;
        } else {
            $typingText.text(currentPhrase.substring(0, charIndex + 1));
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // Mobile Menu Toggle
    $('#mobile-menu-btn').on('click', function() {
        $('#mobile-menu').toggleClass('hidden');
        $('#mobile-menu').toggleClass('animate__fadeIn');
    });

    // Close mobile menu when clicking a link
    $('#mobile-menu a').on('click', function() {
        $('#mobile-menu').addClass('hidden');
    });

    // Smooth Scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        if (targetId === '#') return;

        const targetElement = $(targetId);
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 80
            }, 800);
        }
    });

    // Scroll to Top Button
    const $scrollTopBtn = $('#scroll-top');

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $scrollTopBtn.removeClass('opacity-0').addClass('opacity-100');
        } else {
            $scrollTopBtn.removeClass('opacity-100').addClass('opacity-0');
        }
    });

    $scrollTopBtn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Active Navigation Link
    function updateActiveNavLink() {
        const scrollPosition = $(window).scrollTop() + 100;
        let currentSection = '';

        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            if (scrollPosition >= sectionTop) {
                currentSection = $(this).attr('id');
            }
        });

        $('.nav-link, #mobile-menu a').removeClass('active');
        $(`.nav-link[href="#${currentSection}"], #mobile-menu a[href="#${currentSection}"]`).addClass('active');
    }

    $(window).on('scroll', updateActiveNavLink);

    // Download Resume Button
    $('#download-resume-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const $btn = $(this);

        // Disable button
        $btn.prop('disabled', true);
        $btn.html('<i class="fas fa-download"></i><span>Please wait...</span>');

        // Create hidden download link
        const link = document.createElement('a');
        link.href = 'assets/Files/devansh_DotNet_2yr.pdf';
        link.download = 'khushiram_DotNet_2yr.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Enable after 1 sec
        setTimeout(function() {
            $btn.prop('disabled', false);
            $btn.html('<i class="fas fa-download"></i><span>Download Resume</span>');
        }, 1000);
    });

    // Contact Form Submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = $(this).serializeArray();
        const data = {};
        $.each(formData, function(i, field) {
            data[field.name] = field.value;
        });

        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        showFormMessage('Sending message...', 'info');

        setTimeout(() => {
            // In a real application, you would send this data to your server
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            $('#contact-form')[0].reset();
        }, 1500);
    });

    function showFormMessage(message, type) {
        const $formMessage = $('#form-message');
        $formMessage.text(message).removeClass('hidden').addClass('p-4 rounded-lg text-center animate__animated animate__fadeIn');

        // Remove existing classes
        $formMessage.removeClass('bg-red-500/20 text-red-300 border border-red-500/30')
                   .removeClass('bg-green-500/20 text-green-300 border border-green-500/30')
                   .removeClass('bg-blue-500/20 text-blue-300 border border-blue-500/30');

        if (type === 'error') {
            $formMessage.addClass('bg-red-500/20 text-red-300 border border-red-500/30');
        } else if (type === 'success') {
            $formMessage.addClass('bg-green-500/20 text-green-300 border border-green-500/30');
        } else {
            $formMessage.addClass('bg-blue-500/20 text-blue-300 border border-blue-500/30');
        }

        // Hide message after 5 seconds
        setTimeout(() => {
            $formMessage.addClass('hidden');
        }, 5000);
    }

    // Add hover effects to cards
    $('.skill-card, .timeline-item > div, .glass').on('mouseenter', function() {
        $(this).css({
            'transform': 'translateY(-8px)',
            'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.3)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'transform': 'translateY(0)',
            'box-shadow': ''
        });
    });

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                $(element).text(target + '+');
                clearInterval(timer);
            } else {
                $(element).text(Math.floor(current) + '+');
            }
        }, 20);
    }

    // Animate counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = $(entry.target).find('.counter');
                if (counter.length) {
                    const target = parseInt(counter.data('target'));
                    animateCounter(counter, target);
                }
            }
        });
    }, { threshold: 0.5 });

    $('.stat-card').each(function() {
        observer.observe(this);
    });

    // Add keyboard navigation support
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#mobile-menu').addClass('hidden');
        }
    });

    console.log('Portfolio loaded successfully! 🚀');
});