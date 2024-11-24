<template>
    <section class="search">
      <div class="container">
        <h2>Find Your Perfect Ride</h2>
        <form>
          <label for="location">Pick-up Location:</label>
          <input type="text" id="location" placeholder="Enter city or location">
          <label for="date">Pick-up Date:</label>
          <input type="date" id="date">
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  </template>
<script>
export default {
  name: 'UserSearch'
}
</script>

  <style scoped>
  /* Styles spécifiques à cette section */
  .search form {
    margin-top: 1em;
  }
  .search form input,
  .search form button {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
