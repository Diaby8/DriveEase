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

@media (max-width: 768px){
  .features .feature-list {
    display: flex;
    justify-content: space-around;
    margin-top: 2em;
    flex-direction: column;
    align-items: center;
  }

}

.features .feature {
  width: 30%;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: left;
  transition: 0.5s ease;
}
@media (max-width: 768px){
  .features .feature {
    width: 80%;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    text-align: left;
    margin-bottom: 30px;
  }
}
.feature:hover {
  transform: scale(1.2);
}
</style>
