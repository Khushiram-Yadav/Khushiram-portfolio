$(document).ready(function () {

  // ========== MOBILE MENU TOGGLE ==========
  $('#mobile-menu-btn').on('click', function () {
    $('#mobile-menu').slideToggle(300);
    $(this).find('i').toggleClass('fa-bars fa-times');
  });

  // Close mobile menu when clicking on a link
  $('.mobile-nav-link').on('click', function () {
    $('#mobile-menu').slideUp(300);
    $('#mobile-menu-btn').find('i').removeClass('fa-times').addClass('fa-bars');
  });

  // ========== SMOOTH SCROLL ==========
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 800);
    }
  });

  // ========== SCROLL TO TOP BUTTON ==========
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('#scroll-top').addClass('visible');
    } else {
      $('#scroll-top').removeClass('visible');
    }
  });

  $('#scroll-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });

  // ========== TYPING EFFECT ==========
  var typingTexts = [
    'Building Scalable Backend Systems',
    'RESTful API Development',
    'Database Architecture & Optimization',
    'Microservices & Clean Architecture'
  ];
  var textIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 100;
  var deletingSpeed = 50;
  var pauseTime = 2000;

  function typeText() {
    var currentText = typingTexts[textIndex];

    if (isDeleting) {
      charIndex--;
      typingSpeed = deletingSpeed;
    } else {
      charIndex++;
      typingSpeed = 100;
    }

    $('#typed-text').text(currentText.substring(0, charIndex));

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = pauseTime;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  // ========== SCROLL ANIMATIONS ==========
  function checkScroll() {
    $('.fade-up, .fade-in, .slide-left, .slide-right').each(function () {
      var elementTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < windowBottom - 100) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', checkScroll);
  checkScroll(); // Initial check

  // ========== SKILL BAR ANIMATION ==========
  var skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;

    var skillsSection = $('#skills');
    var skillsSectionTop = skillsSection.offset().top;
    var windowBottom = $(window).scrollTop() + $(window).height();

    if (skillsSectionTop < windowBottom - 200) {
      skillsAnimated = true;

      $('.skill-bar').each(function () {
        var width = $(this).data('width');
        $(this).animate({
          width: width + '%'
        }, 1500, 'swing');
      });
    }
  }

  $(window).on('scroll', animateSkills);
  animateSkills(); // Initial check

  // ========== COUNTER ANIMATION ==========
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    var statsSection = $('#stats');
    var statsSectionTop = statsSection.offset().top;
    var windowBottom = $(window).scrollTop() + $(window).height();

    if (statsSectionTop < windowBottom - 200) {
      countersAnimated = true;

      $('.counter').each(function () {
        var $this = $(this);
        var target = parseInt($this.data('target'));
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;

        var timer = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          $this.text(Math.floor(current));
        }, 16);
      });
    }
  }

  $(window).on('scroll', animateCounters);
  animateCounters(); // Initial check

  // ========== RESUME DOWNLOAD FUNCTIONALITY ==========
  let canDownload = true; // flag

