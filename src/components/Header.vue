<template>
  <header>
    <div class="container">
      <h1>DriveEase - Car Rental</h1>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/cars">Available Cars</router-link></li>
          <li><router-link to="/about">About</router-link></li>
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
  color: white;
}
header h1 {
  font-size: 2em;
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
  transition: 0.5s;
}
li a:hover{
  background-color: #fff;
  border-radius: 30px;
  padding: 7px;
  color: black;
  transform: scale(1.4);
}

</style>
