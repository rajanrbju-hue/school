// Main JavaScript for Holy Angels School Website

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Active Navbar link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });

  // Admission Enquiry Form submission with WhatsApp Redirect
  const enquiryForm = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('studentName').value.trim();
      const studentClass = document.getElementById('studentClass').value;
      const parentPhone = document.getElementById('parentPhone').value.trim();
      const parentAddress = document.getElementById('parentAddress').value.trim();
      const enquiryMessage = document.getElementById('enquiryMessage').value.trim();

      // Format WhatsApp message
      const schoolWhatsApp = '918757437293';
      const text = `*New Admission Enquiry - Holy Angels School Nagra*\n` +
                   `-----------------------------------\n` +
                   `*Student Name:* ${studentName}\n` +
                   `*Class Seeking:* ${studentClass}\n` +
                   `*Parent Contact:* ${parentPhone}\n` +
                   `*Location:* ${parentAddress}\n` +
                   `*Note:* ${enquiryMessage || 'N/A'}\n` +
                   `-----------------------------------\n` +
                   `Sent via Holy Angels School Website`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${schoolWhatsApp}?text=${encodedText}`;

      if (formStatus) {
        formStatus.innerHTML = '<span style="color: #16a34a;">Opening WhatsApp to send your enquiry...</span>';
      }

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        enquiryForm.reset();
        if (formStatus) {
          formStatus.innerHTML = '<span style="color: #16a34a;">Enquiry ready! Clicked to chat directly with School Office.</span>';
        }
      }, 600);
    });
  }
});
