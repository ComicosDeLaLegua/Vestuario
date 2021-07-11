document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    options = []
    var instances = M.Dropdown.init(elems, options);
  });