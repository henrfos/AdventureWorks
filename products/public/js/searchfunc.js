function redirectToProduct(event) {
    event.preventDefault();
    const searchId = document.getElementById('searchId').value.trim();
    if (searchId) {
      window.location.href = `/product/${searchId}`; 
    }
  }