$('#download-resume-btn').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var btn = $(this);

    // Disable button for 5 sec
    btn.prop('disabled', true);
    btn.text('Please wait...');

    // Create hidden download link
    var link = document.createElement('a');
    link.href = "assets/Files/Khushiram_.NET_Dev.pdf"; // exact path
    link.download = "Khushiram_.NET_Dev.pdf"; // forces download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Enable after 5 sec
    setTimeout(function () {
        btn.prop('disabled', false);
        btn.text('Download Resume');
    },1000);
});


  // ========== CONTACT FORM SUBMISSION ==========
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();

    var $form = $(this);
    var $button = $form.find('button[type="submit"]');
    var $message = $('#form-message');

    // Show loading state
    $button.addClass('loading');
    $button.find('span').text('Sending...');

    // Simulate form submission (replace with actual AJAX call)
    setTimeout(function () {
      $button.removeClass('loading');
      $button.find('span').text('Send Message');

      // Show success message
      $message.removeClass('hidden').addClass('success-message').text('Message sent successfully! I\'ll get back to you soon.');

      // Reset form
      $form[0].reset();

      // Hide message after 5 seconds
      setTimeout(function () {
        $message.addClass('hidden');
      }, 5000);
    }, 1500);
  });

  // ========== SET CURRENT YEAR ==========
  $('#year').text(new Date().getFullYear());

  // ========== ELEMENT SDK INTEGRATION ==========
  if (window.elementSdk) {
    var defaultConfig = {
      hero_name: "Hi, I'm Khushiram Yadav",
      hero_title: "C# | .NET | SQL Backend Developer",
      hero_description: "I'm a .NET Backend Developer skilled in building secure, scalable, high-performance applications using C#, ASP.NET, SQL, and modern backend design patterns.",
      about_content: "I am a backend developer proficient in C#, ASP.NET, .NET Core, and SQL. Skilled in full SDLC, debugging, API development, and database management. I enjoy building maintainable and efficient backend systems using modern design patterns like RESTful APIs, MVC, Repository Pattern, and CQRS. Passionate about clean code, problem-solving, and delivering high-quality backend solutions.",
      contact_heading: "Let's Build Something Amazing",
      background_color: "#0f172a",
      surface_color: "#1e293b",
      text_color: "#e2e8f0",
      primary_color: "#7c3aed",
      accent_color: "#14b8a6",
      font_family: "Inter",
      font_size: 16
    };

    window.elementSdk.init({
      defaultConfig: defaultConfig,

      onConfigChange: async function (config) {
        var cfg = $.extend({}, defaultConfig, config);

        // Apply text content
        $('#hero-name').html("Hi, I'm <span class='gradient-text'>" + cfg.hero_name.replace("Hi, I'm ", "") + "</span>");
        $('#hero-title').text(cfg.hero_title);
        $('#hero-description').text(cfg.hero_description);
        $('#about-content').html(cfg.about_content);
        $('#contact-heading').html(cfg.contact_heading.split(' ').slice(0, -1).join(' ') + " <span class='gradient-text'>" + cfg.contact_heading.split(' ').slice(-1)[0] + "</span>");

        // Apply colors
        $('body').css('background', 'linear-gradient(135deg, ' + cfg.background_color + ' 0%, ' + cfg.surface_color + ' 100%)');
        $('.bg-surface\\/50, .bg-surface\\/30').css('background-color', cfg.surface_color + '80');
        $('body, main').css('color', cfg.text_color);

        // Apply font
        var fontStack = cfg.font_family + ", system-ui, -apple-system, sans-serif";
        $('body, h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea').css('font-family', fontStack);

        // Apply font size
        var baseSize = cfg.font_size;
        $('body').css('font-size', baseSize + 'px');
        $('h1').css('font-size', (baseSize * 2.5) + 'px');
        $('h2').css('font-size', (baseSize * 2) + 'px');
        $('h3').css('font-size', (baseSize * 1.5) + 'px');
        $('p').css('font-size', baseSize + 'px');
      },

      mapToCapabilities: function (config) {
        var cfg = config || defaultConfig;
        return {
          recolorables: [
            {
              get: function () { return cfg.background_color || defaultConfig.background_color; },
              set: function (value) { window.elementSdk.setConfig({ background_color: value }); }
            },
            {
              get: function () { return cfg.surface_color || defaultConfig.surface_color; },
              set: function (value) { window.elementSdk.setConfig({ surface_color: value }); }
            },
            {
              get: function () { return cfg.text_color || defaultConfig.text_color; },
              set: function (value) { window.elementSdk.setConfig({ text_color: value }); }
            },
            {
              get: function () { return cfg.primary_color || defaultConfig.primary_color; },
              set: function (value) { window.elementSdk.setConfig({ primary_color: value }); }
            },
            {
              get: function () { return cfg.accent_color || defaultConfig.accent_color; },
              set: function (value) { window.elementSdk.setConfig({ accent_color: value }); }
            }
          ],
          borderables: [],
          fontEditable: {
            get: function () { return cfg.font_family || defaultConfig.font_family; },
            set: function (value) { window.elementSdk.setConfig({ font_family: value }); }
          },
          fontSizeable: {
            get: function () { return cfg.font_size || defaultConfig.font_size; },
            set: function (value) { window.elementSdk.setConfig({ font_size: value }); }
          }
        };
      },

      mapToEditPanelValues: function (config) {
        var cfg = config || defaultConfig;
        return new Map([
          ['hero_name', cfg.hero_name || defaultConfig.hero_name],
          ['hero_title', cfg.hero_title || defaultConfig.hero_title],
          ['hero_description', cfg.hero_description || defaultConfig.hero_description],
          ['about_content', cfg.about_content || defaultConfig.about_content],
          ['contact_heading', cfg.contact_heading || defaultConfig.contact_heading]
        ]);
      }
    });
  }

});