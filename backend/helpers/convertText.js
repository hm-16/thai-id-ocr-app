function extractInformation(text) {
    //Implementing the Regex for extracting relevant information

    //creating regex for informations required
    const firstNameRegex = /\bName\b/;
    const lastNameRegex = /\bLast name\b/;
    const idCardRegex = /Thai National ID Card\b/;
    const dateRegex = /\b(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\.\s+(\d{4})\b/g;
  
    //extracting start and end index of expression
    const extractIndex = (reg, input) => {
        const match = input.match(reg);
        return match ? [match.index, match.index + match[0].length] : [-1, -1];
    };
  
    //functions for extracting the information
    const extractFirstName = (input, start, end) => input.substring(start, end);
  
    const extractLastName = (input, start) => input.substring(start).match(/[a-zA-Z0-9\s]+/)[0];
  
    const extractId = (input, start) => input.substring(start).match(/[0-9\s]+/)[0].replace(/\s/g, "");
  
    //function to remove unwated spaces
    const refine = (myString) => myString.trim();
  
    //creating mapping of months to their month numbers
    const monthMapping = {
        'Jan.': '01',
        'Feb.': '02',
        'Mar.': '03',
        'Apr.': '04',
        'May.': '05',
        'Jun.': '06',
        'Jul.': '07',
        'Aug.': '08',
        'Sep.': '09',
        'Oct.': '10',
        'Nov.': '11',
        'Dec.': '12',
        'jan.': '01',
        'feb.': '02',
        'mar.': '03',
        'apr.': '04',
        'may.': '05',
        'jun.': '06',
        'jul.': '07',
        'aug.': '08',
        'sep.': '09',
        'oct.': '10',
        'nov.': '11',
        'dec.': '12'
    };
  
    //formating date string as DD/MM/YYYY
    const formatDate = (dateString) => {
      const [day, month, year] = dateString.split(/[\/\s]/);
      const formattedDate = `${day}/${monthMapping[month]}/${year}`;
      return formattedDate;
  };
  
  
    const data = {};
  
    //getting the start indexes
    const x1 = extractIndex(firstNameRegex, text);
    const x2 = extractIndex(lastNameRegex, text);
    const x3 = extractIndex(idCardRegex, text);
  
    //if regex's starting index have been found then
    //we collect the information that occurs after them
    //and we refine that info by removing unwanted spaces
    if (x1[0] !== -1 && x2[0] !== -1 && x3[0] !== -1) {
        data.firstName = refine(extractFirstName(text, x1[1] + 1, x2[0]));
        data.lastName = refine(extractLastName(text, x2[1] + 1));
        data.thaiNationalId = extractId(text, x3[1]);
    }
  
    //since in our text i'm getting 3 dates in
    //order of DOB , DOI and DOE I will store them
    //in array after refining and formating it.
    const dates = [];
    let match;
  
    while ((match = dateRegex.exec(text)) !== null) {
        dates.push(formatDate(refine(match[0])));
    }
  
    if (dates.length === 3) {
        data.dateOfBirth = dates[0];
        data.dateOfIssue = dates[1];
        data.dateOfExpiry = dates[2];
    }
  
    //returning all the collected info in the
    //required json format.
    const jsonData = {
        name: data.firstName,
        lastName: data.lastName,
        identificationNumber: data.thaiNationalId,
        dateOfBirth: data.dateOfBirth,
        dateOfIssue: data.dateOfIssue,
        dateOfExpiry: data.dateOfExpiry
    };
  
    return jsonData;
  }
  
  module.exports = extractInformation;
  