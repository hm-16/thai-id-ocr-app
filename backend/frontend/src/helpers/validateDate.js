  //function to validate date strings

  function isValidDateFormat(dateString) {
    // Define a regular expression pattern for DD/MM/YYYY format
    var pattern = /^\d{2}\/\d{2}\/\d{4}$/;

    // Check if the date string matches the pattern
    if (!pattern.test(dateString)) {
        return null;
    }

    // Extract day, month, and year from the date string
    var [day, month, year] = dateString.split('/');

    // Convert components to integers
    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);

    // Validate day, month, and year ranges
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000) {
        return null;
    }

    //if date is valid then return the date object
    var dateObject = new Date(year,month,day);

    return dateObject;
}
module.exports = isValidDateFormat;