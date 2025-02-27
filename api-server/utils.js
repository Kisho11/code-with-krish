function getMinNumber(num1, num2) {
  if(isNaN(num1) || isNaN(num2)) {
    return {
      status: 400,
      data: {
        error: 'both parameters should be numbers'
      },
    };
  } else {
    return {
      status: 200,
      data: {min: Math.min(num1, num2)}
    }
  }
}

function getMaxNumber(numbers) {
  if (!numbers || numbers.length === 0) {
    return {
      status: 400,
      data: {
        error: 'valid array of numbers is required'
      }
    };
  }
  
  let maxNum = numbers[0];
  

  for (let i = 1; i < numbers.length; i++) {
    if (isNaN(numbers[i])) {
      return {
        status: 400,
        data: {
          error: 'all values must be valid numbers'
        }
      };
    }
    //comparision one by one to find max number
    if (numbers[i] > maxNum) {
      maxNum = numbers[i];
    }
  }
  
  return {
    status: 200,
    data: {
      max: maxNum
    }
  };
}

function getAverage(numbers) {
  if (!numbers || numbers.length === 0) {
    return {
      status: 400,
      data: {
        error: 'valid array of numbers is required'
      }
    };
  }
  
  let sum = 0;
  

  for (let i = 0; i < numbers.length; i++) {
    if (isNaN(numbers[i])) {
      return {
        status: 400,
        data: {
          error: 'all values must be valid numbers'
        }
      };
    }
    
    sum += numbers[i];
  }
  
  const average = sum / numbers.length;
  
  return {
    status: 200,
    data: {
      average
    }
  };
}

function sortNumbers(numbers, type = 'asc') {
  if (!numbers || numbers.length === 0) {
    return {
      status: 400,
      data: {
        error: 'valid array of numbers is required'
      }
    };
  }
  
  if (type !== 'asc' && type !== 'desc') {
    return {
      status: 400,
      data: {
        error: 'type parameter must be either "asc" or "desc"'
      }
    };
  }
  
  // Check if all elements are valid numbers
  for (let i = 0; i < numbers.length; i++) {
    if (isNaN(numbers[i])) {
      return {
        status: 400,
        data: {
          error: 'all values must be valid numbers'
        }
      };
    }
  }
  
  // Create a copy of the array to avoid modifying the original
  let sortedNumbers = [...numbers];
  
  // Custom bubble sort implementation
  // checking if current element is greater than next element
  // outer loop to iterate through all elements
  // inner loop to compare current element with next element
  for (let i = 0; i < sortedNumbers.length; i++) {
    for (let j = 0; j < sortedNumbers.length - i - 1; j++) {
      if (type === 'asc') {
        if (sortedNumbers[j] > sortedNumbers[j + 1]) {
          // Swap
          const temp = sortedNumbers[j];
          sortedNumbers[j] = sortedNumbers[j + 1];
          sortedNumbers[j + 1] = temp;
        }
      } else {
        // if current element is less than next element
        // for descending order
        if (sortedNumbers[j] < sortedNumbers[j + 1]) {
          // Swap
          const temp = sortedNumbers[j];
          sortedNumbers[j] = sortedNumbers[j + 1];
          sortedNumbers[j + 1] = temp;
        }
      }
    }
  }
  
  return {
    status: 200,
    data: {
      sorted: sortedNumbers
    }
  };
}

function countOccurrences(array, searchValue) {
  if (!array || array.length === 0) {
    return {
      status: 400,
      data: {
        error: 'valid array is required'
      }
    };
  }
  
  if (searchValue === undefined || searchValue === null) {
    return {
      status: 400,
      data: {
        error: 'search value is required'
      }
    };
  }
  
  let count = 0;
  
  // comparing each element of array with searchvalue
  for (let i = 0; i < array.length; i++) {
    if (array[i] === searchValue) {
      count++;
    }
  }
  
  return {
    status: 200,
    data: {
      count
    }
  };
}

module.exports = {
  getMinNumber,
  getMaxNumber,
  getAverage,
  sortNumbers,
  countOccurrences
};