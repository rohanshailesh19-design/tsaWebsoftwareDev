const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const userKey = (type) => `${type}_${currentUser.email}`;