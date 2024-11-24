<template>
    <header>
      <div class="container">
        <h1>DriveEase - Car Rental</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Available Cars</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>

<script>
export default {
  name: 'AppHeader'
}
</script>

  <style scoped>
  header {
    background: rgba(0, 0, 0, 0.7);
    padding: 1em 0;
    text-align: center;
  }
  header h1 {
    font-size: 2.5em;
  }
  header nav ul {
    list-style: none;
    margin-top: 1em;
  }
  header nav ul li {
    display: inline;
    margin: 0 15px;
  }
  header nav ul li a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  </style>
