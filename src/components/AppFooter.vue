<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Section 1: Navigation -->
      <div class="footer-column">
        <h4>Navigation</h4>
        <ul>
          <li @click="navigateTo('/')">Home</li>
          <li @click="navigateTo('/cars')">Available Cars</li>
          <li @click="navigateTo('/about')">About Us</li>
        </ul>
      </div>

      <!-- Section 2: Services -->
      <div class="footer-column">
        <h4>Our Services</h4>
        <ul>
          <li>Car Rentals</li>
          <li>Long-term Leasing</li>
          <li>Luxury Cars</li>
        </ul>
      </div>

      <!-- Section 3: Contact -->
      <div class="footer-column">
        <h4>Contact Us</h4>
        <ul>
          <li>Email: support@carrental.com</li>
          <li>Phone: +1 800 555 1234</li>
          <li>Address: 123 Car Rental Blvd, Paris</li>
        </ul>
      </div>

      <!-- Social Media -->
      <div class="footer-socials">
        <a href="https://instagram.com" target="_blank">Instagram</a>
        <a href="https://linkedin.com" target="_blank">LinkedIn</a>
        <a href="https://facebook.com" target="_blank">Facebook</a>
      </div>
    </div>

    <!-- Footer bottom -->
    <div class="footer-bottom">
      <p>© 2024 DriveEase - Car Rental. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    navigateTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #111;
  color: #fff;
  padding: 2rem 1rem;
  font-family: 'Oswald', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Columns */
.footer-column {
  flex: 1;
  min-width: 200px;
}

.footer-column h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #bbb;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column li {
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #fff;
  cursor: pointer;
}

.footer-column li:hover {
  text-decoration: underline;
}

/* Social Media */
.footer-socials {
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.footer-socials a {
  text-decoration: none;
  color: #fff;
  font-size: 0.9rem;
}

.footer-socials a:hover {
  color: #ddd;
}

/* Footer bottom */
.footer-bottom {
  text-align: center;
  border-top: 1px solid #333;
  padding-top: 1rem;
  font-size: 0.8rem;
  color: #bbb;
}

.footer-bottom p {
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-column {
    text-align: center;
  }
}
</style>
