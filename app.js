/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
      });
    });
  }

  /* ========================================
     SERVICES PAGE - SEARCH & ACCORDION
     ======================================== */

  // Search Functionality
  const serviceSearch = document.getElementById('serviceSearch');
  const servicesGrid = document.getElementById('servicesGrid');
  const noResults = document.getElementById('noResults');

  if (serviceSearch && servicesGrid) {
    serviceSearch.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      const serviceCards = servicesGrid.querySelectorAll('.service-card');
      let visibleCount = 0;

      serviceCards.forEach(card => {
        const title = card.getAttribute('data-service-title').toLowerCase();
        const description = card.getAttribute('data-service-description').toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide no results message
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  // Accordion Functionality
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const content = this.nextElementSibling;
      
      // Close all other accordions in the same grid
      const allContents = document.querySelectorAll('.accordion-content');
      allContents.forEach(otherContent => {
        if (otherContent !== content && otherContent.classList.contains('active')) {
          otherContent.classList.remove('active');
        }
      });

      // Toggle current accordion
      content.classList.toggle('active');
    });
  });

  /* ========================================
     CONTACT FORM VALIDATION
     ======================================== */

  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      clearErrors();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      let isValid = true;

      // Validate name
      if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
      } else if (name.length > 100) {
        showError('nameError', 'Name must be less than 100 characters');
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
      } else if (email.length > 255) {
        showError('emailError', 'Email must be less than 255 characters');
        isValid = false;
      }

      // Validate message
      if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
      } else if (message.length > 1000) {
        showError('messageError', 'Message must be less than 1000 characters');
        isValid = false;
      }

      if (isValid) {
        // Show success message
        contactForm.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';

        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'flex';
          document.getElementById('formSuccess').style.display = 'none';
        }, 3000);
      }
    });
  }

  /* ========================================
     START PROJECT - SERVICE SELECTION & QUOTE
     ======================================== */

  const projectForm = document.getElementById('projectForm');
  const selectedServicesList = document.getElementById('selectedServicesList');
  const subtotalElement = document.getElementById('subtotal');
  const discountElement = document.getElementById('discount');
  const discountRow = document.getElementById('discountRow');
  const totalAmountElement = document.getElementById('totalAmount');
  const sendQuoteBtn = document.getElementById('sendQuoteBtn');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');

  if (projectForm) {
    const checkboxes = projectForm.querySelectorAll('input[type="checkbox"]');

    // Update quote when checkboxes change
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateQuote);
    });

    function updateQuote() {
      const selectedServices = [];
      let subtotal = 0;
      let hasMatesRates = false;

      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          const price = parseFloat(checkbox.getAttribute('data-price'));
          const serviceName = checkbox.nextElementSibling.textContent;

          if (price === -1) {
            hasMatesRates = true;
            selectedServices.push({ name: serviceName, price: -1 });
          } else {
            subtotal += price;
            selectedServices.push({ name: serviceName, price: price });
          }
        }
      });

      // Update selected services list
      if (selectedServices.length === 0) {
        selectedServicesList.innerHTML = '<li class="no-services">No services selected yet</li>';
      } else {
        selectedServicesList.innerHTML = selectedServices
          .map(service => {
            if (service.price === -1) {
              return `<li>${service.name}</li>`;
            } else {
              return `<li>${service.name.split(' - ')[0]} - R${service.price.toFixed(2)}</li>`;
            }
          })
          .join('');
      }

      // Calculate discount if mates rates selected
      let discount = 0;
      if (hasMatesRates && subtotal > 0) {
        discount = subtotal * 0.2;
        discountRow.style.display = 'flex';
        discountElement.textContent = `-R${discount.toFixed(2)}`;
      } else {
        discountRow.style.display = 'none';
      }

      // Calculate total
      const total = subtotal - discount;

      // Update display
      subtotalElement.textContent = `R${subtotal.toFixed(2)}`;
      totalAmountElement.textContent = `R${total.toFixed(2)}`;
    }

    // Send quote button
    if (sendQuoteBtn) {
      sendQuoteBtn.addEventListener('click', function() {
        // Clear previous errors
        clearErrors();

        // Get form values
        const userName = userNameInput.value.trim();
        const userEmail = userEmailInput.value.trim();

        let isValid = true;

        // Validate name
        if (userName.length < 2) {
          showError('nameError', 'Name must be at least 2 characters long');
          isValid = false;
        } else if (userName.length > 100) {
          showError('nameError', 'Name must be less than 100 characters');
          isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
          showError('emailError', 'Please enter a valid email address');
          isValid = false;
        } else if (userEmail.length > 255) {
          showError('emailError', 'Email must be less than 255 characters');
          isValid = false;
        }

        // Check if services are selected
        const hasSelectedServices = Array.from(checkboxes).some(cb => cb.checked);
        if (!hasSelectedServices) {
          alert('Please select at least one service');
          isValid = false;
        }

        if (isValid) {
          // Show success message
          document.querySelector('.quote-details').style.display = 'none';
          document.getElementById('quoteSuccess').style.display = 'block';

          // Reset form after 3 seconds
          setTimeout(() => {
            projectForm.reset();
            userNameInput.value = '';
            userEmailInput.value = '';
            updateQuote();
            document.querySelector('.quote-details').style.display = 'flex';
            document.getElementById('quoteSuccess').style.display = 'none';
          }, 3000);
        }
      });
    }
  }

  /* ========================================
     UTILITY FUNCTIONS
     ======================================== */

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
      element.textContent = '';
    });
  }
});