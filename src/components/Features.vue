<template>
    <section class="features">
      <div class="container">
        <h2>Why Choose Us?</h2>
        <div class="feature-list">
          <div class="feature">
            <h3>Affordable Prices</h3>
            <p>Get the best deals on car rentals without compromising on quality.</p>
          </div>
          <div class="feature">
            <h3>Wide Selection</h3>
            <p>Choose from a variety of cars to suit your needs, from economy to luxury.</p>
          </div>
          <div class="feature">
            <h3>Easy Booking</h3>
            <p>Enjoy a seamless and quick booking process online.</p>
          </div>
        </div>
      </div>
    </section>
  </template>

<script>
export default {
  name: 'SiteFeatures'
}
</script>

  <style scoped>
  .features .feature-list {
    display: flex;
    justify-content: space-around;
    margin-top: 2em;
  }
  .features .feature {
    width: 30%;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    text-align: left;
  }
  </style>
