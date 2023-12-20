//HOME MENU FUNCTIONS
function generateRandomId(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }
  
    return result;
}


function generateRandomGuest(length) {
  if (length <= 0) {
    console.error("Please provide a positive value for the number of digits.");
    return null;
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return `Guest: ${Math.floor(Math.random() * (max - min + 1)) + min}`;
}

function generateCode(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }

  return "#" + result;
}

function showEl(el){
  el.style.opacity = "1";
  el.style.visibility = "visible";
}

function hideEl(el){
  el.style.opacity = "0";
  el.style.visibility = "hidden";
}