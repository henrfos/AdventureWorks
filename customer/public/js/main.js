function redirectToCustomer(event) {
    event.preventDefault(); 
    const searchPrefix = document.getElementById('searchPrefix').value.trim();
    if (searchPrefix) {
      window.location.href = `/customer/${searchPrefix}`; 
    }
  }